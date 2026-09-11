import nodemailer from 'nodemailer'

import { contact, profile } from '@/data/content'

/**
 * Contact form endpoint.
 *
 * Nodemailer opens a TCP socket, which the Edge runtime cannot do, so this
 * route is pinned to Node. It is also marked dynamic: a POST handler must
 * never be statically evaluated at build time, when no credentials exist.
 *
 * Nothing in this file reaches the browser. SMTP credentials are read from the
 * server environment, and no SMTP error text is ever returned to the client —
 * a failed send answers with a generic message and the details go to the
 * server log only.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* Bounds are generous for a real enquiry and small enough that nothing
   enormous reaches the mail server. */
const LIMITS = {
  name: 100,
  email: 200,
  company: 120,
  projectType: 80,
  timeline: 80,
  message: 5000,
}

/** Refuse to read a body larger than any legitimate submission. */
const MAX_BODY_BYTES = 16 * 1024

/* Best-effort, in-memory, per-instance. Serverless spreads requests across
   instances that do not share memory and are recycled freely, so this throttles
   a naive flood rather than a determined one. It is deliberately not backed by
   Redis: the project has no such dependency and adding one for this would cost
   more than it returns. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 }
const hits = new Map()

function rateLimited(key) {
  const now = Date.now()
  const seen = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs)
  seen.push(now)
  hits.set(key, seen)

  /* Drop stale keys so a long-lived instance does not grow unbounded. */
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) hits.delete(k)
    }
  }
  return seen.length > RATE_LIMIT.max
}

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

const asString = (value) => (typeof value === 'string' ? value.trim() : '')

/** Header injection guard: a newline in a header value can forge extra headers. */
const singleLine = (value) => value.replace(/[\r\n]+/g, ' ').trim()

function validate(payload) {
  const errors = []
  const name = asString(payload.name)
  const email = asString(payload.email)
  const company = asString(payload.company)
  const projectType = asString(payload.projectType)
  const timeline = asString(payload.timeline)
  const message = asString(payload.message)

  if (!name) errors.push('name is required')
  else if (name.length > LIMITS.name) errors.push('name is too long')

  if (!email) errors.push('email is required')
  else if (email.length > LIMITS.email) errors.push('email is too long')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is not valid')

  if (company.length > LIMITS.company) errors.push('company is too long')

  /* Both are chosen from a fixed list in the UI, so anything else was not sent
     by the form. Empty stays acceptable — both are optional. */
  if (projectType && !contact.projectTypes.includes(projectType)) {
    errors.push('projectType is not a recognised option')
  }
  if (timeline && !contact.timelines.includes(timeline)) {
    errors.push('timeline is not a recognised option')
  }

  if (!message) errors.push('message is required')
  else if (message.length < 10) errors.push('message is too short')
  else if (message.length > LIMITS.message) errors.push('message is too long')

  return { errors, value: { name, email, company, projectType, timeline, message } }
}

/* One pooled transporter per warm instance, created lazily and kept at module
   scope so it survives between invocations on the same Lambda.
 
   Profiling against Gmail showed a fresh transporter spends roughly 1.5-2.2s on
   TCP + TLS + EHLO + AUTH before a single byte of the message moves. Reusing an
   authenticated connection skips all of it: measured 4.6s on the first send and
   2.1-2.9s on reuse.
 
   This is a cache, not an assumption of a persistent server. A cold instance
   simply builds a new one, and if the pooled socket has been closed — idle
   timeout, or the instance frozen between invocations — nodemailer's pool
   opens a fresh connection rather than failing. Nothing here changes the fact
   that a response is only sent once the SMTP server has accepted the message.

   Timeouts are explicit so a hung mail server cannot hold a serverless
   invocation open until the platform kills it. */
let cachedTransport = null
let cachedKey = null

function getTransport(config) {
  const key = `${config.host}:${config.port}:${config.user}`
  if (cachedTransport && cachedKey === key) return cachedTransport

  if (cachedTransport) cachedTransport.close()
  cachedKey = key
  cachedTransport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    /* 465 is implicit TLS, which avoids the extra STARTTLS round trip 587
       requires. Anything else negotiates upward as usual. */
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })
  return cachedTransport
}

function readConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const to = process.env.CONTACT_TO || profile.email

  if (!host || !port || !user || !pass) return null
  return { host, port, user, pass, to }
}

export async function POST(request) {
  /* Anything larger is not a contact form submission. */
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) return json({ error: 'Payload too large.' }, 413)

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  if (rateLimited(ip)) {
    return json({ error: 'Too many messages. Please try again shortly.' }, 429)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Expected a JSON body.' }, 400)
  }
  if (!payload || typeof payload !== 'object') {
    return json({ error: 'Expected a JSON body.' }, 400)
  }

  /* Honeypot. A real person never sees this field, so anything in it came from
     something automated. Answer 200 so a bot cannot tell it was caught. */
  if (asString(payload.website)) return json({ ok: true }, 200)

  const { errors, value } = validate(payload)
  if (errors.length > 0) return json({ error: 'Some details need fixing.', errors }, 400)

  const config = readConfig()
  if (!config) {
    /* Deliberately vague to the client — naming the missing variables would
       describe the server's configuration to anyone who asks. */
    console.error('[contact] SMTP is not configured; refusing to claim the message was sent.')
    return json({ error: 'Email is not available right now.' }, 503)
  }

  try {
    const transporter = getTransport(config)

    const text = [
      `Name: ${value.name}`,
      `Email: ${value.email}`,
      `Company: ${value.company || 'Not specified'}`,
      `Project: ${value.projectType || 'Not specified'}`,
      `Timeline: ${value.timeline || 'Not specified'}`,
      '',
      'Message:',
      value.message,
    ].join('\n')

    await transporter.sendMail({
      /* From is the authenticated account. Putting the visitor's address here
         would fail SPF/DKIM at most providers and get the mail rejected or
         binned; Reply-To is what makes a reply reach them. */
      from: `"${profile.name} — portfolio" <${config.user}>`,
      to: config.to,
      replyTo: `"${singleLine(value.name)}" <${singleLine(value.email)}>`,
      subject: `New project enquiry — ${singleLine(value.name)}`,
      text,
    })

    /* Deliberately silent on success. A completed send needs no record, and
       anything logged here would be a standing trail of who contacted whom
       and when. Failures are logged below, because those need diagnosing. */
    return json({ ok: true }, 200)
  } catch (error) {
    /* Log enough to debug, never the credentials and never the message body. */
    console.error('[contact] send failed:', error?.message ?? 'unknown error')
    return json({ error: 'We could not send your message.' }, 502)
  }
}

/* Anything other than POST is not supported. */
export async function GET() {
  return json({ error: 'Method not allowed.' }, 405)
}

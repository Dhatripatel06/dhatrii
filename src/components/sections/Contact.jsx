'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import { contact, profile, socials, whatsappHref } from '@/data/content'
import { socialIcon } from '@/lib/icons'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import { EASE } from '@/lib/motion'

/* Five fields plus a details box — enough to understand and schedule a project
   without turning an enquiry into a form-filling exercise. No budget field:
   pricing is presented in the pricing section, not asked for here. */
const EMPTY = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  timeline: '',
  message: '',
}

/* Windows' mailto handler quietly ignores URLs past roughly 2000 characters,
   so a long message would open nothing while the form claimed success. Keep
   the whole URL well short of that. */
const MAX_MAILTO = 1800

/* Plain ASCII. An em-dash percent-encodes to three bytes and some mail clients
   mangle multi-byte sequences in a mailto subject. */
const SUBJECT_PREFIX = 'New project enquiry - '

const TRUNCATION_NOTE =
  '\n\n[Message shortened so your email app could open it. Please paste the rest below.]'

export default function Contact() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  /* idle | sending | success | error */
  const [status, setStatus] = useState('idle')
  /* Kept after a failed send so the panel can offer the same message through
     routes that do not depend on this site's server being reachable. */
  const [composed, setComposed] = useState(null)
  const [copied, setCopied] = useState(false)
  /* Filled only by something automated; a real visitor never sees the field. */
  const [website, setWebsite] = useState('')

  const update = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'A valid email so I can reply.'
    if (form.message.trim().length < 10) next.message = 'A sentence or two about the project.'
    return next
  }

  /* Submission goes to this site's own API route, which sends the mail with
     Nodemailer server-side. That is an ordinary same-origin fetch — a mailto:
     is never given to one, and none is used for the primary path any more.

     The mailto and Gmail URLs below are built only so the failure panel can
     offer them. They are never triggered automatically. */
  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return // no duplicate submissions

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      projectType: form.projectType,
      timeline: form.timeline,
      message: form.message.trim(),
      website, // honeypot
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      setStatus('success')
      setForm(EMPTY)
      setWebsite('')
      return
    } catch {
      /* Never claim delivery the server did not confirm. Compose the manual
         routes instead so the enquiry is not simply lost. */
      const lines = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || 'Not specified'}`,
        `Project: ${payload.projectType || 'Not specified'}`,
        `Timeline: ${payload.timeline || 'Not specified'}`,
        '',
        'Message:',
        payload.message,
      ].join('\n')

      const subject = encodeURIComponent(`${SUBJECT_PREFIX}${payload.name}`)
      let text = lines
      let mailto = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(text)}`
      if (mailto.length > MAX_MAILTO) {
        const glyphs = Array.from(lines)
        let keep = glyphs.length
        do {
          keep = Math.floor(keep * 0.9)
          text = `${glyphs.slice(0, keep).join('').trimEnd()}${TRUNCATION_NOTE}`
          mailto = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(text)}`
        } while (mailto.length > MAX_MAILTO && keep > 0)
      }

      const gmail =
        'https://mail.google.com/mail/?view=cm&fs=1' +
        `&to=${encodeURIComponent(profile.email)}` +
        `&su=${encodeURIComponent(`${SUBJECT_PREFIX}${payload.name}`)}` +
        `&body=${encodeURIComponent(text)}`

      setComposed({ mailto, gmail, text })
      setCopied(false)
      setStatus('error')
    }
  }

  const fieldClass = (field) =>
    `w-full rounded-2xl border bg-bg px-5 py-3.5 text-text placeholder:text-muted/50 outline-none transition-colors duration-300 focus:border-accent/60 focus:ring-4 focus:ring-accent/10 ${
      errors[field] ? 'border-red-500/60' : 'border-line'
    }`

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card sm:p-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
            />

            {/* Heading sits inside the card, left-aligned over two lines */}
            <div className="relative mb-10">
              <h2
                id="contact-heading"
                className="text-[clamp(2.5rem,9vw,4rem)] leading-[1.02] tracking-[-0.03em]"
              >
                <span className="block font-light">{contact.titleLight}</span>
                <span className="block font-bold">{contact.titleBold}</span>
              </h2>

              <ul className="mt-7 flex gap-2.5">
                {socials.slice(0, 3).map((social) => {
                  const Icon = socialIcon(social.icon)
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${profile.name} on ${social.label}`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.05] text-text transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                      >
                        <Icon size={17} strokeWidth={2} aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <p className="mt-7 max-w-lede text-pretty text-muted">{contact.lede}</p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' || status === 'error' ? (
                <motion.div
                  key={status}
                  role="status"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative flex flex-col items-start"
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle2
                        size={34}
                        strokeWidth={1.9}
                        className="text-accent"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-display text-2xl font-bold">
                        Message sent successfully.
                      </h3>
                      <p className="mt-3 text-pretty text-muted">
                        Your enquiry is on its way to my inbox — nothing else to do. I will read it
                        and get back to you at the address you gave.
                      </p>
                    </>
                  ) : (
                    <>
                      <AlertCircle
                        size={34}
                        strokeWidth={1.9}
                        className="text-accent"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-display text-2xl font-bold">
                        We couldn&rsquo;t send your message automatically.
                      </h3>
                      <p className="mt-3 text-pretty text-muted">
                        Nothing was sent, so your enquiry has not reached me yet. Your message is
                        saved below — any one of these will get it to me.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={composed?.gmail ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-text"
                        >
                          <Mail size={15} strokeWidth={2.2} aria-hidden="true" />
                          Open in Gmail
                        </a>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!composed) return
                            try {
                              await navigator.clipboard.writeText(composed.text)
                              setCopied(true)
                            } catch {
                              /* Clipboard access is permission-gated and can
                                 refuse; do not pretend it worked. */
                              setCopied(false)
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                        >
                          {copied ? 'Copied' : 'Copy message'}
                        </button>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                        >
                          <MessageCircle size={15} strokeWidth={2.1} aria-hidden="true" />
                          WhatsApp
                        </a>
                      </div>

                      <p className="mt-5 text-sm text-muted" aria-live="polite">
                        {copied ? 'Copied. Paste it into an email to ' : 'Or write to me at '}
                        <a
                          href={`mailto:${profile.email}`}
                          className="link-underline font-medium text-accent"
                        >
                          {profile.email}
                        </a>
                        .
                      </p>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-7 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex flex-col gap-5"
                >
                  {/* Honeypot. Positioned off-screen rather than display:none,
                      because some bots skip fields that are hidden outright.
                      Unreachable by keyboard and hidden from assistive tech, so
                      only something automated ever fills it in. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Dhruv Sharma"
                        value={form.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={fieldClass('name')}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-sm text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={update('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={fieldClass('email')}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium">
                        Business or company{' '}
                        <span className="font-normal text-muted">(optional)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Where you work"
                        value={form.company}
                        onChange={update('company')}
                        className={fieldClass('company')}
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="mb-2 block text-sm font-medium">
                        What do you want to build?
                      </label>
                      <select
                        id="projectType"
                        value={form.projectType}
                        onChange={update('projectType')}
                        className={`${fieldClass('projectType')} appearance-none`}
                      >
                        <option value="">Pick one</option>
                        {contact.projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Full width, not half of a two-up row: the budget selector
                      that used to sit beside it is gone, and pricing belongs in
                      the pricing section rather than in an enquiry form. */}
                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-medium">
                      Timeline <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={update('timeline')}
                      className={`${fieldClass('timeline')} appearance-none`}
                    >
                      <option value="">When do you need it?</option>
                      {contact.timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      A bit more about it
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What problem does it solve, and who is it for?"
                      value={form.message}
                      onChange={update('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${fieldClass('message')} resize-y`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <ArrowButton as="button" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send it over'}
                    </ArrowButton>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-3.5 font-medium text-text transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                    >
                      <MessageCircle size={17} strokeWidth={2.1} aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Mail size={14} strokeWidth={2} aria-hidden="true" />
                    {profile.email}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

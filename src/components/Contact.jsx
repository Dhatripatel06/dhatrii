import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  CheckCircle2,
  Twitter,
  Instagram,
  Github,
  Linkedin,
} from 'lucide-react'
import { contact, profile, socials } from '../data/content'
import ArrowButton from './ui/ArrowButton'
import Reveal from './ui/Reveal'
import { EASE } from './ui/motion'

const SOCIAL_ICONS = { Twitter, Instagram, Github, Linkedin }

const EMPTY = { name: '', email: '', budget: '', message: '' }

export default function Contact() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const whatsappHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`

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

  /* No backend: the form composes a pre-filled email and hands it to the
     visitor's mail client. Replace with fetch() when you add an endpoint. */
  const onSubmit = (event) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || 'Not specified'}`,
      '',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `New project enquiry — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
    setForm(EMPTY)
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
                  const Icon = SOCIAL_ICONS[social.icon] ?? Github
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
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative flex flex-col items-start"
                >
                  <CheckCircle2 size={34} strokeWidth={1.9} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl font-bold">Your email is ready to send.</h3>
                  <p className="mt-3 text-pretty text-muted">
                    I opened your mail app with everything filled in — just hit send. If nothing
                    opened, write to{' '}
                    <a href={`mailto:${profile.email}`} className="link-underline font-medium text-accent">
                      {profile.email}
                    </a>{' '}
                    or message me on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
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

                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                      Rough budget <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={update('budget')}
                      className={`${fieldClass('budget')} appearance-none`}
                    >
                      <option value="">Pick a range</option>
                      {contact.budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      About the project
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What are you building, who is it for, and when do you need it live?"
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
                    <ArrowButton as="button" type="submit">
                      Send it over
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

import clsx from 'clsx'
import { ArrowRight, Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { EMAIL, services, type ServiceId } from '../content'
import { EASE } from '../lib/motion'
import { MagneticButton } from './MagneticButton'
import { Reveal, Words } from './Words'

// Set by "Discuss a project like this"; a new key remounts the form with these values.
export type Brief = { services: ServiceId[]; message: string; key: number }

type Fields = { name: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const BUDGETS = ['Under ₹5 lakh', '₹5–15 lakh', '₹15–40 lakh', 'Over ₹40 lakh', 'Not sure yet']
const TIMELINES = ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Flexible']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to post the form; without it the form opens the visitor's email app.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (!f.name.trim()) errors.name = 'Enter your name.'
  if (!EMAIL_PATTERN.test(f.email.trim())) errors.email = 'Enter an email address we can reply to.'
  if (f.message.trim().length < 10) errors.message = 'Tell us a little about the project, at least a sentence.'
  return errors
}

function compose(f: Fields, needs: ServiceId[], budget: string | null, timeline: string | null) {
  const needLabels = needs.map((id) => services.find((s) => s.id === id)?.title).filter(Boolean)
  const lines = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.company ? `Company: ${f.company}` : null,
    needLabels.length ? `Needs: ${needLabels.join(', ')}` : null,
    budget ? `Budget: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    '',
    f.message,
  ]
  return {
    subject: `Project enquiry from ${f.name}`,
    body: lines.filter((l): l is string => l !== null).join('\n'),
  }
}

function EmailCopy() {
  const [label, setLabel] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const text = useRef<HTMLSpanElement>(null)
  const shortcut = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘C' : 'Ctrl+C'

  const show = (value: string) => {
    setLabel(value)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setLabel(null), 2400)
  }
  const copy = () => {
    const selectInstead = () => {
      if (!text.current) return
      const range = document.createRange()
      range.selectNodeContents(text.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      show(`Selected, press ${shortcut}`)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(() => show('Copied'), selectInstead)
    else selectInstead()
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${EMAIL}`}
      className="group inline-flex flex-wrap items-center gap-4 self-start text-left"
    >
      <span
        ref={text}
        className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] underline decoration-transparent decoration-2 underline-offset-8 transition-colors group-hover:decoration-muted"
      >
        {EMAIL}
      </span>
      <span
        aria-hidden
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-full bg-raise px-3 py-1 text-sm transition-all duration-200',
          label
            ? 'translate-x-0 text-text opacity-100'
            : '-translate-x-1.5 text-soft opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100',
        )}
      >
        {label === 'Copied' ? <Check size={14} /> : <Copy size={14} />}
        {label ?? 'Copy'}
      </span>
      <span className="sr-only" aria-live="polite">
        {label ?? ''}
      </span>
    </button>
  )
}

type FieldProps = {
  id: keyof Fields
  label: string
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  textarea?: boolean
  className?: string
  autoComplete?: string
}

function Field({ id, label, value, error, onChange, type = 'text', textarea, className, autoComplete }: FieldProps) {
  const inputId = `field-${id}`
  const errorId = `${inputId}-error`
  const shared = {
    id: inputId,
    name: id,
    value,
    onChange,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: clsx(
      'w-full rounded-2xl border bg-bg px-4 py-3.5 text-text outline-none transition-colors focus:border-text',
      error ? 'border-accent' : 'border-line',
    ),
  }
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-sm text-soft">
        {label}
      </label>
      {textarea ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p id={errorId} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-accent">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chips({ label, options, isOn, onToggle }: { label: string; options: { value: string; label: string }[]; isOn: (v: string) => boolean; onToggle: (v: string) => void }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-3 text-sm text-soft">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = isOn(option.value)
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option.value)}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                on ? 'border-text bg-text text-bg' : 'border-line text-soft hover:border-soft hover:text-text',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Done({ status, onReset }: { status: 'sent' | 'mailto'; onReset: () => void }) {
  return (
    <motion.div
      key="done"
      role="status"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[420px] flex-col items-start justify-center gap-6"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-navy">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15, ease: EASE }} />
        </svg>
      </span>
      <h3 className="font-display text-3xl font-semibold">{status === 'sent' ? 'Thanks, it’s on its way.' : 'Your email app should be open.'}</h3>
      <p className="max-w-md text-soft">
        {status === 'sent'
          ? 'We’ll reply by email.'
          : `Your message is ready to send from there. If nothing opened, email us at ${EMAIL}.`}
      </p>
      <button type="button" onClick={onReset} className="border-b border-line pb-1 text-sm transition-colors hover:border-text">
        Write another message
      </button>
    </motion.div>
  )
}

function ContactForm({ brief }: { brief: Brief | null }) {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', message: brief?.message ?? '' })
  const [needs, setNeeds] = useState<ServiceId[]>(brief?.services ?? [])
  const [budget, setBudget] = useState<string | null>(null)
  const [timeline, setTimeline] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }
  const toggleNeed = (id: string) =>
    setNeeds((n) => (n.includes(id as ServiceId) ? n.filter((x) => x !== id) : [...n, id as ServiceId]))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    const { subject, body } = compose(fields, needs, budget, timeline)
    if (!FORM_ENDPOINT) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, ...fields, needs, budget, timeline }),
      })
      if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setFields({ name: '', email: '', company: '', message: '' })
    setNeeds([])
    setBudget(null)
    setTimeline(null)
    setStatus('idle')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' || status === 'mailto' ? (
        <Done key="done" status={status} onReset={reset} />
      ) : (
        <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label="Your name" value={fields.name} error={errors.name} onChange={update('name')} autoComplete="name" />
            <Field id="email" label="Email" type="email" value={fields.email} error={errors.email} onChange={update('email')} autoComplete="email" />
            <Field id="company" label="Company (optional)" value={fields.company} onChange={update('company')} autoComplete="organization" className="sm:col-span-2" />
            <Chips
              label="What do you need?"
              options={services.map((s) => ({ value: s.id, label: s.title }))}
              isOn={(v) => needs.includes(v as ServiceId)}
              onToggle={toggleNeed}
            />
            <Chips
              label="Budget"
              options={BUDGETS.map((b) => ({ value: b, label: b }))}
              isOn={(v) => budget === v}
              onToggle={(v) => setBudget((b) => (b === v ? null : v))}
            />
            <Chips
              label="Timeline"
              options={TIMELINES.map((t) => ({ value: t, label: t }))}
              isOn={(v) => timeline === v}
              onToggle={(v) => setTimeline((t) => (t === v ? null : v))}
            />
            <Field id="message" label="About the project" textarea value={fields.message} error={errors.message} onChange={update('message')} className="sm:col-span-2" />
          </div>

          {status === 'error' && (
            <p role="alert" className="mt-6 text-accent">
              That didn't send. Try again, or email us at {EMAIL}.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              {FORM_ENDPOINT ? 'We reply by email.' : 'This opens your email app with the message ready to send.'}
            </p>
            <MagneticButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              <ArrowRight size={18} />
            </MagneticButton>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export function Contact({ brief }: { brief: Brief | null }) {
  return (
    <section id="contact" className="container-x py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <Words text="Have a project in mind?" inView className="text-muted" />
            <br />
            <Words text="Let's build it." inView delay={0.1} />
          </h2>
          <Reveal>
            <p className="max-w-md text-lg text-soft">
              Tell us what you want to build, who it's for and when you need it. We'll reply with questions or a time to talk.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <EmailCopy />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="inline-flex items-center gap-3 text-sm text-soft">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Open for new projects
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-[32px] border border-line bg-surface p-6 sm:p-10">
            <ContactForm key={brief?.key ?? 0} brief={brief} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

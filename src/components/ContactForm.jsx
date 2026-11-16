import { useRef, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi'
import { contact } from '../data/portfolio'
import { LIMITS, normalizeContact, validateContact } from '../../shared/contactValidation'
import './ContactForm.css'



// const PRIMARY_ENDPOINT = 'https://ayas786.app.n8n.cloud/webhook/portfolio-contactferfwrfwfwerferf'
const PRIMARY_ENDPOINT = 'https://ayas786.app.n8n.cloud/webhook/portfolio-contact'
const FALLBACK_ENDPOINT = '/.netlify/functions/send-email'
const PRIMARY_TIMEOUT_MS = 12_000
const FALLBACK_TIMEOUT_MS = 15_000
const PRIMARY_MAX_ATTEMPTS = 2 // first try + one automatic retry
const RETRY_DELAY_MS = 1_500
const GENERIC_ERROR = 'Unable to send your message right now. Please try again later.'

const initialValues = { name: '', email: '', subject: '', message: '' }
const validate = (values) => validateContact(normalizeContact(values))

// Unique, non-empty ID per submission. randomUUID needs a secure context (https or localhost).
const createSubmissionId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`

// Temporary failures worth retrying: network error/timeout (0), request timeout (408), server errors (5xx).
const isTemporaryFailure = (status) => status === 0 || status === 408 || status >= 500
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * POSTs JSON with its own AbortController/timeout. Never throws.
 * Success requires a 2xx status AND a JSON body with `success: true`.
 */
async function postContact(url, payload, timeoutMs) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    const result = await response.json().catch(() => null)
    return {
      ok: response.ok && result?.success === true,
      status: response.status,
      message: typeof result?.message === 'string' ? result.message : null,
    }
  } catch {
    // Network failure, CORS rejection or timeout (AbortError).
    return { ok: false, status: 0, message: null }
  } finally {
    clearTimeout(timeoutId)
  }
}

const FIELD_ORDER = ['name', 'email', 'subject', 'message']

export default function ContactForm() {
  const formRef = useRef(null)
  const inFlightRef = useRef(false)
  // { id, content } of the last unconfirmed submission, so a retry of identical content reuses its ID.
  const pendingSubmissionRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (inFlightRef.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus()
      return
    }

    inFlightRef.current = true
    setStatus('sending')

    const { name, email, subject, message } = normalizeContact(values)

    // Generate the ID once per submission. Re-sending the same content after a failure is a
    // retry and reuses the ID; any edit (or a submission after success) gets a new one.
    const content = JSON.stringify([name, email, subject, message])
    if (pendingSubmissionRef.current?.content !== content) {
      pendingSubmissionRef.current = { id: createSubmissionId(), content }
    }

    // One payload object, sent unchanged to n8n and (if needed) the Netlify fallback.
    const payload = {
      name,
      email,
      subject,
      message,
      website: formRef.current.elements.website.value,
      submissionId: pendingSubmissionRef.current.id,
    }

    try {
      // n8n, retried on temporary failures. Every attempt sends the same payload (same submissionId),
      // and each postContact call gets its own AbortController/timeout.
      let outcome
      for (let attempt = 1; attempt <= PRIMARY_MAX_ATTEMPTS; attempt += 1) {
        outcome = await postContact(PRIMARY_ENDPOINT, payload, PRIMARY_TIMEOUT_MS)
        if (outcome.ok || !isTemporaryFailure(outcome.status) || attempt === PRIMARY_MAX_ATTEMPTS) break
        await wait(RETRY_DELAY_MS)
      }
      // 409 = n8n already stored this submissionId (an earlier attempt got through), so it's delivered.
      if (outcome.status === 409) outcome = { ...outcome, ok: true }
      if (!outcome.ok) {
        outcome = await postContact(FALLBACK_ENDPOINT, payload, FALLBACK_TIMEOUT_MS)
      }

      if (outcome.ok) {
        pendingSubmissionRef.current = null // next submission gets a new ID
        setStatus('success')
        setValues(initialValues)
        setTouched({})
        setErrors({})
        formRef.current?.reset()
      } else {
        // Both failed. Validation (400) and rate-limit (429) messages are safe to show; anything else stays generic.
        setErrorMessage(
          [400, 429].includes(outcome.status) && outcome.message ? outcome.message : GENERIC_ERROR,
        )
        setStatus('error')
      }
    } finally {
      inFlightRef.current = false
    }
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] && touched[name] ? true : undefined,
    'aria-describedby': errors[name] && touched[name] ? `contact-${name}-error` : undefined,
  })

  const renderError = (name) =>
    errors[name] && touched[name] ? (
      <p id={`contact-${name}-error`} className="contact-form__error">
        <FiAlertCircle aria-hidden="true" /> {errors[name]}
      </p>
    ) : null

  const sending = status === 'sending'

  return (
    <form ref={formRef} className="contact-form glass" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            placeholder="Your full name"
            {...fieldProps('name')}
          />
          {renderError('name')}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email}
            placeholder="you@example.com"
            {...fieldProps('email')}
          />
          {renderError('email')}
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-subject">
          Subject <span className="contact-form__optional">(Optional)</span>
        </label>
        <input
          type="text"
          maxLength={LIMITS.subject}
          placeholder="What is this about?"
          {...fieldProps('subject')}
        />
        {renderError('subject')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          rows="6"
          required
          maxLength={LIMITS.message}
          placeholder="Write your message…"
          {...fieldProps('message')}
        />
        {renderError('message')}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="contact-form__note">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={sending}>
        {sending ? (
          <>
            <span className="contact-form__spinner" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <FiSend aria-hidden="true" /> Send Message
          </>
        )}
      </button>

      <div role="status" aria-live="polite" className="contact-form__status-region">
        {status === 'success' && (
          <p className="contact-form__status contact-form__status--success">
            <FiCheckCircle aria-hidden="true" /> Thank you! Your message has been sent
            successfully. I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-form__status contact-form__status--error">
            <FiAlertCircle aria-hidden="true" />
            <span>
              {errorMessage} You can also email me directly at{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

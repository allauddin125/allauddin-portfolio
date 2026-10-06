import nodemailer from 'nodemailer'
import { normalizeContact, validateContact } from '../../shared/contactValidation.js'

const MAX_BODY_BYTES = 16 * 1024
const DEFAULT_SUBJECT = 'New message from portfolio'

// Best-effort, per-instance rate limit. Serverless instances are short-lived and
// not shared, so this only slows down bursts from a single client.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const recentRequests = new Map()

const MESSAGES = {
  success: 'Message sent successfully.',
  required: 'Please fill in all required fields.',
  invalid: 'Please check the form fields and try again.',
  badRequest: 'Invalid request.',
  method: 'Method not allowed.',
  tooLarge: 'Request is too large.',
  rateLimited: 'Too many messages. Please try again later.',
  server: 'Unable to send message. Please try again later.',
}

function respond(statusCode, payload, headers = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
    body: JSON.stringify(payload),
  }
}

function isRateLimited(clientId) {
  const now = Date.now()
  const timestamps = (recentRequests.get(clientId) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  )
  timestamps.push(now)
  recentRequests.set(clientId, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])

// Header values must never contain line breaks (header injection).
const singleLine = (value) => value.replace(/[\r\n]+/g, ' ').trim()

let transporter
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null

  if (!transporter) {
    const port = Number(SMTP_PORT) || 465
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 = implicit TLS (Gmail). Other ports (e.g. 587) upgrade with STARTTLS.
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  }
  return transporter
}

function buildEmail({ name: rawName, email, subject, message }) {
  const name = singleLine(rawName)
  const shownSubject = singleLine(subject) || '(no subject)'

  const text = [
    'New message from your portfolio contact form',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${shownSubject}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const row = (label, value) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#555;font-weight:600;vertical-align:top">${label}</td>` +
    `<td style="padding:6px 0">${escapeHtml(value)}</td></tr>`

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111;line-height:1.6">
      <h2 style="margin:0 0 16px;font-size:18px">New message from your portfolio contact form</h2>
      <table style="border-collapse:collapse">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Subject', shownSubject)}
      </table>
      <p style="margin:20px 0 6px;color:#555;font-weight:600">Message</p>
      <div style="white-space:pre-wrap;padding:12px 14px;background:#f5f7fb;border-radius:8px">${escapeHtml(message)}</div>
    </div>`

  return { text, html }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return respond(405, { success: false, message: MESSAGES.method }, { Allow: 'POST' })
  }

  const contentType = event.headers?.['content-type'] || ''
  if (!contentType.includes('application/json')) {
    return respond(415, { success: false, message: MESSAGES.badRequest })
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : event.body || ''

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return respond(413, { success: false, message: MESSAGES.tooLarge })
  }

  let data
  try {
    data = JSON.parse(rawBody)
  } catch {
    return respond(400, { success: false, message: MESSAGES.badRequest })
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return respond(400, { success: false, message: MESSAGES.badRequest })
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return respond(200, { success: true, message: MESSAGES.success })
  }

  const clientId =
    event.headers?.['x-nf-client-connection-ip'] ||
    event.headers?.['x-forwarded-for']?.split(',')[0].trim() ||
    'unknown'
  if (isRateLimited(clientId)) {
    return respond(429, { success: false, message: MESSAGES.rateLimited })
  }

  const values = normalizeContact(data)
  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) {
    const missingRequired = !values.name || !values.email || !values.message
    return respond(400, {
      success: false,
      message: missingRequired ? MESSAGES.required : MESSAGES.invalid,
      errors,
    })
  }

  const mailer = getTransporter()
  const toEmail = process.env.TO_EMAIL
  if (!mailer || !toEmail) {
    // Log which configuration is missing — never the values themselves.
    console.error('send-email: SMTP_HOST, SMTP_USER, SMTP_PASS or TO_EMAIL is not configured.')
    return respond(500, { success: false, message: MESSAGES.server })
  }

  const { text, html } = buildEmail(values)

  try {
    await mailer.sendMail({
      from: { name: 'Portfolio Contact Form', address: process.env.SMTP_USER },
      to: toEmail,
      replyTo: { name: singleLine(values.name), address: values.email },
      subject: `Portfolio Contact: ${singleLine(values.subject) || DEFAULT_SUBJECT}`,
      text,
      html,
    })
  } catch (error) {
    // Only log non-sensitive diagnostics; never the full error, config or credentials.
    console.error('send-email: SMTP send failed.', {
      code: error?.code,
      responseCode: error?.responseCode,
      command: error?.command,
    })
    return respond(500, { success: false, message: MESSAGES.server })
  }

  return respond(200, { success: true, message: MESSAGES.success })
}

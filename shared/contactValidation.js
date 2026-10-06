// Contact form rules shared by the React form and the Netlify Function,
// so client-side and server-side validation can never drift apart.

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
}

export const MIN_LENGTHS = {
  name: 2,
  message: 10,
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELDS = ['name', 'email', 'subject', 'message']

// Coerces unknown input into trimmed strings for every known field.
export function normalizeContact(input = {}) {
  return FIELDS.reduce((values, field) => {
    const raw = input[field]
    values[field] = typeof raw === 'string' ? raw.trim() : ''
    return values
  }, {})
}

// Returns { field: message } for every invalid field; empty object when valid.
// Expects trimmed values (see normalizeContact).
export function validateContact({ name, email, subject, message }) {
  const errors = {}

  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < MIN_LENGTHS.name)
    errors.name = `Name must be at least ${MIN_LENGTHS.name} characters.`
  else if (name.length > LIMITS.name)
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = 'Please enter a valid email address.'

  if (subject.length > LIMITS.subject)
    errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`

  if (!message) errors.message = 'Please enter a message.'
  else if (message.length < MIN_LENGTHS.message)
    errors.message = `Message must be at least ${MIN_LENGTHS.message} characters.`
  else if (message.length > LIMITS.message)
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`

  return errors
}

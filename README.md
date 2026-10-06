# Allauddin Ali — Portfolio

Personal portfolio built with **React 18 + Vite**, deployed on **Netlify**.
The contact form sends email through a **Netlify Function + SMTP (Nodemailer)**.

## Scripts

| Command                   | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `npm run dev`             | Vite dev server (http://localhost:3000) — UI only, no function |
| `npx netlify-cli dev`     | Vite + Netlify Functions (http://localhost:8888) — form works  |
| `npm run build`           | Production build to `dist/`                                   |
| `npm run preview`         | Serve the production build locally                            |
| `npm run lint`            | Run ESLint                                                    |

## Structure

```
src/
  data/portfolio.js        # All content (profile, experience, skills, projects, education, contact)
  components/              # Navbar, Footer, ProjectCard, ProjectModal, ContactForm, shared UI
  sections/                # Hero, Stats, About, Experience, Skills, Projects, Education, Certifications, Contact
  hooks/                   # useReveal (scroll reveal), useActiveSection (nav highlight)
  styles/global.css        # Design tokens, base styles, buttons, utilities
  assets/                  # Images (profile photo, project screenshots)
shared/
  contactValidation.js     # Validation rules used by BOTH the form and the function
netlify/functions/
  send-email.js            # POST /.netlify/functions/send-email → SMTP
public/
  Allauddin-Ali.pdf        # File served by every "Download Resume" button
netlify.toml               # Build, functions and `netlify dev` settings
```

## Contact form (Netlify Function + SMTP)

The form POSTs JSON `{ name, email, subject, message }` to `/.netlify/functions/send-email`.
The function validates the input again, then sends the email with Nodemailer:
**From** your SMTP account, **To** `TO_EMAIL`, **Reply-To** the visitor.

### Environment variables (server-side only)

| Variable    | Example                  |
| ----------- | ------------------------ |
| `SMTP_HOST` | `smtp.gmail.com`         |
| `SMTP_PORT` | `465`                    |
| `SMTP_USER` | `your-email@gmail.com`   |
| `SMTP_PASS` | Gmail **App Password**   |
| `TO_EMAIL`  | `your-email@gmail.com`   |

Never prefix these with `VITE_` (that would publish them in the website bundle) and never commit `.env`.

**Gmail App Password:** Google Account → Security → turn on 2-Step Verification → search “App passwords” → create one → use the 16-character code as `SMTP_PASS`.

### Test locally

```bash
npm install
cp .env.example .env      # then fill in real values
npx netlify-cli dev       # open http://localhost:8888 and submit the form
```

### Deploy

1. Push the project to GitHub and import it in Netlify (or run `npx netlify-cli deploy --prod`).
   Build settings come from `netlify.toml` (`npm run build`, publish `dist`, functions `netlify/functions`).
2. Netlify → Site configuration → Environment variables → add the five variables above
   (scope: Functions or All).
3. Trigger a new deploy, then submit the form on the live site.

## Updating content

- Edit text, projects and links in `src/data/portfolio.js`.
- Replace `public/Allauddin-Ali.pdf` with the latest resume (keep the same file name).

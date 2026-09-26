# Dipesh Neupane — Personal Portfolio

Production-ready portfolio built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **React Three Fiber**, and **React Router**. Content is aligned with `docs/Dipesh_Neupane_CV updated.pdf`.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:3000`).

## Production build

```bash
npm run build
npm run preview
```

Output is written to `dist/` (configured for Netlify via `netlify.toml`).

## Contact form (email to your inbox)

The contact form and **Hire Me** buttons send mail through one of:

1. **Web3Forms (recommended)** — copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY` from [web3forms.com](https://web3forms.com) (register with `dipeshneupane213@gmail.com`).
2. **EmailJS** — set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
3. **Fallback** — if no keys are configured, submitting opens the visitor’s email client via `mailto:` to `VITE_CONTACT_EMAIL` (defaults to your Gmail).

On Netlify, add the same variables under **Site settings → Environment variables**.

## Content & assets

| File | Purpose |
|------|---------|
| `src/data/personalInfo.js` | Name, summary, stats, socials |
| `src/data/resumeData.js` | Experience & education |
| `src/data/projectsData.js` | Case studies (gradient previews, no stock photos) |
| `src/data/skillsData.js` | Skill groups from CV |
| `public/assets/Dipesh_Neupane_CV.pdf` | Downloadable CV |

## Stack highlights

- Three.js hero (`src/components/three/HeroScene.jsx`) — disabled when `prefers-reduced-motion: reduce`
- No Unsplash / fake testimonials / filler blog
- Dark mode via `ThemeContext`

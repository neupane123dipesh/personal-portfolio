<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:121321,100:00C7B7&height=180&section=header&text=Personal%20Portfolio&fontSize=42&fontColor=ffffff&fontAlignY=40&desc=Dipesh%20Neupane%20%C2%B7%20Full-stack%20developer&descSize=16&descAlignY=62" alt="Personal Portfolio banner" />

**A fast, animated, dark-mode-ready portfolio with a 3D hero, built to be easy to update and deployed on Netlify.**

[![Live site](https://img.shields.io/badge/Live_site-121321?style=flat-square&logo=netlify&logoColor=00C7B7)](https://dipesh-neupane-personal-portholio.netlify.app/)
![React](https://img.shields.io/badge/React-121321?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-121321?style=flat-square&logo=vite&logoColor=646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-121321?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![Three.js](https://img.shields.io/badge/Three.js-121321?style=flat-square&logo=threedotjs&logoColor=white)

</div>

---

<!-- Add a screenshot or GIF here once you have one:
<p align="center"><img src="docs/preview.png" alt="Portfolio preview" width="85%" /></p>
-->

## ✨ Highlights

- **3D hero scene** with React Three Fiber (`src/components/three/HeroScene.jsx`). It switches off automatically when a visitor has `prefers-reduced-motion: reduce` set.
- **Smooth motion** with Framer Motion, plus client-side routing with React Router.
- **Dark mode** managed through `ThemeContext`.
- **Working contact form** that delivers to a real inbox, with a fallback so messages are never lost (details below).
- **Honest content:** no stock photos, no fake testimonials, no filler blog. Project previews are generated gradients, and everything is based on my CV.
- **Data-driven:** update the site by editing plain JS files, with no component code to touch.

## 🧰 Tech stack

| Layer | Tools |
|---|---|
| Framework | React, Vite, React Router |
| Styling | Tailwind CSS |
| Animation / 3D | Framer Motion, React Three Fiber (Three.js) |
| Contact | Web3Forms or EmailJS, with a `mailto:` fallback |
| Hosting | Netlify (`netlify.toml`) |

## 🚀 Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:3000`).

### Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

The build output goes to `dist/` and is configured for Netlify through `netlify.toml`.

## 📬 Contact form

The contact form and the **Hire Me** buttons send mail using the first option that's configured:

| Priority | Method | Setup |
|---|---|---|
| 1 | **Web3Forms** (recommended) | Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY`. Get a key at [web3forms.com](https://web3forms.com) using the inbox email address. |
| 2 | **EmailJS** | Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`. |
| 3 | **`mailto:` fallback** | With no keys set, submitting opens the visitor's email client, addressed to `VITE_CONTACT_EMAIL` (defaults to my Gmail). |

**On Netlify:** add the same variables under **Site settings → Environment variables**.

> `.env` is for local use only. Keep it out of version control (it should be listed in `.gitignore`) and commit only `.env.example`.

## 🗂️ Updating the content

Everything on the site comes from a few data files and one asset:

| File | What it controls |
|---|---|
| `src/data/personalInfo.js` | Name, summary, stats, social links |
| `src/data/resumeData.js` | Experience and education |
| `src/data/projectsData.js` | Project case studies (gradient previews, no stock photos) |
| `src/data/skillsData.js` | Skill groups |
| `public/assets/Dipesh_Neupane_CV.pdf` | The downloadable CV |

## 🌐 Deployment

The site deploys to Netlify. Connect the repo, use `npm run build` as the build command and `dist` as the publish directory (already set in `netlify.toml`), then add the contact-form environment variables.

---

<div align="center">

Built by **[Dipesh Neupane](https://github.com/neupane123dipesh)** · [LinkedIn](https://linkedin.com/in/dipeshneupane1) · [Email](mailto:dipeshneupane213@gmail.com)

</div>

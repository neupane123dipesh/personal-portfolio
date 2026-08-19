# Personal Portfolio Website

A modern personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and React Router. It includes a polished single-page portfolio, animated sections, project detail route, contact form validation, and Netlify-ready configuration.

## Local development

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Open the local URL shown in the terminal, usually:
   http://localhost:3000

## Production build

npm run build

The production build is generated in the `dist` folder.

## Netlify deployment

This project includes a ready-to-use `netlify.toml` file with:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy the repository to Netlify using the default settings. The app is configured to work properly with Vite output.

## Where to edit your personal data

Update these files for your real information and copy:

- `src/data/personalInfo.js`
- `src/data/resumeData.js`
- `src/data/servicesData.js`
- `src/data/skillsData.js`
- `src/data/projectsData.js`
- `src/data/testimonialsData.js`
- `src/data/blogData.js`
- `src/data/faqData.js`

## Where to add assets

Place custom images, profile images, and resume files in:

- `public/assets/`
- `public/assets/projects/`

The code currently points to the generated CV file at:

- `public/assets/resume.pdf`

## EmailJS setup

The contact form is wired for EmailJS but currently contains placeholder values:

```js
// TODO: add your EmailJS keys
const serviceId = "service_xxxxxx";
const templateId = "template_xxxxxx";
const publicKey = "your_public_key";
```

Replace those values in `src/components/sections/Contact.jsx` with your actual EmailJS credentials before using the contact form in production.

## Project structure

- `src/components/sections/` - page sections
- `src/components/layout/` - navbar, footer, loader, and UI shell
- `src/components/ui/` - reusable base components
- `src/data/` - portfolio content and config
- `src/pages/` - route-based pages

## Notes

- This portfolio uses placeholder images and sample dummy content so the site looks complete immediately.
- Replace the placeholders with your own real details, projects, images, and contact links when ready.
- The project is intentionally styled for a premium, modern portfolio aesthetic and is ready for customization.

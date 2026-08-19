# 🧩 MASTER PROMPT — Personal Portfolio Website (React + Tailwind CSS)

> **How to use this file:** This is a complete build spec you can feed directly to an AI coding agent (or use as your own dev checklist). Everywhere you see `[.......]` is a placeholder for YOUR real personal data — fill those in before/after generation. Everything else is a firm instruction for structure, design, and code. The agent should use realistic **dummy/placeholder content** (text + Unsplash/placeholder images) for anything not explicitly filled in below, so the site is fully complete and never looks broken or empty.

---

## 1. Project Summary

Build a **complete, production-quality, single-page personal portfolio website** in **React** using **Tailwind CSS**, inspired by and combining the best parts of four reference templates. The overall **page outline/flow should follow Reference A (Clark)** most closely — a classic full portfolio structure (Hero → About → Resume → Services → Skills → Projects → Testimonials/Stats → Blog → Contact) — but the **visual language, spacing, and component polish should feel like Reference B (Eliott/folio-tailwind)**: modern, airy, Tailwind-native, with subtle Framer Motion animation instead of dated Bootstrap styling.

This must be a **real, functioning React app** (components, routing where relevant, state, forms) — not a static HTML mockup. Use dummy content only where personal data isn't provided.

### Reference inspiration (what to borrow from each)

| Reference                                                          | What to take from it                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A — "Clark" (fav1 → outline/structure)**                         | Overall section order & completeness: Hero → About (with a personal-info fact list) → Resume (education + experience timeline) → Services → Skills (progress bars) → Projects grid → Blog teaser → animated stats counter band → "Available for freelance" CTA banner → Contact → rich multi-column footer.                                                  |
| **B — "Eliott / folio-tailwind" (fav2 → visual/UX quality)**       | Modern Tailwind aesthetic: availability pill badge, punchy hero with stat chips, clean service cards, case-study style project cards with tag pills, "Stack & Tools" pill row, testimonial carousel with avatars, blog cards, polished contact form with labeled floating inputs. This is the **primary visual/interaction quality bar** for the whole site. |
| **C — "MyResume" (possibility 2 → resume detail)**                 | The **structured personal-info sidebar card** (birthday, website, phone, city, age, degree, email, freelance status) sitting next to the About text, the **two-column education/experience resume timeline** with date badges, and a **filterable portfolio grid** (All / Web / App / Branding style category filters).                                      |
| **D — "Mark" (possibility 3 → screenshot-style project showcase)** | Real **browser-frame mockups showing actual project screenshots** (not just plain images) in the projects section — i.e., wrap each project image in a simple browser-chrome frame (dots + address bar) so it reads like a live site preview. Also borrow the **FAQ accordion section** and the **"Why work with me" tools/skill icon strip**.               |

---

## 2. Tech Stack (required)

- **React 18** (Vite — `npm create vite@latest` with the `react` template — not CRA)
- **Tailwind CSS 3** (with a custom theme — see §5 Design System)
- **Framer Motion** — scroll-reveal, hover, and page-load animations
- **React Router DOM** — for `/` (main single-page site) + optional `/project/:id` case-study detail route
- **React Icons** (`react-icons/fi` Feather set primarily, plus `react-icons/fa` for socials)
- **React Scroll** (`react-scroll`) or native anchor + `scroll-behavior: smooth` for in-page nav
- **React Intersection Observer** (`react-intersection-observer`) — trigger animations on scroll
- **EmailJS** (`@emailjs/browser`) — wire the contact form to actually send mail (use placeholder service/template IDs with a clear `// TODO: add your EmailJS keys` comment); include a working client-side validation + success/error toast state either way
- **React Countup** (`react-countup`) — animated stat counters
- **clsx** — conditional class merging
- No CSS-in-JS, no Bootstrap, no jQuery. Tailwind utility classes only, plus a small `index.css` for the few things Tailwind can't do (custom cursor, keyframes not covered by config).

---

## 3. Personal Info Block (fill this in yourself)

Create a single source-of-truth config file — **`src/data/personalInfo.js`** — and pull from it everywhere (Hero, About, Resume sidebar, Footer, Contact) instead of hardcoding strings in components. Populate it with these fields (use my literal blanks as the default placeholder values in code, styled clearly so it's obvious what still needs replacing):

```js
// src/data/personalInfo.js
const personalInfo = {
  fullName: ".................",
  firstName: "..........", // used in casual headline e.g. "Hi, I'm {firstName}"
  title: "..........................", // e.g. "Full-Stack Developer & UI Designer"
  tagline: "...........................................", // one-line hero subheading
  aboutParagraph1: "..........................................................",
  aboutParagraph2: "..........................................................",
  email: "..........@...........",
  phone: "+... ... ... ....",
  location: "................, .........", // City, Country
  birthday: "...... .., ....",
  website: "www...........com",
  degree: "..........................",
  freelanceStatus: "Available", // or "Not Available"
  resumeFileUrl: "/assets/resume.pdf", // drop your CV here
  profileImage: "/assets/profile.jpg",
  heroImage: "/assets/hero-portrait.png",
  socials: {
    github: "https://github.com/..........",
    linkedin: "https://linkedin.com/in/..........",
    twitter: "https://twitter.com/..........",
    instagram: "https://instagram.com/..........",
    dribbble: "",
  },
  stats: [
    { label: "Years Experience", value: 0, suffix: "+" },
    { label: "Projects Completed", value: 0, suffix: "+" },
    { label: "Happy Clients", value: 0, suffix: "+" },
    { label: "Cups of Coffee", value: 0, suffix: "+" },
  ],
};

export default personalInfo;
```

> Instruct the coding agent: **every** place `personalInfo.js` is imported must gracefully render even with empty-string values (no `undefined` leaking into the UI) — i.e. use fallback dummy copy like `"Your Name"` / `"Your Title Here"` in the JSX default props so the site never looks broken while I'm filling this in.

---

## 4. Complete File & Folder Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── profile.jpg
│       ├── hero-portrait.png
│       ├── resume.pdf
│       └── projects/            (dummy project screenshots — use https://placehold.co or Unsplash placeholders)
├── src/
│   ├── assets/                  (icons, svg blobs, decorative shapes)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BackToTop.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   └── Loader.jsx        (intro page-load animation)
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ResumeTimeline.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── ToolsStrip.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── StatsCounter.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── CTABanner.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── SectionHeading.jsx
│   │       ├── Button.jsx
│   │       ├── Badge.jsx
│   │       ├── Card.jsx
│   │       ├── SkillBar.jsx
│   │       ├── ProjectCard.jsx        (browser-chrome-framed screenshot card)
│   │       ├── BrowserFrame.jsx       (reusable "fake browser" wrapper — Mark-style)
│   │       ├── TimelineItem.jsx
│   │       ├── TestimonialCard.jsx
│   │       ├── AccordionItem.jsx
│   │       ├── AnimatedCounter.jsx
│   │       ├── RevealOnScroll.jsx     (wrapper using framer-motion + intersection observer)
│   │       └── Toast.jsx
│   ├── data/
│   │   ├── personalInfo.js
│   │   ├── navLinks.js
│   │   ├── resumeData.js       (education[] + experience[])
│   │   ├── servicesData.js
│   │   ├── skillsData.js
│   │   ├── toolsData.js
│   │   ├── projectsData.js
│   │   ├── testimonialsData.js
│   │   ├── blogData.js
│   │   └── faqData.js
│   ├── pages/
│   │   ├── Home.jsx             (assembles all sections in order)
│   │   └── ProjectDetail.jsx    (optional case-study route: /project/:slug)
│   ├── hooks/
│   │   ├── useActiveSection.js  (scrollspy for navbar highlighting)
│   │   ├── useDarkMode.js
│   │   └── useScrollProgress.js (top progress bar)
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── package.json
└── README.md
```

---

## 5. Design System (tokens the agent must define in `tailwind.config.js`)

Don't use a generic default palette. Pick something with a point of view — here is a **suggested direction** the agent should refine, not something to copy blindly:

- **Palette (light mode):**
  - `background`: `#FAFAF8` (soft warm white, not pure `#fff`)
  - `surface`: `#FFFFFF`
  - `ink`: `#111114` (near-black text)
  - `muted`: `#6B7280`
  - `primary`: a single confident accent (pick ONE — e.g. deep indigo `#4338CA`, or emerald `#0F766E`, or burnt orange `#C2410C` — **not** the generic AI-purple gradient or Claude-clay `#D97757`)
  - `primary-dark` / `primary-light`: tonal variants for hover/active states
- **Palette (dark mode):** true near-black `#0B0B0D` background, `#F5F5F4` text, same accent brightened ~10%
- **Typography:**
  - Display/headline face: one characterful serif or grotesk (e.g. `"Fraunces"`, `"Clash Display"`, or `"Space Grotesk"`) loaded via `@fontsource` — used for H1/H2 only
  - Body face: a clean humanist sans (e.g. `"Inter"`, `"General Sans"`) for all paragraph/UI text
  - Mono face (optional, for stats/labels/tags): `"JetBrains Mono"` or `"IBM Plex Mono"`
  - Define a full type scale in the Tailwind theme (`text-display-xl`, `text-display-lg`, etc.) rather than relying on default `text-4xl` everywhere
- **Radius:** pick one consistent system — either fully sharp (0px) editorial look, or soft `rounded-2xl` cards — commit to one, don't mix
- **Shadows:** soft, low-opacity, colored shadows (`shadow-primary/10`) rather than default gray `shadow-lg`
- **Spacing rhythm:** consistent section vertical padding (`py-24 md:py-32`), consistent container (`max-w-7xl mx-auto px-6 md:px-10`)
- **Signature element:** the agent should choose ONE memorable recurring visual motif (e.g. the browser-frame project cards, or a subtle animated grain/noise texture, or a custom text-highlight underline style used on key headline words) and repeat it deliberately through the site so it feels designed, not templated.

State this plan explicitly as code comments at the top of `tailwind.config.js` before implementing.

---

## 6. Section-by-Section Build Spec

### 6.1 Navbar (`Navbar.jsx`)

- Fixed/sticky top nav, transparent over hero, solid `bg-surface/90 backdrop-blur` after scrolling past hero (use `useScrollProgress` or scroll listener)
- Left: logo/monogram built from `personalInfo.firstName` initials
- Center/right: in-page anchor links — Home, About, Resume, Services, Skills, Projects, Testimonials, Blog, Contact (use `useActiveSection` scrollspy to bold/underline the current section link)
- Right-most: Dark mode toggle (sun/moon icon, animated) + "Hire Me" button (scrolls to Contact)
- Mobile: hamburger → full-screen slide-in `MobileMenu.jsx` with staggered link animation (Framer Motion `staggerChildren`)

### 6.2 Loader (`Loader.jsx`)

- Brief (≤1.2s) full-screen intro animation on first load — e.g. name typing/reveal or progress bar wipe — then fades out. Respect `prefers-reduced-motion` (skip straight to content).

### 6.3 Hero (`Hero.jsx`)

- Two-column layout (image right, content left) on desktop; stacked on mobile
- "Available for work" pill badge (green dot + text, pulsing animation) — bound to `personalInfo.freelanceStatus`
- Eyebrow label → big `H1` = "Hi, I'm {firstName}" with the surname / title as a secondary animated line (consider a typewriter effect cycling through 2–3 role titles using a small custom hook, no heavy library needed)
- One-line tagline paragraph
- Two CTAs: primary "View My Work" (scrolls to Projects) + secondary "Download CV" (links `personalInfo.resumeFileUrl`)
- Small stat chips row (from `personalInfo.stats`, first 2–3 only) — Eliott-style
- Right side: portrait image with a soft blob/gradient shape behind it (SVG), plus 1–2 floating mini-cards (e.g. "🟢 Available for freelance" and a tech-stack chip) with subtle Framer Motion float animation
- Scroll-down indicator (animated mouse/chevron) bottom-center

### 6.4 About (`About.jsx`)

- Two-column: left = portrait/collage image; right = heading + `aboutParagraph1` + `aboutParagraph2`
- **Personal-info fact list** (Clark + MyResume style) rendered as a clean 2-column grid of label/value pairs: Birthday, Address/Location, Email, Phone, Degree, Freelance status, Website — all pulled from `personalInfo`
- "Download CV" button repeated here

### 6.5 Resume Timeline (`ResumeTimeline.jsx`)

- Two tabs or two side-by-side columns: **Education** and **Experience** (MyResume-style)
- Vertical timeline with connecting line, date-range badge, role/degree title, institution/company, 2–4 bullet description — pull from `resumeData.js` (seed with 3–4 dummy education entries + 3–4 dummy experience entries, clearly marked as placeholder e.g. `"[Company Name]"`, `"20XX – 20XX"`)
- Animate each `TimelineItem` in on scroll (fade + slide from alternating sides on desktop, straight fade-up on mobile)

### 6.6 Services (`Services.jsx`)

- 3–6 service cards in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Each card: icon (react-icons), title, 2-sentence description, subtle hover lift + border-glow using the accent color
- Seed with dummy services relevant to a dev/designer portfolio (Web Design, Frontend Development, UI/UX Design, App Development, SEO Basics, Brand Identity) — the user can rename later

### 6.7 Skills (`Skills.jsx`)

- Left: short intro paragraph
- Right: animated horizontal skill bars (label + %) that animate width from 0 → value when scrolled into view (Clark/MyResume style), pulled from `skillsData.js`
- Seed with ~6–8 dummy skills (e.g. React, JavaScript, Tailwind CSS, Node.js, UI Design, Figma) at placeholder percentages

### 6.8 Tools Strip (`ToolsStrip.jsx`)

- Horizontal row (or auto-scrolling marquee) of tool/tech logos-as-badges (react-icons brand icons or simple text pills) — "Mark"-style "Why work with me" strip, small heading like "Tools & Technologies I Use"

### 6.9 Projects (`Projects.jsx`)

- Filter bar: `All / Web / App / Branding` (or categories relevant to dev portfolio: `All / Web App / Landing Page / Mobile / Design`) — clicking filters the grid with a Framer Motion `layout` animated re-flow (MyResume-style filtering)
- Each `ProjectCard` wraps its screenshot in `BrowserFrame.jsx` — a small reusable component rendering 3 dot "traffic light" icons + a fake address-bar pill above the image, so screenshots look like live browser previews (Mark-style)
- Card shows: framed screenshot (dummy — use `https://placehold.co/800x500` or themed Unsplash query images), title, 1–2 tag pills, short description, "View Case Study →" link
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, staggered scroll-reveal
- Seed with 6 dummy projects across the categories, clearly labeled placeholder titles/descriptions
- Optional: clicking a card routes to `/project/:slug` (`ProjectDetail.jsx`) — a simple case-study page (hero image, challenge/solution/result 3-block layout, tech-stack tags, live link + repo link buttons, "next project" footer nav)

### 6.10 Stats Counter Band (`StatsCounter.jsx`)

- Full-width contrasting band (dark or accent-tinted background) with 4 large `AnimatedCounter` numbers + labels (Clark-style "0 Awards / 0 Projects / 0 Clients / 0 Cups of Coffee"), counting up from 0 when scrolled into view (`react-countup` + intersection observer)

### 6.11 Testimonials (`Testimonials.jsx`)

- Carousel/slider (build with simple state + Framer Motion `AnimatePresence`, no heavy carousel library needed) of 3–5 dummy testimonial cards: quote, avatar (placeholder), name, role/company (Eliott-style layout: big quotation mark, avatar, name, role)
- Auto-advance every ~6s, pause on hover, manual prev/next + dot indicators

### 6.12 Blog (`Blog.jsx`)

- 3-card grid of latest posts: cover image, category tag, date, title, excerpt, "Read more →" (dummy content, can link to `#` or a placeholder `/blog/:slug`)

### 6.13 FAQ (`FAQ.jsx`)

- Accordion of 5–6 dummy Q&As relevant to freelance/portfolio context ("What's your process?", "Do you offer ongoing support?", "How do we get started?") — smooth expand/collapse height animation via Framer Motion, only one open at a time

### 6.14 CTA Banner (`CTABanner.jsx`)

- Full-width "I'm available for freelance work" banner with accent background, short line + "Let's Talk" button scrolling to Contact (Clark-style)

### 6.15 Contact (`Contact.jsx`)

- Two-column: left = contact info cards (Address/Location, Phone, Email, Socials — from `personalInfo`) + embedded map placeholder (simple styled `<div>` or static map image is fine, no API key required); right = the actual form
- Form fields: Name*, Email*, Subject, Message\* — floating/labeled Tailwind inputs, client-side validation (required fields, email format), disabled submit + spinner while "sending", success/error `Toast` on submit, wired to EmailJS with placeholder keys and a `// TODO` comment
- Footer note under form reiterating availability status

### 6.16 Footer (`Footer.jsx`)

- Multi-column (Clark-style): About blurb + socials icons | Quick Links | Services list | Contact snippet
- Bottom bar: `© {currentYear} {personalInfo.fullName}. All rights reserved.` + "Back to top" arrow
- `BackToTop.jsx`: floating circular button, appears after scrolling past hero, smooth-scrolls to top

---

## 7. Interactions, Animation & Polish Checklist

- [ ] Smooth scroll enabled globally (`scroll-behavior: smooth` + anchor offsets accounting for sticky navbar height)
- [ ] Scrollspy active nav-link highlighting (`useActiveSection`)
- [ ] Scroll-reveal on every section (`RevealOnScroll` wrapper: fade-up, slight y-offset, `viewport={{ once: true }}`)
- [ ] Staggered children animations for grids (projects, services, skills)
- [ ] Hover micro-interactions: buttons scale/lift, cards elevate + border glow, links underline-draw on hover
- [ ] Animated skill bars + animated stat counters trigger only once, on first viewport entry
- [ ] Dark mode toggle with persisted preference (`localStorage`) via `ThemeContext` + `useDarkMode`
- [ ] Custom cursor (optional, desktop only, disabled on touch devices) — small dot that scales up over links/buttons
- [ ] Page-load intro animation (`Loader.jsx`), skipped for `prefers-reduced-motion: reduce`
- [ ] Scroll progress bar at very top of viewport (thin accent-colored bar filling as user scrolls)
- [ ] Back-to-top floating button
- [ ] Mobile menu slide-in with staggered links
- [ ] Testimonial carousel auto-play + manual controls
- [ ] Project filter re-flow animation (`layout` prop)
- [ ] FAQ accordion smooth height animation
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No layout shift (CLS) — reserve image space with fixed aspect ratios

---

## 8. Responsiveness & Accessibility

- Fully responsive: mobile (< 640px), tablet (640–1024px), desktop (> 1024px) — test every section at all three
- Semantic HTML (`<nav>`, `<section id="...">`, `<header>`, `<footer>`, proper heading hierarchy `h1 → h2 → h3`)
- Visible keyboard focus states on every interactive element (`focus-visible:ring-2 focus-visible:ring-primary`)
- All images have descriptive `alt` text (placeholder-appropriate, e.g. `alt="[Project Name] preview screenshot"`)
- Color contrast meets WCAG AA in both light and dark mode
- Form inputs have associated `<label>`s (visually hidden if using floating-label style) and proper `aria-invalid`/error messaging
- `aria-expanded` on accordion/mobile-menu toggles

---

## 9. Dummy Data Rules

For every data file (`resumeData.js`, `servicesData.js`, `skillsData.js`, `projectsData.js`, `testimonialsData.js`, `blogData.js`, `faqData.js`):

- Provide **complete, realistic, non-Latin-lorem-ipsum dummy content** written in plain English (not "Lorem ipsum dolor sit amet...") so the site looks finished and readable out of the box
- Use `https://placehold.co/WIDTHxHEIGHT` or themed Unsplash source URLs for all placeholder images
- Clearly mark anything that's a stand-in for the user's real content with obvious placeholder brackets in titles where appropriate, e.g. project client names like `"Acme Corp (sample project)"`, so it's unmistakable what to swap out later
- Keep all dummy data centralized in `/src/data/` — **never hardcode content directly inside components**

---

## 10. Deliverable Expectations

The agent should output:

1. A fully working Vite + React + Tailwind project with every file listed in §4
2. All sections in §6 implemented and visually polished, not stubbed
3. Every animation in §7 implemented
4. A `README.md` explaining: how to run (`npm install && npm run dev`), where to edit personal data (`src/data/personalInfo.js` + the other `/src/data` files), where to add real images (`public/assets/`), and how to plug in real EmailJS keys
5. The site should look **complete and professional immediately on first run**, using the dummy content — never blank, broken, or placeholder-gray

---

## 11. Non-Negotiable Design Constraints

- Do **not** default to a generic AI-template look: no warm-cream-background + terracotta-accent combo, no generic near-black-with-neon-accent combo, unless deliberately chosen and justified in a code comment
- Pick ONE accent color and ONE radius system and be consistent everywhere
- Typography should feel intentional — a real display/body font pairing, not default system sans everywhere
- Choose one small **signature detail** (per §5) and repeat it meaningfully across sections so the site reads as designed, not assembled from a generic component kit

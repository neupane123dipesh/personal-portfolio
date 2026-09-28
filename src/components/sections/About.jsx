import { motion } from "framer-motion";
import { FiDownload, FiCheck, FiExternalLink, FiMapPin, FiMail } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import personalInfo from "../../data/personalInfo";

const infoAccents = [
  "border-l-indigo-500 bg-indigo-50/50",
  "border-l-violet-500 bg-violet-50/50",
  "border-l-sky-500 bg-sky-50/50",
  "border-l-emerald-500 bg-emerald-50/50",
  "border-l-amber-500 bg-amber-50/50",
  "border-l-rose-500 bg-rose-50/50",
];

export default function About() {
  const infoList = [
    { label: "Location", value: personalInfo.location, icon: FiMapPin },
    { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: FiMail },
    { label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
    { label: "Education", value: personalInfo.degree },
    { label: "Portfolio", value: personalInfo.portfolioUrl.replace(/^https?:\/\//, ""), href: personalInfo.portfolioUrl },
    { label: "Availability", value: `${personalInfo.freelanceStatus} for freelance & full-time` },
  ];

  return (
    <section id="about" className="section-shell relative overflow-hidden">
      {/* Ambient light glow */}
      <div className="orb -left-20 top-1/4 h-80 w-80 bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />
      <div className="orb -right-20 bottom-1/4 h-64 w-64 bg-violet-200/15 blur-3xl dark:bg-violet-500/8" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="About"
            title="Engineering with clarity and craft."
            description="Production systems, not portfolio filler — grounded in real CV experience."
          />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Floating stack badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="absolute -bottom-4 -right-2 hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-md dark:border-slate-700 dark:bg-slate-900 md:block"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Core Stack
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-900 dark:text-white">
                {personalInfo.titleAccent}
              </p>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {personalInfo.aboutParagraph1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {personalInfo.aboutParagraph2}
            </p>

            {/* Info grid with colored left accents */}
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {infoList.map((item, i) => (
                <div
                  key={item.label}
                  className={`rounded-xl border border-slate-200/70 border-l-[3px] ${infoAccents[i % infoAccents.length]} p-3 transition-colors dark:border-slate-800 dark:border-l-indigo-400 dark:bg-slate-900/60`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
                    >
                      {item.value}
                      {item.href.startsWith("http") && <FiExternalLink className="text-[10px] opacity-60" />}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* CV download CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={personalInfo.resumeFileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-accent"
              >
                <FiDownload className="size-4" /> Download CV
              </a>
            </div>

            {/* Key CV Highlights */}
            <ul className="mt-8 space-y-2.5">
              {personalInfo.achievements.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                    <FiCheck className="size-2.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

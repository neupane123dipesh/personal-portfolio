import { FiDownload, FiCheck, FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import personalInfo from '../../data/personalInfo';

export default function About() {
  const infoList = [
    { label: 'Location', value: personalInfo.location },
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
    { label: 'Education', value: personalInfo.degree },
    { label: 'Portfolio', value: personalInfo.portfolioUrl.replace(/^https?:\/\//, ''), href: personalInfo.portfolioUrl },
    { label: 'Availability', value: `${personalInfo.freelanceStatus} for freelance & full-time` },
  ];

  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="About"
          title="Engineering with clarity and craft."
          description="Grounded in your CV — production systems, not portfolio filler."
        />

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card dark:border-slate-700 dark:bg-slate-900 md:block">
              <p className="font-mono text-xs text-slate-500">Stack</p>
              <p className="mt-1 text-sm font-semibold text-ink dark:text-slate-100">{personalInfo.titleAccent}</p>
            </div>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{personalInfo.aboutParagraph1}</p>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{personalInfo.aboutParagraph2}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {infoList.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary dark:text-slate-100"
                    >
                      {item.value}
                      {item.href.startsWith('http') && <FiExternalLink className="text-xs opacity-70" />}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-ink dark:text-slate-100">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <a
              href={personalInfo.resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark"
            >
              <FiDownload /> Download CV
            </a>

            <ul className="mt-10 space-y-3">
              {personalInfo.achievements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FiCheck className="text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { FiArrowUp, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import personalInfo from "../../data/personalInfo";

const NAV_LINKS = [
  ["#about", "About"],
  ["#resume", "Experience"],
  ["#projects", "Work"],
  ["#skills", "Skills"],
  ["#services", "Services"],
  ["#contact", "Contact"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: personalInfo.socials.github, icon: FaGithub },
    { label: "LinkedIn", href: personalInfo.socials.linkedin, icon: FaLinkedinIn },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {personalInfo.fullName}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {personalInfo.tagline}
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="btn-icon !h-8 !w-8 !rounded-lg"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Direct
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-slate-400" /> {personalInfo.location}
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white"
                >
                  <FiMail className="text-slate-400" /> {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white"
                >
                  <FiPhone className="text-slate-400" /> {personalInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Status & Back to Top */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {personalInfo.freelanceStatus} for new work
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn-secondary !py-1.5 !px-3 !text-xs !rounded-lg"
              >
                Back to top <FiArrowUp className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 dark:border-slate-800/80 dark:text-slate-500 sm:flex-row">
          <p>© {year} {personalInfo.fullName}. All rights reserved.</p>
          <p className="font-mono text-[11px]">Designed &amp; engineered with craft.</p>
        </div>
      </div>
    </footer>
  );
}

import { FiArrowUp, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import personalInfo from '../../data/personalInfo';

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: 'Github', href: personalInfo.socials.github, icon: FaGithub },
    { label: 'LinkedIn', href: personalInfo.socials.linkedin, icon: FaLinkedinIn },
  ].filter((social) => social.href);

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-3xl text-ink dark:text-slate-100">{personalInfo.fullName}</div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-300">{personalInfo.tagline}</p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-slate-100">Navigate</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#resume" className="hover:text-primary">Experience</a></li>
              <li><a href="#projects" className="hover:text-primary">Work</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-slate-100">Focus</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>React & .NET applications</li>
              <li>Retail & internal tooling</li>
              <li>CMS & marketing sites</li>
              <li>SQL Server & MySQL</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-slate-100">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1" /> <span>{personalInfo.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="mt-1" /> <span>{personalInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="mt-1" />{' '}
                <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">
                  {personalInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">
          <p>© {year} {personalInfo.fullName}. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 font-medium text-primary">
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

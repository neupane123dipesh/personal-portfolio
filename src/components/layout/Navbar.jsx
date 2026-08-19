import { useEffect, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Link } from 'react-scroll';
import navLinks from '../../data/navLinks';
import personalInfo from '../../data/personalInfo';
import useActiveSection from '../../hooks/useActiveSection';
import useScrollProgress from '../../hooks/useScrollProgress';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(navLinks.map((link) => link.href));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = (personalInfo.firstName || 'Your Name')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1 w-full bg-transparent">
        <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      <nav className={`mx-auto max-w-7xl px-4 pt-4 md:px-8 ${isScrolled ? 'translate-y-0' : ''}`}>
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300 ${
            isScrolled
              ? 'border-slate-200/80 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/80'
              : 'border-white/10 bg-transparent'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-primary">
              {initials}
            </div>
            <div>
              <div className="font-display text-xl text-ink dark:text-slate-100">{personalInfo.firstName || 'Your Name'}</div>
            </div>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                smooth={true}
                offset={-90}
                duration={500}
                spy={true}
                activeClass="text-primary"
                className={`cursor-pointer text-sm font-medium transition ${
                  activeSection === link.href ? 'text-primary' : 'text-slate-600 hover:text-primary dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition hover:border-primary/30 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            <Link
              to="contact"
              smooth={true}
              offset={-90}
              duration={500}
              className="hidden cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark md:inline-flex"
            >
              Hire Me
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition hover:text-primary lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />
    </header>
  );
}

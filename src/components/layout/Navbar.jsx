import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import navLinks from "../../data/navLinks";
import personalInfo from "../../data/personalInfo";
import useActiveSection from "../../hooks/useActiveSection";
import useScrollProgress from "../../hooks/useScrollProgress";
import { useTheme } from "../../context/ThemeContext";
import MobileMenu from "./MobileMenu";
import { markHireIntent } from "../../utils/hireIntent";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(navLinks.map((l) => l.href));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = (personalInfo.firstName || "DN")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Precision scroll progress indicator */}
      <div className="h-[2px] w-full bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Perfectly centered container matching all page sections */}
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`nav-pill flex items-center justify-between rounded-2xl px-3.5 py-2 transition-all duration-300 ${
            isScrolled
              ? "border border-slate-200/90 bg-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "border border-slate-200/60 bg-white/70 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60"
          }`}
        >
          {/* Brand identifier */}
          <Link
            to="home"
            smooth
            offset={-80}
            duration={500}
            className="group flex cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105 dark:bg-white dark:text-slate-900">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                {personalInfo.firstName || "Dipesh"}
              </span>
              <span className="-mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Portfolio
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  smooth
                  offset={-80}
                  duration={500}
                  spy
                  className={`relative cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold tracking-tight transition-all duration-150 ${
                    active
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-icon !h-8 !w-8 !rounded-lg text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FiSun className="size-3.5 text-amber-400" />
              ) : (
                <FiMoon className="size-3.5" />
              )}
            </button>

            <Link
              to="contact"
              smooth
              offset={-80}
              duration={500}
              onClick={markHireIntent}
              className="btn-primary hidden !py-1.5 !px-3.5 !text-xs !rounded-lg sm:inline-flex"
            >
              Hire Me
            </Link>

            <button
              type="button"
              className="btn-icon !h-8 !w-8 !rounded-lg md:hidden"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX className="size-4" /> : <FiMenu className="size-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}

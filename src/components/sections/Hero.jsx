import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { Link } from "react-scroll";
import Badge from "../ui/Badge";
import TetrisGame from "../ui/TetrisGame";
import personalInfo from "../../data/personalInfo";
import { markHireIntent } from "../../utils/hireIntent";

const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    // Defer game loading until site entrance finishes
    const timer = setTimeout(() => {
      setSiteLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const { featuredProject } = personalInfo;

  return (
    <section
      id="home"
      className="relative isolate grid min-h-screen overflow-hidden bg-[#f7f3ee] pt-20 dark:bg-[#09090b] lg:grid-cols-2"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.12),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_36%),radial-gradient(circle_at_50%_70%,rgba(168,85,247,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-8 md:px-10 lg:py-0"
      >
        <div className="max-w-lg space-y-8">
          <div>
            <Badge
              dot
              className="mb-8 border-indigo-500/20 bg-indigo-500/5 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200"
            >
              {personalInfo.freelanceStatus} · {personalInfo.location}
            </Badge>

            <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.06em] text-slate-900 dark:text-slate-50">
              <span className="block text-slate-600 dark:text-slate-300">
                Hi, I&apos;m {personalInfo.firstName}.
              </span>
              <span className="mt-3 block bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
                {personalInfo.title}
              </span>
            </h1>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              {personalInfo.titleAccent}
            </p>
          </div>

          <p className="max-w-md text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            {personalInfo.tagline}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="projects"
              smooth
              offset={-88}
              duration={500}
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl active:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              View work <FiArrowRight className="size-4" />
            </Link>
            <Link
              to="contact"
              smooth
              offset={-88}
              duration={500}
              onClick={markHireIntent}
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-indigo-600 dark:hover:bg-slate-800"
            >
              Hire me
            </Link>
            <a
              href={personalInfo.resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
            >
              <FiDownload className="size-4" /> CV
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-end gap-8 border-t border-slate-200/80 pt-8 dark:border-slate-800">
            {personalInfo.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: index * 0.12,
                }}
              >
                <p className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50 md:text-3xl">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-3 pt-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/85 text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              aria-label="GitHub profile"
            >
              <FiGithub className="size-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/85 text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin className="size-5" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right side - Spacious Interactive Game Area */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:py-6"
      >
        <div className="relative flex w-full max-w-lg flex-col items-center space-y-4">
          {/* Deferred Game Loading Container */}
          {!siteLoaded ? (
            <div className="flex min-h-[500px] w-full flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/60 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
                <span className="animate-spin text-2xl">⚙️</span>
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500" />
                </span>
              </div>
              <p className="mt-5 font-mono text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-200">
                INITIALIZING ARCADE MATRIX
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Calibrating audio synthesizer and tetromino grid...
              </p>
              <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              {!reducedMotion ? (
                <TetrisGame />
              ) : (
                <div className="flex min-h-[400px] w-full items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
                  <div className="text-center">
                    <div className="text-5xl">🎮</div>
                    <p className="mt-3 text-sm text-slate-500">
                      Reduced motion mode active
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Featured build pill - elegantly integrated without crowding */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <Link
              to="projects"
              smooth
              offset={-88}
              duration={500}
              className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-sm backdrop-blur-md transition hover:border-indigo-400 hover:bg-white/95 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-indigo-500 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  loading="eager"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Featured Build
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-mono text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {featuredProject.org}
                    </span>
                  </div>
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {featuredProject.name} —{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      {featuredProject.summary}
                    </span>
                  </p>
                </div>
              </div>
              <FiArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:flex">
        <Link
          to="about"
          smooth
          offset={-88}
          duration={500}
          className="flex cursor-pointer flex-col items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          Scroll to explore
          <FiArrowDown className="size-4 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

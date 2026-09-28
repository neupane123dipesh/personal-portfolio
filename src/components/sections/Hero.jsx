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

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    // Defer game loading until initial page renders cleanly
    const timer = setTimeout(() => {
      setSiteLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { featuredProject } = personalInfo;

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#F7F4F0] pt-20 dark:bg-[#09090b]"
    >
      {/* Subtle ambient light patterns */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(ellipse_at_80%_15%,rgba(14,165,233,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:40px_40px] dark:opacity-[0.05] dark:[background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]" />

      {/* Perfectly centered, comfortable container matching navbar */}
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-0">
        
        {/* Left Column — Editorial Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col justify-center"
        >
          <div className="space-y-6">
            {/* Status chip */}
            <div>
              <Badge dot className="mb-4">
                {personalInfo.freelanceStatus} · {personalInfo.location}
              </Badge>

              <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-slate-900 dark:text-white">
                <span className="block text-slate-600 dark:text-slate-400 font-bold">
                  Hi, I&apos;m {personalInfo.firstName}.
                </span>
                <span className="mt-1 block text-gradient">
                  {personalInfo.title}
                </span>
              </h1>

              <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                {personalInfo.titleAccent}
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {personalInfo.tagline}
            </p>

            {/* Consistent, hand-crafted buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="projects"
                smooth
                offset={-80}
                duration={500}
                className="btn-primary"
              >
                View work <FiArrowRight className="size-4" />
              </Link>
              
              <Link
                to="contact"
                smooth
                offset={-80}
                duration={500}
                onClick={markHireIntent}
                className="btn-secondary"
              >
                Hire me
              </Link>

              <a
                href={personalInfo.resumeFileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <FiDownload className="size-4" /> CV
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-end gap-6 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                    <span className="text-indigo-600 dark:text-indigo-400">{stat.suffix}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}

              {/* Social icons next to stats */}
              <div className="ml-auto flex items-center gap-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-icon !h-9 !w-9 !rounded-lg"
                  aria-label="GitHub profile"
                >
                  <FiGithub className="size-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-icon !h-9 !w-9 !rounded-lg"
                  aria-label="LinkedIn profile"
                >
                  <FiLinkedin className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column — Compact, Precision Arcade Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex flex-col items-center justify-center py-4 lg:py-0"
        >
          <div className="relative flex w-full max-w-[460px] flex-col items-center space-y-3">
            {/* Deferred Game Loading Container */}
            {!siteLoaded ? (
              <div className="flex min-h-[460px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                  <span className="animate-spin text-xl">⚙️</span>
                </div>
                <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  ARCADE MATRIX READYING
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Loading interactive controls...
                </p>
                <div className="mt-5 h-1 w-36 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                    className="h-full w-1/2 rounded-full bg-indigo-600"
                  />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                {!reducedMotion ? (
                  <TetrisGame />
                ) : (
                  <div className="flex min-h-[380px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <div className="text-center">
                      <div className="text-4xl">🎮</div>
                      <p className="mt-2 text-xs text-slate-500">
                        Reduced motion mode active
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Featured build pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <Link
                to="projects"
                smooth
                offset={-80}
                duration={500}
                className="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm transition-all hover:border-indigo-300 hover:bg-white hover:shadow dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.fullName}
                    width={38}
                    height={38}
                    className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    loading="eager"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Featured Build
                      </span>
                      <span className="rounded bg-slate-100 px-1 py-0.2 font-mono text-[9px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {featuredProject.org}
                      </span>
                    </div>
                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {featuredProject.name} —{" "}
                      <span className="font-normal text-slate-500 dark:text-slate-400">
                        {featuredProject.summary}
                      </span>
                    </p>
                  </div>
                </div>
                <FiArrowRight className="size-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Subtle Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:flex">
        <Link
          to="about"
          smooth
          offset={-80}
          duration={500}
          className="flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-slate-400 transition hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400"
        >
          Scroll to explore
          <FiArrowDown className="size-3 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

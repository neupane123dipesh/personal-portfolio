import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-scroll';
import Badge from '../ui/Badge';
import HeroNetworkGraph from '../ui/HeroNetworkGraph';
import personalInfo from '../../data/personalInfo';
import { markHireIntent } from '../../utils/hireIntent';

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

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { featuredProject } = personalInfo;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-slate-200/80 bg-surface pt-24 dark:border-slate-800 dark:bg-[#09090b]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 42%, rgba(95, 92, 241, 0.09), transparent 48%), radial-gradient(circle at 82% 18%, rgba(14, 165, 233, 0.08), transparent 42%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-12 md:px-10 lg:grid-cols-2 lg:gap-6 lg:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideLeft}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          <Badge dot className="mb-8 border-primary/20 bg-primary/5">
            {personalInfo.freelanceStatus} · {personalInfo.location}
          </Badge>

          <h1 className="font-display text-[clamp(2.35rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink dark:text-slate-50">
            <span className="block text-slate-600 dark:text-slate-300">Hi, I&apos;m {personalInfo.firstName}.</span>
            <span className="mt-2 block bg-gradient-to-r from-primary via-violet-600 to-sky-500 bg-clip-text text-transparent">
              {personalInfo.title}
            </span>
          </h1>

          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {personalInfo.titleAccent}
          </p>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            {personalInfo.tagline}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="projects"
              smooth
              offset={-88}
              duration={500}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              View work <FiArrowRight />
            </Link>
            <Link
              to="contact"
              smooth
              offset={-88}
              duration={500}
              onClick={markHireIntent}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Hire me
            </Link>
            <a
              href={personalInfo.resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:text-primary dark:text-slate-300"
            >
              <FiDownload /> CV
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-end gap-10 border-t border-slate-200 pt-10 dark:border-slate-800">
            {personalInfo.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.12 }}
              >
                <p className="font-display text-3xl font-bold tracking-tight text-ink dark:text-slate-50">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="GitHub profile"
            >
              <FiGithub />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideRight}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="relative mx-auto h-[min(520px,62vh)] w-full max-w-xl lg:max-w-none lg:justify-self-end"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
            {!reducedMotion && <HeroNetworkGraph className="opacity-90" />}
            {reducedMotion && (
              <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(95,92,241,0.12),transparent_65%)]" />
            )}
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-4 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-[0_24px_50px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName}
              width={88}
              height={88}
              className="h-[88px] w-[88px] shrink-0 rounded-2xl object-cover ring-2 ring-primary/20"
              loading="eager"
              fetchPriority="high"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Featured build</p>
              <p className="mt-1 truncate font-display text-lg font-semibold text-ink dark:text-slate-50">
                {featuredProject.name}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                {featuredProject.summary}
              </p>
              <p className="mt-2 font-mono text-[10px] text-slate-500">
                {featuredProject.org} · {featuredProject.stack}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:flex">
        <Link
          to="about"
          smooth
          offset={-88}
          duration={500}
          className="flex cursor-pointer flex-col items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-primary dark:text-slate-400"
        >
          Scroll
          <FiArrowDown className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiDownload, FiMonitor, FiStar } from 'react-icons/fi';
import { Link } from 'react-scroll';
import Badge from '../ui/Badge';
import personalInfo from '../../data/personalInfo';

export default function Hero() {
  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 2200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="home" className="hero-shell relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-90" />
      <div className="absolute left-10 top-28 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-10 top-12 -z-10 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Badge dot className="mb-6">{personalInfo.freelanceStatus || 'Available for work'}</Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
          >
            {personalInfo.title || 'Your Title Here'}
          </motion.p>

          <h1 className="hero-title font-display text-5xl leading-[0.8] text-ink dark:text-slate-100 md:text-7xl">
            <motion.span initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="block">
              Hi, I&apos;m <span className="text-gradient">{personalInfo.firstName || 'Your Name'}</span>
            </motion.span>

            <div className="mt-2 block h-[1.1em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="block text-primary"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300"
          >
            {personalInfo.tagline || 'I create meaningful digital experiences...'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="projects"
              smooth={true}
              offset={-80}
              duration={500}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              View My Work <FiArrowRight />
            </Link>
            <a
              href={personalInfo.resumeFileUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
            >
              <FiDownload /> Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {personalInfo.stats.slice(0, 3).map((stat) => (
              <div
                key={stat.label}
                className="glass-chip rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              >
                <span className="font-semibold text-ink dark:text-slate-100">{stat.value}{stat.suffix}</span> {stat.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 0.7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/70 bg-white/65 p-4 shadow-[0_35px_80px_rgba(17,19,33,0.13)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="absolute left-6 top-6 z-10 rounded-full bg-emerald-500/95 px-3 py-2 text-xs font-semibold text-white shadow-lg">
              Available for freelance
            </div>
            <img
              src={personalInfo.heroImage || personalInfo.profileImage}
              alt={personalInfo.fullName || 'Profile'}
              className="hero-image h-[540px] w-full rounded-[1.5rem] object-cover"
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 left-5 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[0_20px_35px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><FiMonitor /></div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Focus</p>
                <p className="font-semibold text-ink dark:text-slate-100">Responsive design</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-4 top-8 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-[0_20px_35px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <FiStar className="text-amber-500" /> 5/5 client experience
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <Link
          to="about"
          smooth={true}
          offset={-90}
          duration={500}
          className="flex cursor-pointer flex-col items-center gap-2 text-sm text-slate-500 transition hover:text-primary dark:text-slate-300"
        >
          <span>Scroll</span>
          <FiArrowDown className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

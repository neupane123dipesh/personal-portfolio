import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowRight, FiDownload, FiMonitor, FiStar } from 'react-icons/fi';
import { Link } from 'react-scroll';
import Badge from '../ui/Badge';
import personalInfo from '../../data/personalInfo';

export default function Hero() {
  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % roles.length), 2200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-90" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div>
          <Badge dot className="mb-6">{personalInfo.freelanceStatus || 'Available for work'}</Badge>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{personalInfo.title || 'Your Title Here'}</p>
          <h1 className="font-display text-5xl leading-[0.95] text-ink dark:text-slate-100 md:text-7xl">
            Hi, I&apos;m {personalInfo.firstName || 'Your Name'}
            <span className="mt-2 block text-primary">{roles[index]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{personalInfo.tagline || 'I create meaningful digital experiences...'}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="projects" smooth={true} offset={-80} duration={500} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark">
              View My Work <FiArrowRight />
            </Link>
            <a href={personalInfo.resumeFileUrl || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <FiDownload /> Download CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {personalInfo.stats.slice(0, 3).map((stat, index) => (
              <div key={stat.label} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                <span className="font-semibold text-ink dark:text-slate-100">{stat.value}{stat.suffix}</span> {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-10 top-12 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-indigo-200/60 blur-3xl dark:bg-indigo-500/20" />

          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-[0_30px_60px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900">
            <div className="absolute left-6 top-6 rounded-full bg-emerald-500/90 px-3 py-2 text-xs font-semibold text-white shadow-lg">Available for freelance</div>
            <img src={personalInfo.heroImage || personalInfo.profileImage} alt={personalInfo.fullName || 'Profile'} className="h-[540px] w-full rounded-[1.5rem] object-cover" />
          </div>

          <div className="absolute -bottom-4 left-5 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_20px_35px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><FiMonitor /></div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Focus</p>
                <p className="font-semibold text-ink dark:text-slate-100">Responsive design</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 top-8 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-[0_20px_35px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <FiStar className="text-amber-500" /> 5/5 client experience
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <Link to="about" smooth={true} offset={-90} duration={500} className="flex cursor-pointer flex-col items-center gap-2 text-sm text-slate-500 transition hover:text-primary dark:text-slate-300">
          <span>Scroll</span>
          <FiArrowDown className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

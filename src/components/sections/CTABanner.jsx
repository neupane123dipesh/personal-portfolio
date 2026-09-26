import { Link } from 'react-scroll';
import { markHireIntent } from '../../utils/hireIntent';

export default function CTABanner() {
  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-[2rem] bg-ink px-8 py-10 text-white shadow-[0_30px_60px_rgba(18,19,33,0.25)] md:px-12 md:py-14 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">Open to opportunities</p>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">Need a developer who ships?</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Full-stack web apps, React dashboards, .NET APIs, and CMS builds — based in Kathmandu, working with teams remotely.
              </p>
            </div>
            <Link
              to="contact"
              smooth
              offset={-90}
              duration={500}
              onClick={markHireIntent}
              className="cursor-pointer shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark"
            >
              Hire me — send email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

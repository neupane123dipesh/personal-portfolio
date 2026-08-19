import { Link } from 'react-scroll';

export default function CTABanner() {
  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-primary md:px-12 md:py-14">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">Available for freelance</p>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">Need a polished digital experience?</h3>
            </div>
            <Link to="contact" smooth={true} offset={-90} duration={500} className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-slate-100">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

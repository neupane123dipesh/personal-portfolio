export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
      <h2 className="font-display text-4xl leading-none text-ink dark:text-slate-100 md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>}
    </div>
  );
}

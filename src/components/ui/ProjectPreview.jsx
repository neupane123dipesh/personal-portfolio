import clsx from 'clsx';

export default function ProjectPreview({ project, className = '' }) {
  const initials = project.title
    .split(/[\s—–-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={clsx(
        'relative flex h-full min-h-[14rem] w-full flex-col justify-between overflow-hidden p-6',
        project.preview?.gradientClass,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_45%)]" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/25 bg-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
          {project.category}
        </span>
        {project.period && (
          <span className="text-xs font-medium text-white/75">{project.period}</span>
        )}
      </div>
      <div className="relative mt-auto">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/15 font-display text-lg font-bold text-white backdrop-blur-sm">
          {initials}
        </div>
        <p className="max-w-[90%] font-display text-xl leading-tight text-white md:text-2xl">{project.title}</p>
        <p className="mt-2 text-sm text-white/80">{project.tags.join(' · ')}</p>
      </div>
    </div>
  );
}

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
        'relative flex h-full min-h-[14rem] w-full flex-col justify-between overflow-hidden p-6 transition-all duration-300 group-hover:scale-[1.02]',
        project.preview?.gradientClass,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      {/* Top Preview Bar */}
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/25 bg-black/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
          {project.category}
        </span>
        {project.period && (
          <span className="rounded-full bg-black/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
            {project.period}
          </span>
        )}
      </div>

      {/* Center/Bottom Visual Preview Area */}
      <div className="relative mt-auto">
        <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 font-display text-base font-bold text-white shadow-sm backdrop-blur-md">
          {initials}
        </div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
          {project.org || 'Production Build'}
        </p>
        <p className="mt-1 line-clamp-1 text-sm font-medium text-white/95">
          {project.summary || 'Production system architecture & deployment'}
        </p>
      </div>
    </div>
  );
}

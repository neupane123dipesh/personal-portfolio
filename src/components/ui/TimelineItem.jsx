export default function TimelineItem({ item }) {
  return (
    <div>
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        <span>{item.period}</span>
      </div>
      <h3 className="font-display text-2xl font-bold text-ink dark:text-slate-100">{item.title}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {item.company || item.institution}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {item.description.map((bullet) => (
          <li key={`${item.title}-${bullet}`} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

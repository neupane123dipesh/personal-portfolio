export default function TimelineItem({ item }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-700">
      <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-indigo-100 bg-indigo-50/80 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
        <span>{item.period}</span>
      </div>
      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
        {item.title}
      </h3>
      <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
        {item.company || item.institution}
      </p>
      <ul className="mt-3.5 space-y-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {item.description.map((bullet) => (
          <li key={`${item.title}-${bullet}`} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

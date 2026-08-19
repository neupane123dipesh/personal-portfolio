export default function TimelineItem({ item, index }) {
  return (
    <div className="relative pl-8 md:pl-10">
      <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-4 border-white bg-primary shadow-md dark:border-slate-900" />
      <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        {item.period}
      </div>
      <h3 className="font-display text-2xl text-ink dark:text-slate-100">{item.title}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">{item.company || item.institution}</p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {item.description.map((bullet) => (
          <li key={`${item.title}-${bullet}`} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

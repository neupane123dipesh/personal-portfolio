import toolsData from '../../data/toolsData';

export default function ToolsStrip() {
  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Tools & technologies I use</p>
          <div className="flex flex-wrap justify-center gap-3">
            {toolsData.map((tool) => (
              <span key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

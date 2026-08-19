export default function BrowserFrame({ children, title = 'preview' }) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-slate-200 bg-slate-100 shadow-[0_18px_35px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div className="ml-3 flex-1 overflow-hidden rounded-full bg-white/80 px-3 py-1 text-left text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {title}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

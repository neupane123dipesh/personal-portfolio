export default function Badge({ children, className = '', dot = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}

export default function Badge({ children, className = '', dot = false }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary ${className}`}>
      {dot && <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.15)] animate-pulse" />}
      {children}
    </span>
  );
}

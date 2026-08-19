import clsx from 'clsx';

export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={clsx(
        'rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_15px_35px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80',
        hover && 'transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary',
        className
      )}
    >
      {children}
    </div>
  );
}

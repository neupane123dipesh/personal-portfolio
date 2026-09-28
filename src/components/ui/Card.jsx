import clsx from 'clsx';

export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90',
        hover && 'transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:hover:border-slate-700',
        className
      )}
    >
      {children}
    </div>
  );
}

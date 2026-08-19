import clsx from 'clsx';

export default function Button({ children, as = 'button', href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';
  const variants = {
    primary: 'bg-primary text-white shadow-primary hover:bg-primary-dark',
    secondary: 'border border-slate-200 bg-white text-ink hover:border-primary/50 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
    ghost: 'text-ink hover:text-primary dark:text-slate-100',
  };

  if (as === 'a' || href) {
    return (
      <a href={href} className={clsx(base, variants[variant], className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

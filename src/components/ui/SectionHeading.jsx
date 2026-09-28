export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";
  return (
    <div className={`mb-10 max-w-xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-5 bg-indigo-600 dark:bg-indigo-400" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

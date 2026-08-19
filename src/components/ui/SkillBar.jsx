export default function SkillBar({ label, value }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-400 transition-[width] duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

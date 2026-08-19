import { motion } from 'framer-motion';

export default function TestimonialCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_40px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6 text-5xl font-display text-primary/25">“</div>
      <p className="flex-1 text-base leading-8 text-slate-700 dark:text-slate-200">{item.quote}</p>
      <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        <img src={item.avatar} alt={item.name} className="h-14 w-14 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-ink dark:text-slate-100">{item.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.role} · {item.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

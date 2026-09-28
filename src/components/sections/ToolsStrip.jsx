import { motion } from "framer-motion";
import toolsData from "../../data/toolsData";

export default function ToolsStrip() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <p className="mb-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Daily Developer Tooling &amp; Ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {toolsData.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.015 }}
                className="cursor-default rounded-md border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

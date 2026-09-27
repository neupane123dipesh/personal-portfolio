import { motion } from "framer-motion";
import toolsData from "../../data/toolsData";

export default function ToolsStrip() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Daily Developer Tooling & Ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {toolsData.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import skillsData from "../../data/skillsData";

const PALETTES = [
  { dot: "bg-indigo-500",  tag: "bg-indigo-50 text-indigo-700 border-indigo-100",   border: "hover:border-indigo-300" },
  { dot: "bg-violet-500",  tag: "bg-violet-50 text-violet-700 border-violet-100",   border: "hover:border-violet-300" },
  { dot: "bg-sky-500",     tag: "bg-sky-50 text-sky-700 border-sky-100",           border: "hover:border-sky-300" },
  { dot: "bg-emerald-500", tag: "bg-emerald-50 text-emerald-700 border-emerald-100", border: "hover:border-emerald-300" },
  { dot: "bg-amber-500",   tag: "bg-amber-50 text-amber-700 border-amber-100",     border: "hover:border-amber-300" },
  { dot: "bg-rose-500",    tag: "bg-rose-50 text-rose-700 border-rose-100",         border: "hover:border-rose-300" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Stack from my CV — no filler percentages."
            description="Languages, frameworks, databases, and daily tooling on production projects."
          />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((group, i) => {
            const pal = PALETTES[i % PALETTES.length];
            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${pal.border} dark:border-slate-800 dark:bg-slate-900/90`}
              >
                <div className="mb-3.5 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${pal.dot}`} />
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors ${pal.tag} dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

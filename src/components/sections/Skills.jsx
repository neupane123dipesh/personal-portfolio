import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import skillsData from "../../data/skillsData";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Stack from my CV — no filler percentages."
            description="Languages, frontend, backend, databases, and the tooling I use daily on production projects."
          />
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-primary dark:text-slate-100">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

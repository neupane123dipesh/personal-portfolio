import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import servicesData from "../../data/servicesData";

export default function Services() {
  return (
    <section id="services" className="section-tint-b py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Services"
            title="Digital services, built to ship."
            description="I help founders, teams, and personal brands turn strategy into thoughtful interfaces, stronger systems, and clearer user experiences."
          />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-700"
            >
              {/* Clean icon container */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg text-white shadow-sm transition-transform duration-200 group-hover:scale-105 dark:bg-white dark:text-slate-900">
                <Icon />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

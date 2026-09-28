import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import projectsData from "../../data/projectsData";

const filters = ["All", "Enterprise", "Marketplace", "Internal Tool", "CMS", "Marketing"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="section-tint-a py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Work"
            title="Production projects from my CV."
            description="Retail ERP, venue marketplace, NTC duty tooling, Prismic CMS apps — real deliverables, no stock imagery."
          />
        </motion.div>

        {/* Clean, tactile filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap gap-1.5"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                activeFilter === filter
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Responsive grid inside comfortable max-w-6xl container */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

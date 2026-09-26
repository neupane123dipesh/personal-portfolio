import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import projectsData from '../../data/projectsData';

const filters = ['All', 'Enterprise', 'Marketplace', 'Internal Tool', 'CMS', 'Marketing'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Work"
          title="Production projects from my CV."
          description="Retail ERP, venue marketplace, NTC duty tooling, Prismic CMS apps, and client marketing sites — no stock imagery, just real deliverables."
        />

        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-primary text-white shadow-primary' : 'border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

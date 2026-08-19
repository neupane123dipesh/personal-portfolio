import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BrowserFrame from './BrowserFrame';

export default function ProjectCard({ project }) {
  return (
    <motion.article layout className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary dark:border-slate-800 dark:bg-slate-900">
      <BrowserFrame title={project.title}>
        <img src={project.image} alt={`${project.title} preview`} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      </BrowserFrame>

      <div className="px-2 pb-2 pt-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary dark:bg-primary/10">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl text-ink dark:text-slate-100">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

        <Link to={`/project/${project.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3">
          View Case Study <FiArrowRight />
        </Link>
      </div>
    </motion.article>
  );
}

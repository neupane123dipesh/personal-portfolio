import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import BrowserFrame from "./BrowserFrame";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-700"
    >
      <BrowserFrame
        title={
          project.liveUrl
            ? project.liveUrl.replace(/^https?:\/\//, "")
            : project.title
        }
      >
        <ProjectPreview project={project} className="h-52" />
      </BrowserFrame>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
        {/* Category & Stack tags */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          <span className="rounded-md border border-indigo-100 bg-indigo-50/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            {project.category}
          </span>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
          {project.title}
        </h3>
        
        <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Clean action buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 dark:border-slate-800/80">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 transition hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
            >
              Visit live site <FiExternalLink className="text-[10px]" />
            </a>
          )}
          {project.hasCaseStudy && (
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Case study <FiArrowRight className="text-[10px]" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import BrowserFrame from "./BrowserFrame";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card dark:border-slate-800 dark:bg-slate-900"
    >
      <BrowserFrame
        title={
          project.liveUrl
            ? project.liveUrl.replace(/^https?:\/\//, "")
            : project.title
        }
      >
        <ProjectPreview project={project} className="h-56" />
      </BrowserFrame>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl text-ink dark:text-slate-100">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-2.5"
            >
              Visit live site <FiExternalLink className="text-xs" />
            </a>
          )}
          {project.hasCaseStudy && (
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:gap-2.5 hover:text-primary dark:text-slate-300"
            >
              Case study <FiArrowRight />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

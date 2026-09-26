import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import projectsData from '../data/projectsData';
import ProjectPreview from '../components/ui/ProjectPreview';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-32 text-center md:px-10">
        <h1 className="font-display text-4xl text-ink dark:text-slate-100">Project not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary">
          <FiArrowLeft /> Back home
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <a href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        <FiArrowLeft /> Back to work
      </a>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
        <ProjectPreview project={project} className="min-h-[20rem]" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{project.category}</p>
          <h1 className="mt-3 font-display text-4xl text-ink dark:text-slate-100 md:text-5xl">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary"
            >
              Open live site <FiExternalLink />
            </a>
          )}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950/70">
          <h2 className="font-display text-2xl text-ink dark:text-slate-100">Overview</h2>
          <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <div>
              <p className="font-semibold text-ink dark:text-slate-100">Challenge</p>
              <p className="mt-1">{project.challenge}</p>
            </div>
            <div>
              <p className="font-semibold text-ink dark:text-slate-100">Approach</p>
              <p className="mt-1">{project.solution}</p>
            </div>
            <div>
              <p className="font-semibold text-ink dark:text-slate-100">Outcome</p>
              <p className="mt-1">{project.result}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

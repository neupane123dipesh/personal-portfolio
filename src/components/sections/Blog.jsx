import SectionHeading from '../ui/SectionHeading';
import blogData from '../../data/blogData';

export default function Blog() {
  return (
    <section id="blog" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Blog" title="Notes on design, product, and frontend craft." description="A few thoughts on building interfaces that feel thoughtful, useful, and reliable in a fast-moving product environment." />

        <div className="grid gap-6 md:grid-cols-3">
          {blogData.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary dark:border-slate-800 dark:bg-slate-900">
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  <span>{post.category}</span>
                  <span className="text-slate-500 dark:text-slate-400">{post.date}</span>
                </div>
                <h3 className="font-display text-2xl text-ink dark:text-slate-100">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <a href="#" className="mt-5 inline-flex text-sm font-semibold text-primary">Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

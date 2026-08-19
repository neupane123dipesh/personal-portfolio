import { FiDownload, FiMail, FiMapPin, FiPhone, FiServer, FiStar } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import personalInfo from '../../data/personalInfo';

export default function About() {
  const infoList = [
    { label: 'Birthday', value: personalInfo.birthday || 'January 1, 2000' },
    { label: 'Location', value: personalInfo.location || 'Your City, Country' },
    { label: 'Email', value: personalInfo.email || 'you@example.com' },
    { label: 'Phone', value: personalInfo.phone || '+000 000 0000' },
    { label: 'Degree', value: personalInfo.degree || 'Your Degree' },
    { label: 'Freelance', value: personalInfo.freelanceStatus || 'Available' },
    { label: 'Website', value: personalInfo.website || 'yourwebsite.com' },
  ];

  return (
    <section id="about" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="About" title="I build experiences that feel clear, useful, and memorable." description="I combine thoughtful UI design with solid frontend engineering to create digital experiences that work well and feel premium." />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_40px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <img src={personalInfo.profileImage} alt={personalInfo.fullName} className="h-[520px] w-full rounded-[1.5rem] object-cover" />
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><FiStar /></div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">My story</span>
            </div>

            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{personalInfo.aboutParagraph1 || 'I am a frontend-focused developer...'}</p>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{personalInfo.aboutParagraph2 || 'I enjoy building...'}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {infoList.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-ink dark:text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>

            <a href={personalInfo.resumeFileUrl || '#'} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark">
              <FiDownload /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

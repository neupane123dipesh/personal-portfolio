import { useInView } from 'react-intersection-observer';
import SectionHeading from '../ui/SectionHeading';
import SkillBar from '../ui/SkillBar';
import skillsData from '../../data/skillsData';

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Skills" title="A practical stack for modern product work." description="I’m comfortable shipping polished interfaces, handling frontend logic, and collaborating with teams that value clear communication and reliable execution." />
          </div>

          <div ref={ref} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            {skillsData.map((skill) => (
              <div key={skill.name} style={{ width: inView ? '100%' : '0%' }} className="transition-all duration-700">
                <SkillBar label={skill.name} value={skill.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

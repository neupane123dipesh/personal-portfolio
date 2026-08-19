import { useInView } from 'react-intersection-observer';
import AnimatedCounter from '../ui/AnimatedCounter';
import personalInfo from '../../data/personalInfo';

export default function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:grid-cols-4 md:px-10">
        {personalInfo.stats.map((stat) => (
          <AnimatedCounter key={stat.label} value={inView ? stat.value : 0} label={stat.label} suffix={stat.suffix} />
        ))}
      </div>
    </section>
  );
}

import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import servicesData from '../../data/servicesData';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Services" title="Digital services designed to turn ideas into products." description="I help founders, teams, and personal brands turn strategy into thoughtful interfaces, stronger systems, and clearer user experiences." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group h-full p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl text-primary">
                <Icon />
              </div>
              <h3 className="font-display text-2xl text-ink dark:text-slate-100">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

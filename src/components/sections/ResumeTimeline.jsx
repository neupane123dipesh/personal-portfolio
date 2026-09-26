import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import TimelineItem from '../ui/TimelineItem';
import resumeData from '../../data/resumeData';

export default function ResumeTimeline() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="resume" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Experience" title="Where I have built and shipped." description="Developer at Danfe Solutions, intern at Nepal Telecom, and IT consultant — aligned with my latest CV." />

        <div className="mb-8 inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
          {['experience', 'education'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${activeTab === tab ? 'bg-primary text-white shadow-primary' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-px bg-slate-200 dark:bg-slate-700 md:left-1/2" />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {(activeTab === 'experience' ? resumeData.experience : resumeData.education).map((item, index) => (
              <div key={`${activeTab}-${item.title}`} className={`relative md:grid md:grid-cols-2 md:gap-10 ${index % 2 === 0 ? 'md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2' : 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'}`}>
                <div className="md:col-span-1" />
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 md:col-span-1">
                  <TimelineItem item={item} index={index} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

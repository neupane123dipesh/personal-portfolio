import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import TimelineItem from "../ui/TimelineItem";
import resumeData from "../../data/resumeData";

export default function ResumeTimeline() {
  const [activeTab, setActiveTab] = useState("experience");
  const items = activeTab === "experience" ? resumeData.experience : resumeData.education;

  return (
    <section id="resume" className="section-tint-b py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Experience"
            title="Where I've built and shipped."
            description="Developer at Danfe Solutions, intern at Nepal Telecom, and IT consultant — aligned with my latest CV."
          />
        </motion.div>

        {/* Tab switch — crisp, non-AI button toggle */}
        <div className="mb-10 flex justify-start">
          <div className="inline-flex rounded-xl border border-slate-200/90 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {["experience", "education"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Subtle Spine */}
          <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px bg-slate-200 dark:bg-slate-800 md:left-1/2 md:-translate-x-px" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 md:space-y-10"
            >
              {items.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={`${activeTab}-${item.title}`} className="relative pl-10 md:pl-0">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-slate-900 bg-white shadow-sm dark:border-white dark:bg-slate-900">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 md:gap-10">
                      {isLeft ? (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                          >
                            <TimelineItem item={item} />
                          </motion.div>
                          <div className="hidden md:block" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block" />
                          <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                          >
                            <TimelineItem item={item} />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

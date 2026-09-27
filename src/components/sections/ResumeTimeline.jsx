import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import TimelineItem from "../ui/TimelineItem";
import resumeData from "../../data/resumeData";

export default function ResumeTimeline() {
  const [activeTab, setActiveTab] = useState("experience");

  const items =
    activeTab === "experience" ? resumeData.experience : resumeData.education;

  return (
    <section id="resume" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Experience"
            title="Where I have built and shipped."
            description="Developer at Danfe Solutions, intern at Nepal Telecom, and IT consultant — aligned with my latest CV."
          />
        </motion.div>

        {/* Tab switch */}
        <div className="mb-12 flex justify-start">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {["experience", "education"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-primary"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative">
          {/* Continuous vertical spine */}
          <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-primary via-indigo-400 to-slate-200 dark:to-slate-800 md:left-1/2 md:-translate-x-1/2" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-10 md:space-y-12"
            >
              {items.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={`${activeTab}-${item.title}`}
                    className="relative pl-12 md:pl-0"
                  >
                    {/* Glowing Node perfectly centered on the spine */}
                    <div className="absolute left-4 top-7 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-primary shadow-sm dark:border-slate-900" />
                      </div>
                    </div>

                    {/* Alternating Card Grid on Desktop */}
                    <div className="md:grid md:grid-cols-2 md:gap-14">
                      {isEven ? (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_rgba(15,23,42,0.04)] transition-all hover:border-primary/30 hover:shadow-card dark:border-slate-800 dark:bg-slate-900"
                          >
                            <TimelineItem item={item} />
                          </motion.div>
                          <div className="hidden md:block" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block" />
                          <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_rgba(15,23,42,0.04)] transition-all hover:border-primary/30 hover:shadow-card dark:border-slate-800 dark:bg-slate-900"
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

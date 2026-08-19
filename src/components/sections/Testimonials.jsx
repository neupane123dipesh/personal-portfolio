import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';
import testimonialsData from '../../data/testimonialsData';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % testimonialsData.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[index];

  return (
    <section id="testimonials" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Testimonials" title="What people say about working with me." description="I aim to make collaboration feel easy, thoughtful, and results-driven from the first conversation to the final launch." align="center" />

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <TestimonialCard key={current.name} item={current} />
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" onClick={() => setIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <FiChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonialsData.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition ${index === i ? 'w-8 bg-primary' : 'w-2.5 bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => setIndex((prev) => (prev + 1) % testimonialsData.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

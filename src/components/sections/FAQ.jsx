import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import AccordionItem from '../ui/AccordionItem';
import faqData from '../../data/faqData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading eyebrow="FAQ" title="Common questions before we start working together." description="A quick look at how I work, what I offer, and how the process usually unfolds on a new project." align="center" />

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem key={item.question} question={item.question} answer={item.answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </section>
  );
}

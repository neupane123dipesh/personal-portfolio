import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import ResumeTimeline from '../components/sections/ResumeTimeline';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import ToolsStrip from '../components/sections/ToolsStrip';
import Services from '../components/sections/Services';
import CTABanner from '../components/sections/CTABanner';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ResumeTimeline />
      <Projects />
      <Skills />
      <ToolsStrip />
      <Services />
      <CTABanner />
      <Contact />
    </>
  );
}

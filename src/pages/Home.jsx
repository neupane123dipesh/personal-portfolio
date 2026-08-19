import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import ResumeTimeline from '../components/sections/ResumeTimeline';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import ToolsStrip from '../components/sections/ToolsStrip';
import Projects from '../components/sections/Projects';
import StatsCounter from '../components/sections/StatsCounter';
import Testimonials from '../components/sections/Testimonials';
import Blog from '../components/sections/Blog';
import FAQ from '../components/sections/FAQ';
import CTABanner from '../components/sections/CTABanner';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ResumeTimeline />
      <Services />
      <Skills />
      <ToolsStrip />
      <Projects />
      <StatsCounter />
      <Testimonials />
      <Blog />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  );
}

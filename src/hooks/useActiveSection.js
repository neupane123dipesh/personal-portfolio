import { useEffect, useState } from 'react';

export default function useActiveSection(sectionIds, offset = 140) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0] || 'home';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

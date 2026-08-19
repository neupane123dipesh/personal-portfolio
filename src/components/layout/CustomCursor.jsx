import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768 || matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 bg-primary/10 md:block"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  );
}

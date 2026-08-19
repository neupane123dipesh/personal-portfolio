import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, label, suffix = '', duration = 2200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame = null;
    let startTime = null;

    const tick = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const nextValue = Math.round(value * easedProgress);

      setCount(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div className="text-center text-white">
      <div className="font-display text-4xl font-semibold md:text-5xl">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-200">{label}</p>
    </div>
  );
}

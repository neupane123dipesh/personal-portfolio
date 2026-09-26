import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const timeout = setTimeout(() => setIsVisible(false), 1100);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 0.85 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-[0_20px_50px_rgba(95,92,241,0.45)]"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-white">DN</span>
        </motion.div>
        <p className="mt-6 font-display text-xl font-semibold tracking-tight text-white">Dipesh Neupane</p>
        <p className="mt-1 text-sm text-slate-400">Full-stack developer</p>
        <div className="mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="h-full w-full origin-left scale-x-100 bg-gradient-to-r from-primary to-sky-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

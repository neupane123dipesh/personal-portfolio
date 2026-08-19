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

    const timeout = setTimeout(() => setIsVisible(false), 900);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <div className="mx-auto h-1.5 w-36 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-primary"
          />
        </div>
        <p className="mt-5 font-display text-3xl text-ink">Dipesh Neupane</p>
      </div>
    </motion.div>
  );
}

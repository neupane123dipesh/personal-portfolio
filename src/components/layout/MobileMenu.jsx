import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-scroll';
import navLinks from '../../data/navLinks';

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-x-4 top-[4.5rem] rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                <Link
                  to={link.href}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={onClose}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${activeSection === link.href ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

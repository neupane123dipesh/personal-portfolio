import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ message, visible, type = 'success' }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 rounded-full px-4 py-2 text-sm font-medium shadow-lg ${
            type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

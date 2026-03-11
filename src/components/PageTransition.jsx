// src/components/PageTransition.jsx
// Framer Motion wrapper for page changes

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } }
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        style={{ width: '100%', maxWidth: '100%' }}
        className="page-content"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

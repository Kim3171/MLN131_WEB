// src/components/LoadingScreen.jsx
// Red star expand animation on initial load

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RedStar from './svgs/RedStar';

export default function LoadingScreen({ onComplete }) {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState('expand'); // expand, hold, fade

  useEffect(() => {
    // Phase 1: Expand (0.8s)
    const expandTimer = setTimeout(() => {
      setPhase('hold');
    }, 800);

    // Phase 2: Hold (1s)
    const holdTimer = setTimeout(() => {
      setPhase('fade');
    }, 1800);

    // Phase 3: Fade out and complete (0.7s)
    const fadeTimer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          {/* Red star */}
          <motion.div
            className="loading-star"
            initial={{ scale: 0 }}
            animate={{
              scale: phase === 'expand' ? 20 : phase === 'hold' ? 20 : 0,
              opacity: phase === 'fade' ? 0 : 1
            }}
            transition={{
              scale: { duration: 0.8, ease: 'easeOut' },
              opacity: { duration: 0.7, delay: phase === 'fade' ? 0 : 0 }
            }}
          >
            <RedStar size={24} animated={false} />
          </motion.div>

          {/* Title */}
          <motion.div
            className="loading-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== 'expand' ? 1 : 0, y: phase !== 'expand' ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <h1>KÝ ỨC DÂN TỘC</h1>
            <p>Memory of the Nation</p>
          </motion.div>

          {/* Background */}
          <div className="loading-bg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

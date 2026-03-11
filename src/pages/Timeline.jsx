// src/pages/Timeline.jsx
// Horizontal scrolling timeline page with AI summary feature

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import events from '../data/events';
import HistoricalPhoto from '../components/HistoricalPhoto';
import VietnamMap from '../components/svgs/VietnamMap';
import RedStar from '../components/svgs/RedStar';
import { useApp } from '../context/AppContext';
import { askClaude, timelineSummarySystemPrompt } from '../lib/claude';

export default function Timeline() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('focusMode') === 'true';
  });
  const { visitedEvents, addVisitedEvent } = useApp();

  // Sync focus mode with global state
  useEffect(() => {
    const handleStorage = () => {
      setFocusMode(localStorage.getItem('focusMode') === 'true');
    };
    const interval = setInterval(handleStorage, 100);
    return () => clearInterval(interval);
  }, []);

  // Cleanup focus mode on unmount
  useEffect(() => {
    return () => localStorage.setItem('focusMode', 'false');
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Also scroll timeline container to first card after render
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    }, 100);
  }, []);

  const getCardWidth = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.timeline-card');
      if (card) {
        // Use the actual computed gap between cards
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const gap = isMobile ? 8 : 20;
        return card.offsetWidth + gap;
      }
    }
    return 360;
  };

  const handleScroll = () => {
    if (scrollRef.current && events.length > 0) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = getCardWidth();
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, events.length - 1)));
    }
  };

  const scrollToEvent = (index) => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToEvent(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < events.length - 1) {
      scrollToEvent(activeIndex + 1);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < events.length) {
      addVisitedEvent(events[activeIndex].id);
    }
  }, [activeIndex]);

  // Show summary button when at least 1 event has been visited, or always on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const showSummaryButton = isMobile ? true : visitedEvents.length >= 3;

  const handleGetSummary = async () => {
    setShowSummary(true);
    setLoadingSummary(true);

    const visitedEventData = events.filter(e => visitedEvents.includes(e.id));
    const eventList = visitedEventData.map(e => `${e.year}: ${e.titleEn} - ${e.titleVi}`).join(', ');

    try {
      const response = await askClaude(timelineSummarySystemPrompt, eventList);
      setSummary(response);
    } catch (error) {
      setSummary('Unable to generate summary. Please try again.');
    }
    setLoadingSummary(false);
  };

  return (
    <div className="timeline-page" data-focus={focusMode ? 'true' : 'false'}>
      <div className="timeline-bg">
        <VietnamMap />
      </div>

      <div className="timeline-header">
        <div className="header-content">
          <h1>Dòng Thời Gian</h1>
          <p>Timeline 1964 - 1975</p>
        </div>
      </div>

      <div className="timeline-cards-wrapper">
        <button className="nav-arrow nav-left" onClick={scrollLeft} disabled={activeIndex === 0}>
          ‹
        </button>
        <div className="timeline-wrapper">
          <div className="timeline-container" ref={scrollRef} onScroll={handleScroll}>
          <div className="timeline-track">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`timeline-card ${index === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToEvent(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="timeline-year">
                  <span className="year">{event.year}</span>
                  <span className="month">{event.month}</span>
                </div>

                <div className="timeline-image">
                  <HistoricalPhoto imageKey={event.imageKey} alt={event.titleEn} className="timeline-photo" />
                </div>

                <div className="timeline-content">
                  <h3>{event.titleVi}</h3>
                  <p className="title-en">{event.titleEn}</p>
                  <p className="description">{event.descriptionVi}</p>

                  <div className="significance">
                    <span>Tầm quan trọng / Significance:</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <RedStar key={i} size={18} animated={i < event.significance} />
                      ))}
                    </div>
                  </div>

                  <ul className="bullet-points">
                    {event.bulletPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
        <button className="nav-arrow nav-right" onClick={scrollRight} disabled={activeIndex === events.length - 1}>
          ›
        </button>
      </div>

      <div className="timeline-dots-wrapper">
        <div className="timeline-progress">
          {events.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToEvent(index)}
            />
          ))}
        </div>
      </div>

      {/* Summary button - placed after dots wrapper so it appears below dots */}
      <AnimatePresence>
        {showSummaryButton && !showSummary && (
          <motion.button
            className="summary-button"
            onClick={handleGetSummary}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ✦ Tổng hợp / Summary
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSummary && (
          <motion.div className="summary-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="summary-content">
              <button className="summary-close" onClick={() => setShowSummary(false)}>×</button>
              <h2>✦ Tổng hợp / Summary</h2>
              {loadingSummary ? (
                <div className="summary-loading"><span className="loading-dots">...</span></div>
              ) : (
                <p>{summary}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Base layout ── */
        .timeline-page {
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          padding: clamp(0.75rem, 2vw, 1.25rem) clamp(0.5rem, 2vw, 1.5rem) 0;
          position: relative;
          background: radial-gradient(ellipse at 50% 0%, rgba(42, 50, 70, 0.4) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .timeline-wrapper {
          position: relative;
          width: 100%;
          overflow: visible;
          min-height: 0;
          flex: 1;
        }

        .timeline-bg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(200px, 25vw, 360px);
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ── */
        .timeline-header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
          position: relative;
          z-index: 1;
          padding: 0 clamp(0.5rem, 2vw, 2rem);
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .header-content {
          text-align: center;
          flex: 1;
        }

        .timeline-header h1 {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 3vw, 2rem);
          color: var(--parchment);
          margin: 0;
          text-shadow: 0 2px 20px rgba(212, 168, 83, 0.3);
          letter-spacing: 2px;
        }

        .timeline-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0.3rem 0 0;
          letter-spacing: 3px;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          opacity: 0.8;
        }

        /* ── Cards wrapper + nav ── */
        .timeline-cards-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 0 clamp(4px, 2vw, 40px);
          min-height: 0;
          flex: 1;
          box-sizing: border-box;
        }

        .timeline-cards-wrapper .nav-arrow {
          flex-shrink: 0;
          width: clamp(32px, 3vw, 40px);
          height: clamp(32px, 3vw, 40px);
        }

        .timeline-cards-wrapper .timeline-wrapper {
          flex: 1;
          min-width: 0;
          height: 100%;
        }

        /* ── Dots ── */
        .timeline-dots-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: clamp(6px, 1vw, 12px) 1rem;
          flex-shrink: 0;
          overflow-x: auto;
          scrollbar-width: none;
          box-sizing: border-box;
        }

        .timeline-dots-wrapper::-webkit-scrollbar { display: none; }

        /* ── Scroll container ── */
        .timeline-container {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 8px 4px;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        .timeline-container::-webkit-scrollbar { display: none; }

        .timeline-track {
          display: flex;
          gap: clamp(10px, 1.5vw, 18px);
          padding: 8px clamp(8px, 2vw, 24px);
          width: max-content;
          height: auto;
          align-items: center;
        }

        /* ── Card ── */
        .timeline-card {
          width: clamp(220px, calc(18vw + 20px), 290px);
          max-height: calc(100vh - 160px);
          scroll-snap-align: center;
          background: linear-gradient(145deg, rgba(42, 50, 70, 0.95), rgba(20, 28, 45, 0.98));
          border: 1px solid rgba(212, 168, 83, 0.15);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
        }

        .timeline-card:hover,
        .timeline-card.active {
          border-color: var(--gold);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 0 18px rgba(212, 168, 83, 0.15);
          transform: translateY(-4px);
        }

        /* ── Card year bar ── */
        .timeline-year {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: clamp(0.4rem, 1vw, 0.75rem) clamp(0.6rem, 1.5vw, 1.1rem);
          background: linear-gradient(90deg, rgba(192, 57, 43, 0.25), rgba(192, 57, 43, 0.1));
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
          flex-shrink: 0;
        }

        .timeline-year .year {
          font-family: var(--font-mono);
          font-size: clamp(1rem, 1.6vw, 1.4rem);
          font-weight: bold;
          color: var(--gold);
          text-shadow: 0 0 10px rgba(212, 168, 83, 0.3);
        }

        .timeline-year .month {
          font-family: var(--font-mono);
          font-size: clamp(0.6rem, 0.9vw, 0.8rem);
          color: var(--ash);
          letter-spacing: 0.5px;
        }

        /* ── Card image ── fixed compact height ── */
        .timeline-image {
          width: 100%;
          height: 130px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .timeline-image::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(to top, rgba(20, 28, 45, 0.85), transparent);
        }

        .timeline-photo {
          width: 100%;
          height: 130px;
          display: block;
        }

        .timeline-photo .historical-photo-container {
          width: 100%;
          height: 130px;
          overflow: hidden;
        }

        .timeline-photo .historical-photo-img {
          width: 100%;
          height: 130px;
          object-fit: cover;
          object-position: center;
          min-height: unset;
        }

        .timeline-card:hover .timeline-photo {
          transform: scale(1.05);
        }

        /* Focus mode (no sidebar) ── give extra width */
        .timeline-page[data-focus="true"] .timeline-card {
          width: clamp(240px, calc(19vw + 20px), 330px);
        }

        /* ── Card content — fits content, scrolls only if needed ── */
        .timeline-content {
          padding: clamp(0.5rem, 1vw, 0.85rem) clamp(0.6rem, 1.2vw, 1rem);
          flex: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,168,83,0.2) transparent;
        }

        .timeline-content::-webkit-scrollbar {
          width: 3px;
        }
        .timeline-content::-webkit-scrollbar-track { background: transparent; }
        .timeline-content::-webkit-scrollbar-thumb {
          background: rgba(212,168,83,0.25);
          border-radius: 3px;
        }

        .timeline-content h3 {
          font-family: var(--font-heading);
          font-size: clamp(0.88rem, 1.3vw, 1.1rem);
          color: var(--parchment);
          margin: 0;
          line-height: 1.35;
          flex-shrink: 0;
        }

        .timeline-content .title-en {
          font-family: var(--font-mono);
          font-size: clamp(0.64rem, 0.85vw, 0.76rem);
          color: var(--gold);
          margin: 0;
          letter-spacing: 0.3px;
          flex-shrink: 0;
        }

        .timeline-content .description {
          font-size: clamp(0.72rem, 0.95vw, 0.86rem);
          color: var(--ash);
          line-height: 1.5;
          margin: 0;
          flex-shrink: 0;
        }

        .significance {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
          font-size: clamp(0.62rem, 0.82vw, 0.75rem);
          color: var(--ash);
          padding: 0.3rem 0.5rem;
          background: rgba(192, 57, 43, 0.08);
          border-radius: 6px;
          border-left: 3px solid rgba(192, 57, 43, 0.7);
          border-top: 1px solid rgba(192, 57, 43, 0.2);
          border-bottom: 1px solid rgba(192, 57, 43, 0.2);
          border-right: 1px solid rgba(192, 57, 43, 0.2);
          flex-shrink: 0;
        }

        .significance .stars {
          display: flex;
          gap: 0.15rem;
          flex-wrap: wrap;
        }

        .significance .stars svg {
          width: clamp(11px, 1.1vw, 15px);
          height: clamp(11px, 1.1vw, 15px);
        }

        .bullet-points {
          margin: 0;
          padding-left: 0.85rem;
          font-size: clamp(0.68rem, 0.88vw, 0.8rem);
          color: var(--ash);
          flex-shrink: 0;
        }

        .bullet-points li {
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }

        /* ── Progress dots ── */
        .timeline-progress {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 14px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          max-width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
        }

        .progress-dot {
          width: 7px;
          height: 7px;
          min-width: 7px;
          min-height: 7px;
          border-radius: 50%;
          background: rgba(212, 168, 83, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
        }

        .progress-dot:hover { background: rgba(212, 168, 83, 0.5); }

        .progress-dot.active {
          background: #D4A853;
          transform: scale(1.3);
        }

        /* ── Summary button ── */
        .summary-button {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          padding: 0.6rem 1.1rem;
          background: var(--crimson);
          color: var(--parchment);
          border: none;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: clamp(0.72rem, 1vw, 0.88rem);
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 4px 16px rgba(192, 57, 43, 0.4);
          transition: background 0.2s;
          white-space: nowrap;
        }

        .summary-button:hover { background: #a33025; }

        /* ── Nav arrows ── */
        .nav-arrow {
          width: clamp(32px, 3vw, 40px);
          height: clamp(32px, 3vw, 40px);
          background: rgba(212, 168, 83, 0.15);
          border: 1px solid rgba(212, 168, 83, 0.4);
          border-radius: 50%;
          color: #D4A853;
          font-size: clamp(14px, 1.5vw, 20px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .nav-arrow:hover:not(:disabled) { background: rgba(212, 168, 83, 0.3); }

        .nav-arrow:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          border-color: rgba(212, 168, 83, 0.2);
        }

        /* ── Summary modal ── */
        .summary-modal {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 26, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .summary-content {
          background: var(--smoke);
          border: 1px solid var(--gold);
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          position: relative;
        }

        .summary-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--ash);
          font-size: 1.5rem;
          cursor: pointer;
        }

        .summary-content h2 {
          font-family: var(--font-heading);
          color: var(--gold);
          margin: 0 0 1.5rem;
        }

        .summary-content p {
          color: var(--parchment);
          line-height: 1.8;
          white-space: pre-wrap;
        }

        .summary-loading {
          text-align: center;
          color: var(--crimson);
          font-family: var(--font-mono);
        }

        .loading-dots {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* ── Tablet (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .timeline-card {
            width: clamp(210px, 26vw, 270px);
          }
          .timeline-page[data-focus="true"] .timeline-card {
            width: clamp(220px, 28vw, 290px);
          }
        }

        /* ── Tablet portrait / large phone (≤ 768px) ── */
        @media (max-width: 768px) {
          .timeline-page {
            height: calc(100vh - 65px);
            max-height: calc(100vh - 65px);
            padding: 0;
          }

          .timeline-header {
            margin-bottom: 0.5rem;
            margin-top: 12vh;
          }

          .timeline-header h1 {
            font-size: 1.3rem;
          }

          .timeline-cards-wrapper {
            padding: 0;
            gap: 0;
          }

          .timeline-cards-wrapper .nav-arrow {
            display: none;
          }

          .timeline-container {
            -webkit-overflow-scrolling: touch;
            padding: 6px 0;
          }

          .timeline-track {
            padding: 6px 5vw;
            gap: 12px;
          }

          /* ~1.5 cards visible so user knows they can swipe */
          .timeline-card {
            width: clamp(240px, 70vw, 320px);
            max-height: calc(100vh - 240px);
          }

          .timeline-content {
            gap: 0.35rem;
          }

          .summary-button {
            bottom: calc(65px + 0.75rem);
            right: 0.75rem;
            font-size: 0.7rem;
            padding: 0.4rem 0.8rem;
          }

          .timeline-dots-wrapper {
            padding: 6px 0.5rem;
          }

          .timeline-progress {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            justify-content: flex-start;
          }

          .timeline-progress::-webkit-scrollbar { display: none; }

          .progress-dot {
            width: 6px;
            height: 6px;
            min-width: 6px;
            min-height: 6px;
            flex-shrink: 0;
          }
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .timeline-page {
            height: calc(100vh - 65px);
            max-height: calc(100vh - 65px);
            padding: 0;
          }

          .timeline-header {
            margin-top: 10vh;
          }

          .timeline-header h1 {
            font-size: 1.15rem;
            letter-spacing: 1px;
          }

          .timeline-header p {
            font-size: 0.65rem;
          }

          /* Almost full-width single card */
          .timeline-card {
            width: calc(88vw);
            max-height: calc(100vh - 255px);
          }

          .timeline-track {
            padding: 4px 6vw;
            gap: 10px;
          }

          .timeline-year .year {
            font-size: 1.1rem;
          }

          .timeline-content {
            padding: 0.5rem 0.65rem;
            gap: 0.3rem;
          }

          .timeline-content h3 {
            font-size: 0.92rem;
          }

          .timeline-content .title-en {
            font-size: 0.68rem;
          }

          .timeline-content .description {
            font-size: 0.76rem;
          }

          .bullet-points {
            font-size: 0.72rem;
          }

          .significance {
            font-size: 0.66rem;
            padding: 0.3rem 0.5rem;
          }

          .significance .stars svg {
            width: 13px;
            height: 13px;
          }

          .progress-dot {
            width: 5px;
            height: 5px;
            min-width: 5px;
            min-height: 5px;
          }

          .summary-button {
            bottom: calc(65px + 0.75rem);
            right: 0.75rem;
            font-size: 0.68rem;
            padding: 0.4rem 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}

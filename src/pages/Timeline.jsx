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
  const { visitedEvents, addVisitedEvent } = useApp();

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
        return card.offsetWidth + 20;
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

  const showSummaryButton = visitedEvents.length >= 3;

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
    <div className="timeline-page">
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
        .timeline-page {
          padding: 2rem;
          padding-bottom: 2rem;
          position: relative;
          background: radial-gradient(ellipse at 50% 0%, rgba(42, 50, 70, 0.4) 0%, transparent 60%);
          overflow: visible;
        }

        .timeline-wrapper {
          position: relative;
          max-width: 1800px;
          margin: 0 auto;
          overflow: visible;
        }

        .timeline-bg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          padding: 0 2rem;
          max-width: 1800px;
          margin-left: auto;
          margin-right: auto;
        }

        .header-content {
          text-align: center;
          flex: 1;
        }

        .timeline-cards-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .timeline-cards-wrapper .nav-arrow {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
        }

        .timeline-cards-wrapper .timeline-wrapper {
          flex: 1;
        }

        .timeline-dots-wrapper {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          margin-bottom: 0;
          max-width: 1800px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 1rem;
          position: relative;
        }

        .timeline-header h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
          text-shadow: 0 2px 20px rgba(212, 168, 83, 0.3);
          letter-spacing: 2px;
        }

        .timeline-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0.5rem 0 0;
          letter-spacing: 3px;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .timeline-container {
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 12px 4px 16px 4px;
          position: relative;
          width: 100%;
          display: flex;
          align-items: stretch;
        }

        .timeline-container::before,
        .timeline-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 1;
          pointer-events: none;
        }

        .timeline-container::before {
          left: 0;
          background: linear-gradient(to right, transparent, transparent);
        }

        .timeline-container::after {
          right: 0;
          background: linear-gradient(to left, transparent, transparent);
        }

        .timeline-container::-webkit-scrollbar {
          display: none;
        }

        .timeline-track {
          display: flex;
          gap: 20px;
          padding: 12px 4px 16px 4px;
          width: max-content;
        }

        .timeline-card {
          width: 340px;
          min-height: 580px;
          height: auto;
          scroll-snap-align: center;
          background: linear-gradient(145deg, rgba(42, 50, 70, 0.95), rgba(20, 28, 45, 0.98));
          border: 1px solid rgba(212, 168, 83, 0.15);
          border-radius: 16px;
          overflow: visible;
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
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 168, 83, 0.15);
          transform: translateY(-4px);
        }

        .timeline-year {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: linear-gradient(90deg, rgba(192, 57, 43, 0.25), rgba(192, 57, 43, 0.1));
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
        }

        .timeline-year .year {
          font-family: var(--font-mono);
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--gold);
          text-shadow: 0 0 10px rgba(212, 168, 83, 0.3);
        }

        .timeline-year .month {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--ash);
          letter-spacing: 0.5px;
        }

        .timeline-image {
          height: 160px;
          min-height: 160px;
          overflow: visible;
          position: relative;
        }

        .timeline-image::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(20, 28, 45, 0.8), transparent);
        }

        .timeline-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .timeline-card:hover .timeline-photo {
          transform: scale(1.05);
        }

        .timeline-content {
          padding: 1.25rem;
          flex: 1;
          overflow: visible;
          display: flex;
          flex-direction: column;
        }

        .timeline-content h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
          line-height: 1.3;
        }

        .timeline-content .title-en {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--gold);
          margin: 0 0 0.75rem;
          letter-spacing: 0.3px;
        }

        .timeline-content .description {
          font-size: 0.95rem;
          color: var(--ash);
          line-height: 1.5;
          margin: 0 0 0.75rem;
        }

        .significance {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: var(--ash);
          padding: 0.4rem 0.6rem;
          background: rgba(192, 57, 43, 0.1);
          border-radius: 6px;
          border-left: 3px solid rgba(192, 57, 43, 0.5);
        }

        .significance .stars {
          display: flex;
          gap: 0.15rem;
        }

        .bullet-points {
          margin: 0;
          margin-top: 16px;
          padding-left: 1rem;
          font-size: 0.85rem;
          color: var(--ash);
        }

        .bullet-points li {
          margin-bottom: 0.3rem;
        }

        .timeline-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          max-width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          min-width: 8px;
          min-height: 8px;
          border-radius: 50%;
          background: rgba(212, 168, 83, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
        }

        .progress-dot:hover {
          background: rgba(212, 168, 83, 0.5);
        }

        .progress-dot.active {
          background: #D4A853;
          transform: scale(1.3);
        }

        .summary-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          background: var(--crimson);
          color: var(--parchment);
          border: none;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 1rem;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(192, 57, 43, 0.4);
        }

        .summary-button:hover {
          background: #a33025;
        }

        .nav-arrow {
          width: 44px;
          height: 44px;
          background: rgba(212, 168, 83, 0.15);
          border: 1px solid rgba(212, 168, 83, 0.4);
          border-radius: 50%;
          color: #D4A853;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .nav-arrow:hover:not(:disabled) {
          background: rgba(212, 168, 83, 0.3);
        }

        .nav-arrow:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          border-color: rgba(212, 168, 83, 0.2);
        }

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

        @media (max-width: 1024px) {
          .timeline-card { width: 340px; }
        }

        @media (max-width: 768px) {
          .timeline-header h1 { font-size: 1.75rem; }
          .timeline-track { padding: 1rem 1rem; }
          .timeline-card { width: 280px; min-width: 280px; }
          .summary-button { bottom: 1rem; right: 1rem; left: 1rem; width: auto; }
          .timeline-header { padding: 0 1rem; }
          .timeline-header h1 { font-size: 1.5rem; }
          .nav-arrow { width: 36px; height: 36px; font-size: 14px; }
          .timeline-progress {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 0.5rem;
            padding: 0 1rem;
            margin-top: 1rem;
          }
          .timeline-progress::-webkit-scrollbar { display: none; }
          .progress-dot { flex-shrink: 0; }
          .timeline-container { padding: 1rem 2rem; }
        }

        @media (max-width: 480px) {
          .timeline-card { width: 280px; min-width: 280px; }
          .timeline-page { padding: 1rem 1rem 2rem 1rem; }
          .timeline-image { height: 140px; }
          .timeline-content { padding: 1rem; }
          .timeline-content h3 { font-size: 1rem; }
          .timeline-content .description { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}

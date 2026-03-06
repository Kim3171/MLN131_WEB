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

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 400;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollToEvent = (index) => {
    if (scrollRef.current) {
      const cardWidth = 400;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Track visited events
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < events.length) {
      addVisitedEvent(events[activeIndex].id);
    }
  }, [activeIndex]);

  // Show summary button after 3+ events
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
      {/* Background map */}
      <div className="timeline-bg">
        <VietnamMap />
      </div>

      {/* Header */}
      <div className="timeline-header">
        <h1>Dòng Thời Gian</h1>
        <p>Timeline 1964 - 1975</p>
      </div>

      {/* Timeline container */}
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
              {/* Year badge */}
              <div className="timeline-year">
                <span className="year">{event.year}</span>
                <span className="month">{event.month}</span>
              </div>

              {/* Image */}
              <div className="timeline-image">
                <HistoricalPhoto
                  imageKey={event.imageKey}
                  alt={event.titleEn}
                  className="timeline-photo"
                />
              </div>

              {/* Content */}
              <div className="timeline-content">
                <h3>{event.titleVi}</h3>
                <p className="title-en">{event.titleEn}</p>
                <p className="description">{event.descriptionVi}</p>

                {/* Significance stars */}
                <div className="significance">
                  <span>Tầm quan trọng / Significance:</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <RedStar
                        key={i}
                        size={14}
                        animated={i < event.significance}
                      />
                    ))}
                  </div>
                </div>

                {/* Bullet points */}
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

      {/* Progress indicator */}
      <div className="timeline-progress">
        {events.map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToEvent(index)}
          />
        ))}
      </div>

      {/* Summary button */}
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

      {/* Summary modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="summary-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="summary-content">
              <button className="summary-close" onClick={() => setShowSummary(false)}>
                ×
              </button>
              <h2>✦ Tổng hợp / Summary</h2>
              {loadingSummary ? (
                <div className="summary-loading">
                  <span className="loading-dots">...</span>
                </div>
              ) : (
                <p>{summary}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .timeline-page {
          min-height: 100vh;
          position: relative;
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
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .timeline-header h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
        }

        .timeline-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0.5rem 0 0;
        }

        .timeline-container {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 1rem 0;
        }

        .timeline-container::-webkit-scrollbar {
          display: none;
        }

        .timeline-track {
          display: flex;
          gap: 1.5rem;
          padding: 1rem 2rem;
          width: max-content;
        }

        .timeline-card {
          width: 380px;
          scroll-snap-align: center;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }

        .timeline-card:hover,
        .timeline-card.active {
          border-color: var(--gold);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .timeline-year {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(192, 57, 43, 0.2);
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
        }

        .timeline-year .year {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--gold);
        }

        .timeline-year .month {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--ash);
        }

        .timeline-image {
          height: 200px;
          overflow: hidden;
        }

        .timeline-photo {
          width: 100%;
          height: 100%;
        }

        .timeline-content {
          padding: 1.5rem;
        }

        .timeline-content h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .timeline-content .title-en {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--gold);
          margin: 0 0 1rem;
        }

        .timeline-content .description {
          font-size: 0.9rem;
          color: var(--ash);
          line-height: 1.6;
          margin: 0 0 1rem;
        }

        .significance {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.75rem;
          color: var(--ash);
        }

        .significance .stars {
          display: flex;
          gap: 0.25rem;
        }

        .bullet-points {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.8rem;
          color: var(--ash);
        }

        .bullet-points li {
          margin-bottom: 0.5rem;
        }

        .timeline-progress {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .progress-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--smoke);
          border: 1px solid var(--ash);
          cursor: pointer;
          transition: all 0.2s;
        }

        .progress-dot.active {
          background: var(--crimson);
          border-color: var(--crimson);
          transform: scale(1.2);
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
      `}</style>
    </div>
  );
}

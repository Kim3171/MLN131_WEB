// src/pages/Home.jsx
// Home page with hero, stats, and CQ6 brief

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HistoricalPhoto from '../components/HistoricalPhoto';
import RedStar from '../components/svgs/RedStar';
import BambooDecoration from '../components/svgs/BambooDecoration';

const typewriterTexts = [
  'Cuộc chiến của ai?',
  'A War of Whose Making?',
  '1954 — 1975'
];

const stats = [
  { label: '21 NĂM', sublabel: 'Kháng chiến / of Resistance' },
  { label: '543,000', sublabel: 'Quân Mỹ / US Troops (1969)' },
  { label: '30/4/1975', sublabel: 'Ngày Giải Phóng / liberation Day' },
  { label: 'Paris 1973', sublabel: 'Hiệp định Hòa Bình / Peace Accords' }
];

const navCards = [
  { id: 'timeline', label: 'Dòng Thời Gian', labelEn: 'Timeline', icon: '📅', path: '/timeline' },
  { id: 'map', label: 'Bản Đồ', labelEn: 'Map Explorer', icon: '🗺️', path: '/map' },
  { id: 'game-timeline', label: 'Sắp Xếp Lịch Sử', labelEn: 'Timeline Order', icon: '🎮', path: '/game/timeline' },
  { id: 'game-quotes', label: 'Ai Nói Điều Này?', labelEn: 'Who Said It?', icon: '💬', path: '/game/quotes' },
  { id: 'game-strategy', label: 'Chiến Lược Gia', labelEn: 'Strategist', icon: '♟️', path: '/game/strategy' },
  { id: 'game-truefalse', label: 'Nhanh Như Chớp', labelEn: 'Quick True/False', icon: '⚡', path: '/game/truefalse' },
  { id: 'rubric', label: 'Tiêu Chí', labelEn: 'Rubric', icon: '📋', path: '/rubric' },
  { id: 'resources', label: 'Tài Liệu', labelEn: 'Resources', icon: '📚', path: '/resources' },
];

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = typewriterTexts[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero home-hero"
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#0A0E1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Battlefield background image - centered, fully visible */}
        <img
          src="/battle_bg.png"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            opacity: 0.92,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,14,26,0.75) 0%, rgba(10,14,26,0.35) 20%, rgba(10,14,26,0.05) 45%, rgba(10,14,26,0.3) 72%, rgba(10,14,26,0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}/>

        {/* Red star particles - constrained to upper 30% */}
        <div className="hero-stars" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="hero-star"
              initial={{
                x: Math.random() * 100 + '%',
                y: '100%',
                opacity: 0
              }}
              animate={{
                y: -100 + '%',
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear'
              }}
              style={{
                left: Math.random() * 100 + '%',
                fontSize: Math.random() * 12 + 8 + 'px'
              }}
            >
              <RedStar size={Math.random() * 12 + 8} animated={false} />
            </motion.div>
          ))}
        </div>

        {/* Text content wrapper */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          marginTop: '-18vh'
        }}>
          {/* Title */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#F2E8D5',
              letterSpacing: '0.18em',
              textShadow: '0 0 60px rgba(212,168,83,0.4), 0 4px 30px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)',
              margin: 0,
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}
          >
            KÝ ỨC DÂN TỘC
          </motion.h1>

          {/* Premium Gold Divider */}
          <div style={{
            width: 60,
            height: 2,
            background: 'linear-gradient(to right, transparent, #D4A853, transparent)',
            margin: '16px auto',
            border: 'none'
          }}/>

          {/* Typewriter subtitle */}
          <div className="hero-subtitle-container" style={{ marginTop: 8 }}>
            <span className="hero-subtitle" style={{
              fontSize: '14px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: 'rgba(212,168,83,0.85)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.9)'
            }}>
              {displayText}
              <span className="cursor">|</span>
            </span>
          </div>

          {/* LABUBU credit */}
          <div style={{
            fontSize: '11px',
            color: 'rgba(242,232,213,0.5)',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.2em',
            marginTop: 24
          }}>
            Nhóm thực hiện: LABUBU
          </div>

          {/* Scroll Indicator - Clickable */}
          <motion.button
            onClick={() => {
              document.querySelector('.stats-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              marginTop: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.7,
              padding: '10px 20px',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{
              fontSize: 12,
              color: '#D4A853',
              letterSpacing: '0.3em',
              fontFamily: 'monospace',
              textShadow: '0 0 10px rgba(212,168,83,0.5)'
            }}>CUỘN XUỐNG</span>
            <div style={{
              width: 2,
              height: 50,
              background: 'linear-gradient(to bottom, #D4A853, transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite'
            }}/>
          </motion.button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="stat-value">{stat.label}</div>
              <div className="stat-label">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <BambooDecoration />

      {/* CQ6 Question Section */}
      <section className="cq6-section">
        <div className="cq6-box">
          <div className="cq6-header">
            <RedStar size={18} />
            <span>CQ6 ASSIGNMENT</span>
          </div>
          <h2 className="cq6-question">
            Cuộc kháng chiến chống Mỹ cứu nước (1954-1975) là sự nghiệp của riêng dân tộc Việt Nam hay là một bộ phận của phong trào cách mạng thế giới?
          </h2>
          <p className="cq6-question-en">
            Was the resistance war against American imperialism (1954-1975) Vietnam's national endeavor or part of the global revolutionary movement?
          </p>
          <p className="cq6-hint">
            Gợi ý: Khám phá các trang bên dưới để tìm hiểu về vai trò lãnh đạo của Đảng Cộng sản Việt Nam và bối cảnh quốc tế trong cuộc chiến này.
          </p>
        </div>
      </section>

      <BambooDecoration />

      {/* Navigation Cards */}
      <section className="nav-cards-section">
        <h2 className="section-title">Khám Phá / Explore</h2>
        <div className="nav-cards-grid">
          {navCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              <Link to={card.path} className="nav-card">
                <span className="nav-card-icon">{card.icon}</span>
                <span className="nav-card-label">{card.label}</span>
                <span className="nav-card-label-en">{card.labelEn}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Ký Ức Dân Tộc — Dự án giáo dục lịch sử / Educational History Project</p>
        <a href="/secret" className="secret-link" aria-label="Thơ - Poetry">
          <span style={{ fontSize: '18px' }}>📝</span>
        </a>
      </footer>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }

        .home-page {
          min-height: 100vh;
        }

        /* Hero - Full viewport height */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.2;
          filter: sepia(0.5) contrast(1.2) brightness(0.4);
          z-index: 0;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(10,14,26,0.4) 50%, rgba(10,14,26,0.9) 100%);
          z-index: 1;
        }

        .hero-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .hero-star {
          position: absolute;
          color: var(--crimson);
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
        }

        .hero-branding {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--gold);
          margin-top: 2rem;
          opacity: 0.5;
        }

        /* Title - Playfair Display 900 weight */
        .hero-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 88px;
          letter-spacing: 0.12em;
          color: var(--parchment);
          margin: 0;
          text-shadow: 0 0 60px rgba(192, 57, 43, 0.4);
        }

        /* Subtitle - IBM Plex Mono 16px */
        .hero-subtitle-container {
          min-height: 2rem;
          margin-top: 1.5rem;
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--gold);
        }

        .cursor {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Stats - 4 cards in a row */
        .stats-section {
          padding: 3rem 2rem;
          background: var(--smoke);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(212, 168, 83, 0.15);
          border-radius: 8px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          border-color: rgba(212, 168, 83, 0.4);
          transform: translateY(-2px);
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 48px;
          font-weight: 700;
          color: var(--gold);
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--ash);
          margin-top: 0.5rem;
        }

        /* CQ6 Box */
        .cq6-section {
          padding: 4rem 2rem;
          background: linear-gradient(180deg, var(--smoke) 0%, var(--ink) 100%);
        }

        .cq6-box {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(242, 232, 213, 0.04);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 4px;
          padding: 24px;
        }

        .cq6-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--gold);
          margin-bottom: 1.5rem;
          letter-spacing: 0.1em;
        }

        .cq6-question {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--parchment);
          line-height: 1.5;
          margin: 0 0 1rem;
        }

        .cq6-question-en {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ash);
          font-style: italic;
          margin: 0 0 1.5rem;
        }

        .cq6-hint {
          font-size: 0.9rem;
          color: var(--ash);
          padding: 1rem;
          background: rgba(192, 57, 43, 0.1);
          border-radius: 4px;
          margin: 0;
        }

        /* Navigation Cards - 3 columns */
        .nav-cards-section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--parchment);
          text-align: center;
          margin: 0 0 2rem;
        }

        .nav-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .nav-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.15);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          min-height: 160px;
          justify-content: center;
        }

        .nav-card:hover {
          border-color: var(--gold);
          box-shadow: 0 0 20px rgba(212, 168, 83, 0.2);
          transform: translateY(-4px);
        }

        .nav-card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .nav-card-label {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin-bottom: 0.25rem;
        }

        .nav-card-label-en {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--ash);
        }

        /* Footer */
        .home-footer {
          text-align: center;
          padding: 2rem;
          color: var(--ash);
          font-size: 0.8rem;
          position: relative;
        }

        .secret-link {
          position: absolute;
          right: 2rem;
          bottom: 2rem;
          color: var(--smoke);
          text-decoration: none;
          font-size: 0.75rem;
          opacity: 0.3;
        }

        .secret-link:hover {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nav-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-value {
            font-size: 36px;
          }

          .cq6-question {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

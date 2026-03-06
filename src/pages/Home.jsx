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
  { label: '21 NĂM / 21 Years', sublabel: 'Kháng chiến / of Resistance' },
  { label: '543,000', sublabel: 'Quân Mỹ / US Troops (1969)' },
  { label: '30/4/1975', sublabel: 'Ngày Giải Phóng / Liberation Day' },
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
      <section className="hero">
        {/* Animated stars background */}
        <div className="hero-stars">
          {[...Array(20)].map((_, i) => (
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
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            >
              <RedStar size={12} animated={false} />
            </motion.div>
          ))}
        </div>

        <div className="hero-content">
          {/* Title */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            KÝ ỨC DÂN TỘC
          </motion.h1>

          {/* Typewriter subtitle */}
          <div className="hero-subtitle-container">
            <span className="hero-subtitle">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </div>

          {/* Hero Image */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HistoricalPhoto
              imageKey="hoChiMinhPortrait"
              alt="Hồ Chí Minh"
              caption="Hồ Chí Minh — Chủ tịch nước Việt Nam Dân chủ Cộng hòa"
              className="hero-photo"
            />
          </motion.div>

          {/* Group branding */}
          <div className="hero-branding">
            Nhóm thực hiện: LABUBU ★
          </div>
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
            <RedStar size={20} />
            <span>CQ6 ASSIGNMENT</span>
          </div>
          <h2 className="cq6-question">
            Cuộc kháng chiến chống Mỹ cứu nước (1954-1975) là sự nghiệp của riêng dân tộc Việt Nam hay là một bộ phận của phong trào cách mạng thế giới?
          </h2>
          <p className="cq6-question-en">
            Was the resistance war against American imperialism (1954-1975) Vietnam's national endeavor or part of the global revolutionary movement?
          </p>
          <p className="cq6-hint">
            💡 Gợi ý: Khám phá các trang bên dưới để tìm hiểu về vai trò lãnh đạo của Đảng Cộng sản Việt Nam và bối cảnh quốc tế trong cuộc chiến này.
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
        <p>© 2024 Ký Ức Dân Tộc — Dự án giáo dục lịch sử / Educational History Project</p>
        <a href="/secret" className="secret-link">x</a>
      </footer>

      <style>{`
        .home-page {
          min-height: 100vh;
        }

        /* Hero */
        .hero {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(180deg, var(--ink) 0%, #0d1220 100%);
        }

        .hero-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
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
          font-size: 0.75rem;
          color: var(--gold);
          margin-top: 1.5rem;
          opacity: 0.7;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 8vw, 6rem);
          letter-spacing: 0.2em;
          color: var(--parchment);
          margin: 0;
          text-shadow: 0 0 40px rgba(192, 57, 43, 0.3);
        }

        .hero-subtitle-container {
          min-height: 2rem;
          margin-top: 1rem;
        }

        .hero-subtitle {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--gold);
          font-style: italic;
        }

        .cursor {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .hero-image {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
        }

        .hero-photo {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        /* Stats */
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
          background: rgba(212, 168, 83, 0.1);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .stat-value {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--gold);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--ash);
          margin-top: 0.5rem;
        }

        /* CQ6 Section */
        .cq6-section {
          padding: 4rem 2rem;
          background: linear-gradient(180deg, var(--smoke) 0%, var(--ink) 100%);
        }

        .cq6-box {
          max-width: 900px;
          margin: 0 auto;
          background: var(--parchment);
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .cq6-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--crimson);
          margin-bottom: 1.5rem;
        }

        .cq6-question {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--ink);
          line-height: 1.5;
          margin: 0 0 1rem;
        }

        .cq6-question-en {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #555;
          font-style: italic;
          margin: 0 0 1.5rem;
        }

        .cq6-hint {
          font-size: 0.9rem;
          color: #666;
          padding: 1rem;
          background: rgba(192, 57, 43, 0.1);
          border-radius: 8px;
          margin: 0;
        }

        /* Navigation Cards */
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
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .nav-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .nav-card:hover {
          border-color: var(--crimson);
          box-shadow: 0 0 20px rgba(192, 57, 43, 0.3);
          transform: translateY(-4px);
        }

        .nav-card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .nav-card-label {
          font-family: var(--font-heading);
          font-size: 1.1rem;
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
          .hero-image {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            width: 100%;
            max-width: 300px;
            margin: 2rem auto 0;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nav-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cq6-question {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

// src/App.jsx
// Main App component with router and global layout

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';

// Pages
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import MapExplorer from './pages/MapExplorer';
import GameTimeline from './pages/GameTimeline';
import GameQuotes from './pages/GameQuotes';
import GameStrategy from './pages/GameStrategy';
import GameTrueFalse from './pages/GameTrueFalse';
import Rubric from './pages/Rubric';
import Resources from './pages/Resources';

// Easter egg pages
import Secret from './pages/Secret';

// CSS
import './index.css';

function AppContent() {
  const { showLoading, setShowLoading, handleKeyPress, showKonamiEasterEgg } = useApp();
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('focusMode') === 'true';
  });
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync focus mode with localStorage
  useEffect(() => {
    localStorage.setItem('focusMode', String(focusMode));
  }, [focusMode]);

  // Listen for focus mode changes from other components
  useEffect(() => {
    const handleStorage = () => {
      setFocusMode(localStorage.getItem('focusMode') === 'true');
    };
    const interval = setInterval(handleStorage, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle Konami code
  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyPress(e.key));
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const enterFocusMode = () => setFocusMode(true);
  const exitFocusMode = () => setFocusMode(false);

  return (
    <div className="app">
      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Konami Easter Egg overlay */}
      {showKonamiEasterEgg && (
        <div className="konami-overlay">
          <div className="konami-content">
            <h1>GIẢI PHÓNG!</h1>
            <p>30/4/1975</p>
          </div>
        </div>
      )}

      {/* Focus Mode Button - shown when not in focus mode */}
      {!focusMode && !isMobile && (
        <button
          onClick={enterFocusMode}
          style={{
            position: 'fixed',
            top: 16,
            left: 240,
            zIndex: 100,
            background: 'rgba(212,168,83,0.15)',
            border: '1px solid rgba(212,168,83,0.4)',
            color: '#D4A853',
            padding: '6px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'monospace'
          }}
        >
          ⛶ Tập trung / Focus
        </button>
      )}

      {/* Exit Focus Button - shown when in focus mode */}
      {focusMode && (
        <button
          onClick={exitFocusMode}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 100,
            background: 'rgba(212,168,83,0.15)',
            border: '1px solid rgba(212,168,83,0.4)',
            color: '#D4A853',
            padding: '6px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'monospace'
          }}
        >
          ← Thoát / Exit
        </button>
      )}

      {/* Main layout */}
      <div className="app-layout">
        {/* Sidebar navigation - always mounted for smooth animation, hidden via CSS on mobile */}
        {!isMobile && (
          <aside
            className={`app-sidebar${focusMode ? ' sidebar-hidden' : ''}`}
            style={{
              width: '220px',
              minWidth: '220px',
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              zIndex: 100
            }}
          >
            <Navigation />
          </aside>
        )}

        {/* Main content */}
        <main
          className="app-main"
          style={{
            flex: 1,
            minHeight: '100vh',
            marginLeft: (!focusMode && !isMobile) ? '220px' : 0,
            transition: 'margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/map" element={<MapExplorer />} />
              <Route path="/game/timeline" element={<GameTimeline />} />
              <Route path="/game/quotes" element={<GameQuotes />} />
              <Route path="/game/strategy" element={<GameStrategy />} />
              <Route path="/game/truefalse" element={<GameTrueFalse />} />
              <Route path="/rubric" element={<Rubric />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/secret" element={<Secret />} />
            </Routes>
          </PageTransition>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}

// Premium SVG Icons for Mobile Nav
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
  </svg>
);

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const GamesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="17" cy="10" r="1" fill="currentColor" />
    <circle cx="17" cy="14" r="1" fill="currentColor" />
  </svg>
);

const RubricIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ResourcesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Mobile navigation component
function MobileNav() {
  const [showGames, setShowGames] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowGames(false);
  }, [location.pathname]);

  const gameItems = [
    { path: '/game/timeline',  label: 'Sắp Xếp Lịch Sử', icon: '🎮' },
    { path: '/game/quotes',    label: 'Ai Nói Điều Này?', icon: '💬' },
    { path: '/game/strategy',  label: 'Chiến Lược Gia',   icon: '♟️' },
    { path: '/game/truefalse', label: 'Nhanh Như Chớp',   icon: '⚡' },
  ];

  const isGameActive = gameItems.some(i => location.pathname === i.path);

  return (
    <>
      {/* Game sub-menu popup */}
      {showGames && (
        <div style={{
          position: 'fixed', bottom: '65px', left: 0, right: 0, zIndex: 999,
          background: 'rgba(10,14,26,0.97)',
          borderTop: '1px solid rgba(212,168,83,0.25)',
          padding: '0.75rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem',
          backdropFilter: 'blur(12px)',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          {gameItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.7rem 0.75rem', borderRadius: '8px',
                background: isActive ? 'rgba(212,168,83,0.18)' : 'rgba(255,255,255,0.04)',
                color: isActive ? '#D4A853' : '#8B96A8',
                textDecoration: 'none', fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)', border: '1px solid',
                borderColor: isActive ? 'rgba(212,168,83,0.3)' : 'rgba(255,255,255,0.07)',
                transition: 'all 0.15s'
              })}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}

      {/* Bottom bar: [Thời Gian] [Bản Đồ] [● Tổng Quan ●] [Game] [Tiêu Chí] [Tài Liệu] */}
      <nav className="mobile-nav">
        {/* Left side */}
        <NavLink to="/timeline" className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
          <span className="mobile-nav-icon"><TimelineIcon /></span>
          <span>Thời Gian</span>
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
          <span className="mobile-nav-icon"><MapIcon /></span>
          <span>Bản Đồ</span>
        </NavLink>

        {/* Center home — elevated */}
        <NavLink to="/" end className={({ isActive }) => `mobile-nav-item mobile-nav-home${isActive ? ' active' : ''}`}>
          <span className="mobile-nav-home-btn">
            <HomeIcon />
          </span>
          <span>Tổng Quan</span>
        </NavLink>

        {/* Right side */}
        <button
          className={`mobile-nav-item${(showGames || isGameActive) ? ' active' : ''}`}
          onClick={() => setShowGames(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <span className="mobile-nav-icon"><GamesIcon /></span>
          <span>Game</span>
        </button>
        <NavLink to="/rubric" className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
          <span className="mobile-nav-icon"><RubricIcon /></span>
          <span>Tiêu Chí</span>
        </NavLink>
        <NavLink to="/resources" className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
          <span className="mobile-nav-icon"><ResourcesIcon /></span>
          <span>Tài Liệu</span>
        </NavLink>
      </nav>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

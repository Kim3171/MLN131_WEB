// src/App.jsx
// Main App component with router and global layout

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  // Handle Konami code
  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyPress(e.key));
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

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

      {/* Main layout */}
      <div className="app-layout">
        {/* Sidebar navigation */}
        <aside className="app-sidebar">
          <Navigation />
        </aside>

        {/* Main content */}
        <main className="app-main">
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

// Mobile navigation component
function MobileNav() {
  return (
    <nav className="mobile-nav">
      <a href="/" className="mobile-nav-item">
        <span className="mobile-nav-icon">🏠</span>
        <span>Home</span>
      </a>
      <a href="/timeline" className="mobile-nav-item">
        <span className="mobile-nav-icon">📅</span>
        <span>Timeline</span>
      </a>
      <a href="/map" className="mobile-nav-item">
        <span className="mobile-nav-icon">🗺️</span>
        <span>Map</span>
      </a>
      <a href="/rubric" className="mobile-nav-item">
        <span className="mobile-nav-icon">📋</span>
        <span>Rubric</span>
      </a>
      <a href="/resources" className="mobile-nav-item">
        <span className="mobile-nav-icon">📚</span>
        <span>Resources</span>
      </a>
    </nav>
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

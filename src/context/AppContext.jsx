// src/context/AppContext.jsx
// Global state management for game scores, dark mode, and completed pages

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(true);

  // Game scores
  const [scores, setScores] = useState({
    timeline: 0,
    quotes: 0,
    strategy: 0,
    trueFalse: 0
  });

  // Completed pages for tracking
  const [completedPages, setCompletedPages] = useState({
    home: false,
    timeline: false,
    map: false,
    gameTimeline: false,
    gameQuotes: false,
    gameStrategy: false,
    gameTrueFalse: false,
    rubric: false,
    resources: false
  });

  // Visited timeline events (for AI summary feature)
  const [visitedEvents, setVisitedEvents] = useState([]);

  // Loading screen state
  const [showLoading, setShowLoading] = useState(true);

  // Labubu easter egg click count
  const [labubuClicks, setLabubuClicks] = useState(0);

  // Konami code sequence
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showKonamiEasterEgg, setShowKonamiEasterEgg] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('kyuc-dark-mode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedScores = localStorage.getItem('kyuc-scores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }

    const savedCompleted = localStorage.getItem('kyuc-completed');
    if (savedCompleted) {
      setCompletedPages(JSON.parse(savedCompleted));
    }
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('kyuc-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save scores to localStorage
  useEffect(() => {
    localStorage.setItem('kyuc-scores', JSON.stringify(scores));
  }, [scores]);

  // Save completed pages to localStorage
  useEffect(() => {
    localStorage.setItem('kyuc-completed', JSON.stringify(completedPages));
  }, [completedPages]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Update score for a specific game
  const updateScore = (game, points) => {
    setScores(prev => ({
      ...prev,
      [game]: prev[game] + points
    }));
  };

  // Reset scores
  const resetScores = () => {
    setScores({
      timeline: 0,
      quotes: 0,
      strategy: 0,
      trueFalse: 0
    });
    localStorage.removeItem('kyuc-scores');
  };

  // Mark a page as completed
  const markPageComplete = (page) => {
    setCompletedPages(prev => ({
      ...prev,
      [page]: true
    }));
  };

  // Add visited event for timeline
  const addVisitedEvent = (eventId) => {
    if (!visitedEvents.includes(eventId)) {
      setVisitedEvents(prev => [...prev, eventId]);
    }
  };

  // Reset visited events
  const resetVisitedEvents = () => {
    setVisitedEvents([]);
  };

  // Handle Konami code
  const handleKeyPress = (key) => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    if (key === konamiCode[konamiIndex]) {
      const newIndex = konamiIndex + 1;
      if (newIndex === konamiCode.length) {
        setShowKonamiEasterEgg(true);
        setKonamiIndex(0);
        setTimeout(() => setShowKonamiEasterEgg(false), 3000);
      } else {
        setKonamiIndex(newIndex);
      }
    } else {
      setKonamiIndex(0);
    }
  };

  // Add labubu click
  const handleLabubuClick = () => {
    const newClicks = labubuClicks + 1;
    setLabubuClicks(newClicks);
    return newClicks;
  };

  // Reset labubu clicks
  const resetLabubuClicks = () => {
    setLabubuClicks(0);
  };

  // Calculate total score
  const totalScore = scores.timeline + scores.quotes + scores.strategy + scores.trueFalse;

  const value = {
    darkMode,
    toggleDarkMode,
    scores,
    updateScore,
    resetScores,
    completedPages,
    markPageComplete,
    visitedEvents,
    addVisitedEvent,
    resetVisitedEvents,
    showLoading,
    setShowLoading,
    labubuClicks,
    handleLabubuClick,
    resetLabubuClicks,
    handleKeyPress,
    showKonamiEasterEgg,
    totalScore
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;

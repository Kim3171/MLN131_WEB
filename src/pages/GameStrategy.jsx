// src/pages/GameStrategy.jsx
// Scenario decisions game (Game 3) with AI hints

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import scenarios from '../data/scenarios';
import GameCard from '../components/GameCard';
import ClassifiedStamp from '../components/svgs/ClassifiedStamp';
import { useApp } from '../context/AppContext';
import { askClaude, strategyHintSystemPrompt } from '../lib/claude';

export default function GameStrategy() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [score, setScore] = useState(0);
  const [showAIHint, setShowAIHint] = useState(false);
  const [aiHint, setAiHint] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);
  const [gameState, setGameState] = useState('playing');
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('focusMode') === 'true';
  });
  const { updateScore } = useApp();

  // Sync focus mode with global state
  useEffect(() => {
    const handleStorage = () => {
      setFocusMode(localStorage.getItem('focusMode') === 'true');
    };
    const interval = setInterval(handleStorage, 100);
    return () => clearInterval(interval);
  }, []);

  const scenario = scenarios[currentScenario];

  const handleChoice = (choice) => {
    if (showOutcome) return;

    setSelectedChoice(choice);
    setShowOutcome(true);

    if (choice.correct) {
      setScore(prev => prev + 20);
    }
  };

  const handleAIHint = async () => {
    setShowAIHint(true);
    setLoadingHint(true);

    try {
      const response = await askClaude(strategyHintSystemPrompt, scenario.aiContext);
      setAiHint(response);
    } catch (error) {
      setAiHint('Unable to get hint. Please try again.');
    }
    setLoadingHint(false);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedChoice(null);
      setShowOutcome(false);
      setShowAIHint(false);
      setAiHint('');
    } else {
      updateScore('strategy', score);
      setGameState('finished');
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setShowOutcome(false);
    setScore(0);
    setShowAIHint(false);
    setAiHint('');
    setGameState('playing');
  };

  // Cleanup focus mode on unmount
  useEffect(() => {
    return () => localStorage.setItem('focusMode', 'false');
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 'auto', paddingBottom: '80px' }}>
      <style>{`
        .game-dragon {
          display: block;
        }
        @media (max-width: 768px) {
          .game-dragon { display: none !important; }
        }
        .focus-exit-btn {
          display: block;
        }
        @media (max-width: 768px) {
          .focus-exit-btn { display: none !important; }
        }
      `}</style>

      {/* Left Dragon */}
      <img
        src="/dragon_left.jpg"
        alt=""
        className="game-dragon"
        style={{
          position: 'fixed',
          left: focusMode ? 0 : '220px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '90vh',
          width: 'auto',
          opacity: 0.35,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
          transition: 'left 0.3s ease'
        }}
      />

      {/* Right Dragon */}
      <img
        src="/dragon_right.jpg"
        alt=""
        className="game-dragon"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '90vh',
          width: 'auto',
          opacity: 0.35,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none'
        }}
      />

      {/* Existing page content wrapped in z-index */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="game-strategy-page">
      <GameCard title="Chiến Lược Gia" titleEn="Strategist" gameKey="strategy">
        {/* Classified header */}
        <div className="classified-header">
          <ClassifiedStamp size={40} />
          <span>TUYỆT MẬT / TOP SECRET</span>
        </div>

        {/* Progress */}
        <div className="scenario-progress">
          <span>{currentScenario + 1} / {scenarios.length}</span>
        </div>

        {gameState === 'playing' && (
          <>
            {/* Scenario */}
            <div className="scenario-container">
              <div className="scenario-year">{scenario.year}</div>
              <h3 className="scenario-title">{scenario.titleVi}</h3>
              <p className="scenario-title-en">{scenario.titleEn}</p>
              <p className="scenario-situation">{scenario.situationVi}</p>
              <p className="scenario-situation-en">{scenario.situationEn}</p>
            </div>

            {/* Choices */}
            <div className="choices-container">
              {scenario.choices.map((choice, index) => {
                const isSelected = selectedChoice === choice;
                const isCorrect = choice.correct;

                let choiceClass = 'choice-btn';
                if (showOutcome) {
                  if (isCorrect) choiceClass += ' correct';
                  else if (isSelected) choiceClass += ' wrong';
                }

                return (
                  <motion.button
                    key={index}
                    className={choiceClass}
                    onClick={() => handleChoice(choice)}
                    disabled={showOutcome}
                    whileHover={{ scale: showOutcome ? 1 : 1.02 }}
                    whileTap={{ scale: showOutcome ? 1 : 0.98 }}
                  >
                    <span className="choice-label">{choice.label}</span>
                    <div className="choice-content">
                      <span className="choice-title">{choice.labelVi}</span>
                      <span className="choice-desc">{choice.descriptionVi}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Outcome */}
            <AnimatePresence>
              {showOutcome && (
                <motion.div
                  className="outcome-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="outcome">
                    <h4>Kết quả lịch sử / Historical Outcome:</h4>
                    <p>{selectedChoice?.outcomeVi}</p>
                  </div>

                  {/* AI Hint Button */}
                  {!showAIHint && (
                    <button className="ai-hint-btn" onClick={handleAIHint}>
                      🤖 Hỏi nhà sử học / Ask Historian
                    </button>
                  )}

                  {/* AI Hint */}
                  {showAIHint && (
                    <motion.div
                      className="ai-hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="ai-hint-header">
                        <span className="ai-icon">🤖</span>
                        <span>Nhà sử học / Historian:</span>
                      </div>
                      {loadingHint ? (
                        <div className="ai-loading">
                          <span className="loading-dots">...</span>
                        </div>
                      ) : (
                        <p>{aiHint}</p>
                      )}
                    </motion.div>
                  )}

                  <button className="next-btn" onClick={handleNext}>
                    {currentScenario < scenarios.length - 1 ? 'Tiếp theo / Next →' : 'Xem kết quả / View Results'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Final Score */}
        {gameState === 'finished' && (
          <div className="final-score">
            <h3>Hoàn thành! / Completed!</h3>
            <p>Điểm số / Score: {score} / {scenarios.length * 20}</p>
            <p className="score-label">
              {score >= scenarios.length * 15 ? 'Xuất sắc! / Excellent!' :
               score >= scenarios.length * 10 ? 'Tốt! / Good!' :
               'Cần cải thiện! / Needs Improvement!'}
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              Chơi lại / Play Again
            </button>
          </div>
        )}
      </GameCard>

      <style>{`
        .game-strategy-page {
          min-height: 100vh;
        }

        .game-strategy-page .game-card {
          max-width: ${focusMode ? '860px' : '680px'};
          transition: max-width 0.3s ease;
        }

        .classified-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--crimson);
        }

        .scenario-progress {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ash);
          margin-bottom: 1.5rem;
        }

        .scenario-container {
          background: rgba(30, 37, 53, 0.5);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .scenario-year {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--crimson);
          color: var(--parchment);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .scenario-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .scenario-title-en {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--gold);
          margin: 0 0 1rem;
        }

        .scenario-situation {
          font-size: 0.95rem;
          color: var(--parchment);
          line-height: 1.6;
          margin: 0 0 0.5rem;
        }

        .scenario-situation-en {
          font-size: 0.85rem;
          color: var(--ash);
          font-style: italic;
          margin: 0;
        }

        .choices-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .choice-btn {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: var(--smoke);
          border: 2px solid rgba(212, 168, 83, 0.2);
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }

        .choice-btn:hover:not(:disabled) {
          border-color: var(--gold);
          background: rgba(212, 168, 83, 0.1);
        }

        .choice-btn:disabled {
          cursor: not-allowed;
        }

        .choice-btn.correct {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .choice-btn.wrong {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .choice-label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--olive);
          color: var(--parchment);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-weight: bold;
          flex-shrink: 0;
        }

        .choice-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .choice-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
        }

        .choice-desc {
          font-size: 0.85rem;
          color: var(--ash);
        }

        .outcome-container {
          background: rgba(30, 37, 53, 0.8);
          border: 1px solid var(--gold);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .outcome h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--gold);
          margin: 0 0 0.75rem;
        }

        .outcome p {
          font-size: 0.9rem;
          color: var(--parchment);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }

        .ai-hint-btn {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          border: 1px solid var(--olive);
          color: var(--olive);
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-body);
          margin-bottom: 1rem;
          transition: all 0.2s;
        }

        .ai-hint-btn:hover {
          background: rgba(107, 122, 58, 0.2);
        }

        .ai-hint {
          background: rgba(107, 122, 58, 0.1);
          border: 1px solid var(--olive);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .ai-hint-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--olive);
          margin-bottom: 0.5rem;
        }

        .ai-hint p {
          font-size: 0.9rem;
          color: var(--parchment);
          line-height: 1.6;
          margin: 0;
        }

        .ai-loading {
          color: var(--crimson);
          font-family: var(--font-mono);
        }

        .next-btn,
        .restart-btn {
          width: 100%;
          padding: 1rem;
          background: var(--crimson);
          color: var(--parchment);
          border: none;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .next-btn:hover,
        .restart-btn:hover {
          background: #a33025;
        }

        .final-score {
          text-align: center;
          padding: 2rem;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 12px;
        }

        .final-score h3 {
          font-family: var(--font-heading);
          color: var(--gold);
          margin: 0 0 0.5rem;
        }

        .final-score p {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          color: var(--parchment);
          margin: 0 0 0.5rem;
        }

        .final-score .score-label {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--olive);
          margin: 0 0 1.5rem;
        }
      `}</style>
      </div>
      </div>
    </div>
  );
}

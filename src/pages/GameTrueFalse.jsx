// src/pages/GameTrueFalse.jsx
// Rapid swipe True/False game (Game 4) - Premium version with mobile countdown

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import trueFalseQuestions from '../data/trueFalse';
import GameCard from '../components/GameCard';
import RedStar from '../components/svgs/RedStar';
import { useApp } from '../context/AppContext';

export default function GameTrueFalse() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameState, setGameState] = useState('playing');
  const [combo, setCombo] = useState(1);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('focusMode') === 'true';
  });
  const cardRef = useRef(null);
  const { updateScore } = useApp();

  // Sync focus mode with global state
  useEffect(() => {
    const handleStorage = () => {
      setFocusMode(localStorage.getItem('focusMode') === 'true');
    };
    const interval = setInterval(handleStorage, 100);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const question = trueFalseQuestions[currentQuestion];

  // Timer with large countdown display
  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(null); // Time's up = wrong
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showResult, currentQuestion]);

  const playSound = (correct) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = correct ? 440 : 220;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported
    }
  };

  const handleAnswer = (answer) => {
    if (showResult) return;

    const isCorrect = answer === question.answer;
    setSelectedAnswer(answer);
    setShowResult(true);
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      const points = 10 * combo;
      setScore(prev => prev + points);
      setCombo(prev => Math.min(prev + 1, 3));
      playSound(true);
    } else {
      setCombo(1);
      playSound(false);
    }

    setTimeout(() => {
      if (currentQuestion < trueFalseQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(5);
      } else {
        // Game over
        const finalScore = isCorrect ? score + (10 * combo) : score;
        updateScore('trueFalse', finalScore);
        setGameState('finished');
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(5);
    setCombo(1);
    setGameState('playing');
    setLastAnswerCorrect(null);
  };

  // Cleanup focus mode on unmount
  useEffect(() => {
    return () => localStorage.setItem('focusMode', 'false');
  }, []);

  const handleKeyDown = (e) => {
    if (gameState !== 'playing' || showResult) return;

    if (e.key === 'ArrowLeft') {
      handleAnswer(false);
    } else if (e.key === 'ArrowRight') {
      handleAnswer(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

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
        <div className="game-truefalse-page">
      <GameCard title="Nhanh Như Chớp" titleEn="Quick True/False" gameKey="trueFalse">
        {gameState === 'playing' && (
          <>
            {/* Sticky Timer Bar */}
            <div className={`sticky-timer ${timeLeft <= 2 ? 'danger' : ''}`}>
              <div className="timer-progress" style={{ width: `${(timeLeft / 5) * 100}%` }} />
              <div className="timer-content">
                <span className="timer-label">Time</span>
                <motion.span
                  className="timer-countdown"
                  key={timeLeft}
                  initial={{ scale: 1.3, color: '#C0392B' }}
                  animate={{ scale: 1, color: timeLeft <= 2 ? '#C0392B' : '#D4A853' }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft}
                </motion.span>
              </div>
            </div>

            {/* Progress */}
            <div className="quiz-progress">
              <span>{currentQuestion + 1} / {trueFalseQuestions.length}</span>
              <div className="combo">
                {combo > 1 && (
                  <motion.span
                    className="combo-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <RedStar size={12} />
                    ×{combo}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Card */}
            <div className="question-card" ref={cardRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  className="question-content"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                >
                  <span className="difficulty-badge" data-difficulty={question.difficulty}>
                    {question.difficulty === 'easy' ? 'Dễ / Easy' : question.difficulty === 'medium' ? 'Trung bình / Medium' : 'Khó / Hard'}
                  </span>

                  <p className="statement-vi">{question.statementVi}</p>
                  <p className="statement-en">{question.statementEn}</p>
                </motion.div>
              </AnimatePresence>

              {/* Result feedback */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    className={`result-overlay ${lastAnswerCorrect ? 'correct' : 'wrong'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="result-icon">{lastAnswerCorrect ? '✓' : '✗'}</span>
                    <p>{lastAnswerCorrect ? 'Đúng! / Correct!' : 'Sai! / Wrong!'}</p>
                    <p className="explanation">
                      {question.explanationVi}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Large Touch Controls */}
            <div className="controls">
              <motion.button
                className="control-btn false"
                onClick={() => handleAnswer(false)}
                disabled={showResult}
                whileTap={{ scale: 0.95 }}
              >
                <span className="arrow">←</span>
                <span>SAI</span>
                <span className="label-en">FALSE</span>
              </motion.button>
              <motion.button
                className="control-btn true"
                onClick={() => handleAnswer(true)}
                disabled={showResult}
                whileTap={{ scale: 0.95 }}
              >
                <span>ĐÚNG</span>
                <span className="label-en">TRUE</span>
                <span className="arrow">→</span>
              </motion.button>
            </div>

            <p className="hint">
              Sử dụng phím mũi tên hoặc chạm nút / Use arrow keys or tap buttons
            </p>
          </>
        )}

        {/* Final Score */}
        {gameState === 'finished' && (
          <motion.div
            className="final-score"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <h3>Hoàn thành! / Completed!</h3>
            <p className="final-score-value">{score} / 200</p>
            <p className="grade">
              {score >= 160 ? 'Xuất sắc! / Excellent!' :
               score >= 120 ? 'Tốt! / Good!' :
               score >= 80 ? 'Trung bình / Average' :
               'Cần cải thiện / Needs Work'}
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              Chơi lại / Play Again
            </button>
          </motion.div>
        )}
      </GameCard>

      <style>{`
        .game-truefalse-page {
          min-height: auto;
          padding-bottom: 80px;
        }

        .game-truefalse-page .game-card {
          width: 100%;
          max-width: ${focusMode ? '860px' : '680px'};
          margin: 0 auto;
          height: auto;
          padding-bottom: 2rem;
          transition: max-width 0.3s ease;
        }

        /* Sticky Timer Bar */
        .sticky-timer {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(10, 14, 26, 0.95);
          border: 1px solid rgba(212, 168, 83, 0.3);
          border-radius: 12px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .timer-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, var(--crimson), var(--gold));
          transition: width 1s linear;
          opacity: 0.3;
        }

        .sticky-timer.danger .timer-progress {
          background: var(--crimson);
          animation: timerPulse 0.5s ease-in-out infinite;
        }

        @keyframes timerPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .timer-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
        }

        .timer-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ash);
        }

        .timer-countdown {
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: bold;
          color: var(--gold);
        }

        .quiz-progress {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ash);
        }

        .combo-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--crimson);
          color: var(--parchment);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: bold;
        }

        .question-card {
          position: relative;
          background: var(--smoke);
          border: 2px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          padding: 2rem;
          min-height: 300px;
          margin-bottom: 1.5rem;
        }

        .question-content {
          text-align: center;
        }

        .difficulty-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          margin-bottom: 1rem;
        }

        .difficulty-badge[data-difficulty="easy"] {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .difficulty-badge[data-difficulty="medium"] {
          background: rgba(212, 168, 83, 0.2);
          color: var(--gold);
        }

        .difficulty-badge[data-difficulty="hard"] {
          background: rgba(192, 57, 43, 0.2);
          color: var(--crimson);
        }

        .statement-vi {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--parchment);
          margin: 0 0 1rem;
          line-height: 1.5;
        }

        .statement-en {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--ash);
          font-style: italic;
          margin: 0;
        }

        .result-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .result-overlay.correct {
          background: rgba(34, 197, 94, 0.9);
        }

        .result-overlay.wrong {
          background: rgba(239, 68, 68, 0.9);
        }

        .result-icon {
          font-size: 3rem;
          color: var(--parchment);
          margin-bottom: 0.5rem;
        }

        .result-overlay p {
          color: var(--parchment);
          margin: 0;
          text-align: center;
        }

        .explanation {
          font-size: 0.85rem;
          margin-top: 0.5rem;
          opacity: 0.9;
        }

        /* Large Touch Controls */
        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .control-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 2rem 1rem;
          border: none;
          border-radius: 16px;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 100px;
        }

        .control-btn .label-en {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: normal;
          opacity: 0.8;
        }

        .control-btn.false {
          background: var(--smoke);
          border: 3px solid var(--ash);
          color: var(--ash);
        }

        .control-btn.false:hover:not(:disabled) {
          border-color: var(--crimson);
          color: var(--crimson);
          background: rgba(192, 57, 43, 0.1);
        }

        .control-btn.true {
          background: var(--crimson);
          color: var(--parchment);
          border: 3px solid var(--crimson);
        }

        .control-btn.true:hover:not(:disabled) {
          background: #a33025;
          box-shadow: 0 0 20px rgba(192, 57, 43, 0.5);
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .arrow {
          font-size: 2rem;
        }

        .hint {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ash);
          margin: 0;
        }

        .final-score {
          text-align: center;
          padding: 2rem;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 12px;
        }

        .final-score .stars {
          font-size: 2rem;
          color: var(--gold);
          margin-bottom: 1rem;
        }

        .final-score h3 {
          font-family: var(--font-heading);
          color: var(--gold);
          margin: 0 0 0.5rem;
        }

        .final-score-value {
          font-family: var(--font-mono);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
        }

        .grade {
          font-size: 1.25rem;
          color: var(--olive);
          margin: 0.5rem 0 1.5rem;
        }

        .restart-btn {
          padding: 0.75rem 2rem;
          background: var(--crimson);
          color: var(--parchment);
          border: none;
          border-radius: 8px;
          font-family: var(--font-heading);
          cursor: pointer;
        }

        .restart-btn:hover {
          background: #a33025;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .timer-content {
            padding: 0.75rem 1rem;
          }

          .timer-countdown {
            font-size: 1.5rem;
          }

          .control-btn {
            padding: 1.5rem 0.75rem;
            font-size: 1.25rem;
            min-height: 80px;
          }

          .control-btn .label-en {
            display: none;
          }

          .arrow {
            font-size: 1.5rem;
          }

          .question-card {
            padding: 1.5rem;
            min-height: 250px;
          }

          .statement-vi {
            font-size: 1.1rem;
          }
        }
      `}</style>
      </div>
      </div>
    </div>
  );
}

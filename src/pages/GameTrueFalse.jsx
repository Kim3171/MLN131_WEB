// src/pages/GameTrueFalse.jsx
// Rapid swipe True/False game (Game 4)

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import trueFalseQuestions from '../data/trueFalse';
import GameCard from '../components/GameCard';
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
  const cardRef = useRef(null);
  const { updateScore } = useApp();

  const question = trueFalseQuestions[currentQuestion];

  // Timer
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
    <div className="game-truefalse-page">
      <GameCard title="Nhanh Như Chớp" titleEn="Quick True/False" gameKey="trueFalse">
        {gameState === 'playing' && (
          <>
            {/* Progress */}
            <div className="quiz-progress">
              <span>{currentQuestion + 1} / {trueFalseQuestions.length}</span>
              <div className="combo">
                {combo > 1 && <span className="combo-badge">×{combo}</span>}
              </div>
            </div>

            {/* Timer */}
            <div className={`timer ${timeLeft <= 2 ? 'danger' : ''}`}>
              <div
                className="timer-bar"
                style={{ width: `${(timeLeft / 5) * 100}%` }}
              />
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
                    {question.difficulty}
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

            {/* Controls */}
            <div className="controls">
              <button
                className="control-btn false"
                onClick={() => handleAnswer(false)}
                disabled={showResult}
              >
                <span className="arrow">←</span>
                <span>FALSE</span>
              </button>
              <button
                className="control-btn true"
                onClick={() => handleAnswer(true)}
                disabled={showResult}
              >
                <span>TRUE</span>
                <span className="arrow">→</span>
              </button>
            </div>

            <p className="hint">
              Sử dụng phím mũi tên / Use arrow keys
            </p>
          </>
        )}

        {/* Final Score */}
        {gameState === 'finished' && (
          <div className="final-score">
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
          </div>
        )}
      </GameCard>

      <style>{`
        .game-truefalse-page {
          min-height: 100vh;
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
          background: var(--gold);
          color: var(--ink);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
        }

        .timer {
          height: 6px;
          background: rgba(212, 168, 83, 0.2);
          border-radius: 3px;
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .timer-bar {
          height: 100%;
          background: var(--gold);
          transition: width 1s linear;
        }

        .timer.danger .timer-bar {
          background: var(--crimson);
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
          gap: 0.5rem;
          padding: 1.5rem;
          border: none;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn.false {
          background: var(--smoke);
          border: 2px solid var(--ash);
          color: var(--ash);
        }

        .control-btn.false:hover:not(:disabled) {
          border-color: var(--crimson);
          color: var(--crimson);
        }

        .control-btn.true {
          background: var(--crimson);
          color: var(--parchment);
        }

        .control-btn.true:hover:not(:disabled) {
          background: #a33025;
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .arrow {
          font-size: 1.5rem;
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
      `}</style>
    </div>
  );
}

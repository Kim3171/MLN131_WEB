// src/pages/GameQuotes.jsx
// Quote matching game (Game 2)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import quotes from '../data/quotes';
import GameCard from '../components/GameCard';
import HistoricalPhoto from '../components/HistoricalPhoto';
import { useApp } from '../context/AppContext';
import { SPEAKER_IMAGES } from '../data/images';

export default function GameQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState('playing');
  const [shuffledQuotes, setShuffledQuotes] = useState([]);
  const { updateScore } = useApp();

  const currentData = shuffledQuotes[currentQuote] || quotes[0];

  // Initialize game
  useEffect(() => {
    const shuffled = [...quotes].sort(() => Math.random() - 0.5);
    setShuffledQuotes(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showResult || !currentData) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(-1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showResult, currentQuote, currentData]);

  // Get 4 speaker options
  const getOptions = () => {
    if (!currentData) return [];
    const correctSpeaker = currentData.speakerVi;
    const otherSpeakers = quotes
      .filter(q => q.speakerVi !== correctSpeaker)
      .map(q => q.speakerVi)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [...otherSpeakers, correctSpeaker].sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (currentData) {
      setOptions(getOptions());
    }
  }, [currentQuote, currentData]);

  const handleAnswer = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentData.speakerVi) {
      setScore(prev => prev + 10);
    }

    setTimeout(() => {
      if (currentQuote < quotes.length - 1) {
        setCurrentQuote(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        const finalScore = answer === currentData.speakerVi ? score + 10 : score;
        updateScore('quotes', finalScore);
        setGameState('finished');
      }
    }, 2500);
  };

  const handleRestart = () => {
    const shuffled = [...quotes].sort(() => Math.random() - 0.5);
    setShuffledQuotes(shuffled);
    setCurrentQuote(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(15);
    setGameState('playing');
  };

  // Get speaker initials for watermark
  const getSpeakerInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('');
  };

  // Get speaker image key
  const getSpeakerImageKey = (speakerName) => {
    return SPEAKER_IMAGES[speakerName] || null;
  };

  if (!currentData) return null;

  return (
    <div className="game-quotes-page">
      <GameCard title="Ai Nói Điều Này?" titleEn="Who Said It?" gameKey="quotes">
        {/* Progress */}
        <div className="quiz-progress">
          <span>{currentQuote + 1} / {quotes.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuote + 1) / quotes.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Progress dots */}
        <div className="progress-dots">
          {quotes.map((_, i) => (
            <span
              key={i}
              className={`progress-dot ${i === currentQuote ? 'current' : i < currentQuote ? 'completed' : 'future'}`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className={`timer ${timeLeft <= 5 ? 'danger' : ''}`}>
          <span>{timeLeft}s</span>
        </div>

        {/* Speaker initials watermark (when not showing result) */}
        {!showResult && (
          <div className="speaker-watermark">
            {getSpeakerInitials(currentData.speakerVi)}
          </div>
        )}

        {/* Quote */}
        <div className="quote-container">
          <blockquote className="quote">
            "{currentData.quoteVi}"
          </blockquote>
          <p className="quote-en">"{currentData.quoteEn}"</p>
          <span className="quote-year">{currentData.year}</span>
        </div>

        {/* Options */}
        <div className="options-grid">
          {options.map((option, index) => {
            const isCorrect = option === currentData.speakerVi;
            const isSelected = selectedAnswer === option;

            let buttonClass = 'option-btn';
            if (showResult) {
              if (isCorrect) buttonClass += ' correct';
              else if (isSelected) buttonClass += ' wrong';
            }

            return (
              <motion.button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <span className="option-initial">
                  {option.split(' ').map(w => w[0]).join('')}
                </span>
                <span className="option-name">{option}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Result feedback with speaker photo */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className={`result-feedback ${selectedAnswer === currentData.speakerVi ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="result-header">
                {selectedAnswer === currentData.speakerVi ? (
                  <>
                    <span className="result-icon">✓</span>
                    <span>Đúng! / Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="result-icon">✗</span>
                    <span>Đáp án đúng: {currentData.speakerVi}</span>
                  </>
                )}
              </div>

              {/* Speaker photo slide-up */}
              <motion.div
                className="speaker-photo-panel"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {getSpeakerImageKey(currentData.speakerVi) ? (
                  <HistoricalPhoto
                    imageKey={getSpeakerImageKey(currentData.speakerVi)}
                    alt={currentData.speakerEn}
                    caption={currentData.speakerVi}
                    className="speaker-photo"
                  />
                ) : (
                  <div className="speaker-placeholder">
                    <span className="placeholder-initials">{getSpeakerInitials(currentData.speakerVi)}</span>
                  </div>
                )}
                <p className="speaker-context">{currentData.context}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Score */}
        {gameState === 'finished' && (
          <div className="final-score">
            <h3>Hoàn thành! / Completed!</h3>
            <p>Điểm số / Score: {score}</p>
            <button className="restart-btn" onClick={handleRestart}>
              Chơi lại / Play Again
            </button>
          </div>
        )}
      </GameCard>

      <style>{`
        .game-quotes-page {
          min-height: 100vh;
        }

        .quiz-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ash);
        }

        .progress-bar {
          flex: 1;
          height: 4px;
          background: rgba(212, 168, 83, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--gold);
          transition: width 0.3s;
        }

        .progress-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 1rem;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ash);
          opacity: 0.3;
          transition: all 0.3s;
        }

        .progress-dot.current {
          width: 12px;
          height: 12px;
          background: var(--gold);
          opacity: 1;
        }

        .progress-dot.completed {
          background: var(--crimson);
          opacity: 1;
        }

        .progress-dot.future {
          background: var(--ash);
          opacity: 0.3;
        }

        .timer {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--smoke);
          border: 2px solid var(--gold);
          font-family: var(--font-mono);
          font-weight: bold;
          color: var(--gold);
        }

        .timer.danger {
          border-color: var(--crimson);
          color: var(--crimson);
          animation: pulse 1s infinite;
        }

        .speaker-watermark {
          position: absolute;
          bottom: 30%;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-heading);
          font-size: 200px;
          color: var(--parchment);
          opacity: 0.04;
          pointer-events: none;
          user-select: none;
        }

        .quote-container {
          text-align: center;
          padding: 2rem;
          background: rgba(242, 232, 213, 0.05);
          border-radius: 12px;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .quote {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--parchment);
          margin: 0 0 1rem;
          line-height: 1.5;
        }

        .quote-en {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ash);
          font-style: italic;
          margin: 0 0 1rem;
        }

        .quote-year {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--gold);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--smoke);
          border: 2px solid rgba(212, 168, 83, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-btn:hover:not(:disabled) {
          border-color: var(--gold);
          background: rgba(212, 168, 83, 0.1);
        }

        .option-btn:disabled {
          cursor: not-allowed;
        }

        .option-btn.correct {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .option-btn.wrong {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .option-initial {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--olive);
          color: var(--parchment);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-weight: bold;
          flex-shrink: 0;
        }

        .option-name {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--parchment);
          text-align: left;
        }

        .result-feedback {
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .result-feedback.correct {
          background: rgba(34, 197, 94, 0.1);
        }

        .result-feedback.wrong {
          background: rgba(239, 68, 68, 0.1);
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: var(--parchment);
        }

        .result-icon {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .speaker-photo-panel {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          overflow: hidden;
          margin-top: 1rem;
        }

        .speaker-photo {
          height: 150px;
        }

        .speaker-placeholder {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--smoke);
        }

        .placeholder-initials {
          font-family: var(--font-heading);
          font-size: 4rem;
          color: var(--gold);
          opacity: 0.5;
        }

        .speaker-context {
          padding: 0.75rem;
          font-size: 0.8rem;
          color: var(--parchment);
          text-align: center;
          margin: 0;
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
          margin: 0 0 1.5rem;
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

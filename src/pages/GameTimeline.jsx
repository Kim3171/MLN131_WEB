// src/pages/GameTimeline.jsx
// Drag-to-order timeline game (Game 1)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import events from '../data/events';
import GameCard from '../components/GameCard';
import ClassifiedStamp from '../components/svgs/ClassifiedStamp';
import { useApp } from '../context/AppContext';

export default function GameTimeline() {
  const [cards, setCards] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, submitted, finished
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const { updateScore } = useApp();

  // Initialize game
  useEffect(() => {
    const shuffled = [...events]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((event, index) => ({
        ...event,
        currentPosition: index
      }));
    setCards(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const moveCard = (dragIndex, dropIndex) => {
    const newCards = [...cards];
    const [movedCard] = newCards.splice(dragIndex, 1);
    newCards.splice(dropIndex, 0, movedCard);
    setCards(newCards.map((card, index) => ({ ...card, currentPosition: index })));
  };

  const handleSubmit = () => {
    let newScore = 0;
    cards.forEach((card, index) => {
      const correctIndex = events.findIndex(e => e.id === card.id);
      if (index === correctIndex) {
        newScore += 10;
      } else {
        newScore -= 2;
      }
    });

    // Speed bonus
    if (timeLeft > 30) newScore += 20;
    else if (timeLeft > 15) newScore += 10;

    newScore = Math.max(0, newScore);
    setScore(newScore);
    updateScore('timeline', newScore);
    setGameState('submitted');

    setTimeout(() => setGameState('finished'), 3000);
  };

  const handleRestart = () => {
    const shuffled = [...events]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((event, index) => ({
        ...event,
        currentPosition: index
      }));
    setCards(shuffled);
    setTimeLeft(60);
    setScore(0);
    setGameState('playing');
  };

  const getCardStyle = (card) => {
    if (gameState === 'submitted' || gameState === 'finished') {
      const correctIndex = events.findIndex(e => e.id === card.id);
      const currentIndex = cards.findIndex(c => c.id === card.id);
      if (currentIndex === correctIndex) {
        return { borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.1)' };
      } else {
        return { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' };
      }
    }
    return {};
  };

  return (
    <div className="game-timeline-page">
      <GameCard title="Sắp Xếp Lịch Sử" titleEn="Timeline Order Game" gameKey="timeline">
        {/* Timer */}
        <div className={`timer ${timeLeft <= 10 ? 'danger' : ''}`}>
          <span className="timer-label">Thời gian / Time:</span>
          <span className="timer-value">{timeLeft}s</span>
        </div>

        {/* Instructions */}
        <p className="game-instructions">
          Kéo và thả để sắp xếp các sự kiện theo thứ tự thời gian (sớm nhất đến muộn nhất).
          <br />
          Drag and drop to arrange events in chronological order (earliest to latest).
        </p>

        {/* Cards */}
        <div className="timeline-cards">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="timeline-card"
                style={getCardStyle(card)}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const dragIndex = index;
                  const dropIndex = offset.y > 50 ? Math.min(index + 1, cards.length - 1) :
                                   offset.y < -50 ? Math.max(index - 1, 0) : index;
                  if (dragIndex !== dropIndex) {
                    moveCard(dragIndex, dropIndex);
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ClassifiedStamp size={60} className="card-stamp" />
                <span className="card-position">{index + 1}</span>
                <div className="card-content">
                  <span className="card-year">{card.year}</span>
                  <span className="card-title">{card.titleVi}</span>
                </div>
                <div className="card-drag-hint">⋮⋮</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        {gameState === 'playing' && (
          <button className="submit-btn" onClick={handleSubmit}>
            Nộp bài / Submit
          </button>
        )}

        {/* Results */}
        {gameState !== 'playing' && (
          <div className="results">
            <h3>Điểm số / Score: {score}</h3>
            {gameState === 'finished' && (
              <button className="restart-btn" onClick={handleRestart}>
                Chơi lại / Play Again
              </button>
            )}
          </div>
        )}
      </GameCard>

      <style>{`
        .game-timeline-page {
          min-height: 100vh;
        }

        .timer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .timer.danger {
          background: rgba(192, 57, 43, 0.3);
          animation: pulse 1s infinite;
        }

        .timer-label {
          font-family: var(--font-mono);
          color: var(--ash);
        }

        .timer-value {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--gold);
        }

        .timer.danger .timer-value {
          color: var(--crimson);
        }

        .game-instructions {
          text-align: center;
          color: var(--ash);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .timeline-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .timeline-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--smoke);
          border: 2px solid rgba(212, 168, 83, 0.3);
          border-radius: 8px;
          cursor: grab;
          position: relative;
          transition: all 0.3s;
        }

        .timeline-card:active {
          cursor: grabbing;
        }

        .card-stamp {
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          opacity: 0.1;
        }

        .card-position {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--crimson);
          color: var(--parchment);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-weight: bold;
          flex-shrink: 0;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-year {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--gold);
        }

        .card-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
        }

        .card-drag-hint {
          color: var(--ash);
          font-size: 1.25rem;
          opacity: 0.5;
        }

        .submit-btn,
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

        .submit-btn:hover,
        .restart-btn:hover {
          background: #a33025;
        }

        .results {
          text-align: center;
          padding: 1rem;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 8px;
        }

        .results h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--gold);
          margin: 0 0 1rem;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

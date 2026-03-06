// src/pages/GameTimeline.jsx
// Drag-to-order timeline game (Game 1) - Premium version with intro modal and 2 rounds

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import events from '../data/events';
import GameCard from '../components/GameCard';
import ClassifiedStamp from '../components/svgs/ClassifiedStamp';
import RedStar from '../components/svgs/RedStar';
import { useApp } from '../context/AppContext';

const INTRO_MODAL = {
  titleVi: 'Sắp Xếp Lịch Sử',
  titleEn: 'Timeline Order Game',
  descVi: 'Kéo và thả các thẻ để sắp xếp các sự kiện theo thứ tự thời gian (từ sớm nhất đến muộn nhất).',
  descEn: 'Drag and drop cards to arrange events in chronological order (earliest to latest).',
  rulesVi: [
    'Mỗi thẻ đúng vị trí: +10 điểm',
    'Sai vị trí: -2 điểm',
    'Thời gian còn lại: Cộng thêm điểm thưởng',
    'Có 2 vòng chơi, lấy tổng điểm'
  ],
  rulesEn: [
    'Correct position: +10 points',
    'Wrong position: -2 points',
    'Time bonus: Extra points for speed',
    '2 rounds, total score combined'
  ],
  startBtn: 'Bắt đầu / Start'
};

export default function GameTimeline() {
  const [showIntro, setShowIntro] = useState(true);
  const [cards, setCards] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, submitted, finished
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [showCorrectOrder, setShowCorrectOrder] = useState(false);
  const { updateScore } = useApp();
  const containerRef = useRef(null);

  // Initialize game
  const initGame = () => {
    // Step 1: Get 8 random events
    const shuffled = [...events]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    // Step 2: Sort chronologically to determine correct order (1-8)
    const sortedByYear = [...shuffled].sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return yearA - yearB;
    });

    // Create a map of event id -> correct position (1-8)
    const correctPositions = {};
    sortedByYear.forEach((event, index) => {
      correctPositions[event.id] = index + 1;
    });

    // Step 3: Assign correctPosition and shuffle for display
    const gameCards = shuffled.map((event) => ({
      ...event,
      correctPosition: correctPositions[event.id],
      currentPosition: 0 // will be set by shuffle
    }));

    // Step 4: Shuffle the display order
    gameCards.sort(() => Math.random() - 0.5);
    gameCards.forEach((card, index) => {
      card.currentPosition = index;
    });

    setCards(gameCards);
    setTimeLeft(60);
    setScore(0);
    setShowCorrectOrder(false);
  };

  // Start game
  const handleStart = () => {
    setShowIntro(false);
    initGame();
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showIntro) return;

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
  }, [gameState, showIntro]);

  // Handle reordering with Reorder.Group
  const handleReorder = (newOrder) => {
    setCards(newOrder.map((card, index) => ({ ...card, currentPosition: index })));
  };

  const handleSubmit = () => {
    let newScore = 0;
    let correctCount = 0;

    // Use correctPosition (1-8) from the card, compare with currentPosition (0-7)
    cards.forEach((card, index) => {
      // currentPosition is 0-7, correctPosition is 1-8
      const playerPosition = index + 1;
      if (playerPosition === card.correctPosition) {
        newScore += 10;
        correctCount++;
      } else {
        newScore -= 2;
      }
    });

    // Speed bonus
    if (timeLeft > 30) newScore += 20;
    else if (timeLeft > 15) newScore += 10;

    newScore = Math.max(0, newScore);
    setScore(newScore);
    setShowCorrectOrder(true);

    // After showing correct order, proceed to next state
    setTimeout(() => {
      setGameState('submitted');

      if (round === 1) {
        setTotalScore(prev => prev + newScore);
        setTimeout(() => {
          setRound(2);
          initGame();
          setGameState('playing');
        }, 3000);
      } else {
        const finalScore = totalScore + newScore;
        setTotalScore(finalScore);
        updateScore('timeline', finalScore);
        setTimeout(() => setGameState('finished'), 3000);
      }
    }, 2500);
  };

  const handleRestart = () => {
    setRound(1);
    setTotalScore(0);
    initGame();
    setGameState('playing');
  };

  const getCardStatus = (card, index) => {
    if (!showCorrectOrder && gameState !== 'submitted') return 'neutral';

    // Use correctPosition (1-8) vs current position (index + 1)
    const playerPosition = index + 1;
    if (playerPosition === card.correctPosition) return 'correct';
    return 'incorrect';
  };

  return (
    <div className="game-timeline-page">
      {/* Intro Modal */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="intro-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="intro-icon">📅</div>
              <h2>{INTRO_MODAL.titleVi}</h2>
              <h3>{INTRO_MODAL.titleEn}</h3>
              <p className="intro-desc">{INTRO_MODAL.descVi}</p>
              <p className="intro-desc-en">{INTRO_MODAL.descEn}</p>

              <div className="intro-rules">
                <h4>Quy tắc / Rules:</h4>
                <ul>
                  {INTRO_MODAL.rulesVi.map((rule, i) => (
                    <li key={i}>
                      <span>{rule}</span>
                      <span className="rule-en">{INTRO_MODAL.rulesEn[i]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="start-btn" onClick={handleStart}>
                {INTRO_MODAL.startBtn}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GameCard title="Sắp Xếp Lịch Sử" titleEn="Timeline Order Game" gameKey="timeline">
        {/* Round and Score Info */}
        <div className="game-info">
          <div className="round-indicator">
            <RedStar size={16} />
            <span>Vòng / Round: {round}/2</span>
          </div>
          {totalScore > 0 && (
            <div className="total-score">
              Tổng điểm: {totalScore}
            </div>
          )}
        </div>

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
        <Reorder.Group axis="y" values={cards} onReorder={handleReorder} className="timeline-cards">
          <AnimatePresence>
            {cards.map((card, index) => (
              <Reorder.Item
                key={card.id}
                value={card}
                className={`timeline-card ${getCardStatus(card, index)}`}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ClassifiedStamp size={60} className="card-stamp" />
                <div className="card-position-wrapper">
                  <span className="card-position">{index + 1}</span>
                  {showCorrectOrder && (
                    <motion.span
                      className="correct-position"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {card.correctPosition}
                    </motion.span>
                  )}
                </div>
                <div className="card-content">
                  <span className="card-year">{card.year}</span>
                  <span className="card-title">{card.titleVi}</span>
                </div>
                <div className="card-drag-hint">⋮⋮</div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {/* Submit Button */}
        {gameState === 'playing' && !showIntro && (
          <button className="submit-btn" onClick={handleSubmit}>
            Nộp bài / Submit
          </button>
        )}

        {/* Results */}
        {gameState === 'submitted' && (
          <motion.div
            className="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>
              <RedStar size={20} />
              Vòng {round}: {score} điểm
            </h3>
            {round === 1 ? (
              <p>Chuẩn bị cho vòng 2... / Preparing for round 2...</p>
            ) : (
              <p>Đang tính tổng điểm... / Calculating total score...</p>
            )}
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            className="results final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="final-score">
              <RedStar size={32} />
              <h3>Tổng điểm / Total: {totalScore}</h3>
              <RedStar size={32} />
            </div>
            <button className="restart-btn" onClick={handleRestart}>
              Chơi lại / Play Again
            </button>
          </motion.div>
        )}
      </GameCard>

      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }

        .intro-modal {
          background: var(--ink);
          border: 1px solid var(--gold);
          border-radius: 16px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          text-align: center;
        }

        .intro-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .intro-modal h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .intro-modal h3 {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--gold);
          margin: 0 0 1.5rem;
        }

        .intro-desc {
          color: var(--parchment);
          margin: 0 0 0.5rem;
        }

        .intro-desc-en {
          color: var(--ash);
          font-size: 0.9rem;
          margin: 0 0 1.5rem;
        }

        .intro-rules {
          text-align: left;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .intro-rules h4 {
          font-family: var(--font-heading);
          color: var(--gold);
          margin: 0 0 0.75rem;
        }

        .intro-rules ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .intro-rules li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
          font-size: 0.9rem;
        }

        .intro-rules li:last-child {
          border-bottom: none;
        }

        .intro-rules .rule-en {
          display: block;
          color: var(--ash);
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }

        .start-btn {
          width: 100%;
          padding: 1rem;
          background: var(--crimson);
          color: var(--parchment);
          border: none;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .start-btn:hover {
          background: #a33025;
          transform: scale(1.02);
        }

        .game-timeline-page {
          min-height: 100vh;
        }

        .game-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .round-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          color: var(--gold);
        }

        .total-score {
          font-family: var(--font-mono);
          color: var(--parchment);
          font-size: 0.9rem;
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
          list-style: none;
          padding: 0;
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

        .timeline-card.correct {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .timeline-card.incorrect {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .card-stamp {
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          opacity: 0.1;
        }

        .card-position-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
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

        .correct-position {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #22c55e;
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

        .submit-btn {
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

        .submit-btn:hover {
          background: #a33025;
        }

        .results {
          text-align: center;
          padding: 1rem;
          background: rgba(212, 168, 83, 0.1);
          border-radius: 8px;
        }

        .results h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--gold);
          margin: 0 0 0.5rem;
        }

        .results p {
          color: var(--ash);
          font-size: 0.9rem;
          margin: 0;
        }

        .results.final {
          background: rgba(192, 57, 43, 0.2);
        }

        .final-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .final-score h3 {
          font-size: 2rem;
          color: var(--parchment);
        }

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

        .restart-btn:hover {
          background: #a33025;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

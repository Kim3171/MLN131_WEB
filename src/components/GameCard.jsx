// src/components/GameCard.jsx
// Reusable game wrapper with score display

import { useApp } from '../context/AppContext';
import ClassifiedStamp from './svgs/ClassifiedStamp';

export default function GameCard({ title, titleEn, children, gameKey, showScore = true }) {
  const { scores } = useApp();
  const currentScore = gameKey ? scores[gameKey] : 0;

  return (
    <div className="game-card">
      {/* Header */}
      <div className="game-card-header">
        <div className="game-card-title">
          <h2>{title}</h2>
          {titleEn && <p className="game-card-title-en">{titleEn}</p>}
        </div>
        {showScore && (
          <div className="game-card-score">
            <span className="score-label">Điểm</span>
            <span className="score-value">{currentScore}</span>
          </div>
        )}
      </div>

      {/* Classified stamp watermark */}
      <ClassifiedStamp size={120} className="game-card-stamp" />

      {/* Content */}
      <div className="game-card-content">
        {children}
      </div>
    </div>
  );
}

// src/components/HistoricalPhoto.jsx
// Reusable image component with vintage filter and caption

import { useState } from 'react';
import { IMAGES } from '../data/images';

export default function HistoricalPhoto({ imageKey, alt, caption, year, className = '' }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageSrc = IMAGES[imageKey] || IMAGES.hoChiMinhPortrait;

  if (error) {
    return (
      <div className={`historical-photo error ${className}`}>
        <div className="historical-photo-placeholder">
          <span className="placeholder-icon">📷</span>
          <span className="placeholder-text">{alt || 'Historical Image'}</span>
          {year && <span className="placeholder-year">{year}</span>}
        </div>
        {caption && (
          <div className="historical-photo-caption">
            <span>{caption}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`historical-photo ${className}`}>
      <div className="historical-photo-container">
        <img
          src={imageSrc}
          alt={alt}
          className={`historical-photo-img ${loaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        <div className="historical-photo-overlay" />
      </div>
      {caption && (
        <div className="historical-photo-caption">
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
}

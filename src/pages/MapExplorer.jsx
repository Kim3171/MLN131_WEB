// src/pages/MapExplorer.jsx
// Interactive map with battle zones

import { useState } from 'react';
import VietnamMap from '../components/svgs/VietnamMap';
import battleZones from '../data/battleZones';
import HistoricalPhoto from '../components/HistoricalPhoto';
import RedStar from '../components/svgs/RedStar';

export default function MapExplorer() {
  const [activeZone, setActiveZone] = useState(null);
  const [layer, setLayer] = useState('military');

  const zone = battleZones.find(z => z.id === activeZone);

  return (
    <div className="map-page">
      {/* Header */}
      <div className="map-header">
        <h1>Bản Đồ Chiến Lược</h1>
        <p>Strategic Map 1954-1975</p>
      </div>

      {/* Layer toggles */}
      <div className="layer-toggles">
        <button
          className={`layer-btn ${layer === 'military' ? 'active' : ''}`}
          onClick={() => setLayer('military')}
        >
          Military / Quân sự
        </button>
        <button
          className={`layer-btn ${layer === 'political' ? 'active' : ''}`}
          onClick={() => setLayer('political')}
        >
          Political / Chính trị
        </button>
        <button
          className={`layer-btn ${layer === 'international' ? 'active' : ''}`}
          onClick={() => setLayer('international')}
        >
          International / Quốc tế
        </button>
      </div>

      {/* Map and Info Panel */}
      <div className="map-content">
        {/* Map */}
        <div className="map-container">
          <VietnamMap onZoneClick={setActiveZone} activeZone={activeZone} layer={layer} />
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          {zone ? (
            <div className="zone-info">
              <h2>{zone.nameVi}</h2>
              <h3>{zone.nameEn}</h3>

              <div className="zone-image">
                <HistoricalPhoto
                  imageKey={zone.imageKey}
                  alt={zone.nameEn}
                  className="zone-photo"
                />
              </div>

              <div className="zone-facts">
                <h4>Key Facts / Điểm chính:</h4>
                <ul>
                  {zone.factsVi.map((fact, i) => (
                    <li key={i}>
                      <span className="fact-vi">{fact}</span>
                      <span className="fact-en">{zone.factsEn[i]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="zone-strategic">
                <h4>Strategic Importance / Tầm quan trọng:</h4>
                <div className="strategic-bar">
                  <div
                    className="strategic-fill"
                    style={{ width: `${(zone.strategicImportance / 5) * 100}%` }}
                  />
                </div>
                <div className="strategic-labels">
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} className={zone.strategicImportance >= n ? 'active' : ''}>
                      <RedStar size={12} animated={false} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="zone-placeholder">
              <p>Click on a city or location to view details</p>
              <p className="hint">Nhấp vào thành phố hoặc địa điểm để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .map-page {
          min-height: 100vh;
        }

        .map-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .map-header h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
        }

        .map-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0.5rem 0 0;
        }

        .layer-toggles {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .layer-btn {
          padding: 0.75rem 1.5rem;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          color: var(--parchment);
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .layer-btn:hover {
          border-color: var(--gold);
        }

        .layer-btn.active {
          background: rgba(192, 57, 43, 0.2);
          border-color: var(--crimson);
        }

        .map-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .map-container {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .info-panel {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          min-height: 500px;
        }

        .zone-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--ash);
          text-align: center;
        }

        .zone-placeholder .hint {
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .zone-info h2 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .zone-info h3 {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--gold);
          margin: 0 0 1.5rem;
        }

        .zone-image {
          margin-bottom: 1.5rem;
        }

        .zone-photo {
          max-height: 200px;
          border-radius: 8px;
        }

        .zone-facts h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin: 0 0 1rem;
        }

        .zone-facts ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .zone-facts li {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 2px solid var(--gold);
        }

        .zone-facts .fact-vi {
          display: block;
          color: var(--parchment);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .zone-facts .fact-en {
          display: block;
          color: var(--ash);
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }

        .zone-strategic h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin: 1.5rem 0 1rem;
        }

        .strategic-bar {
          height: 8px;
          background: rgba(212, 168, 83, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .strategic-fill {
          height: 100%;
          background: var(--crimson);
          border-radius: 4px;
          transition: width 0.3s;
        }

        .strategic-labels {
          display: flex;
          gap: 0.5rem;
        }

        .strategic-labels span {
          color: var(--smoke);
        }

        .strategic-labels span.active {
          color: var(--crimson);
        }

        @media (max-width: 768px) {
          .map-content {
            grid-template-columns: 1fr;
          }

          .layer-toggles {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}

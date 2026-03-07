// src/pages/MapExplorer.jsx
// Interactive map with battle zones - Premium version

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VietnamMap from '../components/svgs/VietnamMap';
import battleZones from '../data/battleZones';
import HistoricalPhoto from '../components/HistoricalPhoto';
import RedStar from '../components/svgs/RedStar';

const layerInfo = {
  military: {
    titleVi: 'Chiến Trường',
    titleEn: 'Battle Zones',
    icon: '⚔️',
    descVi: 'Các trận đánh quan trọng trong chiến tranh',
    descEn: 'Major battles of the war'
  },
  political: {
    titleVi: 'Trung Tâm Chỉ Huy',
    titleEn: 'Command Centers',
    icon: '🏛️',
    descVi: 'Cơ sở chỉ huy của Đảng và Chính phủ',
    descEn: 'Party and Government command centers'
  },
  international: {
    titleVi: 'Tuyến Vận Tải',
    titleEn: 'Supply Routes',
    icon: '🌐',
    descVi: 'Tuyến hỗ trợ quốc tế và vận tải',
    descEn: 'International support and supply lines'
  }
};

export default function MapExplorer() {
  const [activeZone, setActiveZone] = useState(null);
  const [layer, setLayer] = useState('military');

  const zone = battleZones.find(z => z.id === activeZone);

  return (
    <div className="map-page">
      {/* Header */}
      <div className="map-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bản Đồ Chiến Lược
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Strategic Map 1954-1975
        </motion.p>
      </div>

      {/* Layer toggles */}
      <motion.div
        className="layer-toggles"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {Object.entries(layerInfo).map(([key, info], index) => (
          <motion.button
            key={key}
            className={`layer-btn ${layer === key ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLayer(key);
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
          >
            <span className="layer-icon">{info.icon}</span>
            <span className="layer-label">{info.titleVi}</span>
            <span className="layer-label-en">{info.titleEn}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Layer description */}
      <motion.div
        className="layer-description"
        key={layer}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0 }}
      >
        <span>{layerInfo[layer].descVi}</span>
        <span className="divider">|</span>
        <span>{layerInfo[layer].descEn}</span>
      </motion.div>

      {/* Map and Info Panel */}
      <div className="map-content">
        {/* Map */}
        <motion.div
          className="map-container"
          style={{ minHeight: '700px', width: '100%' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '70vh',
              minHeight: '500px',
              backgroundColor: 'var(--smoke)',
              borderRadius: '8px',
              overflow: 'hidden',
              flex: 'none'
            }}
          >
            <VietnamMap
              activeLayer={layer}
              onZoneClick={setActiveZone}
              activeZone={activeZone}
            />
          </div>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          className="info-panel"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {zone ? (
              <motion.div
                key={zone.id}
                className="zone-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="zone-header">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {zone.nameVi}
                  </motion.h2>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {zone.nameEn}
                  </motion.h3>
                  <div className="zone-type-badge">
                    <RedStar size={12} />
                    <span>{zone.type.toUpperCase()}</span>
                  </div>
                </div>

                <motion.div
                  className="zone-image"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <HistoricalPhoto
                    imageKey={zone.imageKey}
                    alt={zone.nameEn}
                    className="zone-photo"
                  />
                </motion.div>

                <motion.div
                  className="zone-facts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4>
                    <RedStar size={14} />
                    Key Facts / Điểm chính
                  </h4>
                  <ul>
                    {zone.factsVi.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <span className="fact-vi">{fact}</span>
                        <span className="fact-en">{zone.factsEn[i]}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="zone-strategic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4>
                    <RedStar size={14} />
                    Strategic Importance / Tầm quan trọng
                  </h4>
                  <div className="strategic-bar">
                    <motion.div
                      className="strategic-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(zone.strategicImportance / 5) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="strategic-labels">
                    {[1, 2, 3, 4, 5].map(n => (
                      <motion.span
                        key={n}
                        className={zone.strategicImportance >= n ? 'active' : ''}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + n * 0.1 }}
                      >
                        <RedStar size={14} animated={n <= zone.strategicImportance} />
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="zone-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="placeholder-icon">🗺️</div>
                <p>Click on a city or location to view details</p>
                <p className="hint">Nhấp vào thành phố hoặc địa điểm để xem chi tiết</p>
                <div className="placeholder-hint">
                  <span className="hint-item">
                    <span className="hint-dot"></span>
                    <span>Military / Quân sự: ⚔️ Battles</span>
                  </span>
                  <span className="hint-item">
                    <span className="hint-dot"></span>
                    <span>Political / Chính trị: 🏛️ HQ</span>
                  </span>
                  <span className="hint-item">
                    <span className="hint-dot"></span>
                    <span>International / Quốc tế: 🌐 Routes</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .map-page {
          min-height: 100vh;
          padding: 2rem;
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
          text-shadow: 0 0 30px rgba(192, 57, 43, 0.3);
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
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .layer-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 1rem 1.5rem;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          color: var(--parchment);
          border-radius: 12px;
          cursor: pointer;
          font-family: var(--font-body);
          transition: all 0.3s;
        }

        .layer-btn:hover {
          border-color: var(--gold);
          background: rgba(212, 168, 83, 0.1);
        }

        .layer-btn.active {
          background: rgba(192, 57, 43, 0.2);
          border-color: var(--crimson);
          box-shadow: 0 0 20px rgba(192, 57, 43, 0.3);
        }

        .layer-icon {
          font-size: 1.5rem;
        }

        .layer-label {
          font-family: var(--font-heading);
          font-size: 0.9rem;
        }

        .layer-label-en {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--ash);
        }

        .layer-description {
          text-align: center;
          font-size: 0.85rem;
          color: var(--ash);
          margin-bottom: 2rem;
          font-family: var(--font-mono);
        }

        .layer-description .divider {
          margin: 0 0.75rem;
          color: var(--gold);
        }

        .map-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .map-container {
          background: linear-gradient(135deg, var(--smoke) 0%, rgba(10, 14, 26, 0.8) 100%);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: 500px;
        }

        .map-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .info-panel {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 16px;
          padding: 2rem;
          min-height: 600px;
          position: relative;
          overflow: hidden;
        }

        .info-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--crimson), var(--gold), var(--crimson));
        }

        .zone-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 500px;
          color: var(--ash);
          text-align: center;
        }

        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.5;
        }

        .zone-placeholder .hint {
          font-size: 0.85rem;
          margin-top: 0.5rem;
          color: var(--gold);
        }

        .placeholder-hint {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hint-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--ash);
        }

        .hint-dot {
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
        }

        .zone-info {
          height: 100%;
        }

        .zone-header {
          margin-bottom: 1.5rem;
        }

        .zone-info h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .zone-info h3 {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--gold);
          margin: 0 0 1rem;
        }

        .zone-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: rgba(192, 57, 43, 0.2);
          border-radius: 20px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--crimson);
        }

        .zone-image {
          margin-bottom: 1.5rem;
          border-radius: 12px;
          overflow: hidden;
        }

        .zone-photo {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 12px;
        }

        .zone-facts h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          line-height: 1.4;
        }

        .zone-facts .fact-en {
          display: block;
          color: var(--ash);
          font-size: 0.8rem;
          font-family: var(--font-mono);
          line-height: 1.4;
        }

        .zone-strategic h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin: 1.5rem 0 1rem;
        }

        .strategic-bar {
          height: 10px;
          background: rgba(212, 168, 83, 0.2);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .strategic-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--crimson), var(--gold));
          border-radius: 5px;
        }

        .strategic-labels {
          display: flex;
          gap: 0.5rem;
        }

        .strategic-labels span {
          color: rgba(212, 168, 83, 0.3);
        }

        .strategic-labels span.active {
          color: var(--crimson);
        }

        @media (max-width: 1024px) {
          .map-content {
            grid-template-columns: 1fr;
          }

          .map-container {
            order: 1;
          }

          .info-panel {
            order: 2;
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .map-page {
            padding: 1rem;
          }

          .map-header h1 {
            font-size: 1.75rem;
          }

          .layer-btn {
            padding: 0.75rem 1rem;
          }

          .layer-label-en {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

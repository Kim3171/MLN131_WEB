// src/pages/Rubric.jsx
// Assignment grading rubric page

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rubricData from '../data/rubricData';
import RedStar from '../components/svgs/RedStar';
import HistoricalPhoto from '../components/HistoricalPhoto';

export default function Rubric() {
  const [expandedCriteria, setExpandedCriteria] = useState({});

  const toggleCriteria = (id) => {
    setExpandedCriteria(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rubric-page">
      {/* Left Column - Rubric Content */}
      <div className="rubric-content">
        {/* Header */}
        <div className="rubric-header">
          <div className="rubric-title-row">
            <h1>Tiêu Chí Đánh Giá</h1>
            <button className="print-btn" onClick={handlePrint}>
              🖨️ In / Print
            </button>
          </div>
          <p>Grading Rubric — CQ6 Assignment</p>
        </div>

        {/* Part 1 - Crimson */}
        <div className="rubric-section">
          <div className="section-header crimson">
            <div className="section-title">
              <RedStar size={20} />
              <span>{rubricData.part1.titleVi}</span>
            </div>
            <div className="section-total">
              {rubricData.part1.totalPoints} điểm / points
            </div>
          </div>

          <div className="criteria-list">
            {rubricData.part1.criteria.map((criterion, index) => (
              <div
                key={criterion.id}
                className={`criterion-card ${expandedCriteria[criterion.id] ? 'expanded' : ''}`}
              >
                <button
                  className="criterion-header"
                  onClick={() => toggleCriteria(criterion.id)}
                >
                  <div className="criterion-number">{index + 1}</div>
                  <div className="criterion-info">
                    <h4>{criterion.nameVi}</h4>
                    <p>{criterion.nameEn}</p>
                  </div>
                  <div className="criterion-points">{criterion.points}</div>
                </button>
                <AnimatePresence>
                  {expandedCriteria[criterion.id] && (
                    <motion.div
                      className="criterion-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{criterion.detailVi}</p>
                      <p className="en">{criterion.detailEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2 - Gold */}
        <div className="rubric-section">
          <div className="section-header gold">
            <div className="section-title">
              <RedStar size={20} />
              <span>{rubricData.part2.titleVi}</span>
            </div>
            <div className="section-total">
              {rubricData.part2.totalPoints} điểm / points
            </div>
          </div>

          <div className="criteria-list">
            {rubricData.part2.criteria.map((criterion, index) => (
              <div
                key={criterion.id}
                className={`criterion-card ${expandedCriteria[criterion.id] ? 'expanded' : ''}`}
              >
                <button
                  className="criterion-header"
                  onClick={() => toggleCriteria(criterion.id)}
                >
                  <div className="criterion-number">{index + 1}</div>
                  <div className="criterion-info">
                    <h4>{criterion.nameVi}</h4>
                    <p>{criterion.nameEn}</p>
                  </div>
                  <div className="criterion-points">{criterion.points}</div>
                </button>
                <AnimatePresence>
                  {expandedCriteria[criterion.id] && (
                    <motion.div
                      className="criterion-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{criterion.detailVi}</p>
                      <p className="en">{criterion.detailEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Historical Photos */}
      <div className="rubric-photos-panel">
        <HistoricalPhoto
          imageKey="hoChiMinhPortrait"
          alt="Hồ Chí Minh"
          caption="Hồ Chí Minh — Chủ tịch nước Việt Nam Dân chủ Cộng hòa"
          className="rubric-historical-photo"
        />
        <HistoricalPhoto
          imageKey="voNguyenGiap"
          alt="Võ Nguyên Giáp"
          caption="Võ Nguyên Giáp — Tổng Tư lệnh Quân đội Nhân dân Việt Nam"
          className="rubric-historical-photo"
        />
        <HistoricalPhoto
          imageKey="parisAccords"
          alt="Hiệp định Paris"
          caption="Hiệp định Paris — 27/1/1973"
          className="rubric-historical-photo"
        />
      </div>

      <style>{`
        .rubric-page {
          display: flex;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .rubric-content {
          flex: 0 0 65%;
          min-width: 0;
        }

        .rubric-header {
          margin-bottom: 2rem;
        }

        .rubric-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .rubric-header h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
        }

        .rubric-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0;
        }

        .print-btn {
          padding: 0.5rem 1rem;
          background: var(--smoke);
          border: 1px solid var(--gold);
          border-radius: 8px;
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .print-btn:hover {
          background: rgba(212, 168, 83, 0.1);
        }

        .rubric-section {
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: var(--smoke);
          border-radius: 12px 12px 0 0;
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-bottom: none;
        }

        .section-header.crimson {
          border-left: 4px solid var(--crimson);
        }

        .section-header.gold {
          border-left: 4px solid var(--gold);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--parchment);
        }

        .section-total {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--gold);
        }

        .criteria-list {
          background: rgba(30, 37, 53, 0.5);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 1rem;
        }

        .criterion-card {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          overflow: hidden;
          transition: all 0.2s;
        }

        .criterion-card:last-child {
          margin-bottom: 0;
        }

        .criterion-card:hover {
          border-color: var(--gold);
        }

        .criterion-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .criterion-number {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--crimson);
          color: var(--parchment);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-weight: bold;
          flex-shrink: 0;
        }

        .criterion-info {
          flex: 1;
        }

        .criterion-info h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .criterion-info p {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ash);
          margin: 0;
        }

        .criterion-points {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--gold);
        }

        .criterion-details {
          padding: 0 1rem 1rem 3.5rem;
          border-top: 1px solid rgba(212, 168, 83, 0.1);
        }

        .criterion-details p {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--ash);
          margin: 0.75rem 0 0;
          line-height: 1.5;
        }

        .criterion-details p.en {
          font-size: 0.8rem;
          font-style: italic;
          opacity: 0.8;
        }

        /* Right Column - Photos */
        .rubric-photos-panel {
          flex: 0 0 35%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .rubric-historical-photo {
          height: 180px;
          filter: sepia(0.2) contrast(1.1);
        }

        .rubric-historical-photo .historical-photo-caption {
          position: relative;
          transform: none;
          background: rgba(10, 14, 26, 0.9);
          padding: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--gold);
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .rubric-page {
            flex-direction: column;
          }

          .rubric-content {
            flex: 1;
          }

          .rubric-photos-panel {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .rubric-page {
            padding: 1rem;
          }

          .rubric-header h1 {
            font-size: 1.75rem;
          }

          .rubric-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .criterion-details {
            padding-left: 1rem;
          }
        }

        /* Print Styles */
        @media print {
          .rubric-page {
            display: block;
            padding: 0;
          }

          .rubric-photos-panel {
            display: none;
          }

          .print-btn {
            display: none;
          }

          .criterion-card {
            break-inside: avoid;
          }

          .criterion-details {
            display: block !important;
            height: auto !important;
            opacity: 1 !important;
          }

          .section-header {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}

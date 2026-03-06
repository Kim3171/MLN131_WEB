// src/pages/Rubric.jsx
// Assignment grading rubric page

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rubricData from '../data/rubricData';
import RedStar from '../components/svgs/RedStar';
import BambooDecoration from '../components/svgs/BambooDecoration';

export default function Rubric() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedCriteria, setExpandedCriteria] = useState({});
  const [aiChecks, setAiChecks] = useState({
    '4-1': false,
    '4-2': false,
    '4-3': false,
    '4-4': false
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleCriteria = (id) => {
    setExpandedCriteria(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAiCheck = (id) => {
    setAiChecks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rubric-page">
      {/* Header */}
      <div className="rubric-header">
        <h1>Tiêu Chí Đánh Giá</h1>
        <p>Grading Rubric — CQ6 Assignment</p>
      </div>

      {/* Part 1 */}
      <div className="rubric-section">
        <button
          className={`section-header ${rubricData.part1.color}`}
          onClick={() => toggleSection('part1')}
        >
          <div className="section-title">
            <RedStar size={20} />
            <span>{rubricData.part1.titleVi}</span>
          </div>
          <div className="section-total">
            {rubricData.part1.totalPoints} điểm / points
          </div>
        </button>

        <AnimatePresence>
          {expandedSection === 'part1' && (
            <motion.div
              className="section-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {rubricData.part1.criteria.map((criterion, index) => (
                <div
                  key={criterion.id}
                  className="criterion-card"
                  onClick={() => toggleCriteria(criterion.id)}
                >
                  <div className="criterion-header">
                    <div className="criterion-number">{index + 1}</div>
                    <div className="criterion-info">
                      <h4>{criterion.nameVi}</h4>
                      <p>{criterion.nameEn}</p>
                    </div>
                    <div className="criterion-points">{criterion.points}</div>
                  </div>
                  <AnimatePresence>
                    {expandedCriteria[criterion.id] && (
                      <motion.div
                        className="criterion-details"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                      >
                        <p>{criterion.descriptionVi}</p>
                        <p className="en">{criterion.descriptionEn}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BambooDecoration />

      {/* Part 2 */}
      <div className="rubric-section">
        <button
          className={`section-header ${rubricData.part2.color}`}
          onClick={() => toggleSection('part2')}
        >
          <div className="section-title">
            <RedStar size={20} />
            <span>{rubricData.part2.titleVi}</span>
          </div>
          <div className="section-total">
            {rubricData.part2.totalPoints} điểm / points
          </div>
        </button>

        <AnimatePresence>
          {expandedSection === 'part2' && (
            <motion.div
              className="section-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {rubricData.part2.criteria.map((criterion, index) => (
                <div
                  key={criterion.id}
                  className="criterion-card"
                  onClick={() => toggleCriteria(criterion.id)}
                >
                  <div className="criterion-header">
                    <div className="criterion-number">{index + 1}</div>
                    <div className="criterion-info">
                      <h4>{criterion.nameVi}</h4>
                      <p>{criterion.nameEn}</p>
                    </div>
                    <div className="criterion-points">{criterion.points}</div>
                  </div>
                  <AnimatePresence>
                    {expandedCriteria[criterion.id] && (
                      <motion.div
                        className="criterion-details"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                      >
                        <p>{criterion.descriptionVi}</p>
                        <p className="en">{criterion.descriptionEn}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BambooDecoration />

      {/* AI Usage */}
      <div className="rubric-section">
        <button
          className={`section-header ${rubricData.aiUsage.color}`}
          onClick={() => toggleSection('aiUsage')}
        >
          <div className="section-title">
            <span>🤖</span>
            <span>{rubricData.aiUsage.titleVi}</span>
          </div>
        </button>

        <AnimatePresence>
          {expandedSection === 'aiUsage' && (
            <motion.div
              className="section-content ai-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {rubricData.aiUsage.criteria.map((criterion) => (
                <div key={criterion.id} className="ai-criterion">
                  <label className="ai-checkbox">
                    <input
                      type="checkbox"
                      checked={aiChecks[criterion.id]}
                      onChange={() => toggleAiCheck(criterion.id)}
                    />
                    <span className="checkmark" />
                    <div className="ai-criterion-content">
                      <h4>{criterion.nameVi}</h4>
                      <p>{criterion.nameEn}</p>
                      <p className="description">{criterion.descriptionVi}</p>
                      <p className="description en">{criterion.descriptionEn}</p>
                    </div>
                  </label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print Button */}
      <button className="print-btn" onClick={handlePrint}>
        🖨️ In / Print
      </button>

      <style>{`
        .rubric-page {
          max-width: 900px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }

        .rubric-header {
          text-align: center;
          margin-bottom: 2rem;
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
          margin: 0.5rem 0 0;
        }

        .rubric-section {
          margin-bottom: 1.5rem;
        }

        .section-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .section-header:hover {
          border-color: var(--gold);
        }

        .section-header.crimson {
          border-left: 4px solid var(--crimson);
        }

        .section-header.gold {
          border-left: 4px solid var(--gold);
        }

        .section-header.olive {
          border-left: 4px solid var(--olive);
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

        .section-content {
          overflow: hidden;
          padding: 1rem;
          background: rgba(30, 37, 53, 0.5);
          border: 1px solid rgba(212, 168, 83, 0.1);
          border-top: none;
          border-radius: 0 0 12px 12px;
        }

        .criterion-card {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .criterion-card:hover {
          border-color: var(--gold);
        }

        .criterion-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
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
          margin-top: 0.5rem;
        }

        .criterion-details p {
          font-size: 0.9rem;
          color: var(--ash);
          margin: 0.5rem 0 0;
        }

        .criterion-details p.en {
          font-size: 0.8rem;
          font-style: italic;
        }

        .ai-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-criterion {
          background: var(--smoke);
          border: 1px solid rgba(107, 122, 58, 0.3);
          border-radius: 8px;
        }

        .ai-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          cursor: pointer;
        }

        .ai-checkbox input {
          display: none;
        }

        .checkmark {
          width: 24px;
          height: 24px;
          border: 2px solid var(--olive);
          border-radius: 4px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ai-checkbox input:checked + .checkmark {
          background: var(--olive);
        }

        .ai-checkbox input:checked + .checkmark::after {
          content: '✓';
          color: var(--parchment);
          font-weight: bold;
        }

        .ai-criterion-content h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
        }

        .ai-criterion-content p {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ash);
          margin: 0;
        }

        .ai-criterion-content .description {
          font-family: var(--font-body);
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .ai-criterion-content .description.en {
          font-style: italic;
          opacity: 0.8;
        }

        .print-btn {
          display: block;
          width: 100%;
          max-width: 200px;
          margin: 2rem auto 0;
          padding: 1rem;
          background: var(--smoke);
          border: 1px solid var(--gold);
          border-radius: 8px;
          color: var(--gold);
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.2s;
        }

        .print-btn:hover {
          background: rgba(212, 168, 83, 0.1);
        }

        @media print {
          .print-btn,
          .section-header {
            display: none;
          }

          .section-content {
            display: block !important;
            height: auto !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

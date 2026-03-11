// src/pages/Resources.jsx
// Glossary + AI Historical Analyst chat interface

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askClaude, historianSystemPrompt } from '../lib/claude';
import { useApp } from '../context/AppContext';

const textbookGuide = [
  { pages: '205-210', topic: 'Bối cảnh lịch sử / Historical Context' },
  { pages: '211-218', topic: 'Đường lối lãnh đạo của Đảng / Party Leadership' },
  { pages: '219-225', topic: 'Chiến tranh đặc biệt / Special War' },
  { pages: '226-232', topic: 'Chiến tranh cục bộ / Limited War' },
  { pages: '233-235', topic: 'Việt Nam hóa chiến tranh / Vietnamization' },
];

const glossary = [
  { vi: 'Chiến tranh đặc biệt', en: 'Special War', definition: 'Giai đoạn 1961-1965, Mỹ cố vấn nhưng chưa đưa quân chiến đấu trực tiếp.' },
  { vi: 'Chiến tranh cục bộ', en: 'Limited War', definition: 'Giai đoạn 1965-1968, Mỹ đưa quân chiến đấu trực tiếp vào miền Nam.' },
  { vi: 'Việt Nam hóa chiến tranh', en: 'Vietnamization', definition: 'Chính sách của Nixon chuyển giao gánh nặng chiến đấu cho QLVNCH.' },
  { vi: 'Đánh và đàm', en: 'Fight and Negotiate', definition: 'Chiến lược kết hợp chiến đấu và đàm phán.' },
  { vi: 'Tổng tiến công và nổi dậy', en: 'General Offensive and Uprising', definition: 'Chiến lược tấn công quy mô lớn vào các thành phố.' },
  { vi: 'Hiệp định Paris', en: 'Paris Peace Accords', definition: 'Thỏa thuận hòa bình ngày 27/1/1973.' },
  { vi: 'Đường mòn Hồ Chí Minh', en: 'Ho Chi Minh Trail', definition: 'Tuyến đường vận tải chiến lược qua Lào và Campuchia.' },
  { vi: 'Vĩ tuyến 17', en: '17th Parallel', definition: 'Ran giới quân sự tạm thời Bắc-Nam 1954-1975.' },
];

export default function Resources() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { handleLabubuClick, labubuClicks, resetLabubuClicks } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('focusMode') === 'true';
  });

  // Sync focus mode with global state
  useEffect(() => {
    const handleStorage = () => {
      setFocusMode(localStorage.getItem('focusMode') === 'true');
    };
    const interval = setInterval(handleStorage, 100);
    return () => clearInterval(interval);
  }, []);

  // Cleanup focus mode on unmount
  useEffect(() => {
    return () => localStorage.setItem('focusMode', 'false');
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await askClaude(historianSystemPrompt, userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại. / Sorry, an error occurred. Please try again.'
      }]);
    }
    setLoading(false);
  };

  const handleLabubu = () => {
    const clicks = handleLabubuClick();
    if (clicks >= 3) {
      setShowConfetti(true);
      resetLabubuClicks();
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="resources-page">
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="confetti-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>PASS TẤT CẢ CÁC MÔN! 🎉</h1>
            <canvas id="confetti-canvas" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="resources-header">
        <h1>Tài Liệu & Nguồn Học Liệu</h1>
        <p>Resources & Study Materials</p>
      </div>

      <div className="resources-grid">
        {/* Left Column - Textbook Guide */}
        <div className="resource-column">
          <h2>Hướng Dẫn Sách Giáo Khoa</h2>
          <p className="column-subtitle">Textbook Guide (trang / pages 205-235)</p>

          <div className="textbook-list">
            {textbookGuide.map((item, index) => (
              <div key={index} className="textbook-item">
                <span className="textbook-pages">{item.pages}</span>
                <span className="textbook-topic">{item.topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Glossary */}
        <div className="resource-column">
          <h2>Thuật Ngữ Lịch Sử</h2>
          <p className="column-subtitle">Bilingual Glossary</p>

          <div className="glossary-table">
            <div className="glossary-header">
              <span>Tiếng Việt</span>
              <span>English</span>
              <span>Định nghĩa / Definition</span>
            </div>
            {glossary.map((item, index) => (
              <div key={index} className="glossary-row">
                <span className="term-vi">{item.vi}</span>
                <span className="term-en">{item.en}</span>
                <span className="term-def">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - AI Chat */}
        <div className="resource-column chat-column">
          <h2>Phân Tích Lịch Sử</h2>
          <p className="column-subtitle">AI Historical Analyst</p>

          <div className="chat-container">
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-welcome">
                  <span className="ai-avatar">LS</span>
                  <div className="welcome-content">
                    <p className="welcome-title">Chào mọi người!</p>
                    <p>Em là trợ lý phân tích lịch sử AI.</p>
                    <p className="welcome-hint">
                      Nhập luận điểm hoặc câu hỏi về CQ6 — cuộc kháng chiến chống đế quốc Mỹ (1954-1975).
                    </p>
                    <p className="welcome-english">
                      <em>Enter your thesis or question about CQ6.</em>
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.role}`}>
                    <span className="chat-avatar">
                      {msg.role === 'user' ? 'Bạn' : 'LS'}
                    </span>
                    <div className="chat-content">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="chat-message assistant">
                  <span className="chat-avatar">LS</span>
                  <div className="chat-content">
                    <span className="loading-dots">Đang suy nghĩ... / Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập luận điểm của bạn..."
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()}>
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Labubu Easter Egg */}
      <button className="labubu-btn" onClick={handleLabubu}>
        🎀
      </button>
      <span className="labubu-hint">{3 - labubuClicks} more...</span>

      <style>{`
        .resources-page {
          min-height: 100vh;
          position: relative;
          padding: 2rem 1.25rem 6rem;
        }

        .confetti-overlay {
          position: fixed;
          inset: 0;
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .confetti-overlay h1 {
          font-family: var(--font-heading);
          font-size: 4rem;
          color: var(--crimson);
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .resources-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .resources-header h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--parchment);
          margin: 0;
        }

        .resources-header p {
          font-family: var(--font-mono);
          color: var(--gold);
          margin: 0.5rem 0 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 0.5rem;
        }

        .resource-column {
          background: var(--smoke);
          border: 1px solid rgba(212, 168, 83, 0.25);
          border-top: 3px solid rgba(212, 168, 83, 0.55);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .resource-column h2 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--parchment);
          margin: 0 0 0.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
        }

        .column-subtitle {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--ash);
          margin: 0 0 1.5rem;
        }

        /* Textbook Guide */
        .textbook-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .textbook-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(212, 168, 83, 0.07);
          border-radius: 8px;
          border-left: 3px solid rgba(212, 168, 83, 0.5);
          border: 1px solid rgba(212, 168, 83, 0.15);
          border-left: 3px solid var(--gold);
        }

        .textbook-pages {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--gold);
          font-weight: bold;
        }

        .textbook-topic {
          font-size: 0.85rem;
          color: var(--parchment);
        }

        /* Glossary */
        .glossary-table {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .glossary-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 0.5rem;
          padding: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--gold);
          text-transform: uppercase;
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
        }

        .glossary-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 0.5rem;
          padding: 0.5rem;
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(212, 168, 83, 0.1);
        }

        .term-vi {
          color: var(--parchment);
          font-weight: 500;
        }

        .term-en {
          color: var(--ash);
          font-family: var(--font-mono);
        }

        .term-def {
          color: var(--ash);
          font-size: 0.75rem;
        }

        /* Chat */
        .chat-column {
          display: flex;
          flex-direction: column;
        }

        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 450px;
          background: linear-gradient(180deg, rgba(30, 37, 53, 0.6) 0%, rgba(20, 26, 38, 0.8) 100%);
          border-radius: 16px;
          border: 1px solid rgba(212, 168, 83, 0.15);
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Custom scrollbar */
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: rgba(30, 37, 53, 0.3);
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(212, 168, 83, 0.3);
          border-radius: 3px;
        }

        .chat-welcome {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1rem;
          background: rgba(107, 142, 35, 0.1);
          border-radius: 16px;
          border: 1px solid rgba(107, 142, 35, 0.2);
        }

        .ai-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #6b8e23 0%, #4a6318 100%);
          color: var(--parchment);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: bold;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(107, 142, 35, 0.3);
        }

        .chat-welcome p {
          font-size: 0.9rem;
          color: var(--parchment);
          margin: 0;
          line-height: 1.6;
        }

        .chat-welcome em {
          color: var(--gold);
          font-size: 0.8rem;
        }

        .welcome-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .welcome-title {
          font-weight: 600;
          color: var(--gold) !important;
        }

        .welcome-hint {
          color: var(--parchment) !important;
          opacity: 0.85;
        }

        .welcome-english {
          color: var(--ash) !important;
          font-size: 0.8rem !important;
          margin-top: 0.5rem !important;
        }

        .chat-message {
          display: flex;
          gap: 0.75rem;
          animation: messageIn 0.3s ease-out;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-message.user {
          flex-direction: row-reverse;
        }

        .chat-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6b8e23 0%, #4a6318 100%);
          color: var(--parchment);
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(107, 142, 35, 0.25);
        }

        .chat-message.user .chat-avatar {
          background: linear-gradient(135deg, #c0392b 0%, #922b21 100%);
          box-shadow: 0 3px 10px rgba(192, 57, 43, 0.25);
        }

        .chat-content {
          max-width: 82%;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, rgba(107, 142, 35, 0.15) 0%, rgba(107, 142, 35, 0.08) 100%);
          border-radius: 18px;
          border-top-left-radius: 4px;
        }

        .chat-message.user .chat-content {
          background: linear-gradient(135deg, rgba(192, 57, 43, 0.2) 0%, rgba(192, 57, 43, 0.12) 100%);
          border-radius: 18px;
          border-top-right-radius: 4px;
        }

        .chat-content p {
          font-size: 0.9rem;
          color: var(--parchment);
          margin: 0;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .chat-content p + p {
          margin-top: 0.5rem;
        }

        .loading-dots {
          color: var(--gold);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          animation: pulse 1s infinite;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .loading-dots::after {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: bounce 1s infinite;
        }

        .chat-input {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(20, 26, 38, 0.6);
          border-top: 1px solid rgba(212, 168, 83, 0.1);
        }

        .chat-input input {
          flex: 1;
          padding: 0.875rem 1.25rem;
          background: rgba(30, 42, 60, 0.6);
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 24px;
          color: var(--parchment);
          font-family: var(--font-body);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .chat-input input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(212, 168, 83, 0.1);
          background: rgba(30, 42, 60, 0.8);
        }

        .chat-input input::placeholder {
          color: rgba(200, 200, 200, 0.4);
        }

        .chat-input button {
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, var(--crimson) 0%, #922b21 100%);
          border: none;
          border-radius: 24px;
          color: var(--parchment);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(192, 57, 43, 0.3);
        }

        .chat-input button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.4);
        }

        .chat-input button:active:not(:disabled) {
          transform: translateY(0);
        }

        .chat-input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        /* Labubu */
        .labubu-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background: #ff69b4;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 100;
          transition: transform 0.2s;
        }

        .labubu-btn:hover {
          transform: scale(1.1);
        }

        .labubu-hint {
          position: fixed;
          bottom: 1rem;
          right: 5rem;
          font-size: 0.75rem;
          color: var(--ash);
          z-index: 100;
        }

        @media (max-width: 1024px) {
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .resources-header h1 {
            font-size: 1.6rem;
          }

          .resources-grid {
            padding: 0;
          }

          .resource-column {
            padding: 1rem;
            border-top-width: 2px;
          }

          .resource-column h2 {
            font-size: 1.1rem;
          }

          /* Glossary: swap to card list, no overflow table */
          .glossary-header {
            display: none;
          }

          .glossary-row {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.75rem;
            background: rgba(30,37,53,0.5);
            border-radius: 8px;
            border: 1px solid rgba(212,168,83,0.12);
            min-width: unset;
          }

          .term-vi {
            font-size: 0.95rem;
            color: var(--parchment);
          }

          .term-en {
            font-size: 0.8rem;
            color: var(--gold);
          }

          .term-def {
            font-size: 0.78rem;
            color: var(--ash);
            line-height: 1.5;
            border-top: 1px solid rgba(212,168,83,0.1);
            padding-top: 0.35rem;
            margin-top: 0.25rem;
          }

          /* Chat: max height */
          .chat-container {
            min-height: 320px;
          }

          .labubu-btn, .labubu-hint {
            bottom: 5rem;
          }
        }
      `}</style>
    </div>
  );
}

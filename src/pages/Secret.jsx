// src/pages/Secret.jsx
// Secret page with poem

import { Link } from 'react-router-dom';

export default function Secret() {
  return (
    <div className="secret-page">
      <div className="secret-content">
        <h1>Bài Thơ / Poem</h1>
        <div className="poem-title-line"></div>

        <div className="poem">
          <p className="poem-vi">
            Đêm qua trời mưa rào<br />
            Nhớ về những ngày nào<br />
            Tiếng súng vọng về đây<br />
            Máu đỏ tôi điểm hồng...
          </p>
          <p className="poem-vi">
            Ba mươi tháng tư về<br />
            Cờ bay phấp phới trên<br />
            Ngày đất nước thống nhất<br />
            Nước non một dải bình yên...
          </p>
          <p className="poem-vi">
            Ký ức dân tộc ơi<br />
            Đừng quên những người đi<br />
            Vì tự do độc lập<br />
            Họ đã cho đi tất cả...
          </p>
        </div>

        <div className="poem-divider">✦ Translation ✦</div>

        <div className="poem-en">
          <p>
            Last night the rain came down<br />
            Remembering those days gone by<br />
            Gunshots echoed through these lands<br />
            My blood painted everything red...
          </p>
          <p>
            The thirtieth of April returns<br />
            Flags flutter in the wind<br />
            When our land was unified<br />
            Rivers and mountains at peace at last...
          </p>
          <p>
            Memory of our nation<br />
            Don't forget those who left<br />
            For freedom and independence<br />
            They gave everything...
          </p>
        </div>

        <Link to="/" className="back-link">← Trang chủ</Link>
      </div>

      <style>{`
        .secret-page {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem 5rem;
          background: radial-gradient(ellipse at 50% 0%, rgba(192,57,43,0.08) 0%, transparent 60%),
                      linear-gradient(180deg, var(--ink) 0%, #0d1220 100%);
          position: relative;
          overflow-x: hidden;
        }

        .secret-content {
          max-width: 560px;
          width: 100%;
          text-align: center;
          position: relative;
        }

        /* Decorative corner lines */
        .secret-content::before,
        .secret-content::after {
          content: '';
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: rgba(212,168,83,0.35);
          border-style: solid;
        }
        .secret-content::before {
          top: -12px; left: -12px;
          border-width: 2px 0 0 2px;
        }
        .secret-content::after {
          bottom: -12px; right: -12px;
          border-width: 0 2px 2px 0;
        }

        .secret-content h1 {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: var(--crimson);
          margin: 0 0 0.3rem;
          letter-spacing: 2px;
        }

        .poem-title-line {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 0 auto 2rem;
        }

        .poem {
          margin-bottom: 2rem;
        }

        .poem-vi {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          color: var(--parchment);
          line-height: 2.1;
          margin: 0 0 1.25rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.025);
          border-left: 2px solid rgba(212,168,83,0.3);
          border-radius: 0 6px 6px 0;
          text-align: left;
        }

        .poem-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
          color: rgba(212,168,83,0.5);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 3px;
        }
        .poem-divider::before,
        .poem-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,168,83,0.3));
        }
        .poem-divider::after {
          background: linear-gradient(270deg, transparent, rgba(212,168,83,0.3));
        }

        .poem-en {
          margin-bottom: 2rem;
        }

        .poem-en p {
          font-family: var(--font-body);
          font-size: clamp(0.85rem, 2vw, 0.98rem);
          color: var(--ash);
          font-style: italic;
          line-height: 2;
          margin: 0 0 1rem;
          padding: 0.75rem 1.25rem;
          opacity: 0.8;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.25rem;
          background: rgba(212,168,83,0.08);
          border: 1px solid rgba(212,168,83,0.35);
          border-radius: 6px;
          color: var(--gold);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 1px;
          transition: all 0.2s;
        }
        .back-link:hover {
          background: rgba(212,168,83,0.18);
          border-color: var(--gold);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .secret-page {
            padding: 2rem 1.25rem calc(65px + 1.5rem);
            align-items: flex-start;
          }
          .secret-content {
            max-width: 100%;
            margin-top: 1rem;
          }
          .poem-vi {
            font-size: 0.95rem;
            line-height: 1.9;
            padding: 0.75rem 1rem;
          }
          .poem-en p {
            font-size: 0.82rem;
            line-height: 1.8;
            padding: 0.5rem 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .secret-content h1 { font-size: 1.3rem; }
          .poem-vi { font-size: 0.9rem; line-height: 1.85; }
          .poem-en p { font-size: 0.78rem; }
        }
      `}</style>
    </div>
  );
}

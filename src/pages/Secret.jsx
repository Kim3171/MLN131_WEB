// src/pages/Secret.jsx
// Secret page with poem

import { Link } from 'react-router-dom';

export default function Secret() {
  return (
    <div className="secret-page">
      <div className="secret-content">
        <h1>Bài Thơ / Poem</h1>

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

        <hr />

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

        <Link to="/" className="back-link">
          ← Quay về / Go Back
        </Link>
      </div>

      <style>{`
        .secret-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(180deg, var(--ink) 0%, #0d1220 100%);
        }

        .secret-content {
          max-width: 600px;
          text-align: center;
        }

        .secret-content h1 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--crimson);
          margin: 0 0 2rem;
        }

        .poem {
          margin-bottom: 2rem;
        }

        .poem-vi {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--parchment);
          line-height: 2;
          margin: 0 0 1rem;
        }

        hr {
          border: none;
          border-top: 1px solid rgba(212, 168, 83, 0.2);
          margin: 2rem 0;
        }

        .poem-en {
          margin-bottom: 2rem;
        }

        .poem-en p {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ash);
          font-style: italic;
          line-height: 1.8;
          margin: 0 0 1rem;
        }

        .back-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--smoke);
          border: 1px solid var(--gold);
          border-radius: 8px;
          color: var(--gold);
          text-decoration: none;
          transition: all 0.2s;
        }

        .back-link:hover {
          background: rgba(212, 168, 83, 0.1);
        }
      `}</style>
    </div>
  );
}

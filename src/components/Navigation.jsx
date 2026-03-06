// src/components/Navigation.jsx
// Left sidebar navigation with icons and labels

import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RedStar from './svgs/RedStar';

// Custom premium SVG icons
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
    <path d="M12 8v3" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const GamesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6l4 4-4 4" />
    <path d="M9 18l-4-4 4-4" />
    <path d="M5 12h14" />
  </svg>
);

const RubricIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ResourcesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Navigation() {
  const { totalScore } = useApp();

  const navItems = [
    { id: 'home', label: 'Tổng Quan', labelEn: 'Overview', icon: HomeIcon, path: '/' },
    { id: 'timeline', label: 'Dòng Thời Gian', labelEn: 'Timeline', icon: TimelineIcon, path: '/timeline' },
    { id: 'map', label: 'Bản Đồ', labelEn: 'Map Explorer', icon: MapIcon, path: '/map' },
  ];

  const gameItems = [
    { id: 'gameTimeline', label: 'Sắp Xếp Lịch Sử', labelEn: 'Timeline Order', path: '/game/timeline' },
    { id: 'gameQuotes', label: 'Ai Nói Điều Này?', labelEn: 'Who Said It?', path: '/game/quotes' },
    { id: 'gameStrategy', label: 'Chiến Lược Gia', labelEn: 'Strategist', path: '/game/strategy' },
    { id: 'gameTrueFalse', label: 'Nhanh Như Chớp', labelEn: 'Quick True/False', path: '/game/truefalse' },
  ];

  const bottomItems = [
    { id: 'rubric', label: 'Tiêu Chí', labelEn: 'Rubric', icon: RubricIcon, path: '/rubric' },
    { id: 'resources', label: 'Tài Liệu', labelEn: 'Resources', icon: ResourcesIcon, path: '/resources' },
  ];

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="nav-logo">
        <RedStar size={16} />
        <span className="nav-logo-text">KÝ ỨC DÂN TỘC</span>
      </div>

      <div className="nav-divider" />

      {/* Main navigation */}
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-divider" />

      {/* Games section */}
      <div className="nav-section-label">
        <span>TRÒ CHƠI</span>
      </div>
      <ul className="nav-list games">
        {gameItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-link-arrow">↳</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-divider" />

      {/* Bottom navigation */}
      <ul className="nav-list">
        {bottomItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Score tracker */}
      <div className="nav-score">
        <StarIcon />
        <span className="nav-score-label">Điểm số</span>
        <span className="nav-score-value">{totalScore}</span>
      </div>
    </nav>
  );
}

// src/components/Navigation.jsx
// Left sidebar navigation with icons and labels

import { NavLink } from 'react-router-dom';
import { Home, Clock, Map, Gamepad2, BookOpen, FileText, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RedStar from './svgs/RedStar';

export default function Navigation() {
  const { totalScore } = useApp();

  const navItems = [
    { id: 'home', label: 'Tổng Quan', labelEn: 'Overview', icon: Home, path: '/' },
    { id: 'timeline', label: 'Dòng Thời Gian', labelEn: 'Timeline', icon: Clock, path: '/timeline' },
    { id: 'map', label: 'Bản Đồ', labelEn: 'Map Explorer', icon: Map, path: '/map' },
  ];

  const gameItems = [
    { id: 'gameTimeline', label: 'Sắp Xếp Lịch Sử', labelEn: 'Timeline Order', path: '/game/timeline' },
    { id: 'gameQuotes', label: 'Ai Nói Điều Này?', labelEn: 'Who Said It?', path: '/game/quotes' },
    { id: 'gameStrategy', label: 'Chiến Lược Gia', labelEn: 'Strategist', path: '/game/strategy' },
    { id: 'gameTrueFalse', label: 'Nhanh Như Chớp', labelEn: 'Quick True/False', path: '/game/truefalse' },
  ];

  const bottomItems = [
    { id: 'rubric', label: 'Tiêu Chí', labelEn: 'Rubric', icon: FileText, path: '/rubric' },
    { id: 'resources', label: 'Tài Liệu', labelEn: 'Resources', icon: BookOpen, path: '/resources' },
  ];

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="nav-logo">
        <RedStar size={20} />
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
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-divider" />

      {/* Games section */}
      <div className="nav-section-label">
        <Gamepad2 size={14} />
        <span>Trò Chơi</span>
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
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Score tracker */}
      <div className="nav-score">
        <Star size={16} fill="#D4A853" stroke="#D4A853" />
        <span className="nav-score-label">Điểm số</span>
        <span className="nav-score-value">{totalScore}</span>
      </div>
    </nav>
  );
}

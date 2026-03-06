// src/components/svgs/VietnamMap.jsx
// Detailed SVG map of Vietnam with historical context

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VietnamMap({ onZoneClick, activeZone, layer = 'military' }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  // City coordinates for the map with enhanced data
  const cities = [
    { id: 'hanoi', name: 'Hà Nội', x: 200, y: 120, label: 'Hanoi' },
    { id: 'hcm-trail', name: 'Đường mòn Hồ Chí Minh', x: 280, y: 350, label: 'HCM Trail' },
    { id: 'hue', name: 'Huế', x: 210, y: 260, label: 'Hue' },
    { id: 'danang', name: 'Đà Nẵng', x: 225, y: 280, label: 'Da Nang' },
    { id: 'saigon', name: 'Sài Gòn', x: 190, y: 420, label: 'Saigon' },
    { id: 'mekong', name: 'Cần Thơ', x: 150, y: 460, label: 'Mekong' },
    { id: 'dak-to', name: 'Đắk Tô', x: 240, y: 320, label: 'Dak To' },
  ];

  const handleCityClick = (cityId) => {
    if (onZoneClick) {
      onZoneClick(cityId);
    }
  };

  return (
    <div className="map-svg-wrapper">
      <svg
        viewBox="0 0 400 800"
        width="100%"
        height="auto"
        className="vietnam-map"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        {/* Background - Laos and Cambodia */}
        <path
          d="M280 200 L360 180 L380 280 L360 400 L320 480 L280 440 L260 360 L280 280 Z"
          fill="#1A1E2A"
          opacity="0.5"
        />

        {/* 17th Parallel / DMZ Line */}
        <line
          x1="120"
          y1="210"
          x2="260"
          y2="210"
          stroke="#D4A853"
          strokeWidth="2"
          strokeDasharray="8 4"
          opacity="0.7"
        />
        <text x="130" y="205" fill="#D4A853" fontSize="10" fontFamily="IBM Plex Mono">
          Vĩ tuyến 17 / 17th Parallel
        </text>

        {/* North Vietnam (darker green) */}
        <path
          d="M140 100
             L200 80
             L260 100
             L280 150
             L260 200
             L220 230
             L180 220
             L140 180
             L120 140
             Z"
          fill="#1E3A2F"
          stroke="#2A4A3F"
          strokeWidth="1"
        />

        {/* South Vietnam (darker brown) */}
        <path
          d="M140 230
             L220 230
             L260 200
             L280 250
             L270 320
             L250 380
             L220 420
             L180 450
             L140 440
             L120 380
             L130 300
             L140 230
             Z"
          fill="#2D1810"
          stroke="#3D2818"
          strokeWidth="1"
        />

        {/* Ho Chi Minh Trail - Animated dashed path */}
        {layer !== 'political' && (
          <g className="ho-chi-minh-trail">
            <path
              d="M200 130
                 Q220 180 240 220
                 Q260 260 280 300
                 Q300 340 320 380
                 Q340 420 300 450
                 Q260 480 220 440"
              fill="none"
              stroke="#D4A853"
              strokeWidth="3"
              strokeDasharray="10 5"
              className="trail-path"
            />
          </g>
        )}

        {/* Military layer - Battle markers with premium styling */}
        {layer === 'military' && (
          <g className="battle-markers">
            {/* Ia Drang - First major battle */}
            <motion.circle
              cx="240"
              cy="310"
              r="8"
              fill="#C0392B"
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <title>Trận Ia Drang (1965) - First major battle of the war</title>
            </motion.circle>
            <text x="248" y="314" fill="#F2E8D5" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">Ia Drang '65</text>

            {/* Dak To - Major 1967 battles */}
            <motion.circle
              cx="240"
              cy="320"
              r="6"
              fill="#C0392B"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            >
              <title>Trận Đắk Tô (1967)</title>
            </motion.circle>
            <text x="248" y="324" fill="#F2E8D5" fontSize="8" fontFamily="IBM Plex Mono">Dak To '67</text>

            {/* Hue - Tet Offensive */}
            <motion.circle
              cx="210"
              cy="260"
              r="7"
              fill="#C0392B"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
            >
              <title>Trận Huế (1968) - Tet Offensive</title>
            </motion.circle>
            <text x="218" y="264" fill="#F2E8D5" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">Huế '68</text>

            {/* Saigon - Liberation */}
            <motion.circle
              cx="190"
              cy="420"
              r="9"
              fill="#C0392B"
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            >
              <title>Giải phóng Sài Gòn (1975)</title>
            </motion.circle>
            <text x="200" y="424" fill="#F2E8D5" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">30/4/1975</text>
          </g>
        )}

        {/* Political layer - Party command centers with premium styling */}
        {layer === 'political' && (
          <g className="command-centers">
            {/* Hanoi - Party HQ */}
            <motion.rect
              x="190"
              y="105"
              width="20"
              height="15"
              fill="#C0392B"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <title>Trung ương Đảng - Party Central HQ</title>
            </motion.rect>
            <text x="170" y="135" fill="#D4A853" fontSize="8" fontFamily="IBM Plex Mono" fontWeight="bold">TRUNG ƯƠNG ĐẢNG</text>

            {/* COSVN - Central Office for South Vietnam */}
            <motion.rect
              x="240"
              y="380"
              width="25"
              height="18"
              fill="#C0392B"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <title>Cơ quan Thường trực Trung ương tại miền Nam (COSVN)</title>
            </motion.rect>
            <text x="215" y="410" fill="#D4A853" fontSize="8" fontFamily="IBM Plex Mono">COSVN</text>
          </g>
        )}

        {/* International layer - Supply routes */}
        {layer === 'international' && (
          <g className="supply-routes">
            {/* USSR/China supply lines - Northern route */}
            <motion.line
              x1="200"
              y1="120"
              x2="200"
              y2="60"
              stroke="#6B7A3A"
              strokeWidth="2"
              strokeDasharray="5 3"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <polygon points="200,55 195,65 205,65" fill="#6B7A3A" opacity="0.6" />
            <text x="205" y="80" fill="#6B7A3A" fontSize="7" fontFamily="IBM Plex Mono">USSR / PRC</text>

            {/* China route through Laos - Southern route */}
            <motion.path
              d="M200 130 Q250 200 280 300"
              stroke="#6B7A3A"
              strokeWidth="2"
              strokeDasharray="5 3"
              fill="none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <polygon points="280,300 275,310 285,305" fill="#6B7A3A" opacity="0.5" />
            <text x="285" y="250" fill="#6B7A3A" fontSize="7" fontFamily="IBM Plex Mono">Sông Hồng</text>
          </g>
        )}

        {/* City dots and labels with premium hover effects */}
        {cities.map((city) => (
          <g
            key={city.id}
            className="city-marker"
            onClick={() => handleCityClick(city.id)}
            onMouseEnter={() => setHoveredZone(city.id)}
            onMouseLeave={() => setHoveredZone(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Outer glow ring */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={activeZone === city.id || hoveredZone === city.id ? 10 : 6}
              fill="none"
              stroke={activeZone === city.id ? '#C0392B' : '#D4A853'}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeZone === city.id || hoveredZone === city.id ? 0.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Main dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={activeZone === city.id || hoveredZone === city.id ? 6 : 4}
              fill={activeZone === city.id ? '#C0392B' : '#D4A853'}
              animate={{
                r: activeZone === city.id || hoveredZone === city.id ? [4, 6, 4] : 4,
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Label */}
            <text
              x={city.x + 10}
              y={city.y + 4}
              fill={activeZone === city.id ? '#C0392B' : '#F2E8D5'}
              fontSize="11"
              fontFamily="IBM Plex Mono"
              fontWeight={activeZone === city.id ? 'bold' : 'normal'}
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* Gulf of Tonkin label */}
        <text x="260" y="90" fill="#8B95A8" fontSize="10" fontFamily="Noto Serif" fontStyle="italic">
          Vịnh Bắc Bộ
        </text>
        <text x="260" y="102" fill="#8B95A8" fontSize="9" fontFamily="IBM Plex Mono" fontStyle="italic">
          Gulf of Tonkin
        </text>

        {/* South China Sea label */}
        <text x="300" y="500" fill="#8B95A8" fontSize="10" fontFamily="Noto Serif" fontStyle="italic">
          Biển Đông
        </text>
        <text x="300" y="512" fill="#8B95A8" fontSize="9" fontFamily="IBM Plex Mono" fontStyle="italic">
          South China Sea
        </text>

        {/* Layer indicator */}
        <g className="layer-indicator">
          <rect x="10" y="760" width="80" height="20" rx="4" fill="rgba(0,0,0,0.6)" />
          <text x="50" y="774" fill="#D4A853" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="bold">
            {layer === 'military' ? 'QUÂN SỰ' : layer === 'political' ? 'CHÍNH TRỊ' : 'QUỐC TẾ'}
          </text>
        </g>
      </svg>

      <style>{`
        .map-svg-wrapper {
          position: relative;
        }

        .trail-path {
          animation: dashMove 20s linear infinite;
        }

        @keyframes dashMove {
          to {
            stroke-dashoffset: -1000;
          }
        }

        .vietnam-map {
          display: block;
        }

        .city-marker text {
          transition: fill 0.2s, font-weight 0.2s;
        }

        .battle-markers text,
        .command-centers text,
        .supply-routes text {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

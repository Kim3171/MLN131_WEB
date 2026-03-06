// src/components/svgs/VietnamMap.jsx
// Detailed SVG map of Vietnam with historical context

import { useState } from 'react';

export default function VietnamMap({ onZoneClick, activeZone, layer = 'military' }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  // City coordinates for the map
  const cities = [
    { id: 'hanoi', name: 'Hà Nội', x: 200, y: 120 },
    { id: 'hcm-trail', name: 'Đường mòn Hồ Chí Minh', x: 280, y: 350 },
    { id: 'hue', name: 'Huế', x: 210, y: 260 },
    { id: 'danang', name: 'Đà Nẵng', x: 225, y: 280 },
    { id: 'saigon', name: 'Sài Gòn', x: 190, y: 420 },
    { id: 'mekong', name: 'Cần Thơ', x: 150, y: 460 },
    { id: 'dak-to', name: 'Đắk Tô', x: 240, y: 320 },
  ];

  const handleCityClick = (cityId) => {
    if (onZoneClick) {
      onZoneClick(cityId);
    }
  };

  return (
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

      {/* Military layer - Battle markers */}
      {layer === 'military' && (
        <g className="battle-markers">
          {/* Ia Drang */}
          <circle cx="240" cy="310" r="8" fill="#C0392B" opacity="0.8">
            <title>Trận Ia Drang (1965)</title>
          </circle>
          {/* Dak To */}
          <circle cx="240" cy="320" r="6" fill="#C0392B" opacity="0.6">
            <title>Trận Đắk Tô (1967)</title>
          </circle>
          {/* Hue */}
          <circle cx="210" cy="260" r="7" fill="#C0392B" opacity="0.7">
            <title>Trận Huế (1968)</title>
          </circle>
          {/* Saigon */}
          <circle cx="190" cy="420" r="9" fill="#C0392B" opacity="0.9">
            <title>Giải phóng Sài Gòn (1975)</title>
          </circle>
        </g>
      )}

      {/* Political layer - Party command centers */}
      {layer === 'political' && (
        <g className="command-centers">
          {/* Hanoi - Party HQ */}
          <rect x="190" y="105" width="20" height="15" fill="#C0392B" opacity="0.8">
            <title>Trung ương Đảng</title>
          </rect>
          {/* COSVN - Central Office for South Vietnam */}
          <rect x="240" y="380" width="25" height="18" fill="#C0392B" opacity="0.6">
            <title>Cơ quan Thường trực Trung ương tại miền Nam (COSVN)</title>
          </rect>
        </g>
      )}

      {/* International layer - Supply routes */}
      {layer === 'international' && (
        <g className="supply-routes">
          {/* USSR/China supply lines */}
          <line x1="200" y1="120" x2="200" y2="60" stroke="#6B7A3A" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
          <polygon points="200,55 195,65 205,65" fill="#6B7A3A" opacity="0.6" />

          {/* China route through Laos */}
          <path d="M200 130 Q250 200 280 300" stroke="#6B7A3A" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
          <polygon points="280,300 275,310 285,305" fill="#6B7A3A" opacity="0.5" />
        </g>
      )}

      {/* City dots and labels */}
      {cities.map((city) => (
        <g
          key={city.id}
          className="city-marker"
          onClick={() => handleCityClick(city.id)}
          onMouseEnter={() => setHoveredZone(city.id)}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ cursor: 'pointer' }}
        >
          <circle
            cx={city.x}
            cy={city.y}
            r={activeZone === city.id || hoveredZone === city.id ? 6 : 4}
            fill={activeZone === city.id ? '#C0392B' : '#D4A853'}
            opacity={activeZone === city.id ? 1 : 0.8}
          />
          <text
            x={city.x + 8}
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
    </svg>
  );
}

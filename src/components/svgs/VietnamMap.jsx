// src/components/svgs/VietnamMap.jsx
// Accurate Vietnam Map with layer-based visibility

import { useState } from 'react';

export default function VietnamMap({ onZoneClick, activeZone, layer = 'military', activeLayer }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  // Support both layer and activeLayer prop names
  const currentLayer = activeLayer || layer;

  // Cities with precise positions
  const cities = [
    { id: 'hanoi', name: 'Hà Nội', x: 248, y: 118, labelPos: 'above', bold: true },
    { id: 'hue', name: 'Huế', x: 288, y: 238, labelPos: 'right' },
    { id: 'danang', name: 'Đà Nẵng', x: 305, y: 262, labelPos: 'right' },
    { id: 'dak-to', name: 'Đắk Tô', x: 318, y: 305, labelPos: 'right' },
    { id: 'saigon', name: 'Sài Gòn', x: 252, y: 428, labelPos: 'above', bold: true },
    { id: 'cantho', name: 'Cần Thơ', x: 242, y: 465, labelPos: 'left' },
    { id: 'camau', name: 'Cà Mau', x: 278, y: 510, labelPos: 'right' },
  ];

  // Battle markers - military layer only
  const battles = [
    { id: 'khe-sanh', name: 'Khe Sanh', x: 262, y: 195 },
    { id: 'dak-to', name: 'Đắk Tô', x: 318, y: 305 },
  ];

  // Command centers - political layer only
  const commandCenters = [
    { id: 'hanoi-hq', name: 'TRUNG ƯƠNG ĐẢNG', x: 248, y: 132 },
    { id: 'cosvn', name: 'COSVN', x: 248, y: 385 },
  ];

  const handleCityClick = (cityId) => {
    if (onZoneClick) {
      onZoneClick(cityId);
    }
  };

  const isActive = (id) => activeZone === id;
  const isHovered = (id) => hoveredZone === id;

  // Calculate label position
  const getLabelPos = (city) => {
    const padding = 4;
    const textWidth = city.name.length * 6;
    const textHeight = 10;
    let tx, ty, textAnchor;

    if (city.labelPos === 'above') {
      tx = city.x;
      ty = city.y - 14;
      textAnchor = 'middle';
    } else if (city.labelPos === 'left') {
      tx = city.x - 8;
      ty = city.y + 4;
      textAnchor = 'end';
    } else {
      tx = city.x + 10;
      ty = city.y + 4;
      textAnchor = 'start';
    }

    return { tx, ty, textAnchor, textWidth, textHeight, padding };
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '500px',
      position: 'relative',
      display: 'block'
    }}>
      <svg
        viewBox="0 0 500 900"
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect x="0" y="0" width="500" height="900" fill="#0a0f1a" />

        {/* Neighbor countries */}
        <path d="M150,260 L80,300 L60,380 L100,420 L160,380 L180,300 Z" fill="#151d2b" />
        <path d="M130,380 L80,420 L90,480 L150,500 L180,440 Z" fill="#151d2b" />

        {/* North Vietnam */}
        <path
          d="M 215,85 L 245,78 L 278,82 L 298,95 L 308,118 L 305,148 L 292,168 L 270,178 L 248,182 L 228,178 L 210,162 L 200,140 L 202,112 Z"
          fill="#1C3D2A"
          stroke="#2E6B45"
          strokeWidth="1.5"
        />

        {/* South Vietnam */}
        <path
          d="M 210,195 L 248,188 L 270,183 L 292,172 L 308,152 L 318,175 L 322,205 L 318,238 L 308,268 L 295,295 L 278,318 L 260,338 L 245,355 L 235,372 L 228,390 L 225,410 L 228,428 L 238,442 L 248,450 L 255,445 L 258,432 L 252,418 L 248,402 L 252,388 L 262,378 L 272,375 L 282,382 L 288,395 L 285,412 L 275,425 L 268,438 L 270,450 L 280,458 L 292,452 L 298,438 L 295,422 L 288,408 L 290,392 L 300,382 L 312,382 L 320,392 L 318,410 L 308,425 L 302,440 L 305,452 L 315,458 L 325,450 L 328,432 L 322,415 L 322,398 L 330,385 L 342,382 L 350,392 L 348,412 L 338,428 L 332,445 L 335,458 L 345,462 L 355,452 L 355,432 L 348,415 L 345,398 L 350,382 L 360,372 L 368,360 L 365,342 L 355,328 L 352,308 L 355,285 L 350,260 L 342,235 L 330,215 L 318,198 L 298,188 L 270,185 Z"
          fill="#2E1A0E"
          stroke="#5C3820"
          strokeWidth="1.5"
        />

        {/* 17th Parallel Line */}
        <line x1="195" y1="190" x2="335" y2="190" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="8 4" />

        {/* Ho Chi Minh Trail - military + international */}
        {(currentLayer === 'military' || currentLayer === 'international') && (
          <path
            d="M 208,175 L 185,210 L 170,255 L 162,305 L 158,355 L 162,405 L 170,445 L 182,478 L 200,458"
            fill="none"
            stroke="#D4A853"
            strokeWidth="2"
            strokeDasharray="6 3"
            opacity="0.7"
          />
        )}

        {/* Military Layer - Battle Markers (red triangles) */}
        {currentLayer === 'military' && (
          <g>
            {battles.map((battle) => (
              <g key={battle.id}>
                {/* Triangle pointing up */}
                <polygon points={`${battle.x},${battle.y - 8} ${battle.x - 5},${battle.y + 4} ${battle.x + 5},${battle.y + 4}`} fill="#C0392B" />
                {/* Label to the right */}
                <text x={battle.x + 12} y={battle.y + 4} fill="#F2E8D5" fontSize="9" fontFamily="serif" fontWeight="bold">
                  {battle.name}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Political Layer - Command Boxes (olive) */}
        {currentLayer === 'political' && (
          <g>
            {commandCenters.map((center) => (
              <g key={center.id}>
                <rect x={center.x - 36} y={center.y - 6.5} width="72" height="13" rx="2" fill="rgba(107,122,58,0.25)" stroke="#6B7A3A" strokeWidth="1" />
                <text x={center.x} y={center.y + 3} fill="#F2E8D5" fontSize="7" fontFamily="serif" textAnchor="middle" fontWeight="bold">
                  {center.name}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* International Layer - Arrows */}
        {currentLayer === 'international' && (
          <g>
            {/* China arrow - from north */}
            <line x1="248" y1="42" x2="248" y2="78" stroke="#C0392B" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowdown)" />
            <text x="255" y="58" fill="#C0392B" fontSize="9" fontFamily="serif">CN Trung Quốc</text>

            {/* USSR arrow - from west */}
            <line x1="48" y1="118" x2="195" y2="118" stroke="#3498DB" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowright)" />
            <text x="52" y="113" fill="#3498DB" fontSize="9" fontFamily="serif">RU Liên Xô</text>
          </g>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowdown" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
            <polygon points="0 0, 8 7, 0 7" fill="#C0392B" />
          </marker>
          <marker id="arrowright" markerWidth="8" markerHeight="8" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#3498DB" />
          </marker>
        </defs>

        {/* Sea Labels - always visible */}
        <text x="370" y="155" fill="#1E4060" fontSize="10" fontFamily="serif" fontStyle="italic">Vịnh Bắc Bộ</text>
        <text x="380" y="420" fill="#1E4060" fontSize="10" fontFamily="serif" fontStyle="italic">Biển Đông</text>

        {/* Country Labels - always visible */}
        <text x="148" y="280" fill="rgba(139,149,168,0.3)" fontSize="11" fontFamily="serif">Lào</text>
        <text x="148" y="420" fill="rgba(139,149,168,0.3)" fontSize="10" fontFamily="serif">Campuchia</text>

        {/* Region Labels - always visible */}
        <text x="248" y="142" fill="rgba(242,232,213,0.25)" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">Miền Bắc</text>
        <text x="280" y="320" fill="rgba(242,232,213,0.2)" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">Miền Nam</text>

        {/* Cities - always visible */}
        {cities.map((city) => {
          const labelInfo = getLabelPos(city);
          return (
            <g
              key={city.id}
              onClick={() => handleCityClick(city.id)}
              onMouseEnter={() => setHoveredZone(city.id)}
              onMouseLeave={() => setHoveredZone(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Hover/active ring */}
              {(isActive(city.id) || isHovered(city.id)) && (
                <circle cx={city.x} cy={city.y} r="14" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5" />
              )}
              {/* City dot - larger for bold cities */}
              <circle
                cx={city.x}
                cy={city.y}
                r={city.bold || isActive(city.id) || isHovered(city.id) ? 5 : 3}
                fill={isActive(city.id) ? '#C0392B' : '#D4A853'}
              />
              {/* Label background rect */}
              <rect
                x={labelInfo.tx - labelInfo.padding - (labelInfo.textWidth / 2)}
                y={labelInfo.ty - labelInfo.padding - labelInfo.textHeight + 2}
                width={labelInfo.textWidth + (labelInfo.padding * 2)}
                height={labelInfo.textHeight + (labelInfo.padding * 2)}
                rx="2"
                fill="rgba(10,14,26,0.8)"
              />
              {/* City name */}
              <text
                x={labelInfo.tx}
                y={labelInfo.ty}
                fill="#F2E8D5"
                fontSize="9"
                fontFamily="serif"
                textAnchor={labelInfo.textAnchor}
                fontWeight={city.bold ? 'bold' : 'normal'}
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Layer badge */}
        <g transform="translate(10, 860)">
          <rect width="70" height="20" rx="4" fill="rgba(0,0,0,0.7)" />
          <text x="35" y="14" fill="#D4A853" fontSize="8" fontFamily="serif" textAnchor="middle" fontWeight="bold">
            {currentLayer === 'military' ? 'QUÂN SỰ' : currentLayer === 'political' ? 'CHÍNH TRỊ' : 'QUỐC TẾ'}
          </text>
        </g>
      </svg>
    </div>
  );
}
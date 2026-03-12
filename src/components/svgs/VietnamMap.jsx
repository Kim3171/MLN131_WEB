// SVG viewBox matches vietnam-map2.svg: 1664 x 2688
import { useState } from 'react';
import battleZones from '../../data/battleZones';

const VIEWBOX_W = 1664;
const VIEWBOX_H = 2688;

const LAYER_TYPES = {
  military:      ['military', 'diplomatic'],
  political:     ['political'],
  international: ['supply'],
};

const TYPE_COLOR = {
  military:   '#C92D2A',
  diplomatic: '#FF8C42',
  political:  '#D4A853',
  supply:     '#4CAF50',
};

const TYPE_ICON = {
  military:   '⚔',
  diplomatic: '⚓',
  political:  '★',
  supply:     '→',
};

// HCM Trail: Hà Nội → Mu Gia Pass west into Laos → south through eastern Laotian
// panhandle (x≈500-660, well west of Vietnam spine) → Cambodia → Củ Chi
const TRAIL_PATH =
  'M 860 520 C 780 610 700 700 640 820 C 570 930 520 1060 505 1200 C 490 1340 510 1480 545 1610 C 585 1750 660 1870 780 1960 C 860 2010 950 2044 1020 2058';

const TRAIL_ARROWS = [
  { x: 820, y: 568,  rot: 138 },
  { x: 740, y: 660,  rot: 150 },
  { x: 670, y: 755,  rot: 158 },
  { x: 610, y: 870,  rot: 164 },
  { x: 548, y: 995,  rot: 170 },
  { x: 510, y: 1130, rot: 174 },
  { x: 492, y: 1264, rot: 176 },
  { x: 497, y: 1398, rot: 170 },
  { x: 517, y: 1532, rot: 162 },
  { x: 560, y: 1658, rot: 152 },
  { x: 624, y: 1776, rot: 140 },
  { x: 706, y: 1878, rot: 130 },
  { x: 805, y: 1950, rot: 120 },
];

// Per-zone label text color (overrides default white)
const ZONE_LABEL_COLOR = {
  'dienbienphu': '#C62828',   // dark red
  'dmz':         '#EF5350',   // red
  'hue':         '#EF5350',   // red
  'danang':      '#EF5350',   // red
  'dak-to':      '#EF5350',   // red
  'tonkin-gulf': '#90CAF9',   // light blue (sea)
  'hanoi':       '#FFD54F',   // gold
  'saigon':      '#FFD54F',   // gold
  'cu-chi':      '#FFFFFF',   // white
  'mekong':      '#FFFFFF',   // white
};

// Standalone NVA march text — wide central-north coastal corridor
// between Hà Nội (y≈476) and DMZ (y≈1062), left of the Tonkin→DMZ red arrow
const NVA_TEXT = {
  lines: ['QĐND Việt Nam tiến', 'vào miền Nam'],
  x: 900, y: 770,
  anchor: 'middle',
  color: '#EF5350',
};

// Military movement arrows.
// Layout:
//   🟠 Rolling Thunder → far-right black space (y≈560–660), label above arrow
//   🔴 Tonkin→DMZ       → curves through sea (x≥1250, no label)
//   🔵 US Da Nang       → far-right sea (y≈1330–1370), label right of Da Nẵng
//   🟣 Tết Offensive   → Đắk Tô → Đà Nẵng, label in open area ABOVE-LEFT of Đắk Tô
const MILITARY_ARROWS = [
  {
    // Orange: B-52 Rolling Thunder, from open sea far east → Gulf of Tonkin
    // arrow hugs y≈640 well separate from NVA text (y≈760) and DMZ arrow (x≥1250)
    id: 'rolling-thunder',
    label:    'Chiến dịch Sấm Rền',
    labelSub: '(1965–1968)',
    color: '#F57F17',
    path: 'M 1660 645 C 1570 638 1470 630 1345 622',
    labelX: 1656, labelY: 582,
    labelAnchor: 'end',
  },
  {
    // Red: from Vịnh Bắc Bộ → DMZ, curves through sea coast
    // stays x≥1180 most of the way to avoid NVA text and land labels
    id: 'tonkin-to-dmz',
    label: null,
    color: '#E53935',
    path: 'M 1230 640 C 1260 780 1250 920 1120 1054',
    labelX: 0, labelY: 0,
    labelAnchor: 'start',
  },
  {
    // Blue: US Marines from South China Sea east of coast → Đà Nẵng shore
    // label in sea area far right, well above arrow to avoid overlap
    id: 'us-danang',
    label:    'TQLC Mỹ đổ bộ Đà Nẵng',
    labelSub: '(3/1965)',
    color: '#42A5F5',
    path: 'M 1650 1320 C 1500 1310 1340 1296 1155 1278',
    labelX: 1656, labelY: 1250,
    labelAnchor: 'end',
  },
  {
    // Violet: Tết Offensive arrow Đắk Tô → Đà Nẵng
    // label placed in open western area well ABOVE Đắk Tô and LEFT of the coast markers
    id: 'tet-offensive',
    label:    'Tổng tấn công',
    labelSub: 'Tết Mậu Thân (1968)',
    color: '#BA68C8',
    path: 'M 1100 1460 C 1105 1400 1100 1340 1100 1296',
    labelX: 780, labelY: 1350,
    labelAnchor: 'start',
  },
];

export default function VietnamMap({ activeLayer = 'military', onZoneClick, activeZone }) {
  const [hovered, setHovered] = useState(null);
  const allowedTypes = LAYER_TYPES[activeLayer] || [];

  const visibleZones = battleZones.filter(
    z => allowedTypes.includes(z.type) && z.id !== 'hcm-trail'
  );
  const showTrail  = activeLayer === 'international';
  const showDMZ    = activeLayer === 'military';
  const showArrows = activeLayer === 'military';

  const arrowColors = ['#E53935','#42A5F5','#F57F17','#BA68C8','#C92D2A','#4CAF50','#FF8C42'];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: `${(VIEWBOX_H / VIEWBOX_W) * 100}%`,
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/vietnam-map2.svg"
          alt="Bản đồ Việt Nam 1954-1975"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block', userSelect: 'none' }}
        />

        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="xMidYMin meet"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {arrowColors.map(c => {
              const id = `arr-${c.replace('#','')}`;
              return (
                <marker key={id} id={id} markerWidth="10" markerHeight="7"
                  refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={c} />
                </marker>
              );
            })}
          </defs>

          {/* DMZ dashed line — 17th parallel, runs across full width of land at y=1062 */}
          {showDMZ && (
            <g>
              <line x1="830" y1="1062" x2="1240" y2="1062"
                stroke="#EF5350" strokeWidth="5" strokeDasharray="18,9" opacity="0.72"/>
            </g>
          )}

          {/* Standalone NVA march text — wide central-north coastal area */}
          {showArrows && (
            <g style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.9))' }}>
              {NVA_TEXT.lines.map((line, i) => (
                <text key={i}
                  x={NVA_TEXT.x} y={NVA_TEXT.y + i * 44}
                  fill={NVA_TEXT.color} fontSize="32" fontFamily="serif" fontWeight="bold"
                  textAnchor={NVA_TEXT.anchor}
                  paintOrder="stroke" stroke="#0a0e1a" strokeWidth="7">
                  {line}
                </text>
              ))}
            </g>
          )}

          {/* Military movement arrows */}
          {showArrows && MILITARY_ARROWS.map(a => {
            const markId = `arr-${a.color.replace('#','')}`;
            return (
              <g key={a.id}>
                <path d={a.path} stroke={a.color} strokeWidth="16"
                  fill="none" opacity="0.10" strokeLinecap="round"/>
                <path d={a.path} stroke={a.color} strokeWidth="7"
                  fill="none" opacity="0.92" strokeLinecap="round" strokeLinejoin="round"
                  markerEnd={`url(#${markId})`}/>
                {a.label && (
                  <>
                    <text x={a.labelX} y={a.labelY} fill={a.color} fontSize="28"
                      fontFamily="serif" fontWeight="bold" textAnchor={a.labelAnchor}
                      paintOrder="stroke" stroke="#0a0e1a" strokeWidth="6"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))' }}>
                      {a.label}
                    </text>
                    {a.labelSub && (
                      <text x={a.labelX} y={a.labelY + 36} fill={a.color} fontSize="24"
                        fontFamily="monospace" textAnchor={a.labelAnchor} opacity="0.85"
                        paintOrder="stroke" stroke="#0a0e1a" strokeWidth="5">
                        {a.labelSub}
                      </text>
                    )}
                  </>
                )}
              </g>
            );
          })}

          {/* Ho Chi Minh Trail */}
          {showTrail && (
            <g>
              <path d={TRAIL_PATH} stroke="#4CAF50" strokeWidth="28" fill="none" opacity="0.10"/>
              <path d={TRAIL_PATH} stroke="#4CAF50" strokeWidth="8" fill="none"
                strokeDasharray="30,16" opacity="0.92"
                markerEnd="url(#arr-4CAF50)"/>
              {TRAIL_ARROWS.map(({ x, y, rot }, i) => (
                <text key={i} x={x} y={y} fill="#4CAF50" fontSize="30"
                  fontFamily="monospace" textAnchor="middle" opacity="0.9"
                  transform={`rotate(${rot}, ${x}, ${y})`}
                  paintOrder="stroke" stroke="#0a0e1a" strokeWidth="4">
                  &#9658;
                </text>
              ))}
              <text x="420" y="1280" fill="#4CAF50" fontSize="28"
                fontFamily="serif" fontWeight="bold" textAnchor="middle"
                transform="rotate(-90, 420, 1280)"
                paintOrder="stroke" stroke="#0a0e1a" strokeWidth="6" opacity="0.85">
                QUA LÀO &amp; CAMPUCHIA
              </text>
              <g onClick={() => onZoneClick?.('hcm-trail')} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('hcm-trail')}
                onMouseLeave={() => setHovered(null)}>
                {(activeZone === 'hcm-trail' || hovered === 'hcm-trail') && (
                  <circle cx="590" cy="1380" r="70" fill="none" stroke="#4CAF50" strokeWidth="5" opacity="0.4">
                    <animate attributeName="r" values="60;90;60" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
                <circle cx="590" cy="1380" r={activeZone === 'hcm-trail' ? 36 : 28}
                  fill="#4CAF50" stroke="white" strokeWidth="4" opacity="0.95"/>
                <text x="590" y="1390" fill="white" fontSize="26"
                  fontFamily="monospace" textAnchor="middle" fontWeight="bold">&#62;</text>
                <text x="650" y="1368" fill="white" fontSize="36"
                  fontFamily="serif" fontWeight="bold"
                  paintOrder="stroke" stroke="#0a0e1a" strokeWidth="8"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}>
                  Đường mòn HCM
                </text>
              </g>
            </g>
          )}

          {/* Location markers */}
          {visibleZones.map(zone => {
            const isActive  = zone.id === activeZone;
            const isHovered = zone.id === hovered;
            const color     = TYPE_COLOR[zone.type] || '#D4A853';
            const icon      = TYPE_ICON[zone.type]  || 'o';
            const r         = isActive ? 34 : 26;
            // Label to the left for east-coast/sea zones to avoid going off the right edge
            const flipLeft  = zone.id === 'tonkin-gulf' || zone.id === 'danang'
                           || zone.id === 'hue' || zone.id === 'dmz';
            const labelX    = flipLeft ? zone.x - r - 14 : zone.x + r + 14;
            const labelAnchor = flipLeft ? 'end' : 'start';
            return (
              <g key={zone.id}
                onClick={() => onZoneClick?.(zone.id)}
                onMouseEnter={() => setHovered(zone.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}>
                {(isActive || isHovered) && (
                  <circle cx={zone.x} cy={zone.y} r={r + 30}
                    fill="none" stroke={color} strokeWidth="5" opacity="0.4">
                    <animate attributeName="r" values={`${r+20};${r+50};${r+20}`} dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
                <circle cx={zone.x} cy={zone.y} r={r}
                  fill={color} stroke="white" strokeWidth="4" opacity={isActive ? 1 : 0.88}/>
                <text x={zone.x} y={zone.y + 10} fill="white" fontSize="26"
                  fontFamily="monospace" textAnchor="middle" fontWeight="bold">{icon}</text>
                <text x={labelX} y={zone.y + 6}
                  fill={ZONE_LABEL_COLOR[zone.id] || 'white'}
                  fontSize="38" fontFamily="serif" fontWeight="bold"
                  textAnchor={labelAnchor}
                  paintOrder="stroke" stroke="#0a0e1a" strokeWidth="8"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85))' }}>
                  {zone.nameVi}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
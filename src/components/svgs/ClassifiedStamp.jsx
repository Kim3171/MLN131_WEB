// src/components/svgs/ClassifiedStamp.jsx
// Decorative "MẬT / CLASSIFIED" red stamp

export default function ClassifiedStamp({ size = 100, opacity = 0.15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`classified-stamp ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#C0392B"
        strokeWidth="3"
      />

      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="#C0392B"
        strokeWidth="1"
      />

      {/* Top text - rotated */}
      <text
        x="50"
        y="22"
        textAnchor="middle"
        fill="#C0392B"
        fontSize="14"
        fontFamily="IBM Plex Mono"
        fontWeight="bold"
        transform="rotate(-15, 50, 50)"
      >
        MẬT
      </text>

      {/* Bottom text - rotated */}
      <text
        x="50"
        y="85"
        textAnchor="middle"
        fill="#C0392B"
        fontSize="14"
        fontFamily="IBM Plex Mono"
        fontWeight="bold"
        transform="rotate(-15, 50, 50)"
      >
        CLASSIFIED
      </text>

      {/* Star in center */}
      <path
        d="M50 35 L53 45 L63 45 L55 52 L58 62 L50 56 L42 62 L45 52 L37 45 L47 45 Z"
        fill="#C0392B"
      />

      {/* Decorative dots */}
      <circle cx="15" cy="50" r="2" fill="#C0392B" />
      <circle cx="85" cy="50" r="2" fill="#C0392B" />
    </svg>
  );
}

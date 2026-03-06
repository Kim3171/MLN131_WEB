// src/components/svgs/BambooDecoration.jsx
// Horizontal decorative divider with stylized bamboo

export default function BambooDecoration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 30"
      width="100%"
      height="30"
      className={`bamboo-decoration ${className}`}
      preserveAspectRatio="none"
    >
      {/* Left bamboo stalk */}
      <path
        d="M20 30 Q25 15 20 0"
        stroke="#D4A853"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M20 30 Q25 15 20 0"
        stroke="#D4A853"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Bamboo nodes */}
      <ellipse cx="20" cy="25" rx="3" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="20" cy="18" rx="2.5" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="20" cy="11" rx="2" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="20" cy="5" rx="1.5" ry="0.8" fill="#D4A853" opacity="0.5" />

      {/* Bamboo leaves */}
      <path
        d="M20 8 Q30 5 35 10 Q28 12 20 10"
        fill="#D4A853"
        opacity="0.5"
      />
      <path
        d="M20 15 Q10 12 5 17 Q12 18 20 16"
        fill="#D4A853"
        opacity="0.4"
      />
      <path
        d="M20 22 Q32 19 38 24 Q30 25 20 23"
        fill="#D4A853"
        opacity="0.4"
      />

      {/* Center bamboo stalk */}
      <path
        d="M200 30 Q195 15 200 0"
        stroke="#D4A853"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M200 30 Q195 15 200 0"
        stroke="#D4A853"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Center bamboo nodes */}
      <ellipse cx="200" cy="25" rx="3" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="200" cy="18" rx="2.5" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="200" cy="11" rx="2" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="200" cy="5" rx="1.5" ry="0.8" fill="#D4A853" opacity="0.5" />

      {/* Center bamboo leaves */}
      <path
        d="M200 8 Q190 5 185 10 Q192 12 200 10"
        fill="#D4A853"
        opacity="0.5"
      />
      <path
        d="M200 15 Q210 12 215 17 Q208 18 200 16"
        fill="#D4A853"
        opacity="0.4"
      />
      <path
        d="M200 22 Q188 19 182 24 Q190 25 200 23"
        fill="#D4A853"
        opacity="0.4"
      />

      {/* Right bamboo stalk */}
      <path
        d="M380 30 Q375 15 380 0"
        stroke="#D4A853"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M380 30 Q375 15 380 0"
        stroke="#D4A853"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Right bamboo nodes */}
      <ellipse cx="380" cy="25" rx="3" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="380" cy="18" rx="2.5" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="380" cy="11" rx="2" ry="1" fill="#D4A853" opacity="0.5" />
      <ellipse cx="380" cy="5" rx="1.5" ry="0.8" fill="#D4A853" opacity="0.5" />

      {/* Right bamboo leaves */}
      <path
        d="M380 8 Q370 5 365 10 Q372 12 380 10"
        fill="#D4A853"
        opacity="0.5"
      />
      <path
        d="M380 15 Q390 12 395 17 Q388 18 380 16"
        fill="#D4A853"
        opacity="0.4"
      />
    </svg>
  );
}

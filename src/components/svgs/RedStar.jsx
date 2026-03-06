// src/components/svgs/RedStar.jsx
// Animated Vietnamese red star component

export default function RedStar({ size = 24, animated = true, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`red-star ${animated ? 'animated' : ''} ${className}`}
      style={animated ? {
        animation: 'starPulse 3s ease-in-out infinite'
      } : {}}
    >
      <style>
        {`
          @keyframes starPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .red-star.animated {
            transform-origin: center;
          }
        `}
      </style>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#C0392B"
        stroke="#C0392B"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

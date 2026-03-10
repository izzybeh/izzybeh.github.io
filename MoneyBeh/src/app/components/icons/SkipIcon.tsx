interface SkipIconProps {
  seconds: number;
  direction: 'forward' | 'backward';
  className?: string;
}

export function SkipIcon({ seconds, direction, className = '' }: SkipIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular arrow */}
      {direction === 'forward' ? (
        <>
          {/* Forward arrow arc */}
          <path
            d="M24 8C15.163 8 8 15.163 8 24c0 8.837 7.163 16 16 16 6.8 0 12.6-4.24 14.9-10.2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrow head */}
          <path
            d="M36 28l3.5-4.2L36 19.6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      ) : (
        <>
          {/* Backward arrow arc */}
          <path
            d="M24 8C32.837 8 40 15.163 40 24c0 8.837-7.163 16-16 16-6.8 0-12.6-4.24-14.9-10.2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrow head */}
          <path
            d="M12 28L8.5 23.8 12 19.6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
      
      {/* Number text */}
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="600"
      >
        {seconds}
      </text>
    </svg>
  );
}

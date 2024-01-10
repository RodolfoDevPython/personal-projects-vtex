import React from 'react'

interface Props {
  x: number
  y: number
}

const ActiveDot = (props: Props) => {
  return (
    <svg
      x={props.x - 17}
      y={props.y - 17}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dd)">
        <circle cx="18" cy="16" r="10" fill="url(#paint0_linear)" />
        <circle cx="18" cy="16" r="9.5" stroke="url(#paint1_linear)" />
      </g>
      <circle
        cx="18"
        cy="16"
        r="3.5"
        fill="url(#paint2_linear)"
        stroke="url(#paint3_linear)"
      />
      <defs>
        <filter
          id="filter0_dd"
          x="0"
          y="0"
          width="36"
          height="36"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow"
            result="effect2_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="18"
          y1="6"
          x2="18"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F5F3F4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="18"
          y1="6"
          x2="18"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EFE9EC" stopOpacity="0" />
          <stop offset="1" stopColor="#EFE9EC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="18"
          y1="12"
          x2="18"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DDD7DA" />
          <stop offset="1" stopColor="#EFE9EC" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="18"
          y1="12"
          x2="18"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DAD2D6" />
          <stop offset="1" stopColor="#EFE9EC" />
          <stop offset="1" stopColor="#EFE9EC" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ActiveDot

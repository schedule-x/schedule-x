export default function AppCheckmark() {
  const green = '#7fbb46'
  const svgStyles = {
    minWidth: '18px',
    width: '18px',
  }

  return (
    <>
      <svg
        style={svgStyles}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        enableBackground="new 0 0 32 32"
        fill={green}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <polyline
            fill="none"
            stroke={green}
            strokeWidth="2"
            strokeMiterlimit="10"
            points="29,7 11,25 3,17 "
          ></polyline>{' '}
        </g>
      </svg>
    </>
  )
}

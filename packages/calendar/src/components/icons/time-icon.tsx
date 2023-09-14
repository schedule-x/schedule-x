type props = {
  strokeColor: string
}

/**
 * Origin of SVG: https://www.svgrepo.com/svg/506771/time
 * License: PD License
 * Author Salah Elimam
 * Author website: https://www.figma.com/@salahelimam
 * */
export default function TimeIcon({ strokeColor }: props) {
  return (
    <>
      <svg
        className="sx__event-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 8V12L15 15"
            stroke={strokeColor}
            stroke-width="2"
            stroke-linecap="round"
          ></path>
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke={strokeColor}
            stroke-width="2"
          ></circle>
        </g>
      </svg>
    </>
  )
}

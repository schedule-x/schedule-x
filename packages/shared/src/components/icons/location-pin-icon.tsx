type props = {
  strokeColor: string
}

/**
 * Origin of SVG: https://www.svgrepo.com/svg/489502/location-pin
 * License: PD License
 * Author: Dariush Habibpour
 * Author website: https://redl.ink/dariush/links?ref=svgrepo.com
 * */
export default function LocationPinIcon({ strokeColor }: props) {
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
          <g clip-path="url(#clip0_429_11046)">
            <rect
              x="12"
              y="11"
              width="0.01"
              height="0.01"
              stroke={strokeColor}
              stroke-width="2"
              stroke-linejoin="round"
            ></rect>
            <path
              d="M12 22L17.5 16.5C20.5376 13.4624 20.5376 8.53757 17.5 5.5C14.4624 2.46244 9.53757 2.46244 6.5 5.5C3.46244 8.53757 3.46244 13.4624 6.5 16.5L12 22Z"
              stroke={strokeColor}
              stroke-width="2"
              stroke-linejoin="round"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_429_11046">
              <rect width="24" height="24" fill="white"></rect>
            </clipPath>
          </defs>
        </g>
      </svg>
    </>
  )
}

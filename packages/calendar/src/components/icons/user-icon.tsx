type props = {
  strokeColor: string
}

export default function UserIcon({ strokeColor }: props) {
  return (
    <>
      <svg
        className="sx__event-icon"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        style={{ stroke: strokeColor }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill="none"
          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  )
}

import * as React from "react"

const ListIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
    >
      <path fill="currentColor" fillRule="evenodd" d="M6.563 0h14.062" />
      <path
        fill="none"
        d="M6.563 7.5h14.062M6.563 15h14.062M0 0h1.875M0 7.5h1.875M0 15h1.875"
      />
    </g>
  </svg>
)

export default ListIcon

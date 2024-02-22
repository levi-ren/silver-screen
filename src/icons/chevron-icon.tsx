import React from "react";
import { IconProps } from "./icon-type";

const ChevronIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, ref) => (
    <svg
      ref={ref}
      stroke="currentColor"
      fill="currentColor"
      width="22"
      height="22"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      strokeWidth="0"
      data-darkreader-inline-fill=""
      data-darkreader-inline-stroke=""
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="m112 184 144 144 144-144"
      />
    </svg>
  )
);

ChevronIcon.displayName = "ChevronIcon";
export default ChevronIcon;

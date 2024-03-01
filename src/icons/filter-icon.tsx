import React from "react";
import { IconProps } from "./icon-type";

const FilterIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, ref) => (
    <svg
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"></path>
    </svg>
  )
);

FilterIcon.displayName = "FilterIcon";
export default FilterIcon;

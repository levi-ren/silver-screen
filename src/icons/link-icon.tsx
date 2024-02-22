import React from "react";
import { IconProps } from "./icon-type";

const LinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, ref) => (
    <svg
      ref={ref}
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      strokeWidth="0"
    >
      <path d="M1.5 1H6v1H2v12h12v-4h1v4.5l-.5.5h-13l-.5-.5v-13l.5-.5z"></path>
      <path d="M15 1.5V8h-1V2.707L7.243 9.465l-.707-.708L13.293 2H8V1h6.5l.5.5z"></path>
    </svg>
  )
);

LinkIcon.displayName = "LinkIcon";
export default LinkIcon;
import React from "react";
import { IconProps } from "./icon-type";

const PlayIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, ref) => (
    <svg
      ref={ref}
      width="22"
      height="27"
      viewBox="0 0 22 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 2.1716V24.6378C0 26.351 1.88664 27.3919 3.33958 26.4594L20.9916 15.2263C22.3361 14.3806 22.3361 12.4289 20.9916 11.5614L3.33958 0.350015C1.88664 -0.582464 0 0.458443 0 2.1716Z"
        fill="currentColor"
      />
    </svg>
  )
);

PlayIcon.displayName = "PlayIcon";
export default PlayIcon;

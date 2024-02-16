import React from "react";
import { IconProps } from "./icon-type";

const RateIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, ref) => (
    <svg
      ref={ref}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.0267 1.88833L6.94833 6.96666C6.60917 7.30583 6.41667 7.77333 6.41667 8.25916V17.4167C6.41667 18.425 7.24167 19.25 8.25 19.25H16.5C17.2333 19.25 17.8933 18.81 18.1867 18.1408L21.175 11.165C21.945 9.35 20.6158 7.33333 18.645 7.33333H13.4658L14.3367 3.135C14.4283 2.67666 14.2908 2.20916 13.9608 1.87916C13.42 1.3475 12.5583 1.3475 12.0267 1.88833ZM2.75 19.25C3.75833 19.25 4.58333 18.425 4.58333 17.4167V10.0833C4.58333 9.075 3.75833 8.25 2.75 8.25C1.74167 8.25 0.916667 9.075 0.916667 10.0833V17.4167C0.916667 18.425 1.74167 19.25 2.75 19.25Z"
        fill="currentColor"
      />
    </svg>
  )
);

RateIcon.displayName = "RateIcon";
export default RateIcon;

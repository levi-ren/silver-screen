import React from "react";
import { IconProps } from "./icon-type";

const BookMarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
        d="M15.5833 2.75H6.41668C5.40834 2.75 4.58334 3.575 4.58334 4.58333V19.25L11 16.5L17.4167 19.25V4.58333C17.4167 3.575 16.5917 2.75 15.5833 2.75ZM15.5833 16.5L11 14.5017L6.41668 16.5V5.5C6.41668 4.99583 6.82918 4.58333 7.33334 4.58333H14.6667C15.1708 4.58333 15.5833 4.99583 15.5833 5.5V16.5Z"
        fill="currentColor"
      />
    </svg>
  )
);

BookMarkIcon.displayName = "BookMarkIcon";
export default BookMarkIcon;

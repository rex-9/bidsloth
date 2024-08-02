import React, { SVGProps } from "react";

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={23}
    height={23}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 8.72214C1 7.51932 1 6.91791 1.2987 6.43461C1.5974 5.9513 2.13531 5.68234 3.21115 5.14443L9.71114 1.89443C10.589 1.45552 11.0279 1.23607 11.5 1.23607C11.9721 1.23607 12.411 1.45552 13.2889 1.89443L19.7889 5.14443C20.8647 5.68234 21.4026 5.9513 21.7013 6.43461C22 6.91791 22 7.51932 22 8.72214V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22H5C3.11438 22 2.17157 22 1.58579 21.4142C1 20.8284 1 19.8856 1 18V8.72214Z"
      stroke="var(--black-color)"
      strokeWidth={2}
    />
    <path
      d="M1 8.875L4.35171 12.2267C4.72679 12.6018 5.23549 12.8125 5.76593 12.8125H17.2341C17.7645 12.8125 18.2732 12.6018 18.6483 12.2267L22 8.875"
      stroke="var(--black-color)"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      d="M1 19.5V10.5H2L4.5 12.5H8H18.5L22 10V14.5V20L20 22H10.5L2 21.5L1 19.5Z"
      fill="var(--black-color)"
      stroke="var(--black-color)"
    />
  </svg>
);
export default EmailIcon;

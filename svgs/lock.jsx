import React from "react";

const LockSvg = ({ show, ...props }) =>
  show ? (
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="9" r="4" fill="#C1C1C1" />
      <path
        d="M19 9C19 9 18 1 10 1C2 1 1 9 1 9"
        stroke="#C1C1C1"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  ) : (
    <svg
      width="17"
      height="8"
      viewBox="0 0 17 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L4.92229 2.96115C7.17451 4.08726 9.82549 4.08726 12.0777 2.96115L16 1"
        stroke="#C1C1C1"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8.5 3.8125V6.625"
        stroke="#C1C1C1"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M2.875 2.875L1.9375 4.75"
        stroke="#C1C1C1"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M14.125 2.875L15.0625 4.75"
        stroke="#C1C1C1"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
export default LockSvg;

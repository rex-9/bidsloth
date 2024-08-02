import { useRef } from "react";
import styled from "styled-components";

const DatePicker = ({ value, onChange }) => {
  return (
    <DatePickerStyled>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="37"
          height="37"
          rx="2.5"
          fill="var(--primary-color)"
          stroke="var(--primary-color)"
        />
        <path
          d="M9 16C9 14.1144 9 13.1716 9.58579 12.5858C10.1716 12 11.1144 12 13 12H25C26.8856 12 27.8284 12 28.4142 12.5858C29 13.1716 29 14.1144 29 16C29 16.4714 29 16.7071 28.8536 16.8536C28.7071 17 28.4714 17 28 17H10C9.5286 17 9.29289 17 9.14645 16.8536C9 16.7071 9 16.4714 9 16Z"
          fill="white"
        />
        <path
          d="M9 25C9 26.8856 9 27.8284 9.58579 28.4142C10.1716 29 11.1144 29 13 29H25C26.8856 29 27.8284 29 28.4142 28.4142C29 27.8284 29 26.8856 29 25V20C29 19.5286 29 19.2929 28.8536 19.1464C28.7071 19 28.4714 19 28 19H10C9.5286 19 9.29289 19 9.14645 19.1464C9 19.2929 9 19.5286 9 20V25ZM14 22C14 21.5286 14 21.2929 14.1464 21.1464C14.2929 21 14.5286 21 15 21H17C17.4714 21 17.7071 21 17.8536 21.1464C18 21.2929 18 21.5286 18 22C18 22.4714 18 22.7071 17.8536 22.8536C17.7071 23 17.4714 23 17 23H15C14.5286 23 14.2929 23 14.1464 22.8536C14 22.7071 14 22.4714 14 22ZM14.1464 25.1464C14 25.2929 14 25.5286 14 26C14 26.4714 14 26.7071 14.1464 26.8536C14.2929 27 14.5286 27 15 27H17C17.4714 27 17.7071 27 17.8536 26.8536C18 26.7071 18 26.4714 18 26C18 25.5286 18 25.2929 17.8536 25.1464C17.7071 25 17.4714 25 17 25H15C14.5286 25 14.2929 25 14.1464 25.1464ZM20 22C20 21.5286 20 21.2929 20.1464 21.1464C20.2929 21 20.5286 21 21 21H23C23.4714 21 23.7071 21 23.8536 21.1464C24 21.2929 24 21.5286 24 22C24 22.4714 24 22.7071 23.8536 22.8536C23.7071 23 23.4714 23 23 23H21C20.5286 23 20.2929 23 20.1464 22.8536C20 22.7071 20 22.4714 20 22ZM20.1464 25.1464C20 25.2929 20 25.5286 20 26C20 26.4714 20 26.7071 20.1464 26.8536C20.2929 27 20.5286 27 21 27H23C23.4714 27 23.7071 27 23.8536 26.8536C24 26.7071 24 26.4714 24 26C24 25.5286 24 25.2929 23.8536 25.1464C23.7071 25 23.4714 25 23 25H21C20.5286 25 20.2929 25 20.1464 25.1464Z"
          fill="white"
        />
        <path
          d="M14 10L14 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 10L24 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </DatePickerStyled>
  );
};

export default DatePicker;

const DatePickerStyled = styled.div`
  position: relative;
  width: 38px;
  height: 38px;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -18px;
    bottom: 0;
    right: 0;
    opacity: 0;
    cursor: pointer !important;
    z-index: 2;

    &:hover {
      cursor: pointer;
    }
  }
`;

import React from "react";
import styled from "styled-components";
import Button from "./button";
import FloatStyled from "../styles/floatStyles";

const AvatarFloat = ({ openAction }) => {
  return (
    <FloatStyled>
      <p>Cheeeese! Customize your account with a profile picture.</p>
      <Button
        text="Upload"
        onClick={openAction}
        icon={
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.06763 10C4.78764 10 3.75 11.0376 3.75 12.3176V19C3.75 21.8284 3.75 23.2426 4.62868 24.1213C5.50736 25 6.92157 25 9.75 25H20.25C23.0784 25 24.4926 25 25.3713 24.1213C26.25 23.2426 26.25 21.8284 26.25 19V12.3176C26.25 11.0376 25.2124 10 23.9324 10C23.0545 10 22.252 9.50402 21.8594 8.71885L20.8333 6.66667C20.562 6.12397 20.4263 5.85262 20.2347 5.64465C19.9868 5.37568 19.6699 5.17983 19.3185 5.07841C19.0467 5 18.7434 5 18.1366 5H11.8634C11.2566 5 10.9533 5 10.6815 5.07841C10.3301 5.17983 10.0132 5.37568 9.76534 5.64465C9.57369 5.85262 9.43801 6.12397 9.16667 6.66667L8.14058 8.71885C7.74799 9.50402 6.94548 10 6.06763 10ZM18 16.25C18 17.9069 16.6569 19.25 15 19.25C13.3431 19.25 12 17.9069 12 16.25C12 14.5931 13.3431 13.25 15 13.25C16.6569 13.25 18 14.5931 18 16.25ZM20 16.25C20 19.0114 17.7614 21.25 15 21.25C12.2386 21.25 10 19.0114 10 16.25C10 13.4886 12.2386 11.25 15 11.25C17.7614 11.25 20 13.4886 20 16.25Z"
              fill="white"
            />
          </svg>
        }
      />
    </FloatStyled>
  );
};

export default AvatarFloat;
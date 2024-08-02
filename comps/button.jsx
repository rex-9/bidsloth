import React from "react";
import { PropTypes } from "prop-types";
import styled, { keyframes } from "styled-components";
import LockSvg from "../svgs/lock";

const Button = ({
  text,
  onClick,
  white,
  isDisabled,
  icon,
  isLoading,
  zink,
  ...props
}) => {
  return (
    <ButtonStyled
      className={white ? "white" : zink ? "zink" : isLoading ? "loading" : ""}
      onClick={() => isLoading !== true && onClick && onClick()}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="loader" />
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </ButtonStyled>
  );
};

export default Button;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ButtonStyled = styled.button`
  width: 100%;
  height: 49px;
  position: relative;
  margin-top: 1.5rem;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  color: var(--white-color);
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.95rem;
  transition: transform 0.3s ease-in-out;
  /* filter: drop-shadow(0px 7px 0px var(--black-color)); */
  /* box-shadow: 0px 7px 0px var(--black-color); */
  /* filter: drop-shadow(0px 7px 0px #990033); */

  svg {
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.01);
  }

  &:disabled {
    background: var(--grey-color);
    /* box-shadow: 0px 7px 0px #9e9e9e; */
    cursor: not-allowed;
    color: #fff;
  }

  &.white {
    background: #fff;
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    padding: 3px 14px;
    color: var(--black-color);

    &:hover {
      box-shadow: none;
    }

    /* box-shadow: 0px 7px 0px var(--black-color); */
  }

  &.zink {
    background: linear-gradient(180deg, #f97171 0%, #c027d3 100%);
    border-radius: 10px;
  }

  &.loading {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loader {
    border: 2px solid var(--white-color);
    border-top: 2px solid var(--primary-color);
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: ${spin} 0.35s linear infinite;
  }
`;

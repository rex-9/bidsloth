import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = ({
  label,
  dropValue,
  setDropValue,
  text,
  asInfo,
  className,
  dropArr,
  ...props
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <DropdownStyled className={className}>
      <span>{label}</span>
      <button
        disabled={asInfo}
        className={showDropDown ? "no-border" : ""}
        onClick={() => setShowDropDown(!showDropDown)}
        type="button"
        {...props}
      >
        {text}
        {!asInfo && (
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L7 7L1 1"
              stroke="var(--primary-color)"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        )}
      </button>
      <AnimatePresence>
        {showDropDown && (
          <motion.div
            className="zone-list"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {dropArr.map((arr) => (
              <p
                onClick={() => {
                  setDropValue(arr);
                  setShowDropDown(false);
                }}
                key={arr.label}
              >
                {arr.label}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </DropdownStyled>
  );
};

export default Dropdown;

const DropdownStyled = styled.div`
  position: relative;
  span {
    margin-bottom: 5px;
    display: block;
    text-align: left;
    font-weight: 500;
    font-size: 15px;
  }

  button {
    width: 100%;
    height: 52px;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--grey-color);
    border-radius: 10px;
    color: var(--black-color);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding: 10px;

    &.no-border {
      border-radius: 10px 10px 0 0;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .zone-list {
    position: absolute;
    width: 100%;
    max-height: 270px;
    overflow: hidden;
    overflow-y: scroll;
    background: #fff;
    z-index: 20;
    border: 1px solid #c1c1c1;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 10px 10px;
    /* Target the scrollbar */
    &::-webkit-scrollbar {
      width: 10px; /* Set the width of the scrollbar */
    }

    /* Target the scrollbar thumb */
    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
    }

    /* Target the scrollbar thumb on hover */
    &::-webkit-scrollbar-thumb:hover {
      background-color: #b3b2b2;
    }

    p {
      padding: 10px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: var(--white-color);
      }
    }
  }
`;

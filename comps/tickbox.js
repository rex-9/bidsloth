import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const TickBox = ({ ticked }) => {
  const [isTicked, setTicked] = useState(true);
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setTicked(!isTicked)}
      className="cursor-pointer border-svg"
    >
      <motion.rect
        initial={{
          fill: isTicked ? "var(--primary-color)" : "#FFD8E7",
        }}
        animate={{
          fill: isTicked ? "#FFD8E7" : "var(--primary-color)",
        }}
        width="40"
        height="40"
        rx="5"
      />
      <path
        d="M13 19.625L17.0764 23.7014C17.8005 24.4255 18.1625 24.7875 18.6031 24.7676C19.0437 24.7476 19.3715 24.3542 20.027 23.5675L28 14"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default TickBox;

const TickedStyled = styled.div``;

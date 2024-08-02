import React from "react";
import styled from "styled-components";

const Tag = ({ label, onClick }) => {
  return <TagContainer onClick={() => onClick(label)}>{label}</TagContainer>;
};

export default Tag;

const TagContainer = styled.p`
  background-color: var(--light-primary);
  color: var(--primary-color);
  padding: 5px 1rem;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
`;

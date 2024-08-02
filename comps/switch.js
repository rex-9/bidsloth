import React from "react";
import styled from "styled-components";
import Switch from "react-input-switch";
import { useState } from "react";

const SwitchComponent = ({ label, value, setValue }) => {
  return (
    <SwitchStyled>
      <Switch
        styles={{
          trackChecked: {
            backgroundColor: "var(--primary-color)",
          },
        }}
        value={value}
        onChange={setValue}
      />
      <p>{label}</p>
    </SwitchStyled>
  );
};

export default SwitchComponent;

const SwitchStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  p {
    margin-left: 1rem;
    font-size: 13.5px;
  }
`;

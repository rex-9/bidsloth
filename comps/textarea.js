import React from "react";
import styled from "styled-components";

const TextareaComponent = ({
  onChange,
  value,
  label,
  className,
  name,
  ...props
}) => {
  return (
    <TextareaStyled className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea name={name} onChange={onChange} value={value} {...props} />
    </TextareaStyled>
  );
};

export default TextareaComponent;

const TextareaStyled = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #c1c1c1;
    margin-bottom: 5px;
  }

  textarea {
    display: block;
    width: 100%;
    height: 200px;
    padding: 12px;
    margin-bottom: 0;
    border: 1px solid var(--grey-color);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    outline: none;

    &::placeholder {
      color: var(--grey-color);
    }
  }
`;

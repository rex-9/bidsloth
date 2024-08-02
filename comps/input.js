import React from "react";
import styled from "styled-components";
import LockSvg from "../svgs/lock";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";

const InputComponent = ({
  type,
  onChange,
  value,
  isPassword,
  togglePassword,
  label,
  className,
  name,
  count,
  icon,
  money,
  suffix,
  prefix,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <InputStyled className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input">
        {icon && <div className="icon"> {icon} </div>}
        {money ? (
          <CurrencyFormat
            thousandSeparator
            value={value}
            inputMode="numeric"
            isNumericString
            prefix={prefix}
            className={icon ? "isIcon" : ""}
            spellCheck={false}
            allowNegative={false}
            fixedDecimalScale
            decimalScale={2}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              onChange(value);
            }}
          />
        ) : (
          <input
            type={type === "password" ? (showPass ? "text" : "password") : type}
            name={name}
            onChange={onChange}
            value={value}
            className={icon ? "isIcon autofill-input" : "autofill-input"}
            {...props}
          />
        )}
        {String(count).length && <p className="count">{count}</p>}
        {type === "password" && (
          <LockSvg
            className="pass-svg"
            show={showPass}
            onClick={() => setShowPass(!showPass)}
          />
        )}
        {suffix && <div className="pass-svg">{suffix} </div>}
      </div>
    </InputStyled>
  );
};

export default InputComponent;

const InputStyled = styled.div`
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

  .input {
    position: relative;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 1.2rem;
    transform: translateY(-50%);
  }

  input {
    display: block;
    width: 100%;
    height: 49px;
    background: #fff;
    padding: 12px;
    padding-right: 1.7rem;
    margin-bottom: 0;
    border: 1px solid var(--grey-color);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 0.95rem;

    &:disabled {
      opacity: 0.5;
    }

    &.isIcon {
      padding-left: 2.7rem;
    }

    &::placeholder {
      color: var(--grey-color);
    }

    /* Override autofill background color */
    &.autofill-input:-webkit-autofill {
      background-color: var(--white-color) !important;
    }

    /* Override autofill text color */
    &.autofill-input:-webkit-autofill {
      color: var(--black-color) !important;
    }
  }

  .pass-svg,
  .count {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .count {
    cursor: text;
    pointer-events: none;
    color: var(--grey-color);
  }

  @media screen and (max-width: 550px) {
    input {
      height: 60px;
    }
  }
`;

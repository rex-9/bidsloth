import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";

const PhoneInputComponent = ({ value, setValue }) => {
  return (
    <PhoneStyled>
      <PhoneInput
        country="gb"
        enableSearch
        enableAreaCodes
        value={value}
        onChange={setValue}
        inputClass="phone-input-field"
        buttonClass="phone-button"
        containerClass="phone-class"
      />
    </PhoneStyled>
  );
};

export default PhoneInputComponent;

const PhoneStyled = styled.div`
  width: 100%;

  .phone-class {
    width: 100%;
    height: 55px;
  }

  .phone-button {
    background: #fff;
    border-radius: 10px 0 0 10px;
    width: 40px;

    .selected-flag {
      border-radius: 10px 0 0 10px;
      background: #fff;

      &:hover,
      &:focus {
        background: #fff;
        border-radius: 10px 0 0 10px;
      }
    }

    &:hover,
    &:focus {
      background: #fff;
      border-radius: 10px 0 0 10px;
    }
  }

  .phone-input-field {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--grey-color);
  }
`;

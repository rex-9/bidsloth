import styled from "styled-components";

const FloatStyled = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 808px;
  padding: 1.2rem;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 1.5rem 0;

  p {
    color: var(--black-color);
    font-weight: 500;
    font-size: 1rem;
    max-width: 75%;
  }

  button {
    width: 150px;
    margin: 0;
    /* color: var(--primary-color) !important; */

    &.zink {
      width: auto;
      min-width: 150px;
      padding: 0 1rem;
    }
  }

  @media screen and (max-width: 550px) {
    display: block;
    width: 100%;

    p {
      max-width: 100%;
      margin-bottom: 1rem;
      font-size: 13px;
    }

    button {
      width: 100%;
    }
  }
`;

export default FloatStyled;

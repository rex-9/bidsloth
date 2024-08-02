import styled from "styled-components";

const GridStyles = styled.section`
  width: 100%;

  .welcome {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 750px;
  }

  .welcome-text {
    width: 40%;

    h3 {
      color: var(--primary-color);
      font-size: 21px;
    }

    .intro {
      font-size: 14px;
      margin-top: 1rem;
    }

    button {
      width: 260px;
    }

    .note {
      text-align: center;
      width: 260px;
      font-size: 12px;
      margin-top: 14px;
      color: var(--primary-color);

      &.payout {
        color: var(--grey-color);
        width: 200px;
        margin: 14px auto 0;
      }

      &.new {
        text-align: left;
        width: 85%;
        margin: 0;
        margin-top: 0.85rem;
      }
    }
  }

  .welcome-img {
    width: 45%;
    height: auto;

    &.sm-wd {
      width: 40%;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .welcome-notes {
    width: 80%;
  }

  .off {
    width: 550px;
    font-size: 13px;
    text-align: center;
    margin: 4rem 0 0 10%;
    color: var(--grey-color);
  }

  .payout-footer {
    margin-left: -180px;
  }

  @media screen and (min-width: 1440px) {
    padding-top: 3%;

    .welcome-text {
      .note.payout {
        width: 260px;
        margin: 0;
        margin-top: 0.85rem;
      }
    }
  }

  @media screen and (max-width: 850px) {
    .welcome,
    .welcome-notes {
      width: 100%;
    }

    .off {
      width: 75%;
    }

    .payout-footer {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 550px) {
    .welcome {
      flex-direction: column-reverse;
      .welcome-text {
        width: 100%;
        margin-top: 2rem;
        button {
          width: 100%;
        }
      }

      .welcome-img {
        width: 90%;
        margin-top: 2rem;
      }
    }

    .welcome-notes {
      height: auto;
    }

    .off {
      width: 100%;
      margin: 0;
    }

    .payout-footer {
      margin-left: 0;
    }
  }
`;

export default GridStyles;

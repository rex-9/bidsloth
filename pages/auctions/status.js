import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

import AwaitingLunch from "../../parts/status/awaiting";
import DashboardLayout from "../../hoc/dashboardLayout";
import LiveAuction from "../../parts/status/live";
import CompletedAuction from "../../parts/status/completed";
import AuctionDefaulter from "../../parts/status/defaulter";
import AuctionPaid from "../../parts/status/paid";
import { DashboardContext } from "../../context/DashboardContext";

export default function CreateAuctions() {
  const [activeScreen, setActiveScreen] = useState(1);

  const [dashboardState] = useContext(DashboardContext);

  const { auction, creatorData } = dashboardState;
  const router = useRouter();

  useEffect(() => {
    // Convert the startDateTime and endDateTime to Date objects
    const eventStartDate = new Date(auction?.startDateTime);
    const endDateTime = new Date(auction?.endDateTime);

    // Get the current date and time
    const currentDate = new Date();

    // Check if the auction hasn't started
    if (currentDate < eventStartDate) {
      setActiveScreen(1); // Before auction starts
    } else if (currentDate >= eventStartDate && currentDate <= endDateTime) {
      setActiveScreen(2); // Auction is live
    } else if (currentDate > endDateTime) {
      setActiveScreen(3); // Auction has ended
    }
  }, [auction]);

  const handleActiveState = () => {
    switch (activeScreen) {
      case 1:
        return <AwaitingLunch />;
      case 2:
        return <LiveAuction />;
      case 3:
        return <CompletedAuction />;
      case 4:
        return <AuctionDefaulter />;
      case 5:
        return <AuctionPaid />;

      default:
        return <AwaitingLunch />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen]);

  return (
    <DashboardLayout pageTitle="Auction">
      <StatusWrapperStyled>
        <div className="auction-img">
          <Image
            src={auction?.photo}
            width="600"
            height="377"
            alt="welcome from bo"
          />
          <div
            className="view"
            onClick={() =>
              router.push(`https://bidsloth.com/${creatorData?.username}`)
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4379 10.8112C18.6892 11.2462 18.8149 11.4637 18.8149 12C18.8149 12.5363 18.6892 12.7538 18.4379 13.1888C17.5834 14.6675 15.6561 17 12 17C8.34394 17 6.41663 14.6675 5.56211 13.1888C5.31076 12.7538 5.18508 12.5363 5.18508 12C5.18508 11.4637 5.31076 11.2462 5.56211 10.8112C6.41663 9.33247 8.34394 7 12 7C15.6561 7 17.5834 9.33247 18.4379 10.8112Z"
                fill="#FFD8E7"
              />
              <circle cx="12" cy="12" r="3" fill="var(--primary-color)" />
              <path
                d="M17.5 3.5H17.7C19.4913 3.5 20.387 3.5 20.9435 4.0565C21.5 4.61299 21.5 5.50866 21.5 7.3V7.5M17.5 20.5H17.7C19.4913 20.5 20.387 20.5 20.9435 19.9435C21.5 19.387 21.5 18.4913 21.5 16.7V16.5M6.5 3.5H6.3C4.50866 3.5 3.61299 3.5 3.0565 4.0565C2.5 4.61299 2.5 5.50866 2.5 7.3V7.5M6.5 20.5H6.3C4.50866 20.5 3.61299 20.5 3.0565 19.9435C2.5 19.387 2.5 18.4913 2.5 16.7V16.5"
                stroke="var(--primary-color)"
                stroke-linecap="round"
              />
            </svg>
            <p>View</p>
          </div>
        </div>
        {handleActiveState()}
      </StatusWrapperStyled>
    </DashboardLayout>
  );
}

const StatusWrapperStyled = styled.main`
  width: 600px;
  padding-top: 1rem;
  margin-left: 2rem;

  .cursor-pointer {
    cursor: pointer;
  }

  .border-svg {
    border: 1px solid var(--primary-color);
    border-radius: 5px;
  }

  .auction-img {
    width: 100%;
    height: 340px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.15));
      object-fit: cover;
      border-radius: 5px;
    }

    .view {
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: #ffffff;
      border: 1px solid var(--primary-color);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0px 4px 4px rgba(255, 0, 102, 0.3);
      }

      p {
        margin-left: 5px;
        font-weight: 500;
        font-size: 15px;
        color: var(--primary-color);
      }
    }
  }

  .tag-url {
    display: flex;
    align-items: center;
    height: 60px;
    margin-top: 2rem;

    .url-sec {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 65%;
      padding: 1rem;
      height: 100%;
      border: 1px dashed var(--primary-color);
      border-radius: 5px 0px 0px 5px;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        color: var(--primary-color);
      }
    }

    .act-btn {
      background: var(--primary-color);
      border: 1px solid var(--primary-color);
      border-radius: 0px 5px 5px 0px;
      height: 100%;
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-weight: 600;
        font-size: 21px;
        line-height: 18px;
        color: #fff;
      }
    }
  }

  .lunch-timer {
    display: flex;
    align-items: center;
    margin: 2rem auto;
    border: 1px solid #f5f5f5;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 1.5rem;

    div {
      margin-left: 1.5rem;

      h5 {
        font-weight: 400;
        font-size: 15px;
      }

      p {
        color: var(--primary-color);
        font-size: 12.5px;
      }
    }
  }

  .notifier {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 1.25rem;
    font-weight: 600;
    font-size: 12px;

    span {
      font-size: 14px;
      margin-right: 4px;
    }

    a {
      text-decoration-line: underline;
    }

    &.not-bold {
      * {
        font-weight: 400 !important;
      }
    }

    &.red {
      background: var(--white-color);
      border: 1px solid var(--primary-color);

      span,
      a {
        color: var(--primary-color);
      }
    }

    &.green {
      background: #ebfbff;
      border: 1px solid #00d1ff;

      span,
      a {
        color: #00d1ff;
      }
    }
  }

  .live-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem auto;

    .stat {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f5f5f5;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      width: 190px;
      height: 93px;
      padding: 1rem;

      &:first-child {
        border: 2px solid var(--primary-color);

        img {
          width: 40px;
        }
      }

      div {
        margin-left: 12px;

        h6 {
          font-weight: 500;
          font-size: 11px;
        }

        p {
          font-weight: 600;
          font-size: 13.5px;
          color: var(--primary-color);
        }
      }
    }
  }

  .isDisabled {
    width: 230px;
    margin: 3rem auto 2rem;

    svg {
      margin: 1rem auto 0;
    }
  }

  .end {
    font-size: 12px;
    line-height: 25px;
    text-align: center;
    width: 440px;
    margin: auto;
    margin-top: 3rem;
    color: var(--grey-color);
  }

  @media screen and (max-width: 850px) {
    width: 100%;
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    .auction-img {
      height: 230px;
    }

    .lunch-timer {
      display: block;
      padding: 1rem;

      div {
        margin: 0;
        margin-top: 10px;
      }
    }

    .end {
      width: 100%;
      margin-top: 2rem;
    }

    .live-stat {
      display: block;
      width: 100%;

      .stat {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 93px;
        margin-bottom: 1.5rem;
        div {
          margin-left: 0;
        }
      }
    }
  }
`;

import React from "react";
import Button from "../../comps/button";
import Image from "next/image";

const CompletedAuction = () => {
  return (
    <>
      <div className="live-stat">
        <div className="stat">
          <Image
            src="/winner-image.png"
            width="56"
            height="70"
            alt="welcome from bo"
          />
          <div>
            <h6>Winning bid</h6>
            <p>$180</p>
          </div>
        </div>

        <div className="stat">
          <svg
            width="60"
            height="69"
            viewBox="0 0 60 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 24.5C7.5 20.7288 7.5 18.8431 8.67157 17.6716C9.84315 16.5 11.7288 16.5 15.5 16.5H44.5C48.2712 16.5 50.1569 16.5 51.3284 17.6716C52.5 18.8431 52.5 20.7288 52.5 24.5V53.5C52.5 57.2712 52.5 59.1569 51.3284 60.3284C50.1569 61.5 48.2712 61.5 44.5 61.5H15.5C11.7288 61.5 9.84315 61.5 8.67157 60.3284C7.5 59.1569 7.5 57.2712 7.5 53.5V24.5Z"
              fill="#FFD8E7"
            />
            <circle cx="30" cy="34" r="10" fill="var(--primary-color)" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47.4972 61.2237C47.5 61.3579 47.3939 61.4695 47.2597 61.474C46.4715 61.5 45.5602 61.5 44.4999 61.5H15.4999C14.4397 61.5 13.5286 61.5 12.7404 61.474C12.6062 61.4695 12.5002 61.3579 12.503 61.2237C12.6749 53.0669 20.4428 46.5 30.0001 46.5C39.5574 46.5 47.3252 53.0669 47.4972 61.2237Z"
              fill="var(--primary-color)"
            />
            <path
              d="M23 20L21 8L26.5 12.5L30 7L33.5 12.5L39 8L37 20H23Z"
              fill="var(--primary-color)"
            />
            <path
              d="M39 8L37 20H23L21 8M39 8L33.5 12.5L30 7M39 8C39.8284 8 40.5 7.32843 40.5 6.5C40.5 5.67157 39.8284 5 39 5C38.1716 5 37.5 5.67157 37.5 6.5C37.5 7.32843 38.1716 8 39 8ZM30 7L26.5 12.5L21 8M30 7C30.8284 7 31.5 6.32843 31.5 5.5C31.5 4.67157 30.8284 4 30 4C29.1716 4 28.5 4.67157 28.5 5.5C28.5 6.32843 29.1716 7 30 7ZM21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8Z"
              stroke="var(--primary-color)"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div>
            <h6>Winner</h6>
            <p>Username</p>
          </div>
        </div>
        <div className="stat">
          <svg
            width="48"
            height="32"
            viewBox="0 0 48 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.08579 1.58579C1.5 2.17157 1.5 3.11438 1.5 5V27C1.5 28.8856 1.5 29.8284 2.08579 30.4142C2.67157 31 3.61438 31 5.5 31H42.5C44.3856 31 45.3284 31 45.9142 30.4142C46.5 29.8284 46.5 28.8856 46.5 27V5C46.5 3.11438 46.5 2.17157 45.9142 1.58579C45.3284 1 44.3856 1 42.5 1H5.5C3.61438 1 2.67157 1 2.08579 1.58579ZM24 23.5C28.1421 23.5 31.5 20.1421 31.5 16C31.5 11.8579 28.1421 8.5 24 8.5C19.8579 8.5 16.5 11.8579 16.5 16C16.5 20.1421 19.8579 23.5 24 23.5Z"
              fill="#FFD8E7"
            />
            <rect
              x="1.5"
              y="1"
              width="45"
              height="30"
              rx="2"
              stroke="#FF0066"
              stroke-width="1.2"
            />
            <path
              d="M9 8.5H14"
              stroke="#FF0066"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <path
              d="M34 23.5H39"
              stroke="#FF0066"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <circle
              cx="24"
              cy="16"
              r="6.9"
              stroke="#FF0066"
              stroke-width="1.2"
            />
          </svg>

          <div>
            <h6>Payment status</h6>
            <p>Waiting</p>
          </div>
        </div>
      </div>

      <div className="notifier green">
        <p>
          <span>Wahay! </span> Auction fini! The winner has 48 hrs to pay! Once
          they pay the chat will be opened!
        </p>
      </div>

      <div className="isDisabled">
        <Button text="Start new auction!" disabled />
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.3334 11.6667V10.2083C23.3334 9.4343 23.3334 9.04728 23.2906 8.72237C22.9953 6.4787 21.2297 4.71316 18.986 4.41778C18.6611 4.375 18.2741 4.375 17.5001 4.375V4.375C16.726 4.375 16.339 4.375 16.0141 4.41778C13.7704 4.71316 12.0049 6.4787 11.7095 8.72237C11.6667 9.04728 11.6667 9.4343 11.6667 10.2083V11.6667"
            stroke="#C1C1C1"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.25368 11.0867C4.375 11.9654 4.375 13.3796 4.375 16.208V24.083C4.375 27.8542 4.375 29.7399 5.54657 30.9114C6.71815 32.083 8.60376 32.083 12.375 32.083H22.625C26.3962 32.083 28.2819 32.083 29.4534 30.9114C30.625 29.7399 30.625 27.8542 30.625 24.083V16.208C30.625 13.3796 30.625 11.9654 29.7463 11.0867C28.8676 10.208 27.4534 10.208 24.625 10.208H10.375C7.54657 10.208 6.13236 10.208 5.25368 11.0867ZM17.5 22.7913C18.8117 22.7913 19.875 21.728 19.875 20.4163C19.875 19.1047 18.8117 18.0413 17.5 18.0413C16.1883 18.0413 15.125 19.1047 15.125 20.4163C15.125 21.728 16.1883 22.7913 17.5 22.7913ZM21.875 20.4163C21.875 22.4885 20.4344 24.2242 18.5 24.6765V27.708H16.5V24.6765C14.5656 24.2242 13.125 22.4885 13.125 20.4163C13.125 18.0001 15.0838 16.0413 17.5 16.0413C19.9162 16.0413 21.875 18.0001 21.875 20.4163Z"
            fill="#C1C1C1"
          />
        </svg>
      </div>

      <p className="end">
        You can’t start a new auction just yet! Deliver this TREASURE! And then
        you can go again! And start a new bidding frenzy among your fans!
      </p>
    </>
  );
};

export default CompletedAuction;

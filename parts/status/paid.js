import React from "react";
import Image from "next/image";

import Button from "../../comps/button";
import TickBox from "../../comps/tickbox";

const AuctionPaid = () => {
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
          <TickBox />

          <div>
            <h6>Winner</h6>
            <p>Username</p>
          </div>
        </div>
        <div className="stat">
          <TickBox />

          <div>
            <h6>Payment status</h6>
            <p>Waiting</p>
          </div>
        </div>
      </div>

      <div className="notifier green not-bold">
        <p>
          Keep us in the loop! Tick the boxes when you’ve chatted with the
          winner and delivered the prize!
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

export default AuctionPaid;

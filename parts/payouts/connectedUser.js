import React from "react";
import Image from "next/image";
import Button from "../../comps/button";
import GridStyles from "../../styles/gridStystem";

const ConnectedUser = () => {
  return (
    <GridStyles>
      <div className="welcome">
        <div className="welcome-text">
          <h3>Yay! You’re connected! </h3>

          <p className="intro">
            As soon as your first auction is finished, you
          </p>
          <p className="intro">can check out all the payout details here! </p>
          <p className="intro">How much you’ll get, payment progress,</p>
          <p className="intro"> & payment date!</p>

          <Button
            text="Go to stripe"
            white
            onClick={() => {
              if (window) {
                const url = `https://dashboard.stripe.com/`;
                window.document.location.href = url;
              }
            }}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10C21.1313 10 21.2614 9.97419 21.3827 9.92395C21.5041 9.8737 21.6143 9.80005 21.7072 9.70718C21.8 9.61432 21.8737 9.50406 21.9239 9.38272C21.9742 9.26138 22 9.13133 22 9V6C22.0001 5.79017 21.9341 5.58565 21.8114 5.41544C21.6887 5.24524 21.5155 5.11799 21.3164 5.05176L12.3164 2.05176C12.111 1.9834 11.889 1.9834 11.6836 2.05176L2.68359 5.05176C2.48449 5.11799 2.31131 5.24524 2.18861 5.41544C2.0659 5.58565 1.99991 5.79017 2 6V9C1.99997 9.13133 2.02581 9.26138 2.07605 9.38272C2.12629 9.50406 2.19995 9.61432 2.29282 9.70718C2.38568 9.80005 2.49594 9.8737 2.61728 9.92395C2.73862 9.97419 2.86867 10 3 10H4V17.1843C3.41674 17.3897 2.91137 17.7707 2.55327 18.2748C2.19517 18.779 2.0019 19.3816 2 20V22C1.99997 22.1313 2.02581 22.2614 2.07605 22.3827C2.12629 22.5041 2.19995 22.6143 2.29282 22.7072C2.38568 22.8 2.49594 22.8737 2.61728 22.9239C2.73862 22.9742 2.86867 23 3 23H21C21.1313 23 21.2614 22.9742 21.3827 22.9239C21.5041 22.8737 21.6143 22.8 21.7072 22.7072C21.8 22.6143 21.8737 22.5041 21.9239 22.3827C21.9742 22.2614 22 22.1313 22 22V20C21.9981 19.3816 21.8048 18.779 21.4467 18.2748C21.0886 17.7707 20.5833 17.3897 20 17.1843V10H21ZM20 21H4V20C4.00026 19.7349 4.10571 19.4807 4.29319 19.2932C4.48066 19.1057 4.73486 19.0003 5 19H19C19.2651 19.0003 19.5193 19.1057 19.7068 19.2932C19.8943 19.4807 19.9997 19.7349 20 20V21ZM6 17V10H8V17H6ZM10 17V10H14V17H10ZM16 17V10H18V17H16ZM4 8V6.7207L12 4.0537L20 6.7207V8H4Z"
                  fill="var(--black-color)"
                />
              </svg>
            }
          />
          <p className="note payout">
            Update or change payout deets? Just swing by stripe!
          </p>
        </div>
        <div className="welcome-img">
          <Image
            src="/bidding-image.png"
            width="365"
            height="400"
            alt="welcome from bo"
          />
        </div>
      </div>
      <p className="off">
        Starting an auction on bidsloth is free! We take a 10% cut on the final
        price, to help keep the lights on and keep making bidsloth better!
        Stripe, our payment partner, charge a credit card fee (around 3% +
        $0.20).
      </p>
    </GridStyles>
  );
};

export default ConnectedUser;

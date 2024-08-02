import React, { useContext, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { DashboardContext } from "../../context/DashboardContext";

const AwaitingLunch = () => {
  const [dashboardState] = useContext(DashboardContext);

  const { auction, creatorData } = dashboardState;

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventDate = new Date(auction?.startDateTime);
      const timeDiff = eventDate - now;

      if (timeDiff <= 0) {
        setCountdown("The auction has started.");
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(
        `${days} days, ${hours} hrs, ${minutes} mins & ${seconds} secs`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [auction]);

  // Helper function to format the start date in the desired format
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };
    return new Date(dateString)
      .toLocaleDateString("en-US", options)
      .replace(",", "");
  };

  return (
    <>
      <div className="tag-url">
        <div className="url-sec">
          <p>bidsloth.com/{creatorData?.username}</p>
          <CopyToClipboard
            text={`https://bidsloth.com/${creatorData?.username}`}
            onCopy={() =>
              toast("Link Copied!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "success",
              })
            }
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M18.3334 6.6665V5.6665C18.3334 3.78089 18.3334 2.83808 17.7476 2.25229C17.1618 1.6665 16.219 1.6665 14.3334 1.6665H5.66675C3.78113 1.6665 2.83832 1.6665 2.25253 2.25229C1.66675 2.83808 1.66675 3.78089 1.66675 5.6665V14.3332C1.66675 16.2188 1.66675 17.1616 2.25253 17.7474C2.83832 18.3332 3.78113 18.3332 5.66675 18.3332H6.66675"
                stroke="#FF0066"
                stroke-width="3"
              />
              <rect
                x="11.6667"
                y="11.6665"
                width="16.6667"
                height="16.6667"
                rx="2"
                stroke="#FF0066"
                stroke-width="3"
              />
            </svg>
          </CopyToClipboard>
        </div>
        <div className="act-btn cursor-pointer">
          <p>Share!</p>
        </div>
      </div>
      <div className="lunch-timer">
        <svg
          width="48"
          height="42"
          viewBox="0 0 48 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0706 2.37103C8.22437 2.86574 6.54085 3.83772 5.18928 5.18928C3.83772 6.54084 2.86574 8.22437 2.37103 10.0706"
            stroke="#FF0066"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M37.9294 2.37103C39.7756 2.86574 41.4592 3.83772 42.8107 5.18928C44.1623 6.54084 45.1343 8.22437 45.629 10.0706"
            stroke="#FF0066"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="23.9999" cy="24.0014" r="17.7778" fill="#FF0066" />
          <path
            d="M24 17.2461V25.885C24 26.0231 24.1119 26.135 24.25 26.135H30.6667"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <div>
          <h5>Your auction launches in: {countdown}</h5>
          <p>Auction starts {formatDate(auction?.startDateTime)}</p>
        </div>
      </div>
      <div className="notifier red">
        <p>
          <span>Remember: </span>
          You can share your auction page pre-launch! Get your fans excited!
        </p>
      </div>
      <p className="end">
        To keep bidsloth super duper special, we only allow one auction at time!
        But as soon as your auction is over you can start it all again!
      </p>
    </>
  );
};

export default AwaitingLunch;

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import { DashboardContext } from "../../context/DashboardContext";
import CopyToClipboard from "react-copy-to-clipboard";

const LiveAuction = () => {
  const [dashboardState] = useContext(DashboardContext);

  const { auction, creatorData } = dashboardState;

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(auction?.endDateTime);
      const timeDiff = targetDate - now;

      // If the target date is in the past, display that the time has expired
      if (timeDiff <= 0) {
        setTimeLeft("0 hrs 0 mins");
        return;
      }

      // Calculate hours and minutes
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${hours} hrs ${minutes} mins`);
    };

    // Call the function immediately to initialize the display without delay
    updateTimeLeft();

    // Set an interval to update the time left every minute
    const intervalId = setInterval(updateTimeLeft, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [auction]); // Depend on endDate to reset the timer if the prop changes

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
                stroke="var(--primary-color)"
                stroke-width="3"
              />
              <rect
                x="11.6667"
                y="11.6665"
                width="16.6667"
                height="16.6667"
                rx="2"
                stroke="var(--primary-color)"
                stroke-width="3"
              />
            </svg>
          </CopyToClipboard>
        </div>
        <div className="act-btn cursor-pointer">
          <p>Share!</p>
        </div>
      </div>

      <div className="live-stat">
        <div className="stat">
          <Image
            src="/winner-image.png"
            width="56"
            height="70"
            alt="welcome from bo"
          />
          <div>
            <h6>Current top bid</h6>
            <p>$0</p>
          </div>
        </div>

        <div className="stat">
          <svg
            width="40"
            height="36"
            viewBox="0 0 40 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="36" rx="3" fill="#FF0066" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.9999 12C29.9999 10.8954 29.1044 10 27.9999 10C26.8953 10 25.9999 10.8954 25.9999 12V28C25.9999 29.1046 26.8953 30 27.9999 30C29.1044 30 29.9999 29.1046 29.9999 28V12ZM11.9998 14C13.1043 14 13.9998 14.8954 13.9998 16L13.9998 28C13.9998 29.1046 13.1043 30 11.9998 30C10.8952 30 9.99976 29.1046 9.99976 28V16C9.99976 14.8954 10.8952 14 11.9998 14ZM19.9996 18C21.1042 18 21.9996 18.8954 21.9996 20V28C21.9996 29.1046 21.1042 30 19.9996 30C18.8951 30 17.9996 29.1046 17.9996 28V20C17.9996 18.8954 18.8951 18 19.9996 18Z"
              fill="white"
            />
          </svg>
          <div>
            <h6>Number of bids</h6>
            <p>{auction?.bidCount}</p>
          </div>
        </div>
        <div className="stat">
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
            <h6>Time left</h6>
            <p>{timeLeft}</p>
          </div>
        </div>
      </div>

      <div className="notifier green">
        <p>
          <span>Notification: </span>
          {auction?.commentCount} comments on you auction!{" "}
          <Link href={`/${creatorData?.username}`}> see the buzz! </Link>
        </p>
      </div>
      <p className="end">
        To keep bidsloth super duper special, we only allow one auction at time!
        But as soon as your auction is over you can start it all again!
      </p>
    </>
  );
};

export default LiveAuction;

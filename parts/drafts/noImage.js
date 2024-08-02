import React from "react";
import Button from "../../comps/button";
import { useRouter } from "next/router";
import Image from "next/image";

const NoImageDraft = ({ title }) => {
  const router = useRouter();
  return (
    <>
      <div className="no-img">
        <Image
          src="/nothing-to-see-here-image.png"
          width={188}
          height={200}
          alt="no-img"
        />
        <p>
          {title ||
            "Get creating! Your draft auction is waiting for your pizzazz!"}{" "}
        </p>
      </div>
      <div className="after-img">
        <div className="status-wrap">
          <div className="status">
            <h5>Almost there!</h5>
            <p>Just a couple of steps to go!</p>
          </div>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 22C42 25.9556 40.827 29.8224 38.6294 33.1114C36.4318 36.4004 33.3082 38.9638 29.6537 40.4776C25.9992 41.9913 21.9778 42.3874 18.0982 41.6157C14.2186 40.844 10.6549 38.9392 7.85789 36.1422C5.06083 33.3451 3.15601 29.7815 2.3843 25.9018C1.61259 22.0222 2.00865 18.0009 3.5224 14.3464C5.03614 10.6918 7.59958 7.56827 10.8886 5.37063C14.1775 3.173 18.0443 2.00001 21.9999 2"
              stroke="#C1C1C1"
              stroke-width="3"
            />
            <path
              d="M22 2C26.2236 2 30.3388 3.3371 33.7557 5.81966C37.1727 8.30222 39.716 11.8028 41.0211 15.8197C42.3263 19.8365 42.3263 24.1635 41.0211 28.1803C39.716 32.1972 37.1727 35.6978 33.7557 38.1803"
              stroke="var(--primary-color)"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M16.5 21.75L19.5429 24.7929C19.9334 25.1834 20.5666 25.1834 20.9571 24.7929L27.75 18"
              stroke="#C1C1C1"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <Button
          text="Finish & launch!"
          onClick={() => router.push("/auctions/create")}
        />
      </div>
    </>
  );
};

export default NoImageDraft;

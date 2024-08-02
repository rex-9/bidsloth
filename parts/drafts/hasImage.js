import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../../comps/button";

const HasImageDraft = ({ img, step }) => {
  const router = useRouter();

  return (
    <>
      <div className="draft-img">
        <Image src={img} width="600" height="377" alt="cover photo" priority />
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
              d="M22 2C25.9556 2 29.8224 3.17298 33.1114 5.3706C36.4004 7.56823 38.9638 10.6918 40.4776 14.3463C41.9913 18.0008 42.3874 22.0222 41.6157 25.9018C40.844 29.7814 38.9392 33.3451 36.1422 36.1421C33.3451 38.9392 29.7815 40.844 25.9018 41.6157C22.0222 42.3874 18.0009 41.9913 14.3464 40.4776C10.6918 38.9639 7.56827 36.4004 5.37064 33.1114C3.173 29.8225 2.00001 25.9557 2 22.0001"
              stroke="#FF0066"
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
          onClick={() => router.push(`/auctions/create`)}
        />
      </div>
    </>
  );
};

export default HasImageDraft;

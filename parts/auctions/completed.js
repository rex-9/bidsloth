import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Button from "../../comps/button";

const CreateAuctionCompleted = ({ setActiveScreen }) => {
  return (
    <CreateAuctionCompletedStyled>
      <p>
        That’s it! Your auction is ready! Click launch and let the fan bidding
        frenzy begin!
      </p>
      <div className="welcome-img">
        <Image
          src="/welcome-image.png"
          width="227"
          height="250"
          alt="welcome from bo"
        />
      </div>
    </CreateAuctionCompletedStyled>
  );
};

export default CreateAuctionCompleted;

const CreateAuctionCompletedStyled = styled.section`
  width: 100%;

  p {
    font-size: 0.85rem;
    margin: 10px 0;
  }

  img {
    margin: 2rem auto 0;
  }
`;

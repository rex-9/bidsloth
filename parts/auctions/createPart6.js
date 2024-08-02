import React from "react";
import styled from "styled-components";
import TextareaComponent from "../../comps/textarea";

const CreateAuction6 = ({ formData, setFormData }) => {
  return (
    <CreateAuction6Styled>
      <div className="form">
        <TextareaComponent
          placeholder="Write a thank you message “Thank you for bidding! Good luck....”"
          value={formData.bidderMessage}
          onChange={(e) =>
            setFormData({ ...formData, bidderMessage: e.target.value })
          }
          className="no-maj"
        />
        <div className="svg-gr idea">
          <svg
            width={12}
            height={15}
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={5.52673} cy={5.52673} r={5.52673} fill="#FFD8E7" />
            <path
              d="M4.73555 9.47427V6.11875C4.73555 5.57369 4.29369 5.13184 3.74863 5.13184V5.13184C3.20358 5.13184 2.76172 5.57369 2.76172 6.11875V6.11875C2.76172 6.66381 3.20358 7.10567 3.74863 7.10567H7.30153C7.84659 7.10567 8.28845 6.66381 8.28845 6.11875V6.11875C8.28845 5.57369 7.84659 5.13184 7.30153 5.13184V5.13184C6.75647 5.13184 6.31462 5.57369 6.31462 6.11875V9.47427"
              stroke="var(--primary-color)"
              strokeLinecap="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.89345 11.5467C7.89345 11.4365 7.77843 11.3636 7.67696 11.4065C7.01552 11.6864 6.28826 11.8412 5.52485 11.8412C4.76144 11.8412 4.03418 11.6864 3.37274 11.4065C3.27126 11.3636 3.15625 11.4365 3.15625 11.5467V12.6307C3.15625 13.9389 4.21671 14.9993 5.52485 14.9993C6.83299 14.9993 7.89345 13.9389 7.89345 12.6307V11.5467Z"
              fill="var(--primary-color)"
            />
          </svg>
          <p>We’ll automatically send it to every bidder!</p>
        </div>
      </div>
    </CreateAuction6Styled>
  );
};

export default CreateAuction6;

const CreateAuction6Styled = styled.section`
  width: 100%;

  .form {
    margin: 1.5rem 0 2rem;
  }

  h5 {
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 5px;
  }

  label {
    font-weight: 400;
    font-size: 15px;
    color: var(--black-color);
    margin-bottom: 10px;
  }

  @media screen and (max-width: 650px) {
    padding: 0;
  }
`;

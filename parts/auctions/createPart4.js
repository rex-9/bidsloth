import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputComponent from "../../comps/input";
import Dropdown from "../../comps/dropdown";
import currencies from "../../services/data/currenciesData";

import isEmptyObj from "../../services/snippets/emptyObject";

const CreateAuction4 = ({ formData, setFormData }) => {
  // states
  const [dropValue, setDropValue] = useState(currencies[0]);

  // get initial value from context
  useEffect(() => {
    if (!isEmptyObj(formData)) {
      setDropValue(
        formData?.currency
          ? currencies.filter(
              (cur) =>
                cur.code.toLowerCase() === formData?.currency?.toLowerCase()
            )[0]
          : currencies[0]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSetDropValue = (selected) => {
    setDropValue(selected);
    setFormData({ ...formData, currency: selected?.code?.toLowerCase() });
  };

  return (
    <CreateAuction4Styled>
      <div className="form">
        <Dropdown
          text={dropValue.label}
          dropArr={currencies}
          setDropValue={handleSetDropValue}
          className="drop-m"
        />
        <div className="hint">
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
              stroke="#FF0066"
              strokeLinecap="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.89345 11.5467C7.89345 11.4365 7.77843 11.3636 7.67696 11.4065C7.01552 11.6864 6.28826 11.8412 5.52485 11.8412C4.76144 11.8412 4.03418 11.6864 3.37274 11.4065C3.27126 11.3636 3.15625 11.4365 3.15625 11.5467V12.6307C3.15625 13.9389 4.21671 14.9993 5.52485 14.9993C6.83299 14.9993 7.89345 13.9389 7.89345 12.6307V11.5467Z"
              fill="#FF0066"
            />
          </svg>

          <p>Pick the same currency as your stripe.</p>
        </div>

        <div className="bros">
          <div className="bro-gp">
            <InputComponent
              value={formData.startPrice}
              onChange={(value) =>
                setFormData({ ...formData, startPrice: Number(value) })
              }
              money
              icon={<p className="cur-sym">{dropValue.symbol}</p>}
              type="number"
              label="Auction start price"
              placeholder={0}
            />
          </div>
          <div className="bro-gp">
            <InputComponent
              money
              value={formData.bidIncrement}
              onChange={(value) =>
                setFormData({ ...formData, bidIncrement: Number(value) })
              }
              placeholder={0}
              label="Bid increments"
              type="number"
              icon={<p className="cur-sym">{dropValue.symbol}</p>}
              className="no-ma"
            />
            <div className="hint">
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
                  stroke="#FF0066"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.89345 11.5467C7.89345 11.4365 7.77843 11.3636 7.67696 11.4065C7.01552 11.6864 6.28826 11.8412 5.52485 11.8412C4.76144 11.8412 4.03418 11.6864 3.37274 11.4065C3.27126 11.3636 3.15625 11.4365 3.15625 11.5467V12.6307C3.15625 13.9389 4.21671 14.9993 5.52485 14.9993C6.83299 14.9993 7.89345 13.9389 7.89345 12.6307V11.5467Z"
                  fill="#FF0066"
                />
              </svg>

              <p>Minimum amount bids can increase by.</p>
            </div>
          </div>
        </div>
      </div>
    </CreateAuction4Styled>
  );
};

export default CreateAuction4;

const CreateAuction4Styled = styled.section`
  width: 100%;
  margin-bottom: 2rem;

  .form {
    margin: 1rem 0;
  }

  .drop-m {
    margin-bottom: 8px;
    width: 56%;
  }

  .cur-sym {
    font-weight: 500;
    font-size: 15px;
    color: #ffd8e7;
  }

  .bros {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1.5rem;

    .bro-gp {
      width: 47%;
    }

    .no-ma {
      margin: 0;
      margin-bottom: 8px;
    }
  }

  @media screen and (max-width: 650px) {
    .form,
    .drop-m {
      width: 100%;
    }

    .bros {
      display: block;

      .bro-gp {
        width: 100%;
      }
    }
  }
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Calendar } from "react-date-range";
import { AnimatePresence, motion } from "framer-motion";

import Dropdown from "../../comps/dropdown";
import InputComponent from "../../comps/input";
import isEmptyObj from "../../services/snippets/emptyObject";
import supportedCountries from "../../services/data/countries";
import { PickerStyled } from "./createPart3";
import { DateTime } from "luxon";

const CreateAuction5 = ({ setFormData, formData }) => {
  const dropdownOption = [
    {
      value: "worldwide",
      label: "Worldwide",
    },
    {
      label: "In a certain country!",
      value: "country",
    },
    {
      label: "An event, or has to be picked up!",
      value: "event",
    },
    {
      value: "digital",
      label: "Digital prize! (no shipping)",
    },
  ];

  const [selectedShipping, setSelectedShipping] = useState(dropdownOption[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  // get initial value from context
  useEffect(() => {
    if (!isEmptyObj(formData)) {
      setSelectedShipping(
        formData?.shipType
          ? dropdownOption.filter(
              (cur) =>
                cur.value.toLowerCase() === formData?.shipType?.toLowerCase()
            )[0]
          : dropdownOption[0]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const whatToDisplay = () => {
    switch (selectedShipping.value) {
      case "worldwide":
        return <WorldWide formData={formData} setFormData={setFormData} />;

      case "digital":
        return <Digital formData={formData} setFormData={setFormData} />;

      case "country":
        return <Country formData={formData} setFormData={setFormData} />;

      case "event":
        return <Event formData={formData} setFormData={setFormData} />;

      default:
        return <WorldWide formData={formData} setFormData={setFormData} />;
    }
  };

  const handleSelectedShipping = (selected) => {
    setSelectedShipping(selected);
    // console.log(selected);
    setFormData({ ...formData, shipType: selected?.value?.toLowerCase() });
  };

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    const newDate = DateTime.fromJSDate(date);
    setFormData({
      ...formData,
      prizeDate: {
        month: newDate?.month,
        year: newDate?.year,
      },
    });
    setShowDatePicker(false);
  };

  return (
    <>
      <CreateAuction5Styled>
        <div className="form">
          <Dropdown
            dropArr={dropdownOption}
            text={selectedShipping.label}
            setDropValue={handleSelectedShipping}
            className="wr-drop"
            label="Shipping to fans"
          />
          <AnimatePresence>{whatToDisplay()}</AnimatePresence>
          <div className="date-cta">
            <button onClick={() => setShowDatePicker(!showDatePicker)}>
              <svg
                width={40}
                height={40}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 14C5 12.1144 5 11.1716 5.58579 10.5858C6.17157 10 7.11438 10 9 10H31C32.8856 10 33.8284 10 34.4142 10.5858C35 11.1716 35 12.1144 35 14V16.6667H5V14Z"
                  fill="#FFD8E7"
                />
                <rect
                  x={5}
                  y={10}
                  width={30}
                  height={25}
                  rx={2}
                  stroke="var(--primary-color)"
                  strokeWidth={1.2}
                />
                <path
                  d="M11.668 5L11.668 10"
                  stroke="var(--primary-color)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                />
                <path
                  d="M28.332 5L28.332 10"
                  stroke="var(--primary-color)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                />
                <rect
                  x={11.668}
                  y={20}
                  width={6.66667}
                  height={3.33333}
                  rx={0.5}
                  fill="var(--primary-color)"
                />
                <rect
                  x={11.668}
                  y={26.6665}
                  width={6.66667}
                  height={3.33333}
                  rx={0.5}
                  fill="var(--primary-color)"
                />
                <rect
                  x={21.668}
                  y={20}
                  width={6.66667}
                  height={3.33333}
                  rx={0.5}
                  fill="var(--primary-color)"
                />
                <rect
                  x={21.668}
                  y={26.6665}
                  width={6.66667}
                  height={3.33333}
                  rx={0.5}
                  fill="var(--primary-color)"
                />
              </svg>
              <p>{`Estimated delivery date (${
                formData?.prizeDate?.month || "MM"
              }/${formData?.prizeDate?.year || "YYYY"})`}</p>
            </button>
            <div
              className={
                selectedShipping.value !== "worldwide" &&
                selectedShipping.value !== "country"
                  ? "hint hide"
                  : "hint show"
              }
            >
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
              <p>The winning bidder will pay for shipping.</p>
            </div>
          </div>
        </div>
      </CreateAuction5Styled>
      {showDatePicker && (
        <AnimatePresence>
          <PickerStyled>
            <Calendar
              onChange={(item) => handleSelectedDate(item)}
              showSelectionPreview={true}
              showMonthAndYearPickers={true}
              moveRangeOnFirstSelection={false}
              date={selectedDate}
              direction="horizontal"
              color="var(--primary-color)"
              displayMode="date"
              rangeColors="var(--primary-color)"
              minDate={new Date()}
              showDateDisplay={false}
            />
          </PickerStyled>
        </AnimatePresence>
      )}
    </>
  );
};

export default CreateAuction5;

const WorldWide = ({ setFormData, formData }) => {
  // update fee
  const handleSetFee = (fee) => {
    setFormData({
      ...formData,
      destination: {
        location: "worldwide",
        deliveryFee: Number(fee),
      },
    });
  };

  return (
    <WhatStyles
      initial={{
        opacity: 0,
        visibility: 0,
      }}
      exit={{
        opacity: 0,
        visibility: 0,
      }}
      animate={{
        opacity: 1,
        visibility: 1,
      }}
      transition={{
        duration: 0.3,
        easings: "anticipate",
        type: "spring",
      }}
    >
      <div className="double-inputs">
        <Dropdown asInfo label="Location" text="Worldwide" />
        <InputComponent
          label="Delivery fee"
          value={formData.destination.deliveryFee}
          onChange={handleSetFee}
          icon={
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16 9.03C8.16 9.53 8.035 10 7.785 10.44C7.545 10.88 7.185 11.25 6.705 11.55C6.235 11.85 5.675 12.03 5.025 12.09V13.305H4.05V12.09C3.11 12 2.35 11.705 1.77 11.205C1.19 10.705 0.9 10.045 0.9 9.225H2.73C2.76 9.615 2.885 9.94 3.105 10.2C3.325 10.45 3.64 10.61 4.05 10.68V7.38C3.38 7.21 2.835 7.04 2.415 6.87C1.995 6.69 1.635 6.41 1.335 6.03C1.045 5.65 0.9 5.13 0.9 4.47C0.9 3.64 1.19 2.955 1.77 2.415C2.35 1.865 3.11 1.545 4.05 1.455V0.239999H5.025V1.455C5.905 1.535 6.61 1.815 7.14 2.295C7.68 2.765 7.985 3.415 8.055 4.245H6.225C6.195 3.935 6.075 3.66 5.865 3.42C5.655 3.17 5.375 3 5.025 2.91V6.15C5.695 6.31 6.24 6.48 6.66 6.66C7.08 6.83 7.435 7.105 7.725 7.485C8.015 7.855 8.16 8.37 8.16 9.03ZM2.64 4.38C2.64 4.79 2.76 5.11 3 5.34C3.25 5.57 3.6 5.755 4.05 5.895V2.865C3.62 2.915 3.275 3.07 3.015 3.33C2.765 3.59 2.64 3.94 2.64 4.38ZM5.025 10.68C5.465 10.61 5.81 10.435 6.06 10.155C6.31 9.865 6.435 9.52 6.435 9.12C6.435 8.72 6.31 8.41 6.06 8.19C5.82 7.96 5.475 7.775 5.025 7.635V10.68Z"
                fill="#FFD8E7"
              />
            </svg>
          }
          money
        />
      </div>
    </WhatStyles>
  );
};

const Country = ({ setFormData, formData }) => {
  const handleDes = (selected) => {
    setFormData({
      ...formData,
      destination: {
        ...formData.destination,
        location: selected,
      },
    });
  };

  return (
    <WhatStyles
      initial={{
        opacity: 0,
        visibility: 0,
      }}
      exit={{
        opacity: 0,
        visibility: 0,
      }}
      animate={{
        opacity: 1,
        visibility: 1,
      }}
      transition={{
        duration: 0.3,
        easings: "anticipate",
        type: "spring",
      }}
    >
      <div className="double-inputs">
        <Dropdown
          label="Location"
          text={formData?.destination?.location || "Select Country"}
          setDropValue={(selected) => handleDes(selected.label)}
          dropArr={supportedCountries}
        />
        <InputComponent
          label="Delivery fee"
          value={formData?.destination?.deliveryFee || ""}
          onChange={(value) => {
            setFormData({
              ...formData,
              destination: {
                ...formData.destination,
                deliveryFee: Number(value),
              },
            });
          }}
          icon={
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16 9.03C8.16 9.53 8.035 10 7.785 10.44C7.545 10.88 7.185 11.25 6.705 11.55C6.235 11.85 5.675 12.03 5.025 12.09V13.305H4.05V12.09C3.11 12 2.35 11.705 1.77 11.205C1.19 10.705 0.9 10.045 0.9 9.225H2.73C2.76 9.615 2.885 9.94 3.105 10.2C3.325 10.45 3.64 10.61 4.05 10.68V7.38C3.38 7.21 2.835 7.04 2.415 6.87C1.995 6.69 1.635 6.41 1.335 6.03C1.045 5.65 0.9 5.13 0.9 4.47C0.9 3.64 1.19 2.955 1.77 2.415C2.35 1.865 3.11 1.545 4.05 1.455V0.239999H5.025V1.455C5.905 1.535 6.61 1.815 7.14 2.295C7.68 2.765 7.985 3.415 8.055 4.245H6.225C6.195 3.935 6.075 3.66 5.865 3.42C5.655 3.17 5.375 3 5.025 2.91V6.15C5.695 6.31 6.24 6.48 6.66 6.66C7.08 6.83 7.435 7.105 7.725 7.485C8.015 7.855 8.16 8.37 8.16 9.03ZM2.64 4.38C2.64 4.79 2.76 5.11 3 5.34C3.25 5.57 3.6 5.755 4.05 5.895V2.865C3.62 2.915 3.275 3.07 3.015 3.33C2.765 3.59 2.64 3.94 2.64 4.38ZM5.025 10.68C5.465 10.61 5.81 10.435 6.06 10.155C6.31 9.865 6.435 9.52 6.435 9.12C6.435 8.72 6.31 8.41 6.06 8.19C5.82 7.96 5.475 7.775 5.025 7.635V10.68Z"
                fill="#FFD8E7"
              />
            </svg>
          }
          money
        />
      </div>
      {/* {inputFields.map((field, index) => (
        <div className="double-inputs" key={index}>
          <Dropdown
            label="Location"
            text={field.des || "Select Country"}
            setDropValue={(selected) => handleDesChange(index, selected)}
            dropArr={supportedCountries}
          />
          <InputComponent
            label="Delivery fee"
            value={field.price}
            className="no-maj"
            onChange={(value) => handleInputChange(index, value)}
            icon={
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.16 9.03C8.16 9.53 8.035 10 7.785 10.44C7.545 10.88 7.185 11.25 6.705 11.55C6.235 11.85 5.675 12.03 5.025 12.09V13.305H4.05V12.09C3.11 12 2.35 11.705 1.77 11.205C1.19 10.705 0.9 10.045 0.9 9.225H2.73C2.76 9.615 2.885 9.94 3.105 10.2C3.325 10.45 3.64 10.61 4.05 10.68V7.38C3.38 7.21 2.835 7.04 2.415 6.87C1.995 6.69 1.635 6.41 1.335 6.03C1.045 5.65 0.9 5.13 0.9 4.47C0.9 3.64 1.19 2.955 1.77 2.415C2.35 1.865 3.11 1.545 4.05 1.455V0.239999H5.025V1.455C5.905 1.535 6.61 1.815 7.14 2.295C7.68 2.765 7.985 3.415 8.055 4.245H6.225C6.195 3.935 6.075 3.66 5.865 3.42C5.655 3.17 5.375 3 5.025 2.91V6.15C5.695 6.31 6.24 6.48 6.66 6.66C7.08 6.83 7.435 7.105 7.725 7.485C8.015 7.855 8.16 8.37 8.16 9.03ZM2.64 4.38C2.64 4.79 2.76 5.11 3 5.34C3.25 5.57 3.6 5.755 4.05 5.895V2.865C3.62 2.915 3.275 3.07 3.015 3.33C2.765 3.59 2.64 3.94 2.64 4.38ZM5.025 10.68C5.465 10.61 5.81 10.435 6.06 10.155C6.31 9.865 6.435 9.52 6.435 9.12C6.435 8.72 6.31 8.41 6.06 8.19C5.82 7.96 5.475 7.775 5.025 7.635V10.68Z"
                  fill="#FFD8E7"
                />
              </svg>
            }
            money
          />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="close"
            onClick={() => handleRemoveFields(index)}
          >
            <path
              d="M15.7098 8.29008C15.6169 8.19635 15.5063 8.12196 15.3844 8.07119C15.2626 8.02042 15.1318 7.99428 14.9998 7.99428C14.8678 7.99428 14.7371 8.02042 14.6153 8.07119C14.4934 8.12196 14.3828 8.19635 14.2898 8.29008L11.9998 10.5901L9.70984 8.29008C9.52153 8.10178 9.26614 7.99599 8.99984 7.99599C8.73353 7.99599 8.47814 8.10178 8.28983 8.29008C8.10153 8.47838 7.99574 8.73378 7.99574 9.00008C7.99574 9.26638 8.10153 9.52178 8.28983 9.71008L10.5898 12.0001L8.28983 14.2901C8.19611 14.383 8.12171 14.4936 8.07094 14.6155C8.02017 14.7374 7.99404 14.8681 7.99404 15.0001C7.99404 15.1321 8.02017 15.2628 8.07094 15.3847C8.12171 15.5065 8.19611 15.6171 8.28983 15.7101C8.3828 15.8038 8.4934 15.8782 8.61526 15.929C8.73712 15.9797 8.86782 16.0059 8.99984 16.0059C9.13185 16.0059 9.26255 15.9797 9.38441 15.929C9.50627 15.8782 9.61687 15.8038 9.70984 15.7101L11.9998 13.4101L14.2898 15.7101C14.3828 15.8038 14.4934 15.8782 14.6153 15.929C14.7371 15.9797 14.8678 16.0059 14.9998 16.0059C15.1318 16.0059 15.2626 15.9797 15.3844 15.929C15.5063 15.8782 15.6169 15.8038 15.7098 15.7101C15.8036 15.6171 15.878 15.5065 15.9287 15.3847C15.9795 15.2628 16.0056 15.1321 16.0056 15.0001C16.0056 14.8681 15.9795 14.7374 15.9287 14.6155C15.878 14.4936 15.8036 14.383 15.7098 14.2901L13.4098 12.0001L15.7098 9.71008C15.8036 9.61712 15.878 9.50652 15.9287 9.38466C15.9795 9.2628 16.0056 9.13209 16.0056 9.00008C16.0056 8.86807 15.9795 8.73736 15.9287 8.6155C15.878 8.49364 15.8036 8.38304 15.7098 8.29008ZM19.0698 4.93008C18.1474 3.97498 17.0439 3.21316 15.8239 2.68907C14.6038 2.16498 13.2916 1.88911 11.9638 1.87757C10.6361 1.86604 9.31926 2.11905 8.09029 2.62186C6.86133 3.12467 5.74481 3.8672 4.80589 4.80613C3.86696 5.74506 3.12443 6.86158 2.62162 8.09054C2.11881 9.3195 1.86579 10.6363 1.87733 11.9641C1.88887 13.2919 2.16473 14.6041 2.68882 15.8241C3.21291 17.0442 3.97473 18.1476 4.92984 19.0701C5.8523 20.0252 6.95575 20.787 8.17579 21.3111C9.39583 21.8352 10.708 22.111 12.0358 22.1226C13.3636 22.1341 14.6804 21.8811 15.9094 21.3783C17.1383 20.8755 18.2549 20.133 19.1938 19.194C20.1327 18.2551 20.8752 17.1386 21.3781 15.9096C21.8809 14.6807 22.1339 13.3639 22.1223 12.0361C22.1108 10.7083 21.8349 9.39607 21.3109 8.17603C20.7868 6.95599 20.0249 5.85255 19.0698 4.93008ZM17.6598 17.6601C16.3519 18.9695 14.6304 19.7849 12.7886 19.9674C10.9469 20.1499 9.09884 19.6881 7.55936 18.6609C6.01987 17.6336 4.88419 16.1043 4.34581 14.3336C3.80742 12.5628 3.89964 10.6602 4.60675 8.94986C5.31386 7.23951 6.59211 5.82723 8.22373 4.95364C9.85534 4.08006 11.7394 3.79921 13.5548 4.15895C15.3703 4.5187 17.0049 5.49677 18.1801 6.92654C19.3553 8.35631 19.9984 10.1493 19.9998 12.0001C20.0034 13.0514 19.7984 14.0929 19.3968 15.0645C18.9951 16.036 18.4047 16.9182 17.6598 17.6601Z"
              fill="#A1A1A1"
            />
          </svg>
        </div>
      ))} */}
      {/* <div className="svg-gr as-btn" onClick={handleAddFields}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" fill="#FFD8E7" />
          <path
            d="M12 8L12 16"
            stroke="var(--primary-color)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M16 12L8 12"
            stroke="var(--primary-color)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <p>Add another destination to set a specific delivery fee</p>
      </div> */}
    </WhatStyles>
  );
};

const Event = ({ setFormData, formData }) => {
  return (
    <WhatStyles
      initial={{
        opacity: 0,
        visibility: 0,
      }}
      exit={{
        opacity: 0,
        visibility: 0,
      }}
      animate={{
        opacity: 1,
        visibility: 1,
      }}
      transition={{
        duration: 0.3,
        easings: "anticipate",
        type: "spring",
      }}
    >
      <InputComponent
        label="Location"
        value={formData?.destination?.location || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            destinations: [
              {
                location: e.target.value,
                deliveryFee: 0.0,
              },
            ],
          })
        }
        className="no-maj"
        placeholder="London, UK"
        suffix={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none"
          >
            <path
              d="M9.5 2.5L2.92819 9.07181C2.71566 9.28434 2.60939 9.39061 2.53953 9.52115C2.46966 9.6517 2.44019 9.79907 2.38124 10.0938L1.64709 13.7646C1.58057 14.0972 1.5473 14.2635 1.64191 14.3581C1.73652 14.4527 1.90283 14.4194 2.23544 14.3529L5.90621 13.6188C6.20093 13.5598 6.3483 13.5303 6.47885 13.4605C6.60939 13.3906 6.71566 13.2843 6.92819 13.0718L13.5 6.5L9.5 2.5Z"
              fill="#FFD8E7"
            />
            <path
              d="M2.98012 14.3734L5.60809 13.7164C5.62428 13.7124 5.64043 13.7084 5.65654 13.7044C5.87531 13.65 6.08562 13.5978 6.27707 13.4894C6.46852 13.381 6.62153 13.2275 6.7807 13.0679C6.79242 13.0561 6.80418 13.0444 6.81598 13.0325L14.0101 5.83848L14.0101 5.83847L14.0369 5.81165C14.3472 5.50137 14.6215 5.22715 14.8128 4.97638C15.0202 4.70457 15.1858 4.39104 15.1858 4C15.1858 3.60896 15.0202 3.29543 14.8128 3.02361C14.6215 2.77285 14.3472 2.49863 14.0369 2.18835L14.01 2.16152L13.8385 1.98995L13.8117 1.96314C13.5014 1.6528 13.2272 1.37853 12.9764 1.1872C12.7046 0.979813 12.391 0.814214 12 0.814214C11.609 0.814214 11.2954 0.979813 11.0236 1.1872C10.7729 1.37853 10.4986 1.65278 10.1884 1.96311L10.1615 1.98995L2.96745 9.18402C2.95565 9.19582 2.94386 9.20758 2.93211 9.21929C2.77249 9.37847 2.61904 9.53148 2.51064 9.72293C2.40225 9.91438 2.34999 10.1247 2.29562 10.3435C2.29162 10.3596 2.28761 10.3757 2.28356 10.3919L1.62003 13.046C1.61762 13.0557 1.61518 13.0654 1.61272 13.0752C1.57411 13.2293 1.53044 13.4035 1.51593 13.5518C1.49978 13.7169 1.50127 14.0162 1.74255 14.2574C1.98383 14.4987 2.28307 14.5002 2.44819 14.4841C2.59646 14.4696 2.77072 14.4259 2.92479 14.3873C2.9346 14.3848 2.94433 14.3824 2.95396 14.38L2.95397 14.38L2.9801 14.3734L2.98012 14.3734Z"
              stroke="var(--primary-color)"
              strokeWidth="1.2"
            />
            <path
              d="M9.5 2.5L13.5 6.5"
              stroke="var(--primary-color)"
              strokeWidth="1.2"
            />
          </svg>
        }
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
        <p>
          Make sure to let your fans know more in the description and video!
        </p>
      </div>
    </WhatStyles>
  );
};

const Digital = ({ setFormData, formData }) => {
  return (
    <WhatStyles
      initial={{
        opacity: 0,
        visibility: 0,
      }}
      exit={{
        opacity: 0,
        visibility: 0,
      }}
      animate={{
        opacity: 1,
        visibility: 1,
      }}
      transition={{
        duration: 0.3,
        easings: "anticipate",
        type: "spring",
      }}
    >
      <div className="double-inputs">
        <Dropdown
          label="Location"
          text={formData?.destination?.location || ""}
          setDropValue={(selected) =>
            setFormData({
              ...formData,
              destination: {
                location: selected.label,
                deliveryFee: 0.0,
              },
            })
          }
          dropArr={[
            { code: "ww", value: "worldwide", label: "Worldwide" },
            ...supportedCountries,
          ]}
        />
      </div>
    </WhatStyles>
  );
};

const CreateAuction5Styled = styled.section`
  width: 100%;

  .show {
    opacity: 1;
    visibility: visible;
  }

  .hide {
    opacity: 0;
    visibility: hidden;
  }

  .note {
    font-weight: 400;
    font-size: 12px;
    color: var(--grey-color);
  }

  .tag {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .form {
    margin: 1.5rem 0;
    width: 100%;
  }

  .wr-drop {
    width: 345px;
  }

  .date-cta {
    width: 57%;
    margin-top: 2rem;

    button {
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 0.625rem;
      border: 1px solid var(--grey-color);
      background: #fff;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
      height: 52px;
      padding: 10px;
      margin-bottom: 8px;
      svg {
        margin-right: 4px;
        width: 30px;
      }

      p {
        color: var(--grey-color);
        font-size: 0.8rem;
      }
    }
  }

  @media screen and (max-width: 650px) {
    .date-cta {
      width: 100%;
      margin-top: 1.5rem;
    }
  }
`;

const WhatStyles = styled(motion.div)`
  margin-top: 1.5rem;

  label {
    /* font-weight: 500; */
    /* color: var(--black-color); */
  }

  .double-inputs {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
  }

  .close {
    position: absolute;
    right: -35px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .double-inputs > :nth-child(1) {
    width: 345px;
  }

  .double-inputs > :nth-child(2) {
    width: 190px;
    margin-bottom: 0;
  }

  @media screen and (max-width: 650px) {
    .double-inputs > :nth-child(1) {
      width: calc(100% - 136px);
    }

    .double-inputs > :nth-child(2) {
      width: 120px;
    }

    .close {
      position: absolute;
      right: -15px;
      top: 5%;
      transform: translateY(-50%);
    }
  }
`;

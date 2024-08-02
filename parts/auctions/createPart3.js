import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import moment from "moment";
import TimeKeeper from "react-timekeeper";
import { DateTime } from "luxon";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";

const CreateAuction3 = ({ formData, setFormData }) => {
  const [activePicker, setActivePicker] = useState("");
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [auctionTime, setAuctionTime] = useState({
    startTime: "12:00am",
    endTime: "11:59pm",
    initStart: "Start",
    initEnd: "End",
    allStart: "",
    allEnd: "",
  });

  // cap month to 30-
  const handleRangeChange = (range) => {
    if (range.startDate && range.endDate) {
      const selectedDays = Math.ceil(
        (new Date(range.endDate).getTime() -
          new Date(range.startDate).getTime()) /
          (1000 * 3600 * 24)
      );
      if (selectedDays < 31) {
        setSelectedRange(range);
      } else {
        setSelectedRange({
          startDate: null,
          endDate: null,
        });
        toast("Wait! Auctions can't last that long!", {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      }
    } else {
      setSelectedRange({
        startDate: range.startDate,
        endDate: null,
      });
    }
  };

  // fetch data from context
  // useEffect(() => {
  //   if (formData?.startDateTime && formData?.endDateTime) {
  //     const startData = DateTime.fromISO(formData?.startDateTime).toUTC();
  //     const endData = DateTime.fromISO(formData?.endDateTime).toUTC();

  //     setSelectedRange({
  //       startDate: new Date(startData),
  //       endDate: new Date(endData),
  //     });

  //     // handle  pm and am
  //     const startMeridian = startData.hour > 12 ? "pm" : "am";
  //     const endMeridian = endData.hour > 12 ? "pm" : "am";

  //     setAuctionTime({
  //       ...auctionTime,
  //       startTime: `${
  //         startData.hour > 12 ? startData.hour - 12 : startData.hour
  //       }:${startData.minute}${startMeridian}`,
  //       endTime: `${endData.hour > 12 ? endData.hour - 12 : endData.hour}:${
  //         endData.minute
  //       }${endMeridian}`,
  //       initStart: `${
  //         startData.hour > 12 ? startData.hour - 12 : startData.hour
  //       }:${startData.minute}${startMeridian}`,
  //       initEnd: `${endData.hour > 12 ? endData.hour - 12 : endData.hour}:${
  //         endData.minute
  //       }${endMeridian}`,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);

  const handleActivePicker = () => {
    switch (activePicker) {
      case "startTime":
        return (
          <TimeKeeper
            time={auctionTime.startTime}
            switchToMinuteOnHourSelect
            onDoneClick={() => setActivePicker("")}
            onChange={(newTime) =>
              setAuctionTime({
                ...auctionTime,
                startTime: newTime.formatted12,
                initStart: newTime.formatted12,
                allStart: newTime,
              })
            }
          />
        );

      case "endTime":
        return (
          <TimeKeeper
            time={auctionTime.endTime}
            switchToMinuteOnHourSelect
            onDoneClick={() => setActivePicker("")}
            onChange={(newTime) =>
              setAuctionTime({
                ...auctionTime,
                endTime: newTime.formatted12,
                initEnd: newTime.formatted12,
                allEnd: newTime,
              })
            }
          />
        );
      default:
        return;
    }
  };

  useEffect(() => {
    const startData = selectedRange?.startDate
      ? String(selectedRange?.startDate).split("-")
      : [0, 0, 0];
    const endData = selectedRange?.endDate
      ? String(selectedRange?.endDate).split("-")
      : [0, 0, 0];

    const startDateTime = DateTime.utc(
      Number(startData[0]),
      Number(startData[1]),
      Number(startData[2]),
      Number(auctionTime?.allStart?.hour),
      Number(auctionTime?.allStart?.minute)
    ).toISO();
    const endDateTime = DateTime.utc(
      Number(endData[0]),
      Number(endData[1]),
      Number(endData[2]),
      Number(auctionTime?.allEnd?.hour),
      Number(auctionTime?.allEnd?.minute)
    ).toISO();
    setFormData({
      ...formData,
      startDateTime,
      endDateTime,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionTime, selectedRange]);

  return (
    <>
      <CreateAuction3Styled>
        <div className="form">
          <div className="date-cta" onClick={() => setActivePicker("")}>
            <Datepicker
              value={selectedRange}
              onChange={handleRangeChange}
              placeholder="Auction start date - Auction end date"
              // showShortcuts={true}
              displayFormat={"DD/MM/YYYY"}
              containerClassName="datepicker"
              minDate={new Date()}
              primaryColor={"pink"}
              popoverDirection="down"
              toggleIcon={(toggle) => (
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
              )}
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
              <p>Auctions can be up to 30 days long.</p>
            </div>
          </div>
          <div className="time-cta">
            <div className="btn-grp">
              <button
                className="time-picker"
                onClick={() =>
                  setActivePicker(
                    activePicker === "startTime" ? "" : "startTime"
                  )
                }
              >
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx={19.9987}
                    cy={21.6667}
                    r={11.6667}
                    fill="#FFD8E7"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                  />
                  <path
                    d="M8.33333 8.3335L5 11.6668"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                  <path
                    d="M31.6667 8.3335L35 11.6668"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 18.3333L19.8093 21.5395C19.9172 21.6115 20.0622 21.5889 20.1432 21.4877L23.3333 17.5"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                </svg>
                <p>{auctionTime.initStart}</p>
              </button>
              <button
                className="time-picker"
                onClick={() =>
                  setActivePicker(activePicker === "endTime" ? "" : "endTime")
                }
              >
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx={19.9987}
                    cy={21.6667}
                    r={11.6667}
                    fill="#FFD8E7"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                  />
                  <path
                    d="M8.33333 8.3335L5 11.6668"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                  <path
                    d="M31.6667 8.3335L35 11.6668"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 18.3333L19.8093 21.5395C19.9172 21.6115 20.0622 21.5889 20.1432 21.4877L23.3333 17.5"
                    stroke="var(--primary-color)"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                </svg>
                <p>{auctionTime.initEnd}</p>
              </button>
            </div>
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

              <p>Time in UTC</p>
            </div>
            <AnimatePresence>
              {activePicker && (
                <PickerStyled
                  initial={{
                    opacity: 0,
                    visibility: 0,
                    scale: 0,
                  }}
                  exit={{
                    opacity: 0,
                    visibility: 0,
                  }}
                  animate={{
                    opacity: 1,
                    visibility: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    easings: "anticipate",
                    type: "spring",
                  }}
                >
                  {handleActivePicker()}
                </PickerStyled>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CreateAuction3Styled>
    </>
  );
};

export default CreateAuction3;

const CreateAuction3Styled = styled.section`
  width: 100%;
  margin: 1rem 0 1.5rem;

  .form {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .date-cta {
    width: 57%;

    .datepicker {
      border-radius: 0.625rem;
      border: 1px solid var(--grey-color);
      background: #fff;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
      height: 52px;
      margin-bottom: 8px;
      position: relative;

      button:active {
        transform: none;
        border-bottom: none;
      }

      input {
        height: 100%;

        &:focus,
        &:active {
          outline: none;
        }
      }

      svg {
        width: 30px;
      }
    }
  }

  .time-cta {
    width: 38%;
    position: relative;
    .time-picker {
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
        width: 27px;
      }

      p {
        color: var(--grey-color);
        font-size: 0.75rem;
      }
    }
  }

  .btn-grp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time-picker {
      width: 47%;
      position: relative;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 650px) {
    .form {
      display: block;
    }

    .date-cta,
    .time-cta {
      width: 100%;
    }

    .time-cta {
      margin-top: 1.5rem;
    }
  }
`;

export const PickerStyled = styled(motion.div)`
  --meridiem-selected-bg-color: #ffd8e7;
  --hand-circle-outer: #ffd8e7;
  --hand-line-color: #ffd8e7;
  --hand-circle-center: #ffd8e7;
  --hand-minute-circle: var(--primary-color);
  --top-selected-color: var(--primary-color);
  position: absolute;
  background: #fff;
  z-index: 15;
  /* box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1); */
  box-shadow: 1px 1px 81px rgba(41, 60, 74, 0.18);
`;

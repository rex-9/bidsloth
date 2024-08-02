import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaComponent from "../../comps/textarea";
import contactData from "../../services/data/contactData";
import InputComponent from "../../comps/input";
import { AnimatePresence, motion } from "framer-motion";
import isEmptyObj from "../../services/snippets/emptyObject";
import PhoneInputComponent from "../../comps/phoneInput";

const CreateAuction7 = ({ formData, setFormData }) => {
  const [selectedContact, setSelectedContact] = useState(contactData[0]);
  const [showMenu, setShowMenu] = useState(false);

  // get initial value from context
  useEffect(() => {
    if (!isEmptyObj(formData)) {
      setSelectedContact(
        formData?.social?.platform
          ? contactData.filter(
              (con) =>
                con.value.toLowerCase() ===
                formData?.social?.platform.toLowerCase()
            )[0]
          : contactData[0]
      );
    }
  }, [formData]);

  const handleSelectedContact = (selected) => {
    setSelectedContact(selected);
    setFormData({
      ...formData,
      social: {
        platformId: selected.value === "none" ? "none" : "",
        platform: selected.value,
      },
    });
    setShowMenu(false);
  };

  const handleInputs = () => {
    switch (selectedContact.value) {
      case "email":
        return (
          <InputComponent
            value={
              selectedContact.value === "email"
                ? formData?.social?.platformId
                : ""
            }
            onChange={(e) =>
              selectedContact.value === "email" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: e.target.value,
                },
              })
            }
            className="contact-input"
            placeholder="name@email.com"
          />
        );

      case "instagram":
        return (
          <InputComponent
            value={
              selectedContact.value === "instagram"
                ? formData?.social?.platformId
                : ""
            }
            onChange={(e) =>
              selectedContact.value === "instagram" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: e.target.value,
                },
              })
            }
            className="contact-input"
            placeholder="@username"
          />
        );
      case "snapchat":
        return (
          <InputComponent
            value={
              selectedContact.value === "snapchat"
                ? formData?.social?.platformId
                : ""
            }
            onChange={(e) =>
              selectedContact.value === "snapchat" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: e.target.value,
                },
              })
            }
            className="contact-input"
            placeholder="username"
          />
        );

      case "whatsapp":
        return (
          <PhoneInputComponent
            value={
              selectedContact.value === "whatsapp"
                ? formData?.social?.platformId
                : ""
            }
            setValue={(value) =>
              selectedContact.value === "whatsapp" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: value,
                },
              })
            }
          />
        );

      case "messenger":
        return (
          <InputComponent
            value={
              selectedContact.value === "messenger"
                ? formData?.social?.platformId
                : ""
            }
            onChange={(e) =>
              selectedContact.value === "messenger" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: e.target.value,
                },
              })
            }
            className="contact-input"
            placeholder="m.me/username"
          />
        );

      case "twitter":
        return (
          <InputComponent
            value={
              selectedContact.value === "twitter"
                ? formData?.social?.platformId
                : ""
            }
            onChange={(e) =>
              selectedContact.value === "twitter" &&
              setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  platformId: e.target.value,
                },
              })
            }
            className="contact-input"
            placeholder="@username"
          />
        );

      default:
        return;
    }
  };

  return (
    <CreateAuction7Styled>
      <div className="form">
        <TextareaComponent
          placeholder="Let the winner know any important delivery details. An important date, or a special link, or..."
          value={formData.winnerMessage}
          onChange={(e) =>
            setFormData({ ...formData, winnerMessage: e.target.value })
          }
        />
        <div className="contact-type">
          <h5>Give the winner a way to get in touch</h5>
          <div className="select-div">
            <div className="popup-group">
              <button
                className={showMenu ? "no-rad" : ""}
                onClick={() => setShowMenu(!showMenu)}
              >
                <div>
                  {<selectedContact.svg />} <p>{selectedContact.label}</p>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12 15L6 9"
                    stroke="var(--primary-color)"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="popup"
                  >
                    {contactData.map((conData) => (
                      <div
                        key={conData.value}
                        onClick={() => handleSelectedContact(conData)}
                      >
                        <conData.svg /> <p>{conData.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {handleInputs()}
          </div>
        </div>
        <TextareaComponent
          placeholder="Any extra info for the winner to know when contacting you? Maybe it’s a secret word so you know it’s them!"
          value={formData.winnerExtraMessage}
          onChange={(e) =>
            setFormData({ ...formData, winnerExtraMessage: e.target.value })
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
          <p>We will only share this info when winner when they pay!</p>
        </div>
      </div>
    </CreateAuction7Styled>
  );
};

export default CreateAuction7;

const CreateAuction7Styled = styled.section`
  width: 100%;

  .form {
    padding: 1rem 0 2rem;

    label {
      color: var(--black-color);
    }
  }

  .contact-type {
    margin-bottom: 2rem;

    h5 {
      font-weight: 400;
      font-size: 0.85rem;
      margin-bottom: 10px;
    }

    .popup-group {
      position: relative;
    }

    .popup {
      position: absolute;
      background: #fff;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
      border-radius: 0 0 10px 10px;
      width: 200px;
      z-index: 200;

      div {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--grey-color);
        cursor: pointer;
        transition: background 0.3s ease-in-out;

        svg {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: var(--white-color);
        }
      }
    }

    .select-div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .contact-input {
      margin: 0;
      height: 55px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      border: 1px solid #c1c1c1;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      min-width: 200px;
      height: 55px;
      padding: 10px 10px 10px 16px;
      margin-right: 2.5rem;

      &.no-rad {
        border-radius: 10px 10px 0 0;
      }

      div {
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    .contact-type {
      .select-div {
        display: block;
      }
      .popup-group {
        margin-bottom: 1.5rem;
      }
    }
  }
`;

import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import CreateAuction1 from "../../parts/auctions/createPart1";
import CreateAuction2 from "../../parts/auctions/createPart2";
import CreateAuction3 from "../../parts/auctions/createPart3";
import CreateAuction7 from "../../parts/auctions/createPart7";
import CreateAuction6 from "../../parts/auctions/createPart6";
import CreateAuction5 from "../../parts/auctions/createPart5";
import CreateAuction4 from "../../parts/auctions/createPart4";
import Button, { spin } from "../../comps/button";
import CreateAuctionCompleted from "../../parts/auctions/completed";
import ConnectPayment from "../../parts/auctions/payment";
import useApiHook from "../../services/https/hook";
import useLogout from "../../services/snippets/logout";
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/DashboardContext";
import isEmptyObj from "../../services/snippets/emptyObject";
import getObjectDifference from "../../services/snippets/objectDifference";
import trimObjects from "../../services/snippets/trimObjects";
import { dataDecrypt, dataEncrypt } from "../../services/snippets/secureData";
import Axios from "../../services/https";

export default function CreateAuctions() {
  const router = useRouter();

  // init context
  const [dashboardState, setDashboardState] = useContext(DashboardContext);
  const { draft, creatorData } = dashboardState;

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const logout = useLogout;

  const [showPop, setShowPop] = useState(false);

  // form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
    startDateTime: "",
    endDateTime: "",
    currency: "usd",
    startPrice: 0,
    bidIncrement: 0,
    shipType: "worldwide",
    destination: {
      location: "worldwide",
      deliveryFee: 0,
    },

    prizeDate: {
      month: 0,
      year: 0,
    },
    bidderMessage: "",
    winnerMessage: "",
    winnerExtraMessage: "",
    social: {
      platform: "email",
      platformId: "",
    },
    photo: "",
    successUrl:
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "https://stg.bidsloth.com/"
        : "https://bidsloth.com/",
    cancelUrl:
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "https://stg.bidsloth.com/"
        : "https://bidsloth.com/",
  });

  // for debugging form data
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // handle active api call
  const [activeCall, setActiveCall] = useState("fetchDraft");

  // draft value
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData({
        ...formData,
        ...draft,
        color:
          draft.color ||
          getComputedStyle(document.documentElement).getPropertyValue(
            "--primary-color"
          ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const handleSaveToDraft = async () => {
    const formDataCopy = { ...formData };
    trimObjects(formDataCopy);
    // if (formData.title && formData.description) {
    if (isEmptyObj(draft)) {
      formDataCopy.photo = formDataCopy?.photo?.split("base64,")[1];
      formDataCopy.video = formDataCopy?.video?.split("base64,")[1];
      await action("/auctions/create", formDataCopy, "post");
    } else {
      const diff = getObjectDifference(draft, formDataCopy);
      diff.auctionId = draft._id;
      diff.photo = formDataCopy?.photo?.split("base64,")[1];
      diff.video = formDataCopy?.video?.split("base64,")[1];
      diff.video || delete formData.video;
      diff.destination = formDataCopy?.destination;
      diff.endDateTime = formDataCopy?.endDateTime;
      diff.startDateTime = formDataCopy?.startDateTime;
      isEmptyObj(diff)
        ? router.push("/dashboard")
        : await action("/auctions/update", diff, "patch");
    }
    // } else {
    //   toast("Psst! pop in a title and description", {
    //     position: "bottom-center",
    //     autoClose: 3500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     type: "error",
    //   });
    // }
  };

  const handleLaunch = async () => {
    setActiveCall("launch");
    const formDataCopy = { ...formData };
    formDataCopy.photo = formData.photo.split("base64,")[1] || formData.photo;
    formDataCopy.video = formData?.video?.split("base64,")[1] || formData.video;
    formData.video || delete formData.video;
    await action("/auctions/launch", formDataCopy, "patch");
  };

  // check if user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("activeUser");

    if (accessToken && userData) {
      const decryptData = JSON.parse(dataDecrypt(userData));
      setDashboardState((prev) => ({
        ...prev,
        creatorData: decryptData,
        creatorId: decryptData?._id,
      }));
      (async () => {
        await action("/auctions/draft", {}, "get");
      })();

      // fetch userData
      Axios.get("/creators/get-current-user")
        .then((res) => {
          const encryptedData = dataEncrypt(JSON.stringify(res?.data?.data));
          localStorage.setItem("activeUser", encryptedData);

          setDashboardState((prev) => ({
            ...prev,
            creatorData: res?.data?.data,
            creatorId: res?.data?.data?._id,
          }));
        })
        .catch((err) => err);
    } else {
      toast("Your last session has expired, please login", {
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
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      switch (activeCall) {
        case "fetchDraft":
          setDashboardState((prev) => ({
            ...prev,
            draft: data?.data || {},
          }));
          break;
        case "draft":
          router.push("/dashboard");
          setDashboardState((prev) => ({
            ...prev,
            draft: data?.data || {},
          }));
          break;
        case "preview":
          router.push("/auctions/preview");
          setDashboardState((prev) => ({
            ...prev,
            draft: data?.data || {},
          }));
          break;
        case "launch":
          router.push(`/${creatorData.username}`);
          break;
        default:
          setDashboardState((prev) => ({
            ...prev,
            draft: data?.data || {},
          }));
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      if (error?.status === 401) {
        toast("Your last session has expired, please login", {
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
        logout();
      } else {
        if (activeCall !== "fetchDraft") {
          toast(error?.data?.message || "couldn't save draft", {
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <>
      <Head>
        <title>Create Auction - bidsloth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CreateWrapperStyled>
        <div className="top-nav">
          <div className="nav-content">
            <button
              className="white-btn"
              disabled={isLoading}
              onClick={() => {
                setActiveCall("draft");
                handleSaveToDraft();
              }}
            >
              {activeCall === "draft" && isLoading ? (
                <div className="loader" />
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L4.64645 11.6464L4.29289 12L4.64645 12.3536L5 12ZM17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5V12.5ZM8.64645 7.64645L4.64645 11.6464L5.35355 12.3536L9.35355 8.35355L8.64645 7.64645ZM4.64645 12.3536L8.64645 16.3536L9.35355 15.6464L5.35355 11.6464L4.64645 12.3536ZM5 12.5H17V11.5H5V12.5Z"
                      fill="#C1C1C1"
                    />
                  </svg>
                  Save & finish later
                </>
              )}
            </button>
            <div className="logo">
              <Link href="/dashboard">
                <Image
                  src="/red-bo.png"
                  className="trademark-bo"
                  width="60"
                  height="60"
                  alt="bidsloth"
                />
                <Image
                  src="/trademark.png"
                  className="trademark"
                  width="75"
                  height="75"
                  alt="bidsloth"
                />
              </Link>
            </div>
            <button
              className="pink-btn"
              onClick={() => {
                setActiveCall("preview");
                handleSaveToDraft();
              }}
            >
              {activeCall === "preview" && isLoading ? (
                <div className="loader" />
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="#fff"
                      stroke-width="2"
                    />
                    <path
                      d="M8 5C7.60603 5 7.21593 5.0776 6.85195 5.22836C6.48797 5.37913 6.15726 5.6001 5.87868 5.87868C5.6001 6.15726 5.37913 6.48797 5.22836 6.85195C5.0776 7.21593 5 7.60603 5 8"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M17 17L14 14"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Preview
                </>
              )}
            </button>
          </div>
          <div className="mobile-action">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowPop(!showPop)}
              key="pop"
            >
              <circle
                cx="12"
                cy="12"
                r="1"
                stroke="var(--primary-color)"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle
                cx="6"
                cy="12"
                r="1"
                stroke="var(--primary-color)"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle
                cx="18"
                cy="12"
                r="1"
                stroke="var(--primary-color)"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <AnimatePresence>
              {showPop && (
                <motion.div
                  className="pop-actions"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  key="pop"
                  onClick={() => setShowPop(!showPop)}
                >
                  <p onClick={handleSaveToDraft}>Save</p>
                  <p
                    onClick={() => {
                      setActiveCall("preview");
                      handleSaveToDraft();
                    }}
                  >
                    Preview
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="create-content">
          <h3>Create auction</h3>
          <CreateAuction1 formData={formData} setFormData={setFormData} />
          <h4>Add a cover photo & video</h4>
          <CreateAuction2 formData={formData} setFormData={setFormData} />
          <h4>Auction time</h4>
          <CreateAuction3 formData={formData} setFormData={setFormData} />
          <h4>Let’s talk money</h4>
          <CreateAuction4 formData={formData} setFormData={setFormData} />
          <h4>Deliver the prize!</h4>
          <CreateAuction5 formData={formData} setFormData={setFormData} />
          <h4>Engage with the bidders</h4>
          <CreateAuction6 formData={formData} setFormData={setFormData} />
          <h4>For the winner</h4>
          <CreateAuction7 formData={formData} setFormData={setFormData} />
          {!creatorData?.isStripeConnected && (
            <>
              <h4>Set up payment</h4>
              <ConnectPayment />
            </>
          )}
          <h4>Ready, set, auction!</h4>
          <CreateAuctionCompleted />
          <div className="btns">
            <Button
              text="Launch"
              isLoading={activeCall === "launch" && isLoading}
              onClick={handleLaunch}
            />
          </div>
        </div>
      </CreateWrapperStyled>
    </>
  );
}

const CreateWrapperStyled = styled.main`
  width: 100vw;
  height: auto;
  padding: 2rem;

  .trademark {
    top: 60px;
  }

  .mobile-action {
    display: none;
  }

  .top-nav {
    position: fixed;
    background: #fff;
    z-index: 20;
    top: 0;
    width: 620px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 0 2rem;
    height: 105px;

    .loader {
      border: 2px solid var(--white-color);
      border-top: 2px solid var(--grey-color);
      border-radius: 50%;
      width: 18px;
      height: 18px;
      animation: ${spin} 0.35s linear infinite;
    }

    .nav-content {
      position: relative;
      width: 100%;
      background: #fff;

      .white-btn,
      .pink-btn {
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 11px;
        font-size: 15px;
        position: absolute;
        min-width: 102px;
        min-height: 40px;
        top: 1rem;
        transition: all 0.3s ease-in-out;

        svg {
          margin-right: 6px;
        }
      }

      .white-btn {
        color: var(--grey-color);
        border: 1px solid var(--grey-color);
        left: -50%;
        width: 190px;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .logo {
        margin: 0;
      }

      .pink-btn {
        color: #fff;
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        right: 0;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

  input,
  textarea {
    background: transparent !important;
    border-color: var(--grey-color) !important;
  }

  textarea {
    height: 6.25rem !important;
  }

  textarea::placeholder,
  input::placeholder {
    font-size: 0.85rem;
  }

  .no-maj {
    margin-bottom: 8px;
  }

  label {
    color: var(--black-color);
  }

  .hint {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    p {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      margin-left: 3px;
    }
  }

  .svg-gr {
    display: flex;
    align-items: center;
    p {
      font-size: 12px;
      margin-left: 5px;
    }

    &.as-btn {
      color: var(--primary-color);
      margin-bottom: 1.1rem;
      cursor: pointer;
    }
  }

  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 38px;
  }

  .create-content {
    width: 600px;
    margin: auto;
    margin-top: 8%;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 2rem;
    width: 100%;
    margin-top: 3rem;

    button {
      margin: 0;

      width: 250px;
      margin: auto;
    }
  }

  @media screen and (max-width: 850px) {
    .top-nav {
      top: 0;
      left: 0;
      right: 0;
      transform: none;
      width: 100vw;
      padding: 1.5rem 2rem 2rem;

      .nav-content {
        .white-btn {
          color: var(--grey-color);
          border: 1px solid var(--grey-color);
          left: 0;
        }
      }
    }
    .create-content {
      margin-top: 12%;
    }
  }

  @media screen and (max-width: 650px) {
    padding: 2rem 1.2rem;

    .mobile-action {
      display: block;
      margin: 1rem 0 0 1rem;

      .pop-actions {
        background: #fff2f7;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        width: 100px;
        position: absolute;

        p {
          padding: 10px;
          margin-bottom: 8px;
          padding-bottom: 0;
        }
      }
    }

    .top-nav {
      padding: 1rem 0 1.8rem;
      .nav-content {
        .white-btn,
        .pink-btn {
          display: none;
        }
      }
    }

    .create-content {
      width: 100%;
      padding-top: 3rem;
    }

    .btns {
      margin-top: 2rem;

      button {
        margin: 0;

        &:last-child {
          width: 70%;
          margin: auto;
        }
      }
    }
  }
`;

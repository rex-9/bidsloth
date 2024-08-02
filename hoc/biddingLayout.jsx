import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import InputComponent from "../comps/input";
import Button from "../comps/button";
import TextareaComponent from "../comps/textarea";
import OTPInput from "react-otp-input";
import useApiHook from "../services/https/hook";
import getShortMonth from "../services/snippets/getShortMonth";
import moment from "moment/moment";
import CurrencyFormat from "react-currency-format";
import { useRouter } from "next/router";

// place bid modal
const PlaceBidModal = ({ progress, closeModal, children }) => {
  return (
    <PlaceBidStyled
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="place-bid-content">
        <div className={progress ? "content-top has-mg" : "content-top"}>
          {progress && <div className="progress">{progress}</div>}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="close"
            onClick={() => closeModal(false)}
          >
            <path
              d="M15.7118 8.28983C15.6188 8.19611 15.5082 8.12171 15.3864 8.07094C15.2645 8.02017 15.1338 7.99404 15.0018 7.99404C14.8698 7.99404 14.7391 8.02017 14.6172 8.07094C14.4954 8.12171 14.3848 8.19611 14.2918 8.28983L12.0018 10.5898L9.71179 8.28983C9.52348 8.10153 9.26809 7.99574 9.00179 7.99574C8.73549 7.99574 8.48009 8.10153 8.29179 8.28983C8.10348 8.47814 7.9977 8.73353 7.9977 8.99984C7.9977 9.26614 8.10348 9.52153 8.29179 9.70984L10.5918 11.9998L8.29179 14.2898C8.19806 14.3828 8.12367 14.4934 8.0729 14.6153C8.02213 14.7371 7.99599 14.8678 7.99599 14.9998C7.99599 15.1318 8.02213 15.2626 8.0729 15.3844C8.12367 15.5063 8.19806 15.6169 8.29179 15.7098C8.38475 15.8036 8.49535 15.878 8.61721 15.9287C8.73907 15.9795 8.86978 16.0056 9.00179 16.0056C9.1338 16.0056 9.26451 15.9795 9.38636 15.9287C9.50822 15.878 9.61882 15.8036 9.71179 15.7098L12.0018 13.4098L14.2918 15.7098C14.3848 15.8036 14.4954 15.878 14.6172 15.9287C14.7391 15.9795 14.8698 16.0056 15.0018 16.0056C15.1338 16.0056 15.2645 15.9795 15.3864 15.9287C15.5082 15.878 15.6188 15.8036 15.7118 15.7098C15.8055 15.6169 15.8799 15.5063 15.9307 15.3844C15.9814 15.2626 16.0076 15.1318 16.0076 14.9998C16.0076 14.8678 15.9814 14.7371 15.9307 14.6153C15.8799 14.4934 15.8055 14.3828 15.7118 14.2898L13.4118 11.9998L15.7118 9.70984C15.8055 9.61687 15.8799 9.50627 15.9307 9.38441C15.9814 9.26255 16.0076 9.13185 16.0076 8.99984C16.0076 8.86782 15.9814 8.73712 15.9307 8.61526C15.8799 8.4934 15.8055 8.3828 15.7118 8.28983ZM19.0718 4.92984C18.1493 3.97473 17.0459 3.21291 15.8258 2.68882C14.6058 2.16473 13.2936 1.88887 11.9658 1.87733C10.638 1.86579 9.32121 2.11881 8.09225 2.62162C6.86328 3.12443 5.74677 3.86696 4.80784 4.80589C3.86891 5.74481 3.12638 6.86133 2.62357 8.09029C2.12076 9.31926 1.86775 10.6361 1.87928 11.9638C1.89082 13.2916 2.16668 14.6038 2.69077 15.8239C3.21486 17.0439 3.97669 18.1474 4.93179 19.0698C5.85426 20.0249 6.9577 20.7868 8.17774 21.3109C9.39778 21.8349 10.71 22.1108 12.0378 22.1223C13.3656 22.1339 14.6824 21.8809 15.9113 21.3781C17.1403 20.8752 18.2568 20.1327 19.1957 19.1938C20.1347 18.2549 20.8772 17.1383 21.38 15.9094C21.8828 14.6804 22.1358 13.3636 22.1243 12.0358C22.1128 10.708 21.8369 9.39583 21.3128 8.17579C20.7887 6.95575 20.0269 5.8523 19.0718 4.92984ZM17.6618 17.6598C16.3538 18.9692 14.6323 19.7847 12.7906 19.9671C10.9488 20.1496 9.10079 19.6879 7.56131 18.6606C6.02183 17.6333 4.88615 16.104 4.34776 14.3333C3.80938 12.5626 3.90159 10.66 4.6087 8.94962C5.31581 7.23926 6.59406 5.82698 8.22568 4.9534C9.8573 4.07981 11.7413 3.79897 13.5568 4.15871C15.3723 4.51845 17.0068 5.49653 18.182 6.9263C19.3572 8.35607 20.0003 10.1491 20.0018 11.9998C20.0054 13.0511 19.8004 14.0927 19.3987 15.0642C18.9971 16.0358 18.4067 16.918 17.6618 17.6598Z"
              fill="#A1A1A1"
            />
          </svg>
        </div>
        {children}
      </div>
    </PlaceBidStyled>
  );
};

const CreateBidPart1 = ({ formData, setFormData, nextStep }) => {
  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleSubmit = async () => {
    if (formData.bidAmount && formData.name && formData.email) {
      await action("/bids/validate-or-create", formData, "post");
    } else {
      toast("Wait! You're missing a bit!", {
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
  };

  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "couldn't place bid", {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <>
      <div className="bid-intro-sec">
        <h3>Place your bid!</h3>
        <p>It’s bidding time! Just 2 easy-peasy steps!</p>
      </div>
      <div className="bid-form">
        <InputComponent
          placeHolder="105"
          className="no-mg"
          icon={
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.067 12.989C10.067 13.661 9.899 14.305 9.563 14.921C9.227 15.523 8.73 16.027 8.072 16.433C7.428 16.839 6.651 17.07 5.741 17.126V18.827H4.607V17.126C3.333 17.014 2.297 16.608 1.499 15.908C0.701 15.194 0.295 14.291 0.281 13.199H2.318C2.374 13.787 2.591 14.298 2.969 14.732C3.361 15.166 3.907 15.439 4.607 15.551V10.301C3.669 10.063 2.913 9.818 2.339 9.566C1.765 9.314 1.275 8.922 0.869 8.39C0.463 7.858 0.26 7.144 0.26 6.248C0.26 5.114 0.652 4.176 1.436 3.434C2.234 2.692 3.291 2.279 4.607 2.195V0.451999H5.741V2.195C6.931 2.293 7.89 2.678 8.618 3.35C9.346 4.008 9.766 4.869 9.878 5.933H7.841C7.771 5.443 7.554 5.002 7.19 4.61C6.826 4.204 6.343 3.938 5.741 3.812V8.936C6.665 9.174 7.414 9.419 7.988 9.671C8.576 9.909 9.066 10.294 9.458 10.826C9.864 11.358 10.067 12.079 10.067 12.989ZM2.213 6.143C2.213 6.829 2.416 7.354 2.822 7.718C3.228 8.082 3.823 8.383 4.607 8.621V3.77C3.879 3.84 3.298 4.078 2.864 4.484C2.43 4.876 2.213 5.429 2.213 6.143ZM5.741 15.572C6.497 15.488 7.085 15.215 7.505 14.753C7.939 14.291 8.156 13.738 8.156 13.094C8.156 12.408 7.946 11.883 7.526 11.519C7.106 11.141 6.511 10.84 5.741 10.616V15.572Z"
                fill="var(--grey-color)"
              />
            </svg>
          }
          money
          value={formData.bidAmount}
          onChange={(value) =>
            setFormData({
              ...formData,
              bidAmount: value,
            })
          }
        />
        <p className="small-label">
          If you win, the shipping fee will be applied at checkout
        </p>
        <InputComponent
          placeHolder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
        <InputComponent
          placeHolder="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
        <TextareaComponent
          placeHolder="Leave a nice comment with your bid (optional)..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({
              ...formData,
              comment: e.target.value,
            })
          }
        />
        <Button text="Continue!" onClick={handleSubmit} isLoading={isLoading} />
        <div className="bit-end-text">
          <p>It’s free to bid!</p>
          <p>
            But if you win, 48 hrs to pay up, or 2nd place steals the prize!
          </p>
        </div>
      </div>
    </>
  );
};

const CreateBidPart2 = ({ formData, setFormData, nextStep }) => {
  const router = useRouter();
  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleSubmit = async () => {
    if (formData.verificationCode) {
      await action("/bids/verify-and-create", formData, "post");
    } else {
      toast("Sloth balls! Code should be 4!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("bidderSession", data?.data?.token);
      nextStep();
      setFormData({
        ...formData,
        name: "",
        email: "",
        comment: "",
        bidAmount: "",
        verificationCode: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "couldn't place bid", {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <>
      <div className="bid-intro-sec">
        <h3>Psst!!</h3>
        <p>
          We just sent you a super duper secret 4 pin code! Pop it in below so
          we can make sure it’s really you (and not an IMPOSTER!)
        </p>
      </div>
      <div className="bid-form">
        <OTPInput
          value={formData.verificationCode}
          onChange={(value) =>
            setFormData({
              ...formData,
              verificationCode: value,
            })
          }
          numInputs={4}
          containerStyle="otp-input"
          inputStyle="otp"
          renderInput={(props) => <input {...props} />}
        />
        <p className="mt-10 text-left">Didn’t get a code?</p>
        <p className=" mt-3 mb-10 text-left">
          No worries, just <span> click here</span>, we’ll send you a new one!
        </p>

        <Button text="Continue!" onClick={handleSubmit} isLoading={isLoading} />
        <p className="center-label">
          By placing a bid you agree to bidsloth’s{" "}
          <span onClick={() => router.push("/policies/terms")}>terms</span> and
          <span onClick={() => router.push("/policies/privacy")}>
            {" "}
            privacy policy{" "}
          </span>
        </p>
        <div className="bit-end-text">
          <p>It’s free to bid!</p>
          <p>
            But if you win, 48 hrs to pay up, or 2nd place steals the prize!
          </p>
        </div>
      </div>
    </>
  );
};

const CreateBidFinal = ({ data }) => {
  return (
    <CreateBidFinalStyled>
      <div className="final-intro-sec">
        <h3>GOOD LUCK!</h3>
        <p>Your bid is placed</p>
      </div>
      <div className="creator-message">
        <h5>
          A message from <span> {data?.creator?.username}</span>
        </h5>
        <div className="creator-chat">
          <Image
            src={data?.creator?.avatar}
            width="40"
            height="40"
            alt="user"
          />
          <div>
            <p>{data?.bidderMessage}</p>
          </div>
        </div>
      </div>
      <div className="final-message">
        <h5>KEEP YOUR EYE ON THE PRIZE!</h5>
        <p>
          Watch your inbox! Outbid or win, we’ll drop you line! Don’t sweat
          being outbid, its easy to bid again.
        </p>
      </div>
      <Image
        src="/waiting-image.png"
        alt="image of bo after bid"
        width="226"
        height="180"
        className="waiting-img"
      />
    </CreateBidFinalStyled>
  );
};

const BiddingLayout = ({ pageTitle, data, children }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    bidAmount: "",
    verificationCode: "",
    auctionId: data?.auction?._id,
  });
  const [showBidModal, setShowBidModal] = useState(false);
  const [activeModal, setActiveModal] = useState("userDetails");

  const handlePlaceBid = () => {
    if (formData.bidAmount) {
      setShowBidModal(true);
    } else {
      toast("Kindly input an amount!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  // handle active modal

  const handelActiveModal = () => {
    switch (activeModal) {
      case "userDetails":
        return (
          <CreateBidPart1
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setActiveModal("verify")}
          />
        );

      case "verify":
        return (
          <CreateBidPart2
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setActiveModal("completed")}
          />
        );

      case "completed":
        return <CreateBidFinal data={data?.auction} />;

      default:
        return (
          <CreateBidPart1
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setActiveModal("verify")}
          />
        );
    }
  };

  // handle progress bar

  const handleProgress = () => {
    switch (activeModal) {
      case "userDetails":
        return (
          <svg
            width="80"
            height="12"
            viewBox="0 0 80 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="var(--primary-color)" />
            <line x1="20" y1="5.5" x2="60" y2="5.5" stroke="#C1C1C1" />
            <circle cx="74" cy="6" r="5.5" fill="white" stroke="#C1C1C1" />
          </svg>
        );

      case "verify":
        return (
          <svg
            width="80"
            height="12"
            viewBox="0 0 80 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="var(--primary-color)" />
            <line
              x1="20"
              y1="5.5"
              x2="60"
              y2="5.5"
              stroke="var(--primary-color)"
            />
            <circle
              cx="74"
              cy="6"
              r="5.5"
              fill="var(--primary-color)"
              stroke="var(--primary-color)"
            />
          </svg>
        );

      default:
        return;
    }
  };

  const handleCloseModal = (close) => {
    setShowBidModal(close);
    setActiveModal("userDetails");
    setFormData({
      name: "",
      email: "",
      comment: "",
      bidAmount: "",
      verificationCode: "",
      auctionId: data?.auction?._id,
    });
  };

  return (
    <BiddingLayoutStyles>
      <Head>
        <title>{pageTitle} - bidsloth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnimatePresence>
        {showBidModal && (
          <PlaceBidModal
            closeModal={handleCloseModal}
            progress={handleProgress()}
          >
            {handelActiveModal()}
          </PlaceBidModal>
        )}
      </AnimatePresence>
      <main>
        <div className="top-meta">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dfmz4mxod/image/upload/v1688404666/mvp/red-bo_jv3es6.png"
              width="40"
              height="40"
              alt="bidsloth"
            />
          </Link>
          <div className="creator-meta">
            <Image
              src={data?.auction?.creator?.avatar}
              width="80"
              height="80"
              alt="bidsloth"
            />
            <h4>{data?.auction?.creator?.username}</h4>
            <p>{data?.auction?.title}</p>
          </div>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svg"
          >
            <path
              d="M6.25 8.75H23.75"
              stroke="var(--primary-color)"
              stroke-linecap="round"
            />
            <path
              d="M6 15H24"
              stroke="var(--primary-color)"
              stroke-linecap="round"
            />
            <path
              d="M6.24805 21.0625H23.9995"
              stroke="var(--primary-color)"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="layout-children">
          <div className="outlet">{children}</div>
          <div className="bid-action">
            <div className="top-head">
              <div>
                <CurrencyFormat
                  value={data?.auction?.bids[0]?.bidAmount || 0}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  renderText={(value) => <h3>{value}</h3>}
                />
                <p>Highest bid</p>
              </div>
              <div>
                <h3>{data?.remainingTimeToEnd?.days}</h3>
                <p>days to go</p>
              </div>
              <div>
                <h3>{data?.auction?.bids?.length}</h3>
                <p>Bidders</p>
              </div>
            </div>
            <InputComponent
              label="Place your bid!"
              money
              placeHolder="105 minimum"
              value={formData.bidAmount}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  bidAmount: value,
                })
              }
              icon={
                <svg
                  width="11"
                  height="19"
                  viewBox="0 0 11 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.067 12.989C10.067 13.661 9.899 14.305 9.563 14.921C9.227 15.523 8.73 16.027 8.072 16.433C7.428 16.839 6.651 17.07 5.741 17.126V18.827H4.607V17.126C3.333 17.014 2.297 16.608 1.499 15.908C0.701 15.194 0.295 14.291 0.281 13.199H2.318C2.374 13.787 2.591 14.298 2.969 14.732C3.361 15.166 3.907 15.439 4.607 15.551V10.301C3.669 10.063 2.913 9.818 2.339 9.566C1.765 9.314 1.275 8.922 0.869 8.39C0.463 7.858 0.26 7.144 0.26 6.248C0.26 5.114 0.652 4.176 1.436 3.434C2.234 2.692 3.291 2.279 4.607 2.195V0.451999H5.741V2.195C6.931 2.293 7.89 2.678 8.618 3.35C9.346 4.008 9.766 4.869 9.878 5.933H7.841C7.771 5.443 7.554 5.002 7.19 4.61C6.826 4.204 6.343 3.938 5.741 3.812V8.936C6.665 9.174 7.414 9.419 7.988 9.671C8.576 9.909 9.066 10.294 9.458 10.826C9.864 11.358 10.067 12.079 10.067 12.989ZM2.213 6.143C2.213 6.829 2.416 7.354 2.822 7.718C3.228 8.082 3.823 8.383 4.607 8.621V3.77C3.879 3.84 3.298 4.078 2.864 4.484C2.43 4.876 2.213 5.429 2.213 6.143ZM5.741 15.572C6.497 15.488 7.085 15.215 7.505 14.753C7.939 14.291 8.156 13.738 8.156 13.094C8.156 12.408 7.946 11.883 7.526 11.519C7.106 11.141 6.511 10.84 5.741 10.616V15.572Z"
                    fill="var(--primary-color)"
                  />
                </svg>
              }
            />
            <Button text="Bid" onClick={handlePlaceBid} />
            <p className="hint">
              {/* Auction ends Sun, June 8th 2023 10pm UTC +00:00 */}
              Auction ends,{" "}
              {moment
                .utc(data?.auction?.endDateTime)
                .format("ddd, MMM Do YYYY h:mma [UTC] Z")}
            </p>
            <div className="bid-shipping">
              <div className="title">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.8986 26.0571C19.7844 25.1061 27.7077 20.6619 27.7077 13.1253C27.7077 7.48742 23.1373 2.91699 17.4993 2.91699C11.8614 2.91699 7.29102 7.48742 7.29102 13.1253C7.29102 20.6619 15.2143 25.1061 17.1001 26.0571C17.3544 26.1854 17.6443 26.1854 17.8986 26.0571ZM17.4993 17.5003C19.9156 17.5003 21.8743 15.5416 21.8743 13.1253C21.8743 10.7091 19.9156 8.75033 17.4993 8.75033C15.0831 8.75033 13.1243 10.7091 13.1243 13.1253C13.1243 15.5416 15.0831 17.5003 17.4993 17.5003Z"
                    fill="#FFD8E7"
                  />
                  <path
                    d="M17.8986 26.0571L18.1688 26.5929L17.8986 26.0571ZM17.1001 26.0571L16.8299 26.5929L16.8299 26.5929L17.1001 26.0571ZM27.1077 13.1253C27.1077 16.6696 25.246 19.5199 23.0904 21.6323C20.9363 23.7431 18.5451 25.0592 17.6285 25.5214L18.1688 26.5929C19.138 26.1041 21.6513 24.7225 23.9303 22.4894C26.2077 20.2577 28.3077 17.1176 28.3077 13.1253H27.1077ZM17.4993 3.51699C22.8059 3.51699 27.1077 7.81879 27.1077 13.1253H28.3077C28.3077 7.15605 23.4686 2.31699 17.4993 2.31699V3.51699ZM7.89102 13.1253C7.89102 7.81879 12.1928 3.51699 17.4993 3.51699V2.31699C11.5301 2.31699 6.69102 7.15605 6.69102 13.1253H7.89102ZM17.3702 25.5214C16.4536 25.0592 14.0624 23.7431 11.9083 21.6323C9.75266 19.5199 7.89102 16.6696 7.89102 13.1253H6.69102C6.69102 17.1176 8.79102 20.2577 11.0684 22.4894C13.3474 24.7225 15.8607 26.1041 16.8299 26.5929L17.3702 25.5214ZM17.6285 25.5214C17.544 25.564 17.4547 25.564 17.3702 25.5214L16.8299 26.5929C17.2542 26.8068 17.7445 26.8068 18.1688 26.5929L17.6285 25.5214ZM21.2743 13.1253C21.2743 15.2102 19.5842 16.9003 17.4993 16.9003V18.1003C20.247 18.1003 22.4743 15.8729 22.4743 13.1253H21.2743ZM17.4993 9.35033C19.5842 9.35033 21.2743 11.0405 21.2743 13.1253H22.4743C22.4743 10.3777 20.247 8.15033 17.4993 8.15033V9.35033ZM13.7243 13.1253C13.7243 11.0405 15.4145 9.35033 17.4993 9.35033V8.15033C14.7517 8.15033 12.5243 10.3777 12.5243 13.1253H13.7243ZM17.4993 16.9003C15.4145 16.9003 13.7243 15.2102 13.7243 13.1253H12.5243C12.5243 15.8729 14.7517 18.1003 17.4993 18.1003V16.9003Z"
                    fill="var(--primary-color)"
                  />
                  <path
                    d="M28.8666 25.5205C30.0185 26.1856 30.625 26.94 30.625 27.708C30.625 28.476 30.0185 29.2304 28.8666 29.8955C27.7146 30.5606 26.0578 31.1129 24.0625 31.4969C22.0672 31.8809 19.8039 32.083 17.5 32.083C15.1961 32.083 12.9328 31.8809 10.9375 31.4969C8.94225 31.1129 7.28538 30.5606 6.13342 29.8955C4.98146 29.2304 4.375 28.476 4.375 27.708C4.375 26.94 4.98146 26.1856 6.13342 25.5205"
                    stroke="var(--primary-color)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
                {data?.auction?.shipType === "country" ? (
                  <p>
                    Available to fans - ONLY IN{" "}
                    <strong>
                      {data?.auction?.destination?.location.toUpperCase()}
                    </strong>
                  </p>
                ) : data.auction?.shipType === "event" ? (
                  <>
                    <p>
                      Prize location,{" "}
                      <strong>
                        {" "}
                        {data?.auction?.destination?.location?.toUpperCase()}
                      </strong>
                    </p>{" "}
                    <p className="hint">
                      Shipping fee added to the final winning bid at checkout.
                    </p>
                  </>
                ) : (
                  <p>
                    Bidding open to fans{" "}
                    <strong>
                      {" "}
                      {data?.auction?.destination?.location.toUpperCase()}
                    </strong>
                  </p>
                )}
              </div>
              {(data?.auction?.shipType === "worldwide" ||
                data?.auction?.shipType === "country") && (
                <>
                  <div className="title">
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.7678 19.2322C23.2559 19.7204 23.5 20.3602 23.5 21C23.5 21.6398 23.2559 22.2796 22.7678 22.7678C21.7915 23.7441 20.2085 23.7441 19.2322 22.7678C18.7441 22.2796 18.5 21.6398 18.5 21C18.5 20.3602 18.7441 19.7204 19.2322 19.2322C20.2085 18.2559 21.7915 18.2559 22.7678 19.2322Z"
                        fill="#FFD8E7"
                      />
                      <path
                        d="M7.76777 19.2322C8.25592 19.7204 8.5 20.3602 8.5 21C8.5 21.6398 8.25592 22.2796 7.76777 22.7678C6.79146 23.7441 5.20854 23.7441 4.23223 22.7678C3.74408 22.2796 3.5 21.6398 3.5 21C3.5 20.3602 3.74408 19.7204 4.23223 19.2322C5.20854 18.2559 6.79146 18.2559 7.76777 19.2322Z"
                        fill="#FFD8E7"
                      />
                      <path
                        d="M1 1V0.4C0.668629 0.4 0.4 0.668629 0.4 1L1 1ZM14.75 1H15.35C15.35 0.668629 15.0814 0.4 14.75 0.4V1ZM14.75 8.5V7.9C14.5909 7.9 14.4383 7.96321 14.3257 8.07574C14.2132 8.18826 14.15 8.34087 14.15 8.5H14.75ZM1 1.6H14.75V0.4H1V1.6ZM14.15 1V21H15.35V1H14.15ZM1.6 19V1H0.4V19H1.6ZM14.75 9.1H22V7.9H14.75V9.1ZM25.4 12.5V19H26.6V12.5H25.4ZM15.35 21L15.35 8.5H14.15L14.15 21H15.35ZM22.3435 22.3435C21.6015 23.0855 20.3985 23.0855 19.6565 22.3435L18.808 23.192C20.0186 24.4027 21.9814 24.4027 23.192 23.192L22.3435 22.3435ZM19.6565 19.6565C20.3985 18.9145 21.6015 18.9145 22.3435 19.6565L23.192 18.808C21.9814 17.5973 20.0186 17.5973 18.808 18.808L19.6565 19.6565ZM7.3435 22.3435C6.60151 23.0855 5.39849 23.0855 4.6565 22.3435L3.80797 23.192C5.01859 24.4027 6.9814 24.4027 8.19203 23.192L7.3435 22.3435ZM4.6565 19.6565C5.39849 18.9145 6.60151 18.9145 7.3435 19.6565L8.19203 18.808C6.9814 17.5973 5.01859 17.5973 3.80797 18.808L4.6565 19.6565ZM22.3435 19.6565C22.7146 20.0276 22.9 20.5128 22.9 21H24.1C24.1 20.2076 23.7972 19.4132 23.192 18.808L22.3435 19.6565ZM22.9 21C22.9 21.4872 22.7146 21.9724 22.3435 22.3435L23.192 23.192C23.7972 22.5868 24.1 21.7924 24.1 21H22.9ZM24 20.4H23.5V21.6H24V20.4ZM18.5 20.4H14.75V21.6H18.5V20.4ZM19.6565 22.3435C19.2854 21.9724 19.1 21.4872 19.1 21H17.9C17.9 21.7924 18.2028 22.5868 18.808 23.192L19.6565 22.3435ZM19.1 21C19.1 20.5128 19.2854 20.0276 19.6565 19.6565L18.808 18.808C18.2028 19.4132 17.9 20.2076 17.9 21H19.1ZM4.6565 22.3435C4.28538 21.9724 4.1 21.4872 4.1 21H2.9C2.9 21.7924 3.20277 22.5868 3.80797 23.192L4.6565 22.3435ZM4.1 21C4.1 20.5128 4.28538 20.0276 4.6565 19.6565L3.80797 18.808C3.20277 19.4132 2.9 20.2076 2.9 21H4.1ZM3.5 20.4H3V21.6H3.5V20.4ZM14.75 20.4H8.5V21.6H14.75V20.4ZM7.3435 19.6565C7.71462 20.0276 7.9 20.5128 7.9 21H9.1C9.1 20.2076 8.79723 19.4132 8.19203 18.808L7.3435 19.6565ZM7.9 21C7.9 21.4872 7.71462 21.9724 7.3435 22.3435L8.19203 23.192C8.79723 22.5868 9.1 21.7924 9.1 21H7.9ZM25.4 19C25.4 19.7732 24.7732 20.4 24 20.4V21.6C25.4359 21.6 26.6 20.4359 26.6 19H25.4ZM22 9.1C23.8778 9.1 25.4 10.6222 25.4 12.5H26.6C26.6 9.95949 24.5405 7.9 22 7.9V9.1ZM0.4 19C0.4 20.4359 1.56406 21.6 3 21.6V20.4C2.2268 20.4 1.6 19.7732 1.6 19H0.4Z"
                        fill="var(--primary-color)"
                      />
                    </svg>
                    <p>Shipping fee</p>
                  </div>
                  <ul>
                    <li>
                      <p>
                        <span className="capitalize">
                          {data?.auction?.destination?.location}
                        </span>{" "}
                        <span>${data?.auction?.destination?.deliveryFee}</span>
                      </p>
                    </li>
                  </ul>
                  <p className="hint">
                    Shipping fee added to the final winning bid at checkout.
                  </p>
                </>
              )}

              <div className="title">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.375 12.75C4.375 10.8644 4.375 9.92157 4.96079 9.33579C5.54657 8.75 6.48938 8.75 8.375 8.75H26.625C28.5106 8.75 29.4534 8.75 30.0392 9.33579C30.625 9.92157 30.625 10.8644 30.625 12.75V14.5833H4.375V12.75Z"
                    fill="#FFD8E7"
                  />
                  <rect
                    x="4.375"
                    y="8.75"
                    width="26.25"
                    height="21.875"
                    rx="2"
                    stroke="var(--primary-color)"
                    stroke-width="1.2"
                  />
                  <path
                    d="M10.209 4.375L10.209 8.75"
                    stroke="var(--primary-color)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M24.791 4.375L24.791 8.75"
                    stroke="var(--primary-color)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                  <rect
                    x="10.209"
                    y="17.5"
                    width="5.83333"
                    height="2.91667"
                    rx="0.5"
                    fill="var(--primary-color)"
                  />
                  <rect
                    x="10.209"
                    y="23.333"
                    width="5.83333"
                    height="2.91667"
                    rx="0.5"
                    fill="var(--primary-color)"
                  />
                  <rect
                    x="18.959"
                    y="17.5"
                    width="5.83333"
                    height="2.91667"
                    rx="0.5"
                    fill="var(--primary-color)"
                  />
                  <rect
                    x="18.959"
                    y="23.333"
                    width="5.83333"
                    height="2.91667"
                    rx="0.5"
                    fill="var(--primary-color)"
                  />
                </svg>
                <div>
                  <p>Estimated delivery</p>
                  <p>{`${getShortMonth(data?.auction?.prizeDate?.month)} ${
                    data?.auction?.prizeDate?.year
                  }`}</p>
                </div>
              </div>
              <div className="title">
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1309 5.40222C12.3082 2.46741 12.8968 1 13.909 1C14.9211 1 15.5098 2.46741 16.687 5.40222L16.7418 5.53888C17.4069 7.19691 17.7394 8.02592 18.4171 8.5298C19.0949 9.03369 19.9845 9.11336 21.7639 9.27272L22.0855 9.30153C24.9976 9.56233 26.4537 9.69273 26.7652 10.6191C27.0768 11.5455 25.9955 12.5292 23.8328 14.4968L23.111 15.1534C22.0163 16.1495 21.4689 16.6475 21.2138 17.3002C21.1662 17.4219 21.1266 17.5467 21.0953 17.6736C20.9276 18.354 21.0879 19.0765 21.4085 20.5214L21.5083 20.9711C22.0975 23.6266 22.392 24.9543 21.8777 25.527C21.6855 25.741 21.4357 25.8951 21.1582 25.9708C20.4156 26.1734 19.3613 25.3143 17.2527 23.5961C15.868 22.4679 15.1757 21.9037 14.3809 21.7768C14.0683 21.7269 13.7497 21.7269 13.437 21.7768C12.6422 21.9037 11.9499 22.4679 10.5653 23.5961C8.45665 25.3143 7.40234 26.1734 6.65973 25.9708C6.38223 25.8951 6.13244 25.741 5.94024 25.527C5.42589 24.9543 5.72048 23.6266 6.30964 20.9711L6.40943 20.5214C6.73001 19.0765 6.89031 18.354 6.72261 17.6736C6.69132 17.5467 6.65176 17.4219 6.60417 17.3002C6.34904 16.6475 5.80165 16.1495 4.70689 15.1534L3.98511 14.4968C1.82247 12.5292 0.741153 11.5455 1.05271 10.6191C1.36427 9.69273 2.82031 9.56233 5.7324 9.30153L6.05407 9.27272C7.83339 9.11336 8.72305 9.03369 9.40078 8.5298C10.0785 8.02592 10.4111 7.19691 11.0761 5.53888L11.1309 5.40222Z"
                    fill="#FFD8E7"
                    stroke="#FF0066"
                    stroke-width="1.4"
                  />
                </svg>
                <div>
                  <p>Bidding is free & easy! No sign up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="policy">
          See bidsloth’s{" "}
          <span onClick={() => router.push("/policies/terms")}> terms</span> and{" "}
          <span onClick={() => router.push("/policies/privacy")}>
            {" "}
            privacy{" "}
          </span>
        </p>
      </main>
    </BiddingLayoutStyles>
  );
};

export default BiddingLayout;

export const BiddingLayoutStyles = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2% 3%;

  .top-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .back-btn {
    border-radius: 10px;
    border: 1.5px solid var(--black-color);
    background: #fff;
    width: 110px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;

    svg {
      margin-right: 5px;
      width: 19px;
    }
  }

  .creator-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 450px;
    text-align: center;

    img {
      border: 2px solid var(--primary-color);
      width: 60px;
      height: 60px;
      border-radius: 100%;
      object-fit: cover;
    }

    h4 {
      font-weight: 500;
      font-size: 21px;
      line-height: 32px;
    }

    p {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .svg {
    cursor: pointer;
    visibility: hidden;
  }

  .layout-children {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .outlet {
    width: calc(100% - 400px);
  }

  .bid-action {
    width: 350px;
    min-height: 400px;
    background: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 1rem;

    .top-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 33.33%;
      }

      h3 {
        font-weight: 600;
        color: var(--primary-color);
        text-align: center;
        font-size: 30px;
      }

      p {
        font-weight: 400;
        font-size: 12px;
        text-align: center;
      }
    }

    input {
      background: transparent;
      border-color: var(--primary-color);
    }

    label {
      font-weight: 500;
      font-size: 18px;
      color: var(--black-color);
    }

    .hint {
      font-weight: 400;
      font-size: 11px;
      line-height: 185.5%;
      text-align: center;
      margin: 1rem auto;
    }

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      svg {
        width: 28px;
        margin-right: 10px;
      }

      p {
        font-weight: 400;
        font-size: 13.5px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    }

    ul {
      list-style: disc !important;
      li {
        font-size: 13.5px;
        margin-left: 50px;
        p {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }

  .policy {
    text-align: center;
    color: var(--grey-color);
    font-size: 1rem;
    font-weight: 400;
    padding-bottom: 5%;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 1440px) {
    width: 100vw;
    max-width: 1600px;
    margin: auto;
    /* padding: 0; */
    position: relative;
  }

  @media screen and (max-width: 850px) {
    .layout-children {
      display: block;
      margin-top: 2rem;
    }

    .bid-action,
    .outlet {
      width: 100%;
    }
  }
`;

export const PlaceBidStyled = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 200000;
  text-align: center;

  p {
    font-weight: 400;
    font-size: 12px;
  }

  span {
    color: var(--primary-color);
    cursor: pointer;
    text-decoration: underline;
  }

  input,
  textarea {
    border-color: var(--grey-color);
    background: transparent;
  }

  textarea {
    height: 100px;
  }

  .no-mg {
    margin: 0;
  }

  .place-bid-content {
    width: 500px;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 1rem 2.5rem 2rem;
    position: relative;
    margin-top: 2rem;

    .close {
      display: block;
      margin-left: auto;
      cursor: pointer;
    }
  }

  .review {
    margin-top: 20%;

    h3 {
      color: var(--primary-color);
    }

    p {
      margin: 0.8rem auto 1rem;
      font-size: 0.83rem;
      font-weight: 600;
    }

    button {
      width: 180px;
      margin: auto;
    }
  }

  .content-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.has-mg {
      margin-bottom: 1.5rem;
    }
  }

  .bid-intro-sec {
    text-align: left;
    margin-bottom: 1rem;

    h3 {
      font-weight: 500;
      font-size: 21px;
    }

    p {
      max-width: 390px;
    }
  }

  .small-label {
    color: var(--grey-color);
    text-align: left;
    margin: 7px 0 15px;
  }

  .center-label {
    color: var(--grey-color);
    margin-top: 1.5rem;
  }

  .bit-end-text {
    margin-top: 1.5rem;
  }

  .otp-input {
    width: 100%;
    justify-content: space-between;
    width: 90%;
    margin: auto;
    padding-top: 1rem !important;
  }

  .otp {
    display: block;
    border: 2px solid var(--grey-color);
    border-radius: 5px;
    border-radius: 5px;
    width: 19% !important;
    height: 80px;
    padding: 0;
    text-indent: 0;
  }
`;

export const CreateBidFinalStyled = styled.div`
  span {
    text-decoration: none;
  }
  .final-intro-sec {
    margin-bottom: 1rem;
    text-align: center;

    h3 {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 21px;
    }

    p {
    }
  }

  .creator-message {
    h5 {
      font-weight: 400;
      font-size: 15px;
    }

    .creator-chat {
      width: max-content;
      max-width: 80%;
      display: flex;
      align-items: center;
      margin: 1.5rem 0;

      img {
        margin-left: 1rem;
        border: 1px solid var(--primary-color);
        width: 45px;
        height: 45px;
        border-radius: 100%;
        object-fit: cover;
        margin-right: 10px;
      }

      div {
        background: var(--white-color);
        border: 1px solid var(--primary-color);
        border-radius: 16px 16px 16px 0px;
        padding: 16px 24px;

        p {
          font-size: 12px;
          color: #010101;
          opacity: 0.87;
          text-align: left;
        }
      }
    }
  }

  .final-message {
    width: 300px;
    margin: 0 auto 1.5rem;

    h5 {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-color);
    }

    p {
      font-size: 11px;
      margin-top: 10px;
    }
  }

  .waiting-img {
    margin: auto;
  }
`;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { toast } from "react-toastify";
import styled from "styled-components";
import { useContext } from "react";

import SideBar from "../comps/sidebar";
import Button from "../comps/button";
import useLogout from "../services/snippets/logout";
import { dataDecrypt, dataEncrypt } from "../services/snippets/secureData";
import { DashboardContext } from "../context/DashboardContext";
import useApiHook from "../services/https/hook";

const CreateAuction = ({ setNoAuction }) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100vw";
      document.body.style.height = "100vh";

      return () => {
        document.body.style.overflow = "";
        document.body.style.overflow = "auto";
        document.body.style.position = "static";
        document.body.style.width = "100%";
        document.body.style.height = "auto";
      };
    }
  }, []);
  return (
    <AuctionStyled
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="auction-content">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="close"
          onClick={() => setNoAuction(false)}
        >
          <path
            d="M15.7098 8.28983C15.6169 8.19611 15.5063 8.12171 15.3844 8.07094C15.2626 8.02017 15.1318 7.99404 14.9998 7.99404C14.8678 7.99404 14.7371 8.02017 14.6153 8.07094C14.4934 8.12171 14.3828 8.19611 14.2898 8.28983L11.9998 10.5898L9.70984 8.28983C9.52153 8.10153 9.26614 7.99574 8.99984 7.99574C8.73353 7.99574 8.47814 8.10153 8.28983 8.28983C8.10153 8.47814 7.99574 8.73353 7.99574 8.99984C7.99574 9.26614 8.10153 9.52153 8.28983 9.70984L10.5898 11.9998L8.28983 14.2898C8.19611 14.3828 8.12171 14.4934 8.07094 14.6153C8.02017 14.7371 7.99404 14.8678 7.99404 14.9998C7.99404 15.1318 8.02017 15.2626 8.07094 15.3844C8.12171 15.5063 8.19611 15.6169 8.28983 15.7098C8.3828 15.8036 8.4934 15.878 8.61526 15.9287C8.73712 15.9795 8.86782 16.0056 8.99984 16.0056C9.13185 16.0056 9.26255 15.9795 9.38441 15.9287C9.50627 15.878 9.61687 15.8036 9.70984 15.7098L11.9998 13.4098L14.2898 15.7098C14.3828 15.8036 14.4934 15.878 14.6153 15.9287C14.7371 15.9795 14.8678 16.0056 14.9998 16.0056C15.1318 16.0056 15.2626 15.9795 15.3844 15.9287C15.5063 15.878 15.6169 15.8036 15.7098 15.7098C15.8036 15.6169 15.878 15.5063 15.9287 15.3844C15.9795 15.2626 16.0056 15.1318 16.0056 14.9998C16.0056 14.8678 15.9795 14.7371 15.9287 14.6153C15.878 14.4934 15.8036 14.3828 15.7098 14.2898L13.4098 11.9998L15.7098 9.70984C15.8036 9.61687 15.878 9.50627 15.9287 9.38441C15.9795 9.26255 16.0056 9.13185 16.0056 8.99984C16.0056 8.86782 15.9795 8.73712 15.9287 8.61526C15.878 8.4934 15.8036 8.3828 15.7098 8.28983ZM19.0698 4.92984C18.1474 3.97473 17.0439 3.21291 15.8239 2.68882C14.6038 2.16473 13.2916 1.88887 11.9638 1.87733C10.6361 1.86579 9.31926 2.11881 8.09029 2.62162C6.86133 3.12443 5.74481 3.86696 4.80589 4.80589C3.86696 5.74481 3.12443 6.86133 2.62162 8.09029C2.11881 9.31926 1.86579 10.6361 1.87733 11.9638C1.88887 13.2916 2.16473 14.6038 2.68882 15.8239C3.21291 17.0439 3.97473 18.1474 4.92984 19.0698C5.8523 20.0249 6.95575 20.7868 8.17579 21.3109C9.39583 21.8349 10.708 22.1108 12.0358 22.1223C13.3636 22.1339 14.6804 21.8809 15.9094 21.3781C17.1383 20.8752 18.2549 20.1327 19.1938 19.1938C20.1327 18.2549 20.8752 17.1383 21.3781 15.9094C21.8809 14.6804 22.1339 13.3636 22.1223 12.0358C22.1108 10.708 21.8349 9.39583 21.3109 8.17579C20.7868 6.95575 20.0249 5.8523 19.0698 4.92984ZM17.6598 17.6598C16.3519 18.9692 14.6304 19.7847 12.7886 19.9671C10.9469 20.1496 9.09884 19.6879 7.55936 18.6606C6.01987 17.6333 4.88419 16.104 4.34581 14.3333C3.80742 12.5626 3.89964 10.66 4.60675 8.94962C5.31386 7.23926 6.59211 5.82698 8.22373 4.9534C9.85534 4.07981 11.7394 3.79897 13.5548 4.15871C15.3703 4.51845 17.0049 5.49653 18.1801 6.9263C19.3553 8.35607 19.9984 10.1491 19.9998 11.9998C20.0034 13.0511 19.7984 14.0927 19.3968 15.0642C18.9951 16.0358 18.4047 16.918 17.6598 17.6598Z"
            fill="#A1A1A1"
          />
        </svg>

        <h3>WHOA THERE!</h3>
        <p>
          You haven’t got an auction to see yet! But no problemo! It&apos;s
          super easy to get started, just a few steps and you&apos;ll be ready
          to roll!
        </p>
        <Button
          onClick={() => router.push("/auctions/create")}
          text="Start my auction!"
        />
      </div>
    </AuctionStyled>
  );
};

const DashboardLayout = ({ pageTitle, hideHelper, children }) => {
  const [noAuction, setNoAuction] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const logout = useLogout;

  const [, setDashboardState] = useContext(DashboardContext);

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

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
        auction: decryptData?.auctions[0],
      }));
      (async () => {
        await action("/creators/get-current-user", {}, "get");
      })();
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

  // fetch updated userData
  // if request is success, redirect
  useEffect(() => {
    if (isSuccess) {
      // encrypt user data and store it in local storage
      const encryptedData = dataEncrypt(JSON.stringify(data?.data));
      localStorage.setItem("activeUser", encryptedData);

      setDashboardState((prev) => ({
        ...prev,
        creatorData: data?.data,
        creatorId: data?.data?._id,
        auction: data?.data?.auctions[0],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <DashboardLayoutStyles>
      <Head>
        <title>{pageTitle} - bidsloth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnimatePresence>
        {noAuction && <CreateAuction setNoAuction={setNoAuction} />}
      </AnimatePresence>
      <div className="logo">
        <div className="open-nav" onClick={() => setShowNav(true)}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44 45H58"
              stroke="#33363F"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M44 50H58"
              stroke="#33363F"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M44 55H58"
              stroke="#33363F"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <Link href="/dashboard">
          <Image
            src="https://res.cloudinary.com/dfmz4mxod/image/upload/v1688404666/mvp/red-bo_jv3es6.png"
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
      <main>
        <SideBar
          setNoAuction={setNoAuction}
          showNav={showNav}
          setShowNav={setShowNav}
        />
        <aside className="outlet">{children}</aside>
      </main>
      {!hideHelper && (
        <div className="question">
          <AnimatePresence>
            {showHelp && (
              <motion.div
                className="quest-popup"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Got a question? Email us!</p>
                <p>
                  And don’t worry we’re speedy sloths, we’ll get back to you in
                  a jiffy!
                </p>
                <a href="mailto:hello@bidsloth.com">hello@bidsloth.com</a>
              </motion.div>
            )}
          </AnimatePresence>
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowHelp(!showHelp)}
          >
            <rect width={40} height={40} rx={5} fill="#FF0066" />
            <path
              d="M20 22V21.1432C20 20.429 20.357 19.762 20.9512 19.3659L21.5497 18.9669C22.4558 18.3628 23 17.3459 23 16.2569V16C23 14.3431 21.6569 13 20 13V13C18.3431 13 17 14.3431 17 16V16"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <circle cx={20.1992} cy={27} r={1.5} fill="white" />
          </svg>
        </div>
      )}
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;

const DashboardLayoutStyles = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-left: 4%;

  .open-nav {
    display: none;
  }

  .question {
    position: fixed;
    right: 4%;
    bottom: 7%;
    z-index: 200;

    .quest-popup {
      z-index: 100;
      width: 250px;
      padding: 1rem;
      position: absolute;
      /* background: var(--white-color); */
      background: #fff;
      left: -200px;
      top: -180px;
      border-radius: 0.625rem;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);

      p {
        font-size: 0.83rem;
        margin-bottom: 0.86rem;
      }

      a {
        font-weight: 600;
        font-size: 0.89rem;
      }
    }

    svg {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
  }

  .outlet {
    width: calc(100vw - 250px);
    margin-left: auto;
    padding: 8% 4rem 1.5rem;
  }

  @media screen and (min-width: 1440px) {
    width: 100vw;
    max-width: 1290px;
    margin: auto;
    padding: 0;
    overflow-x: hidden;
    position: relative;

    .outlet {
      width: calc(100% - 250px);
      margin-left: auto;
    }
  }

  @media screen and (max-width: 1024px) {
    .outlet {
      width: calc(100vw - 150px);
    }
  }

  @media screen and (max-width: 850px) {
    padding-left: 0;
    .outlet {
      width: 100%;
    }
    .open-nav {
      display: block;
      position: absolute;
      left: -1rem;
    }
  }

  @media screen and (max-width: 550px) {
    .outlet {
      padding: 1.5rem;
      padding-top: 3rem;
    }

    .welcome-notes {
      display: none;
    }

    .question {
      .quest-popup {
        z-index: 100;
        width: 90vw;
        left: -83vw;
        top: -160px;
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

const AuctionStyled = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200000;
  text-align: center;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);

  .auction-content {
    width: 500px;
    background: #fff;
    border-radius: 10px;
    padding: 1rem 2rem 2rem;
    position: relative;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);

    .close {
      display: block;
      margin-left: auto;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    h3 {
      font-weight: 500;
      font-size: 21px;
      line-height: 30px;
      color: var(--primary-color);
    }

    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;
      margin: 0.7rem auto 1.7rem;
    }

    button {
      width: 200px;
      margin: auto;
    }
  }

  @media screen and (max-width: 550px) {
    .auction-content {
      width: 90%;
    }
  }
`;

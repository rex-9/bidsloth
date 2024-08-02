import styled from "styled-components";
import { useContext, useRef, useState } from "react";
import Image from "next/image";

import DashboardLayout from "../hoc/dashboardLayout";
import InputComponent from "../comps/input";
import Button from "../comps/button";
import SwitchComponent from "../comps/switch";
import { DashboardContext } from "../context/DashboardContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useApiHook from "../services/https/hook";
import { useEffect } from "react";
import { dataEncrypt } from "../services/snippets/secureData";
import useLogout from "../services/snippets/logout";
import {
  numberToBoolean,
  booleanToNumber,
} from "../services/snippets/typeConverter";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import ZinkFlyer from "../comps/ZinkFlyer";

const DeleteProfile = ({ setShowDelete, creator }) => {
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

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const [username, setUsername] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (username === creator) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [username, creator]);

  const handleSubmit = async () => {
    await action("/creators/deactivate", {}, "patch");
  };

  useEffect(() => {
    if (isSuccess) {
      toast(data?.message || "Account Deleted", {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
      router.push("/");
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
        toast(error?.data?.message, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <DeleteStyled
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="delete-content">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="close"
          onClick={() => setShowDelete(false)}
        >
          <path
            d="M15.7098 8.28983C15.6169 8.19611 15.5063 8.12171 15.3844 8.07094C15.2626 8.02017 15.1318 7.99404 14.9998 7.99404C14.8678 7.99404 14.7371 8.02017 14.6153 8.07094C14.4934 8.12171 14.3828 8.19611 14.2898 8.28983L11.9998 10.5898L9.70984 8.28983C9.52153 8.10153 9.26614 7.99574 8.99984 7.99574C8.73353 7.99574 8.47814 8.10153 8.28983 8.28983C8.10153 8.47814 7.99574 8.73353 7.99574 8.99984C7.99574 9.26614 8.10153 9.52153 8.28983 9.70984L10.5898 11.9998L8.28983 14.2898C8.19611 14.3828 8.12171 14.4934 8.07094 14.6153C8.02017 14.7371 7.99404 14.8678 7.99404 14.9998C7.99404 15.1318 8.02017 15.2626 8.07094 15.3844C8.12171 15.5063 8.19611 15.6169 8.28983 15.7098C8.3828 15.8036 8.4934 15.878 8.61526 15.9287C8.73712 15.9795 8.86782 16.0056 8.99984 16.0056C9.13185 16.0056 9.26255 15.9795 9.38441 15.9287C9.50627 15.878 9.61687 15.8036 9.70984 15.7098L11.9998 13.4098L14.2898 15.7098C14.3828 15.8036 14.4934 15.878 14.6153 15.9287C14.7371 15.9795 14.8678 16.0056 14.9998 16.0056C15.1318 16.0056 15.2626 15.9795 15.3844 15.9287C15.5063 15.878 15.6169 15.8036 15.7098 15.7098C15.8036 15.6169 15.878 15.5063 15.9287 15.3844C15.9795 15.2626 16.0056 15.1318 16.0056 14.9998C16.0056 14.8678 15.9795 14.7371 15.9287 14.6153C15.878 14.4934 15.8036 14.3828 15.7098 14.2898L13.4098 11.9998L15.7098 9.70984C15.8036 9.61687 15.878 9.50627 15.9287 9.38441C15.9795 9.26255 16.0056 9.13185 16.0056 8.99984C16.0056 8.86782 15.9795 8.73712 15.9287 8.61526C15.878 8.4934 15.8036 8.3828 15.7098 8.28983ZM19.0698 4.92984C18.1474 3.97473 17.0439 3.21291 15.8239 2.68882C14.6038 2.16473 13.2916 1.88887 11.9638 1.87733C10.6361 1.86579 9.31926 2.11881 8.09029 2.62162C6.86133 3.12443 5.74481 3.86696 4.80589 4.80589C3.86696 5.74481 3.12443 6.86133 2.62162 8.09029C2.11881 9.31926 1.86579 10.6361 1.87733 11.9638C1.88887 13.2916 2.16473 14.6038 2.68882 15.8239C3.21291 17.0439 3.97473 18.1474 4.92984 19.0698C5.8523 20.0249 6.95575 20.7868 8.17579 21.3109C9.39583 21.8349 10.708 22.1108 12.0358 22.1223C13.3636 22.1339 14.6804 21.8809 15.9094 21.3781C17.1383 20.8752 18.2549 20.1327 19.1938 19.1938C20.1327 18.2549 20.8752 17.1383 21.3781 15.9094C21.8809 14.6804 22.1339 13.3636 22.1223 12.0358C22.1108 10.708 21.8349 9.39583 21.3109 8.17579C20.7868 6.95575 20.0249 5.8523 19.0698 4.92984ZM17.6598 17.6598C16.3519 18.9692 14.6304 19.7847 12.7886 19.9671C10.9469 20.1496 9.09884 19.6879 7.55936 18.6606C6.01987 17.6333 4.88419 16.104 4.34581 14.3333C3.80742 12.5626 3.89964 10.66 4.60675 8.94962C5.31386 7.23926 6.59211 5.82698 8.22373 4.9534C9.85534 4.07981 11.7394 3.79897 13.5548 4.15871C15.3703 4.51845 17.0049 5.49653 18.1801 6.9263C19.3553 8.35607 19.9984 10.1491 19.9998 11.9998C20.0034 13.0511 19.7984 14.0927 19.3968 15.0642C18.9951 16.0358 18.4047 16.918 17.6598 17.6598Z"
            fill="#A1A1A1"
          />
        </svg>

        <h3>We’re not crying. Promise.</h3>
        <p>
          Are you sure you want to delete your account? If you do, your account
          vanishes and cannot be undone.
        </p>

        <InputComponent
          label="Enter your Username to delete your account:"
          placeholder="Pop in your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          text="Delete my account"
          onClick={handleSubmit}
          isDisabled={isDisable}
          isLoading={isLoading}
        />
        <span onClick={() => setShowDelete(false)}>
          No! I’ve changed my mind!
        </span>
      </div>
    </DeleteStyled>
  );
};

export default function Account() {
  // fetch saved user data from context
  const [dashboardState, setDashboardState] = useContext(DashboardContext);
  const { creatorData } = dashboardState;
  const logout = useLogout;

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const [whichUpdate, setWhichUpdate] = useState("");

  const [showDelete, setShowDelete] = useState(false);

  // form states
  const [commentNotification, setCommentNotification] = useState(
    booleanToNumber(creatorData?.commentNotification)
  );
  const [newsLetterNotification, setNewsLetterNotification] = useState(
    booleanToNumber(creatorData?.newsLetterNotification)
  );
  const [bidNotification, setBidNotification] = useState(booleanToNumber());

  // update email toggles with context data

  useEffect(() => {
    setBidNotification(booleanToNumber(creatorData?.bidNotification));
    setCommentNotification(booleanToNumber(creatorData?.commentNotification));
    setNewsLetterNotification(
      booleanToNumber(creatorData?.newsLetterNotification)
    );
    setFullName(creatorData?.fullName);
    setDisplayImgUrl(creatorData?.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorData]);

  const [fullName, setFullName] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [imgUrl, setUrl] = useState("");
  const [displayImgUrl, setDisplayImgUrl] = useState("");

  // handle which image to display

  // handle image
  const imgRef = useRef(null);

  const handleImageUpload = () => {
    const maxFileSizeMB = 4; // Set your maximum file size limit in megabytes

    if (imgRef.current.files[0]) {
      const file = imgRef.current.files[0];

      if (file.size <= maxFileSizeMB * 1024 * 1024) {
        // File size is within the limit
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = (event) => {
          const img = event.target.result;
          setUrl(img);

          // Perform action only if file size is within the limit
          action(
            "/creators/update-profile",
            { avatar: img?.split("base64,")[1] },
            "patch"
          );
        };
      } else {
        toast(`Sloth Yo!! its larger than ${maxFileSizeMB}MB.`, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          type: "error",
        });
      }
    }
  };

  // handle which image to display
  useEffect(() => {
    if (imgUrl) {
      setDisplayImgUrl(imgUrl);
    } else {
      setDisplayImgUrl(creatorData?.avatar);
    }
  }, [creatorData, imgUrl]);

  // update profile
  // const handleUpdateProfile = async () => {
  //   const formData = {
  //     fullName: fullName || creatorData?.fullName,
  //     avatar: imgUrl.split("base64,")[1],
  //   };
  //   await action(
  //     "/creators/update-profile",
  //     formData,
  //     "patch"
  //   );
  // };

  // update profile
  const handleUpdatePassword = async () => {
    const { confirmNewPassword, currentPassword, newPassword } = passwordData;
    if (confirmNewPassword && currentPassword && newPassword) {
      if (newPassword === confirmNewPassword) {
        await action("/creators/update-password", passwordData, "patch");
      } else {
        toast("Password does not match!", {
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
      toast("Wait! You’re missing a bit!", {
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

  // update email notification
  const handleUpdateEmail = async () => {
    const formData = {
      commentNotification: numberToBoolean(commentNotification),
      newsLetterNotification: numberToBoolean(newsLetterNotification),
      bidNotification: numberToBoolean(bidNotification),
    };
    await action("/creators/update-email-settings", formData, "patch");
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        // encrypt user data and store it in local storage
        const encryptedData = dataEncrypt(JSON.stringify(data?.data));
        localStorage.setItem("activeUser", encryptedData);

        setDashboardState((prev) => ({
          ...prev,
          creatorData: data?.data,
          creatorId: data?.data?._id,
        }));
      }
      toast(data?.message || "Profile Updated", {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
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
        toast(error?.data?.message, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <DashboardLayout pageTitle="Accounts">
      <AccountStyled>
        <div className="logged-user">
          <div className="avatar">
            <Image
              src={displayImgUrl || "/icon.png"}
              width="80"
              height="80"
              alt="user-image"
            />
            <div className="img-edit">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                ref={imgRef}
                onChange={handleImageUpload}
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="edit-photo"
              >
                <circle cx="12" cy="12" r="12" fill="var(--primary-color)" />
                <g clip-path="url(#clip0_369_1383)">
                  <path
                    d="M14.6669 6.08203L13.4569 7.29203L16.7069 10.542L17.9169 9.33203C18.5419 8.70703 18.5419 7.69453 17.9169 7.06953L16.9319 6.08203C16.3069 5.45703 15.2944 5.45703 14.6694 6.08203H14.6669ZM12.8919 7.85703L7.06444 13.687C6.80444 13.947 6.61444 14.2695 6.50944 14.622L5.62444 17.6295C5.56194 17.842 5.61944 18.0695 5.77444 18.2245C5.92944 18.3795 6.15694 18.437 6.36694 18.377L9.37444 17.492C9.72694 17.387 10.0494 17.197 10.3094 16.937L16.1419 11.107L12.8919 7.85703Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_369_1383">
                    <rect
                      width="12.8"
                      height="12.8"
                      fill="white"
                      transform="translate(5.59961 5.59961)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="username">
            <p>bidsloth.com/{creatorData?.username}</p>
            <CopyToClipboard
              text={`https://bidsloth.com/${creatorData?.username}`}
              onCopy={() =>
                toast("Copied!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  type: "success",
                })
              }
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 8.75V8.75C17.5 7.10626 17.5 6.28439 17.046 5.73121C16.9629 5.62995 16.8701 5.53709 16.7688 5.45398C16.2156 5 15.3937 5 13.75 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V13.75C5 15.3937 5 16.2156 5.45398 16.7688C5.53709 16.8701 5.62995 16.9629 5.73121 17.046C6.28439 17.5 7.10626 17.5 8.75 17.5V17.5"
                  stroke="#C1C1C1"
                  stroke-width="2"
                />
                <rect
                  x="12.5"
                  y="12.5"
                  width="12.5"
                  height="12.5"
                  rx="2"
                  stroke="#C1C1C1"
                  stroke-width="2"
                />
              </svg>
            </CopyToClipboard>
          </div>
        </div>
        {/* <div className="settings-group">
          <h3>Basic settings</h3>
          <InputComponent
            label="Name"
            name="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="new-name"
            type="text"
            className={fullName === creatorData?.fullName ? "dark-in" : ""}
            icon={
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="5" r="5" fill="#C1C1C1" />
                <path
                  d="M0.97351 15.5296C1.7979 12.7797 4.52173 11.25 7.39258 11.25H10.6074C13.4783 11.25 16.2021 12.7797 17.0265 15.5296C17.3465 16.5971 17.6102 17.786 17.7086 19.001C17.7532 19.5514 17.3023 20 16.75 20H1.25C0.697715 20 0.246824 19.5514 0.291405 19.001C0.389794 17.786 0.653484 16.5971 0.97351 15.5296Z"
                  fill="#C1C1C1"
                />
              </svg>
            }
            placeholder={creatorData?.fullName || "Enter your full name "}
          />
          <InputComponent
            type="email"
            label="Email"
            placeholder={creatorData?.email}
            disabled
            icon={
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="14" rx="3" fill="#C1C1C1" />
                <path
                  d="M3 4L8.4453 7.6302C8.7812 7.85413 9.2188 7.85413 9.5547 7.6302L15 4"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />
          <Button
            text="Save changes"
            isLoading={whichUpdate === "profile" && isLoading}
            onClick={() => {
              setWhichUpdate("profile");
              handleUpdateProfile();
            }}
          />
        </div> */}
        <div className="settings-group">
          <h3>Password settings</h3>
          <InputComponent
            type="password"
            icon={
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.375 4.375C0.375 2.97487 0.375 2.2748 0.647484 1.74002C0.887167 1.26962 1.26962 0.887167 1.74002 0.647484C2.2748 0.375 2.97487 0.375 4.375 0.375H16.625C18.0251 0.375 18.7252 0.375 19.26 0.647484C19.7304 0.887167 20.1128 1.26962 20.3525 1.74002C20.625 2.2748 20.625 2.97487 20.625 4.375V16.625C20.625 18.0251 20.625 18.7252 20.3525 19.26C20.1128 19.7304 19.7304 20.1128 19.26 20.3525C18.7252 20.625 18.0251 20.625 16.625 20.625H4.375C2.97487 20.625 2.2748 20.625 1.74002 20.3525C1.26962 20.1128 0.887167 19.7304 0.647484 19.26C0.375 18.7252 0.375 18.0251 0.375 16.625V4.375ZM9.22439 9.5C8.7982 8.12428 7.5158 7.125 6 7.125C4.13604 7.125 2.625 8.63604 2.625 10.5C2.625 12.364 4.13604 13.875 6 13.875C7.5158 13.875 8.7982 12.8757 9.22439 11.5H11.75V12.75C11.75 13.3023 12.1977 13.75 12.75 13.75C13.3023 13.75 13.75 13.3023 13.75 12.75V11.5H15.125V12.75C15.125 13.3023 15.5727 13.75 16.125 13.75C16.6773 13.75 17.125 13.3023 17.125 12.75V10.65C17.125 10.0149 16.6101 9.5 15.975 9.5H12.75H9.22439ZM7.32301 10.1242C7.27593 10.2402 7.25 10.3671 7.25 10.5C7.25 10.6329 7.27593 10.7598 7.32301 10.8758C7.15952 11.4525 6.6291 11.875 6 11.875C5.24061 11.875 4.625 11.2594 4.625 10.5C4.625 9.74061 5.24061 9.125 6 9.125C6.6291 9.125 7.15952 9.54748 7.32301 10.1242Z"
                  fill="#C1C1C1"
                />
              </svg>
            }
            placeholder="Enter current password"
            value={passwordData.currentPassword || ""}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
          />
          <InputComponent
            type="password"
            icon={
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.375 4.375C0.375 2.97487 0.375 2.2748 0.647484 1.74002C0.887167 1.26962 1.26962 0.887167 1.74002 0.647484C2.2748 0.375 2.97487 0.375 4.375 0.375H16.625C18.0251 0.375 18.7252 0.375 19.26 0.647484C19.7304 0.887167 20.1128 1.26962 20.3525 1.74002C20.625 2.2748 20.625 2.97487 20.625 4.375V16.625C20.625 18.0251 20.625 18.7252 20.3525 19.26C20.1128 19.7304 19.7304 20.1128 19.26 20.3525C18.7252 20.625 18.0251 20.625 16.625 20.625H4.375C2.97487 20.625 2.2748 20.625 1.74002 20.3525C1.26962 20.1128 0.887167 19.7304 0.647484 19.26C0.375 18.7252 0.375 18.0251 0.375 16.625V4.375ZM9.22439 9.5C8.7982 8.12428 7.5158 7.125 6 7.125C4.13604 7.125 2.625 8.63604 2.625 10.5C2.625 12.364 4.13604 13.875 6 13.875C7.5158 13.875 8.7982 12.8757 9.22439 11.5H11.75V12.75C11.75 13.3023 12.1977 13.75 12.75 13.75C13.3023 13.75 13.75 13.3023 13.75 12.75V11.5H15.125V12.75C15.125 13.3023 15.5727 13.75 16.125 13.75C16.6773 13.75 17.125 13.3023 17.125 12.75V10.65C17.125 10.0149 16.6101 9.5 15.975 9.5H12.75H9.22439ZM7.32301 10.1242C7.27593 10.2402 7.25 10.3671 7.25 10.5C7.25 10.6329 7.27593 10.7598 7.32301 10.8758C7.15952 11.4525 6.6291 11.875 6 11.875C5.24061 11.875 4.625 11.2594 4.625 10.5C4.625 9.74061 5.24061 9.125 6 9.125C6.6291 9.125 7.15952 9.54748 7.32301 10.1242Z"
                  fill="#C1C1C1"
                />
              </svg>
            }
            placeholder="Enter new password"
            value={passwordData.newPassword || ""}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
          />
          <InputComponent
            type="password"
            icon={
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.375 4.375C0.375 2.97487 0.375 2.2748 0.647484 1.74002C0.887167 1.26962 1.26962 0.887167 1.74002 0.647484C2.2748 0.375 2.97487 0.375 4.375 0.375H16.625C18.0251 0.375 18.7252 0.375 19.26 0.647484C19.7304 0.887167 20.1128 1.26962 20.3525 1.74002C20.625 2.2748 20.625 2.97487 20.625 4.375V16.625C20.625 18.0251 20.625 18.7252 20.3525 19.26C20.1128 19.7304 19.7304 20.1128 19.26 20.3525C18.7252 20.625 18.0251 20.625 16.625 20.625H4.375C2.97487 20.625 2.2748 20.625 1.74002 20.3525C1.26962 20.1128 0.887167 19.7304 0.647484 19.26C0.375 18.7252 0.375 18.0251 0.375 16.625V4.375ZM9.22439 9.5C8.7982 8.12428 7.5158 7.125 6 7.125C4.13604 7.125 2.625 8.63604 2.625 10.5C2.625 12.364 4.13604 13.875 6 13.875C7.5158 13.875 8.7982 12.8757 9.22439 11.5H11.75V12.75C11.75 13.3023 12.1977 13.75 12.75 13.75C13.3023 13.75 13.75 13.3023 13.75 12.75V11.5H15.125V12.75C15.125 13.3023 15.5727 13.75 16.125 13.75C16.6773 13.75 17.125 13.3023 17.125 12.75V10.65C17.125 10.0149 16.6101 9.5 15.975 9.5H12.75H9.22439ZM7.32301 10.1242C7.27593 10.2402 7.25 10.3671 7.25 10.5C7.25 10.6329 7.27593 10.7598 7.32301 10.8758C7.15952 11.4525 6.6291 11.875 6 11.875C5.24061 11.875 4.625 11.2594 4.625 10.5C4.625 9.74061 5.24061 9.125 6 9.125C6.6291 9.125 7.15952 9.54748 7.32301 10.1242Z"
                  fill="#C1C1C1"
                />
              </svg>
            }
            placeholder="Confirm new password"
            value={passwordData.confirmNewPassword || ""}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmNewPassword: e.target.value,
              })
            }
          />
          <Button
            text="Save changes"
            isLoading={whichUpdate === "password" && isLoading}
            onClick={() => {
              setWhichUpdate("password");
              handleUpdatePassword();
            }}
          />
        </div>

        <div className="email-settings">
          <h3>Email settings</h3>
          <SwitchComponent
            value={commentNotification}
            setValue={setCommentNotification}
            label="Daily auction update"
          />
          <SwitchComponent
            value={newsLetterNotification}
            setValue={setNewsLetterNotification}
            label="When a bidder comments on my auction"
          />
          <SwitchComponent
            value={bidNotification}
            setValue={setBidNotification}
            label="Creator newsletter"
          />
          <Button
            text="Save changes"
            isLoading={whichUpdate === "email" && isLoading}
            onClick={() => {
              setWhichUpdate("email");
              handleUpdateEmail();
            }}
          />
        </div>

        <div className="zink-stuff">
          <ZinkFlyer />
          <Button text="Connect Zink Account" zink />
        </div>

        <div className="delete-account">
          <h3>Delete account</h3>
          <p>
            Heads up! Once you delete your account, it&apos;s gone forever. No
            take-backsies!
          </p>
          <Button
            text="Delete account"
            onClick={() => setShowDelete(!showDelete)}
          />
        </div>
      </AccountStyled>
      <AnimatePresence>
        {showDelete && (
          <DeleteProfile
            setShowDelete={setShowDelete}
            creator={creatorData?.username}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

const AccountStyled = styled.section`
  width: 400px;
  margin-left: 10%;

  h3 {
    margin-bottom: 1rem;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
  }

  button {
    width: 200px;
    margin: 0 auto;
  }

  .logged-user {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      border: 3px solid var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .edit-photo {
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }

      .img-edit {
        position: absolute;
        cursor: pointer !important;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
        overflow: hidden;
        * {
          cursor: pointer !important;
        }
        input {
          width: 24px;
          height: 24px;
          position: absolute;
          cursor: pointer !important;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
        }
      }
    }

    .username {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px dashed var(--primary-color);
      padding: 0 14px;
      border-radius: 10px;
      width: 275px;
      height: 60px;

      p {
        font-weight: 500;
        font-size: 15px;
        color: var(--primary-color);
      }

      svg {
        cursor: pointer;
      }
    }
  }

  .settings-group {
    margin-top: 2.2rem;

    input {
      background: transparent;
    }

    .dark-in {
      color: var(--grey-color);
    }

    button {
      margin-top: 2rem;
    }
  }

  .email-settings {
    margin-top: 2.2rem;
    button {
      margin: 1.5rem auto 0;
    }
  }

  .zink-stuff {
    margin-top: 3rem;
    button {
      margin-top: 1.2rem;
      margin-left: 0;
    }
  }

  .delete-account {
    margin-top: 3rem;
    background: rgba(245, 245, 245, 0.3);
    border: 1px solid #c1c1c1;
    border-radius: 10px;
    padding: 2rem;

    color: #c1c1c1;

    p {
      font-size: 14px;
      line-height: 18px;
    }

    button {
      background: #c1c1c1;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: var(--primary-color);
      }
    }
  }

  @media screen and (min-width: 1440px) {
    width: 550px;
    margin-left: 5%;
  }

  @media screen and (max-width: 1024px) {
    width: 550px;
  }

  @media screen and (max-width: 550px) {
    width: 100%;
    margin: auto;
    .logged-user {
      margin-top: 2rem;
      .avatar {
        width: 65px;
        height: 65px;
        border: 1.5px solid var(--primary-color);
      }

      .username {
        width: calc(100% - 80px);
        p {
          font-size: 13.4px;
        }
      }
    }
  }
`;

export const DeleteStyled = styled(motion.section)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);

  .close {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    display: inline-block;
  }

  .delete-content {
    width: 450px;
    background: #fff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 1.5rem;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  h3 {
    font-size: 1.15rem;
    font-style: normal;
    font-weight: 600;
    color: var(--primary-color);
  }

  p {
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 500;
    margin: 1.2rem 0;
    line-height: 2.2;
  }

  label {
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 500;
    color: var(--black-color);
    margin-bottom: 0.9rem;
  }

  span {
    text-decoration: underline;
    display: block;
    margin-top: 1rem;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 0.95rem;
  }

  button {
    width: 200px;
    margin: auto;
  }

  @media screen and (max-width: 500px) {
    .delete-content {
      width: 95%;
    }
  }
`;

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Button from "./button";
import useApiHook from "../services/https/hook";
import { toast } from "react-toastify";
import { DashboardContext } from "../context/DashboardContext";
import { motion } from "framer-motion";
import { dataEncrypt } from "../services/snippets/secureData";

export default function UploadAvatar({ closeAction }) {
  const [, setDashboardState] = useContext(DashboardContext);
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

  const [imgUrl, setUrl] = useState("");

  // handle image
  const imgRef = useRef(null);

  // api hook
  // @ts-ignore
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleImageUpload = () => {
    const maxFileSizeMB = 4; // Set your maximum file size limit in megabytes

    if (imgRef.current.files[0]) {
      const file = imgRef.current.files[0];

      if (file.size <= maxFileSizeMB * 1024 * 1024) {
        // File size is within the limit
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = (event) => {
          setUrl(event.target.result);
        };
      } else {
        // File size exceeds the limit
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

  const handleSubmit = () => {
    if (imgUrl) {
      const data = {
        avatar: imgUrl.split("base64,")[1],
      };
      // @ts-ignore
      action("/creators/update-avatar", data, "patch");
    } else {
      toast("Kindly upload an image", {
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

  // if request is success, redirect
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.creator) {
        // encrypt user data and store it in local storage
        const encryptedData = dataEncrypt(JSON.stringify(data?.data?.creator));
        localStorage.setItem("activeUser", encryptedData);

        setDashboardState((prev) => ({
          ...prev,
          creatorData: data?.data?.creator,
          creatorId: data?.data?.creator?._id,
        }));
      }
      toast(data?.message || "Image uploaded", {
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
      closeAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  // if request is not successful
  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Couldn't upload image", {
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
  }, [isError, error]);

  return (
    <AvatarStyle
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="avatar-modal-content">
        <div className="close" onClick={closeAction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7118 8.28983C15.6188 8.19611 15.5082 8.12171 15.3864 8.07094C15.2645 8.02017 15.1338 7.99404 15.0018 7.99404C14.8698 7.99404 14.7391 8.02017 14.6172 8.07094C14.4954 8.12171 14.3848 8.19611 14.2918 8.28983L12.0018 10.5898L9.71179 8.28983C9.52348 8.10153 9.26809 7.99574 9.00179 7.99574C8.73549 7.99574 8.48009 8.10153 8.29179 8.28983C8.10348 8.47814 7.9977 8.73353 7.9977 8.99984C7.9977 9.26614 8.10348 9.52153 8.29179 9.70984L10.5918 11.9998L8.29179 14.2898C8.19806 14.3828 8.12367 14.4934 8.0729 14.6153C8.02213 14.7371 7.99599 14.8678 7.99599 14.9998C7.99599 15.1318 8.02213 15.2626 8.0729 15.3844C8.12367 15.5063 8.19806 15.6169 8.29179 15.7098C8.38475 15.8036 8.49535 15.878 8.61721 15.9287C8.73907 15.9795 8.86978 16.0056 9.00179 16.0056C9.1338 16.0056 9.26451 15.9795 9.38636 15.9287C9.50822 15.878 9.61882 15.8036 9.71179 15.7098L12.0018 13.4098L14.2918 15.7098C14.3848 15.8036 14.4954 15.878 14.6172 15.9287C14.7391 15.9795 14.8698 16.0056 15.0018 16.0056C15.1338 16.0056 15.2645 15.9795 15.3864 15.9287C15.5082 15.878 15.6188 15.8036 15.7118 15.7098C15.8055 15.6169 15.8799 15.5063 15.9307 15.3844C15.9814 15.2626 16.0076 15.1318 16.0076 14.9998C16.0076 14.8678 15.9814 14.7371 15.9307 14.6153C15.8799 14.4934 15.8055 14.3828 15.7118 14.2898L13.4118 11.9998L15.7118 9.70984C15.8055 9.61687 15.8799 9.50627 15.9307 9.38441C15.9814 9.26255 16.0076 9.13185 16.0076 8.99984C16.0076 8.86782 15.9814 8.73712 15.9307 8.61526C15.8799 8.4934 15.8055 8.3828 15.7118 8.28983ZM19.0718 4.92984C18.1493 3.97473 17.0459 3.21291 15.8258 2.68882C14.6058 2.16473 13.2936 1.88887 11.9658 1.87733C10.638 1.86579 9.32121 2.11881 8.09225 2.62162C6.86328 3.12443 5.74677 3.86696 4.80784 4.80589C3.86891 5.74481 3.12638 6.86133 2.62357 8.09029C2.12076 9.31926 1.86775 10.6361 1.87928 11.9638C1.89082 13.2916 2.16668 14.6038 2.69077 15.8239C3.21486 17.0439 3.97669 18.1474 4.93179 19.0698C5.85426 20.0249 6.9577 20.7868 8.17774 21.3109C9.39778 21.8349 10.71 22.1108 12.0378 22.1223C13.3656 22.1339 14.6824 21.8809 15.9113 21.3781C17.1403 20.8752 18.2568 20.1327 19.1957 19.1938C20.1347 18.2549 20.8772 17.1383 21.38 15.9094C21.8828 14.6804 22.1358 13.3636 22.1243 12.0358C22.1128 10.708 21.8369 9.39583 21.3128 8.17579C20.7887 6.95575 20.0269 5.8523 19.0718 4.92984ZM17.6618 17.6598C16.3538 18.9692 14.6323 19.7847 12.7906 19.9671C10.9488 20.1496 9.10079 19.6879 7.56131 18.6606C6.02183 17.6333 4.88615 16.104 4.34776 14.3333C3.80938 12.5626 3.90159 10.66 4.6087 8.94962C5.31581 7.23926 6.59406 5.82698 8.22568 4.9534C9.8573 4.07981 11.7413 3.79897 13.5568 4.15871C15.3723 4.51845 17.0068 5.49653 18.182 6.9263C19.3572 8.35607 20.0003 10.1491 20.0018 11.9998C20.0054 13.0511 19.8004 14.0927 19.3987 15.0642C18.9971 16.0358 18.4067 16.918 17.6618 17.6598Z"
              fill="#C1C1C1"
            />
          </svg>
        </div>
        <div className="auth-title">
          <h1>Add a profile pic!</h1>
        </div>
        {imgUrl ? (
          <div className="user-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgUrl} alt="avatar" />
            <div className="edit">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.4217 2.75 18.8923 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.655 21.1083 7.11733 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z"
                  fill="black"
                />
              </svg>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                ref={imgRef}
                onChange={handleImageUpload}
              />
            </div>
          </div>
        ) : (
          <div className="upload-img">
            <svg
              width="204"
              height="204"
              viewBox="0 0 204 204"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="102"
                cy="102"
                r="101"
                stroke="var(--primary-color)"
                stroke-width="2"
                stroke-dasharray="20 20"
              />
              <path
                d="M82.25 97.5291C82.25 95.3957 83.9794 93.6663 86.1127 93.6663V93.6663C87.5758 93.6663 88.9133 92.8397 89.5676 91.5311L91.5611 87.5442C92.099 86.4683 92.368 85.9304 92.8513 85.6317C93.3346 85.333 93.936 85.333 95.1388 85.333H106.861C108.064 85.333 108.665 85.333 109.149 85.6317C109.632 85.9304 109.901 86.4683 110.439 87.5442L112.432 91.5311C113.087 92.8397 114.424 93.6663 115.887 93.6663V93.6663C118.021 93.6663 119.75 95.3957 119.75 97.5291V112.666C119.75 115.495 119.75 116.909 118.871 117.788C117.993 118.666 116.578 118.666 113.75 118.666H88.25C85.4216 118.666 84.0074 118.666 83.1287 117.788C82.25 116.909 82.25 115.495 82.25 112.666V97.5291Z"
                stroke="var(--primary-color)"
                stroke-width="2"
              />
              <circle
                cx="101"
                cy="104.083"
                r="7.33333"
                stroke="var(--primary-color)"
                stroke-width="2"
              />
            </svg>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              ref={imgRef}
              onChange={handleImageUpload}
            />
          </div>
        )}
        <div className="btn-wrap">
          <Button text="Done!" onClick={handleSubmit} isLoading={isLoading} />
        </div>
        <p className="extra-note">You need one to launch your auction</p>
      </div>
    </AvatarStyle>
  );
}

const AvatarStyle = styled(motion.div)`
  position: fixed;
  top: 0;
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

  .avatar-modal-content {
    width: 370px;
    background: #fff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 1.5rem;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);

    .auth-title {
      margin: 1rem 0;
      text-align: center;
    }

    input {
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }

    .user-avatar {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      overflow: hidden;
      margin: auto;
      position: relative;
      cursor: pointer;
      margin-bottom: 1rem;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      .edit {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(25, 24, 37, 0.3);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all 0.3s ease-in-out;

        &:hover {
          opacity: 1;
        }
      }
    }

    .upload-img {
      width: 200px;
      height: 200px;
      margin: auto;
      margin-bottom: 1rem;
      position: relative;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .btn-wrap {
      position: relative;
      padding-top: 1px;
      width: 200px;
      margin: auto;
    }

    .extra-note {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c1c1c1;
      font-size: 12px;
      margin-top: 1rem;
    }
  }
`;

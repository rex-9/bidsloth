import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import InputComponent from "../../comps/input";
import TextareaComponent from "../../comps/textarea";
import Button from "../../comps/button";
import useApiHook from "../../services/https/hook";
import useLogout from "../../services/snippets/logout";
import { DashboardContext } from "../../context/DashboardContext";
import isEmptyObj from "../../services/snippets/emptyObject";

const CreateAuction1 = ({ formData, setFormData }) => {
  const wordCount = 75;
  const [count, setCount] = useState(wordCount);
  const [showColor, setShowColor] = useState(false);

  const router = useRouter();

  const handleTitle = (e) => {
    const inputText = e.target.value;
    const inputTextLength = inputText.length;
    const remainingChars = wordCount - inputTextLength;

    if (inputTextLength <= wordCount) {
      setFormData({ ...formData, title: inputText });
      setCount(remainingChars);
    }
  };

  const handleColor = (e) => {
    setFormData({ ...formData, color: e.hex });
  };

  return (
    <>
      <CreateAuction1Styled>
        <div className="form">
          <div className="group-title">
            <h4>Tell fans what you’re auctioning</h4>
            <p onClick={() => router.push("/bo-ai")}>
              Need an auction idea?, Try Bo-AI for free
            </p>
          </div>
          <InputComponent
            placeholder="Give you auction a title “I’m auctioning...”"
            count={count}
            value={formData.title}
            onChange={handleTitle}
          />
          <TextareaComponent
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
            placeholder="Hello fans, it’s your favorite creator here! And it’s time to get excited... ."
          />
          <div className="color-picker">
            <p>Pick a colour for your auction page:</p>
            <svg
              width="32"
              height="33"
              viewBox="0 0 42 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowColor(!showColor)}
            >
              <g filter="url(#filter0_d_181_891)">
                <rect
                  x="1"
                  width="40"
                  height="40"
                  rx="5"
                  fill={formData.color}
                />
              </g>
              <path
                d="M16.4209 23.5975C16.2346 23.7879 16.1301 24.0455 16.1301 24.314C16.1301 24.5825 16.2346 24.84 16.4209 25.0304C16.5138 25.1257 16.6244 25.2013 16.7463 25.2529C16.8682 25.3045 16.9989 25.331 17.1309 25.331C17.2629 25.331 17.3936 25.3045 17.5155 25.2529C17.6373 25.2013 17.7479 25.1257 17.8409 25.0304C18.0271 24.84 18.1317 24.5825 18.1317 24.314C18.1317 24.0455 18.0271 23.7879 17.8409 23.5975C17.7479 23.5023 17.6373 23.4267 17.5155 23.3751C17.3936 23.3235 17.2629 23.2969 17.1309 23.2969C16.9989 23.2969 16.8682 23.3235 16.7463 23.3751C16.6244 23.4267 16.5138 23.5023 16.4209 23.5975ZM16.4209 14.9695C16.2346 15.1599 16.1301 15.4174 16.1301 15.6859C16.1301 15.9544 16.2346 16.212 16.4209 16.4024C16.5138 16.4976 16.6244 16.5732 16.7463 16.6248C16.8682 16.6764 16.9989 16.703 17.1309 16.703C17.2629 16.703 17.3936 16.6764 17.5155 16.6248C17.6373 16.5732 17.7479 16.4976 17.8409 16.4024C18.0271 16.212 18.1317 15.9544 18.1317 15.6859C18.1317 15.4174 18.0271 15.1599 17.8409 14.9695C17.7479 14.8742 17.6373 14.7986 17.5155 14.747C17.3936 14.6954 17.2629 14.6689 17.1309 14.6689C16.9989 14.6689 16.8682 14.6954 16.7463 14.747C16.6244 14.7986 16.5138 14.8742 16.4209 14.9695ZM21.3709 25.1321C21.1731 25.1321 20.9798 25.1917 20.8153 25.3033C20.6509 25.415 20.5227 25.5737 20.447 25.7594C20.3713 25.9451 20.3515 26.1494 20.3901 26.3466C20.4287 26.5437 20.5239 26.7248 20.6638 26.8669C20.8036 27.0091 20.9818 27.1058 21.1758 27.1451C21.3698 27.1843 21.5708 27.1641 21.7536 27.0872C21.9363 27.0103 22.0925 26.88 22.2023 26.7129C22.3122 26.5458 22.3709 26.3493 22.3709 26.1483C22.3777 26.0106 22.3568 25.873 22.3096 25.7438C22.2624 25.6146 22.1898 25.4965 22.0963 25.3966C22.0027 25.2968 21.8902 25.2174 21.7655 25.1632C21.6408 25.1089 21.5065 25.0811 21.3709 25.0812V25.1321ZM15.3709 19.0345C15.1731 19.0345 14.9798 19.0941 14.8153 19.2058C14.6509 19.3174 14.5227 19.4762 14.447 19.6619C14.3713 19.8476 14.3515 20.0519 14.3901 20.249C14.4287 20.4462 14.5239 20.6272 14.6638 20.7694C14.8036 20.9115 14.9818 21.0083 15.1758 21.0475C15.3698 21.0867 15.5708 21.0666 15.7536 20.9897C15.9363 20.9127 16.0925 20.7825 16.2023 20.6154C16.3122 20.4482 16.3709 20.2518 16.3709 20.0508C16.3777 19.9131 16.3568 19.7755 16.3096 19.6462C16.2624 19.517 16.1898 19.3989 16.0963 19.2991C16.0027 19.1993 15.8902 19.1198 15.7655 19.0656C15.6408 19.0114 15.5065 18.9835 15.3709 18.9837V19.0345ZM21.3709 12.9369C21.1731 12.9369 20.9798 12.9965 20.8153 13.1082C20.6509 13.2199 20.5227 13.3786 20.447 13.5643C20.3713 13.75 20.3515 13.9543 20.3901 14.1515C20.4287 14.3486 20.5239 14.5297 20.6638 14.6718C20.8036 14.8139 20.9818 14.9107 21.1758 14.9499C21.3698 14.9891 21.5708 14.969 21.7536 14.8921C21.9363 14.8152 22.0925 14.6849 22.2023 14.5178C22.3122 14.3507 22.3709 14.1542 22.3709 13.9532C22.3777 13.8155 22.3568 13.6779 22.3096 13.5487C22.2624 13.4194 22.1898 13.3013 22.0963 13.2015C22.0027 13.1017 21.8902 13.0223 21.7655 12.968C21.6408 12.9138 21.5065 12.886 21.3709 12.8861V12.9369ZM24.9109 15.0203C24.7704 15.1622 24.6746 15.3432 24.6355 15.5405C24.5965 15.7378 24.6159 15.9425 24.6914 16.1285C24.7669 16.3146 24.8951 16.4736 25.0597 16.5856C25.2243 16.6975 25.4178 16.7573 25.6159 16.7573C25.8139 16.7573 26.0075 16.6975 26.1721 16.5856C26.3366 16.4736 26.4648 16.3146 26.5403 16.1285C26.6158 15.9425 26.6353 15.7378 26.5962 15.5405C26.5572 15.3432 26.4613 15.1622 26.3209 15.0203C26.1402 14.8241 25.8904 14.7086 25.6262 14.6991C25.362 14.6896 25.1048 14.7868 24.9109 14.9695V15.0203ZM31.2109 15.0203C30.2966 13.1629 28.8913 11.601 27.1525 10.5098C25.4136 9.41863 23.4101 8.84129 21.3665 8.84253C19.3229 8.84377 17.32 9.42354 15.5825 10.5168C13.8449 11.6101 12.4414 13.1737 11.5294 15.0322C10.6173 16.8908 10.2327 18.9708 10.4187 21.039C10.6047 23.1072 11.354 25.0819 12.5825 26.7415C13.8111 28.4012 15.4702 29.6803 17.374 30.4353C19.2778 31.1904 21.3509 31.3915 23.3609 31.0162C23.8663 30.9196 24.3477 30.7215 24.777 30.4336C25.2062 30.1457 25.5747 29.7737 25.8609 29.3394C26.1692 28.8672 26.382 28.3374 26.4867 27.7808C26.5914 27.2242 26.5861 26.652 26.4709 26.0975C26.4079 25.7624 26.3744 25.4223 26.3709 25.0812C26.3753 24.0965 26.6611 23.1342 27.1937 22.3114C27.7263 21.4887 28.4827 20.841 29.3709 20.4471C29.8497 20.2292 30.2796 19.9139 30.6339 19.5206C30.9882 19.1273 31.2594 18.6645 31.4309 18.1605C31.6043 17.6456 31.6741 17.1005 31.6364 16.5576C31.5986 16.0146 31.4539 15.485 31.2109 14.9999V15.0203ZM29.5109 17.4999C29.4255 17.7432 29.2931 17.9665 29.1213 18.1568C28.9495 18.347 28.742 18.5004 28.5109 18.6077C27.2809 19.1672 26.2359 20.0757 25.5015 21.224C24.7672 22.3724 24.3746 23.7117 24.3709 25.0812C24.3724 25.559 24.4192 26.0354 24.5109 26.504C24.5719 26.7904 24.576 27.0863 24.5227 27.3743C24.4695 27.6623 24.3601 27.9365 24.2009 28.1808C24.0662 28.3947 23.8889 28.5775 23.6805 28.7175C23.4721 28.8575 23.2372 28.9516 22.9909 28.9938C22.4567 29.0959 21.9144 29.1469 21.3709 29.1463C20.165 29.1469 18.9714 28.9012 17.8608 28.4239C16.7502 27.9465 15.7453 27.2473 14.9058 26.3676C14.0663 25.4879 13.4094 24.4457 12.9739 23.303C12.5384 22.1603 12.3334 20.9402 12.3709 19.7154C12.4485 17.4316 13.3599 15.259 14.9275 13.6208C16.4951 11.9826 18.6067 10.9962 20.8509 10.8536H21.3609C23.0366 10.854 24.679 11.3299 26.103 12.2277C27.527 13.1254 28.6761 14.4093 29.4209 15.9349C29.6501 16.4176 29.6825 16.9728 29.5109 17.4796V17.4999ZM21.3709 18.9837C21.1731 18.9837 20.9798 19.0433 20.8153 19.155C20.6509 19.2666 20.5227 19.4253 20.447 19.611C20.3713 19.7967 20.3515 20.0011 20.3901 20.1982C20.4287 20.3953 20.5239 20.5764 20.6638 20.7185C20.8036 20.8607 20.9818 20.9575 21.1758 20.9967C21.3698 21.0359 21.5708 21.0158 21.7536 20.9388C21.9363 20.8619 22.0925 20.7317 22.2023 20.5646C22.3122 20.3974 22.3709 20.2009 22.3709 19.9999C22.3709 19.7304 22.2655 19.4719 22.078 19.2813C21.8904 19.0908 21.6361 18.9837 21.3709 18.9837Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_181_891"
                  x="0"
                  y="0"
                  width="42"
                  height="43"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_181_891"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_181_891"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            {showColor && (
              <>
                <div
                  className="color-cover"
                  onClick={() => setShowColor(false)}
                />
                <SketchPicker
                  className="color-holder"
                  color={formData.color}
                  onChangeComplete={handleColor}
                />
              </>
            )}
          </div>
        </div>
      </CreateAuction1Styled>
    </>
  );
};

export default CreateAuction1;

const CreateAuction1Styled = styled.section`
  width: 100%;
  margin-bottom: 1rem;

  .group-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    p {
      font-size: 12px;
      color: var(--primary-color);
      cursor: pointer;
    }
  }

  .form {
    padding: 1rem 0;
    h4 {
      margin-bottom: 10px;
    }
  }

  .color-picker {
    display: flex;
    align-items: center;
    position: relative;

    .color-holder {
      position: absolute;
      right: 0;
      z-index: 2;
      width: 250px !important;
    }

    p {
      margin-right: 14px;
      font-weight: 400;
      font-size: 15px;
    }

    svg {
      cursor: pointer;
    }
  }

  .color-cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

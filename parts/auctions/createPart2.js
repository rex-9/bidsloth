import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const CreateAuction2 = ({ formData, setFormData }) => {
  // handle image
  const imgRef = useRef(null);

  const handleImageUpload = () => {
    if (imgRef?.current?.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgRef.current.files[0]);

      fileReader.onloadend = (event) => {
        setFormData({ ...formData, photo: event.target.result });
      };
    }
  };

  // handle video
  const videoRef = useRef(null);

  const handleVideoUpload = () => {
    if (videoRef?.current?.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(videoRef.current.files[0]);

      fileReader.onloadend = (event) => {
        setFormData({ ...formData, video: event.target.result });
      };
    }
  };

  return (
    <CreateAuction2Styled>
      <div className="image-area fie">
        <input
          type="file"
          name="avatar"
          accept="image/*"
          ref={imgRef}
          onChange={handleImageUpload}
        />
        {formData?.photo ? (
          <div className="display-holder">
            <Image
              src={formData?.photo}
              alt="avatar"
              width="350"
              height="170"
            />
          </div>
        ) : (
          <div className="upload-holder">
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_181_947"
                style={{
                  maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={5}
                y={5}
                width={30}
                height={30}
              >
                <path
                  d="M5 13C5 9.22876 5 7.34315 6.17157 6.17157C7.34315 5 9.22876 5 13 5H27C30.7712 5 32.6569 5 33.8284 6.17157C35 7.34315 35 9.22876 35 13V27C35 30.7712 35 32.6569 33.8284 33.8284C32.6569 35 30.7712 35 27 35H13C9.22876 35 7.34315 35 6.17157 33.8284C5 32.6569 5 30.7712 5 27V13Z"
                  fill="#273B4A"
                />
              </mask>
              <g mask="url(#mask0_181_947)">
                <path
                  d="M10.8223 19.1777L7.51935 22.4807C6.27866 23.7213 5.65831 24.3417 5.35362 25.1357C5.04893 25.9297 5.09504 26.8058 5.18726 28.558L5.83333 40.8333H35V31.0629C35 29.3083 35 28.431 34.654 27.6541C34.308 26.8772 33.6559 26.2903 32.3517 25.1165L29.4875 22.5387C28.1519 21.3367 27.4841 20.7357 26.6866 20.7566C25.889 20.7776 25.2538 21.4129 23.9832 22.6835L22.0888 24.5778C21.1424 25.5242 20.6692 25.9974 20.1482 25.8971C19.6272 25.7968 19.3636 25.1817 18.8363 23.9515L17.3273 20.4304C16.2729 17.97 15.7456 16.7398 14.7036 16.5391C13.6615 16.3385 12.7151 17.2849 10.8223 19.1777Z"
                  fill="#FFD8E7"
                  stroke="#FF0066"
                />
              </g>
              <path
                d="M5 13C5 9.22876 5 7.34315 6.17157 6.17157C7.34315 5 9.22876 5 13 5H27C30.7712 5 32.6569 5 33.8284 6.17157C35 7.34315 35 9.22876 35 13V27C35 30.7712 35 32.6569 33.8284 33.8284C32.6569 35 30.7712 35 27 35H13C9.22876 35 7.34315 35 6.17157 33.8284C5 32.6569 5 30.7712 5 27V13Z"
                stroke="#FF0066"
                strokeWidth={1.2}
              />
              <circle cx={27.5} cy={12.5} r={2.5} fill="#FF0066" />
            </svg>

            <h5>Auction photo</h5>
            <p>Add an image to show your prize!</p>
          </div>
        )}
      </div>
      <div className="image-area">
        <input
          type="file"
          name="video"
          accept="video/*"
          ref={videoRef}
          onChange={handleVideoUpload}
        />

        {formData.video ? (
          <div className="display-holder">
            <video controls autoPlay>
              <source src={formData.video} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="upload-holder">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35ZM16.2278 13.1141L27.0186 18.5095C28.247 19.1237 28.247 20.8767 27.0186 21.4909L16.2278 26.8864C14.898 27.5513 13.3333 26.5843 13.3333 25.0975V14.903C13.3333 13.4162 14.898 12.4492 16.2278 13.1141Z"
                fill="#FFD8E7"
              />
              <path
                d="M28.2111 19.1057L15.07 12.5351C14.2721 12.1361 13.3333 12.7163 13.3333 13.6084V26.3918C13.3333 27.2838 14.2721 27.864 15.07 27.4651L28.2111 20.8945C28.9482 20.526 28.9482 19.4742 28.2111 19.1057Z"
                stroke="#FF0066"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#FF0066"
                stroke-width="1.2"
              />
            </svg>
            <h5>Auction video</h5>
            <p>Drop a video to excite your fans!</p>
            <p className="optional">(optional)</p>
          </div>
        )}
      </div>
    </CreateAuction2Styled>
  );
};

export default CreateAuction2;

const CreateAuction2Styled = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1rem 0 1.5rem;
  justify-content: space-between;

  .image-area {
    width: 48%;
    border: 1px dashed var(--grey-color);
    border-radius: 10px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    position: relative;
    height: 9.668rem;

    input {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }

    .display-holder {
      width: 100%;
      height: 170px;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .upload-holder {
      padding-top: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      h5 {
        font-weight: 500;
        font-size: 13px;
        margin: 1rem auto 0;
      }

      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 25px;

        &.optional {
          color: var(--grey-color);
          font-style: italic;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    display: block;
    .image-area {
      width: 100%;

      &.fie {
        margin-bottom: 2rem;
      }
    }
  }
`;

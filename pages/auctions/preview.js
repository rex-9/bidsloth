import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import BiddingLayout from "../../hoc/biddingLayout";
import { toast } from "react-toastify";
import useApiHook from "../../services/https/hook";
import { AuctionWrapperStyled, LoaderStyled } from "../[username]";
import { DashboardContext } from "../../context/DashboardContext";
import PreviewLayout from "../../hoc/previewLayout";
import { dataDecrypt, dataEncrypt } from "../../services/snippets/secureData";
import Axios from "../../services/https";
import isEmptyObj from "../../services/snippets/emptyObject";

export default function CreatorPage() {
  const router = useRouter();

  // init context
  const [dashboardState, setDashboardState] = useContext(DashboardContext);
  const { draft, creatorData } = dashboardState;

  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const [showVideo, setShowVideo] = useState(false);
  const [manualLoader, setManualLoader] = useState(true);

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
    window.scrollTo(0, 0);
    (async () => {
      await action("/auctions/draft", {}, "get");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      // if data is successful redirect to url in data response
      setManualLoader(false);
      console.log(data.data);
      //   if no draft redirect to create auction
      if (isEmptyObj(data?.data)) {
        router.replace("/auctions/create");
      } else {
        setDashboardState((prev) => ({
          ...prev,
          draft: data?.data || {},
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "couldn't fetch creator data", {
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
      // redirect to 404
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return manualLoader ? (
    <LoaderStyled>
      <Image width={100} height={100} src="/red-bo.png" alt="loading" />
    </LoaderStyled>
  ) : (
    <PreviewLayout pageTitle="Auction" draft={draft} creator={creatorData}>
      <AuctionWrapperStyled>
        <div className="video-wrapper">
          <div className="vid">
            {showVideo ? (
              <video
                controls
                autoPlay
                onEnded={() => setTimeout(() => setShowVideo(false), 1500)}
              >
                <source src={draft?.video} type="video/mp4" />
              </video>
            ) : (
              <>
                {draft?.photo ? (
                  <Image
                    src={draft?.photo}
                    width="850"
                    height="476"
                    alt="vid"
                  />
                ) : (
                  <Image
                    src="/bo-bid.png"
                    width={148}
                    height={110}
                    alt="no-img"
                    style={{
                      objectFit: "contain",
                      width: "400px",
                      height: "300px",
                      margin: "auto",
                      marginTop: "10%",
                    }}
                  />
                )}

                {draft?.video && (
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="play"
                    onClick={() => setShowVideo(true)}
                  >
                    <circle
                      opacity="0.7"
                      cx="45"
                      cy="45"
                      r="45"
                      fill="var(--primary-color)"
                    />
                    <path
                      d="M62.6181 42.4977C65.6158 43.958 65.6157 48.2295 62.6181 49.6898L38.2518 61.5596C35.5948 62.8539 32.5 60.919 32.5 57.9635L32.5 34.224C32.5 31.2685 35.5948 29.3336 38.2518 30.6279L62.6181 42.4977Z"
                      fill="white"
                    />
                  </svg>
                )}
              </>
            )}
          </div>
          <div className="des">
            <h3>Description</h3>
            {draft?.description?.length > 70 ? (
              <p>
                {draft?.description}
                {/* <span>MORE</span> */}
              </p>
            ) : (
              <p>{draft?.description}</p>
            )}
            <div className="des-cta">
              <CopyToClipboard
                text={`https://bidsloth.com/${creatorData?.username}`}
                onCopy={() =>
                  toast("Link Copied!", {
                    position: "bottom-center",
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
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0006 14.0001C17.4098 14.004 16.8272 14.1388 16.2946 14.3947C15.7621 14.6506 15.2929 15.0213 14.9206 15.4801L9.82064 13.1301C10.0604 12.3959 10.0604 11.6044 9.82064 10.8701L14.9206 8.52011C15.5223 9.24608 16.361 9.73619 17.2888 9.90395C18.2166 10.0717 19.1738 9.90634 19.9916 9.43702C20.8093 8.96769 21.435 8.22459 21.7582 7.33886C22.0814 6.45312 22.0813 5.4817 21.7579 4.59602C21.4346 3.71035 20.8088 2.96736 19.991 2.49818C19.1731 2.02901 18.2158 1.86381 17.2881 2.03174C16.3603 2.19967 15.5217 2.68993 14.9202 3.41601C14.3187 4.14208 13.993 5.05729 14.0006 6.00011C14.0036 6.23835 14.0271 6.47588 14.0706 6.71011L8.79064 9.14011C8.22772 8.58969 7.51488 8.21763 6.74144 8.07054C5.968 7.92345 5.16836 8.00788 4.44269 8.31325C3.71702 8.61861 3.0976 9.13133 2.66204 9.78718C2.22648 10.443 1.99414 11.2128 1.99414 12.0001C1.99414 12.7874 2.22648 13.5572 2.66204 14.2131C3.0976 14.8689 3.71702 15.3816 4.44269 15.687C5.16836 15.9923 5.968 16.0768 6.74144 15.9297C7.51488 15.7826 8.22772 15.4105 8.79064 14.8601L14.0706 17.2901C14.0271 17.5243 14.0036 17.7619 14.0006 18.0001C14.0006 18.7912 14.2352 19.5646 14.6748 20.2224C15.1143 20.8802 15.739 21.3929 16.4699 21.6956C17.2008 21.9984 18.0051 22.0776 18.781 21.9233C19.5569 21.7689 20.2697 21.388 20.8291 20.8285C21.3885 20.2691 21.7694 19.5564 21.9238 18.7805C22.0781 18.0046 21.9989 17.2003 21.6962 16.4694C21.3934 15.7385 20.8807 15.1138 20.2229 14.6742C19.5651 14.2347 18.7918 14.0001 18.0006 14.0001ZM18.0006 4.00011C18.3962 4.00011 18.7829 4.11741 19.1118 4.33718C19.4407 4.55694 19.697 4.8693 19.8484 5.23475C19.9998 5.6002 20.0394 6.00233 19.9622 6.3903C19.885 6.77826 19.6946 7.13462 19.4149 7.41433C19.1351 7.69403 18.7788 7.88451 18.3908 7.96169C18.0029 8.03886 17.6007 7.99925 17.2353 7.84787C16.8698 7.6965 16.5575 7.44015 16.3377 7.11125C16.1179 6.78236 16.0006 6.39568 16.0006 6.00011C16.0006 5.46968 16.2114 4.96097 16.5864 4.5859C16.9615 4.21083 17.4702 4.00011 18.0006 4.00011ZM6.00064 14.0001C5.60508 14.0001 5.2184 13.8828 4.8895 13.6631C4.5606 13.4433 4.30425 13.1309 4.15288 12.7655C4.0015 12.4 3.9619 11.9979 4.03907 11.6099C4.11624 11.222 4.30672 10.8656 4.58642 10.5859C4.86613 10.3062 5.2225 10.1157 5.61046 10.0385C5.99842 9.96137 6.40055 10.001 6.76601 10.1524C7.13146 10.3037 7.44381 10.5601 7.66358 10.889C7.88334 11.2179 8.00064 11.6046 8.00064 12.0001C8.00064 12.5305 7.78993 13.0393 7.41485 13.4143C7.03978 13.7894 6.53107 14.0001 6.00064 14.0001ZM18.0006 20.0001C17.6051 20.0001 17.2184 19.8828 16.8895 19.6631C16.5606 19.4433 16.3043 19.1309 16.1529 18.7655C16.0015 18.4 15.9619 17.9979 16.0391 17.6099C16.1162 17.222 16.3067 16.8656 16.5864 16.5859C16.8661 16.3062 17.2225 16.1157 17.6105 16.0385C17.9984 15.9614 18.4006 16.001 18.766 16.1524C19.1315 16.3037 19.4438 16.5601 19.6636 16.889C19.8833 17.2179 20.0006 17.6046 20.0006 18.0001C20.0006 18.5305 19.7899 19.0393 19.4149 19.4143C19.0398 19.7894 18.5311 20.0001 18.0006 20.0001Z"
                      fill="var(--primary-color)"
                    />
                  </svg>
                  <p>Share</p>
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        {/* <div className="why-bid">
          <h3>Bid to</h3>
          <div className="why-group">
            <div>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 12C3.75 11.0572 3.75 10.5858 4.04289 10.2929C4.33579 10 4.80719 10 5.75 10H24.25C25.1928 10 25.6642 10 25.9571 10.2929C26.25 10.5858 26.25 11.0572 26.25 12V14.375C26.25 15.1969 26.25 15.6078 26.023 15.8844C25.9815 15.935 25.935 15.9815 25.8844 16.023C25.6078 16.25 25.1969 16.25 24.375 16.25V16.25C23.5531 16.25 23.1422 16.25 22.8656 16.477C22.815 16.5185 22.7685 16.565 22.727 16.6156C22.5 16.8922 22.5 17.3031 22.5 18.125V23C22.5 23.9428 22.5 24.4142 22.2071 24.7071C21.9142 25 21.4428 25 20.5 25H9.5C8.55719 25 8.08579 25 7.79289 24.7071C7.5 24.4142 7.5 23.9428 7.5 23V18.125C7.5 17.3031 7.5 16.8922 7.27301 16.6156C7.23146 16.565 7.18503 16.5185 7.13439 16.477C6.85781 16.25 6.44687 16.25 5.625 16.25V16.25C4.80313 16.25 4.39219 16.25 4.11561 16.023C4.06497 15.9815 4.01854 15.935 3.97699 15.8844C3.75 15.6078 3.75 15.1969 3.75 14.375V12Z"
                  fill="#FFD8E7"
                />
                <path
                  d="M3.75 12C3.75 11.0572 3.75 10.5858 4.04289 10.2929C4.33579 10 4.80719 10 5.75 10H24.25C25.1928 10 25.6642 10 25.9571 10.2929C26.25 10.5858 26.25 11.0572 26.25 12V14.375C26.25 15.1969 26.25 15.6078 26.023 15.8844C25.9815 15.935 25.935 15.9815 25.8844 16.023C25.6078 16.25 25.1969 16.25 24.375 16.25V16.25C23.5531 16.25 23.1422 16.25 22.8656 16.477C22.815 16.5185 22.7685 16.565 22.727 16.6156C22.5 16.8922 22.5 17.3031 22.5 18.125V23C22.5 23.9428 22.5 24.4142 22.2071 24.7071C21.9142 25 21.4428 25 20.5 25H9.5C8.55719 25 8.08579 25 7.79289 24.7071C7.5 24.4142 7.5 23.9428 7.5 23V18.125C7.5 17.3031 7.5 16.8922 7.27301 16.6156C7.23146 16.565 7.18503 16.5185 7.13439 16.477C6.85781 16.25 6.44687 16.25 5.625 16.25V16.25C4.80313 16.25 4.39219 16.25 4.11561 16.023C4.06497 15.9815 4.01854 15.935 3.97699 15.8844C3.75 15.6078 3.75 15.1969 3.75 14.375V12Z"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
                <path
                  d="M6.25 16.25H23.75"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M15 8.75L15 25"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M14.9993 9.66634L14.5394 5.92142C14.3579 4.4435 13.0778 3.33301 11.5888 3.33301V3.33301C9.98987 3.33301 8.66602 4.62917 8.66602 6.22806V6.22806C8.66602 7.19604 9.14978 8.09996 9.95518 8.6369L11.9993 9.99967"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M14.9993 9.33301L15.5109 5.87848C15.7274 4.41606 16.9827 3.33301 18.461 3.33301H18.5483C20.1472 3.33301 21.4434 4.62917 21.4434 6.22806V6.22806C21.4434 7.19604 20.9596 8.09996 20.1542 8.6369L18.11 9.99967"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
              <p>Win the FAN-tastic prize! </p>
            </div>
            <div>
              <svg
                width="25"
                height="19"
                viewBox="0 0 25 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.833984"
                  y="0.75"
                  width="23.3333"
                  height="17.5"
                  rx="2"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
                <path
                  d="M0.833984 5.125L11.6062 10.5111C12.1693 10.7926 12.832 10.7926 13.3951 10.5111L24.1673 5.125"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
                <path
                  d="M11.8746 9.97446L2.20789 5.14113C1.73359 4.90398 1.43398 4.41921 1.43398 3.88893V2.75C1.43398 1.9768 2.06079 1.35 2.83399 1.35H22.1673C22.9405 1.35 23.5673 1.9768 23.5673 2.75V3.88893C23.5673 4.41921 23.2677 4.90398 22.7934 5.14113L13.1267 9.97446C12.7326 10.1715 12.2687 10.1715 11.8746 9.97446Z"
                  fill="#FFD8E7"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
              </svg>

              <p>Win & message the creator</p>
            </div>
            <div>
              <svg
                width="29"
                height="19"
                viewBox="0 0 29 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.96079 1.33579C1.375 1.92157 1.375 2.86438 1.375 4.75V14.25C1.375 16.1356 1.375 17.0784 1.96079 17.6642C2.54657 18.25 3.48938 18.25 5.375 18.25H23.625C25.5106 18.25 26.4534 18.25 27.0392 17.6642C27.625 17.0784 27.625 16.1356 27.625 14.25V4.75C27.625 2.86438 27.625 1.92157 27.0392 1.33579C26.4534 0.75 25.5106 0.75 23.625 0.75H5.375C3.48938 0.75 2.54657 0.75 1.96079 1.33579ZM14.5 13.875C16.9162 13.875 18.875 11.9162 18.875 9.5C18.875 7.08375 16.9162 5.125 14.5 5.125C12.0838 5.125 10.125 7.08375 10.125 9.5C10.125 11.9162 12.0838 13.875 14.5 13.875Z"
                  fill="#FFD8E7"
                />
                <rect
                  x="1.375"
                  y="0.75"
                  width="26.25"
                  height="17.5"
                  rx="2"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
                <path
                  d="M5.75 5.125L8.66667 5.125"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M20.334 13.875H23.2507"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <circle
                  cx="14.5"
                  cy="9.5"
                  r="3.775"
                  stroke="var(--primary-color)"
                  stroke-width="1.2"
                />
              </svg>

              <p>Oh, & it’s free to bid!</p>
            </div>
          </div>
        </div> */}
        <div className="bids-logs">
          {/* {draft?.bids?.length ? ( */}
          {/* <> */}
          {/* <div className="top-bidder">
                <h3>Current top bidder!</h3>
                {draft?.bids.map(
                  (bid) =>
                    bid.isTopBid && (
                      <div className="top-log" key={bid.bidder._id}>
                        <Image
                          src="/bo-win.png"
                          width="40"
                          height="40"
                          alt={bid?.bidder?.name}
                        />
                        <div className="details">
                          <h5>
                            <span>{bid?.bidder?.name}</span> bided $
                            {bid?.bidAmount}
                          </h5>
                          <p>{bid?.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </div> */}
          <p className="log-title">Recent bids</p>

          {/* <div className="log">
                <div className="bidder">
                  <Image src="/icon.png" width="40" height="40" alt="user" />
                  <div className="details">
                    <h5>
                      <span>Gandalf</span> bided $80
                    </h5>
                    <p>
                      I will win this auction! To the rest of you fans, YOU
                      SHALL NOT PASS!
                    </p>
                  </div>
                </div>
                <div className="creator">
                  <div>
                    <p>They do say, ‘a wizard is never late’! GOOD LUCK!</p>
                  </div>
                  <Image src="/lola.png" width="40" height="40" alt="user" />
                </div>
              </div> */}
          {/* {draft?.bids
                .filter((bid) => bid.isTopBid === false)
                .map((bid) => (
                  <div className="log" key={bid.bidder._id}>
                    <div className="bidder">
                      <Image
                        src="/bo-bid.png"
                        width="40"
                        height="40"
                        alt="user"
                      />
                      <div className="details">
                        <h5>
                          <span>{bid.bidder.name}</span> bided ${bid.bidAmount}
                        </h5>
                        <p>{bid.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : ( */}
          <div className="empty">
            <Image
              src="/nothing-to-see-here-image.png"
              width="235"
              height="250"
              alt="vid"
            />
            <p>No bids made yet! Be the first! </p>
          </div>
          {/* )} */}
        </div>
      </AuctionWrapperStyled>
    </PreviewLayout>
  );
}

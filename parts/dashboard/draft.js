import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import DashboardLayout from "../../hoc/dashboardLayout";
import NoImageDraft from "../drafts/noImage";
import HasImageDraft from "../drafts/hasImage";
import useLogout from "../../services/snippets/logout";
import { DashboardContext } from "../../context/DashboardContext";
import useApiHook from "../../services/https/hook";
import { toast } from "react-toastify";
import UploadAvatar from "../../comps/uploadAvatar";
import AvatarFloat from "../../comps/avatarFloat";
import { AnimatePresence } from "framer-motion";
import Button from "../../comps/button";
import { useRouter } from "next/router";
import { DeleteStyled } from "../../pages/account";

const DeleteDraft = ({ setShowDelete, auctionId }) => {
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
  const router = useRouter();

  const handleSubmit = async () => {
    await action("/auctions/delete-draft", { auctionId }, "patch");
  };

  useEffect(() => {
    if (isSuccess) {
      toast(data?.message || "Draft Deleted", {
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
      window.location.replace("/dashboard");
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

        <h3>Are you super duper sure?</h3>
        <p>
          If you delete this draft, it cannot be reversed! No turning back! Once
          it’s gone, it’s gone FOREVER!
        </p>

        <Button
          text="Delete draft"
          onClick={handleSubmit}
          isLoading={isLoading}
        />
        <span onClick={() => setShowDelete(false)}>
          No! I’ve changed my mind!
        </span>
      </div>
    </DeleteStyled>
  );
};

export default function Draft() {
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // init context
  const [dashboardState, setDashboardState] = useContext(DashboardContext);
  const { creatorData, draft } = dashboardState;

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const logout = useLogout;

  // check for user image
  useEffect(() => {
    // console.log(dashboardState.creatorData.avatar);
    if (!dashboardState.creatorData.avatar) {
      // setShowAvatarUpload(true);
      setShowFloat(true);
    } else {
      // setShowAvatarUpload(false);
      setShowFloat(false);
    }
  }, [dashboardState]);

  // check if user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("activeUser");

    if (accessToken && userData) {
      (async () => {
        await action("/auctions/draft", {}, "get");
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

  useEffect(() => {
    if (isSuccess) {
      setDashboardState((prev) => ({
        ...prev,
        draft: data?.data || {},
      }));
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout pageTitle="Draft">
      <DraftWrapperStyled>
        {draft?.photo ? (
          <HasImageDraft img={draft?.photo} />
        ) : (
          <NoImageDraft title={draft?.title} />
        )}

        <div className="tag-url">
          <div className="url-sec">
            <p>bidsloth.com/{creatorData?.username}</p>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.294 8.70617L18.75 6.25019C19.7671 5.23313 20.2756 4.7246 20.8872 4.61179C21.1271 4.56755 21.373 4.56755 21.6128 4.61179C22.2244 4.7246 22.733 5.23313 23.75 6.25017L23.75 6.25019C24.7671 7.26724 25.2756 7.77577 25.3884 8.38742C25.4326 8.62724 25.4326 8.87313 25.3884 9.11296C25.2756 9.7246 24.7671 10.2331 23.75 11.2502L21.3218 13.6784C19.2384 12.4799 17.5079 10.7626 16.294 8.70617ZM14.8397 10.1605L5.8564 19.1438C5.43134 19.5689 5.21881 19.7814 5.07907 20.0425C4.93934 20.3036 4.88039 20.5983 4.7625 21.1878L3.8971 25.5148C3.83058 25.8474 3.79732 26.0137 3.89193 26.1083C3.98654 26.2029 4.15284 26.1696 4.48545 26.1031L8.81243 25.2377C9.40189 25.1198 9.69661 25.0609 9.95771 24.9211C10.2188 24.7814 10.4313 24.5689 10.8564 24.1438L19.8637 15.1365C17.8311 13.8737 16.1151 12.1696 14.8397 10.1605Z"
                fill="#C1C1C1"
              />
            </svg>
          </div>
          <div className="act-btn">
            <p>Finish draft!</p>
          </div>
        </div>

        <div
          className={creatorData.avatar ? "delete mp" : "delete"}
          onClick={() => setShowDelete(!showDelete)}
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 4H0V7C1.10457 7 2 7.89543 2 9V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H10C12.8284 19 14.2426 19 15.1213 18.1213C16 17.2426 16 15.8284 16 13V9C16 7.89543 16.8954 7 18 7V4ZM7.5 9C7.5 8.44772 7.05228 8 6.5 8C5.94772 8 5.5 8.44772 5.5 9V14C5.5 14.5523 5.94772 15 6.5 15C7.05228 15 7.5 14.5523 7.5 14V9ZM12.5 9C12.5 8.44772 12.0523 8 11.5 8C10.9477 8 10.5 8.44772 10.5 9V14C10.5 14.5523 10.9477 15 11.5 15C12.0523 15 12.5 14.5523 12.5 14V9Z"
              fill="var(--grey-color)"
            />
            <path
              d="M7.06815 1.37059C7.1821 1.26427 7.43319 1.17033 7.78248 1.10332C8.13177 1.03632 8.55973 1 9 1C9.44027 1 9.86823 1.03632 10.2175 1.10332C10.5668 1.17033 10.8179 1.26427 10.9319 1.37059"
              stroke="var(--grey-color)"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>

          <p>delete draft</p>
        </div>
      </DraftWrapperStyled>
      {showFloat && (
        <AvatarFloat openAction={() => setShowAvatarUpload(true)} />
      )}
      <AnimatePresence>
        {showAvatarUpload && (
          <UploadAvatar
            userId={creatorData._id}
            closeAction={() => setShowAvatarUpload(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDelete && (
          <DeleteDraft setShowDelete={setShowDelete} auctionId={draft?._id} />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

const DraftWrapperStyled = styled.main`
  width: 600px;
  padding-top: 1rem;
  margin-left: 2rem;

  .draft-img {
    width: 100%;
    svg,
    img {
      width: 100%;
      height: 340px;
    }

    img {
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.15));
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .no-img {
    width: 100%;
    height: 340px;
    background: var(--white-color);
    border: 2px solid var(--primary-color);
    border-radius: 15px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      margin-top: 1rem;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .after-img {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 1.5rem 0 2rem;

    button {
      width: 48%;
      margin: 0;
    }
  }

  .status-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 48%;
    padding: 10px;
    border: 1px solid #f5f5f5;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

    h5 {
      font-weight: 500;
      font-size: 15px;
    }

    p {
      font-size: 12px;
    }
  }

  .tag-url {
    display: flex;
    align-items: center;
    height: 60px;
    cursor: not-allowed;

    .url-sec {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 65%;
      padding: 1rem;
      height: 100%;
      border: 1px dashed var(--grey-color);
      border-radius: 5px 0px 0px 5px;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        color: var(--grey-color);
      }
    }

    .act-btn {
      background: var(--grey-color);
      border: 1px solid var(--grey-color);
      border-radius: 0px 5px 5px 0px;
      height: 100%;
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-weight: 600;
        font-size: 21px;
        line-height: 18px;
        color: #fff;
      }
    }
  }

  .delete {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;

    &.mp {
      margin: 2rem 0;
    }

    * {
      cursor: pointer;
    }

    p {
      font-size: 15px;
      line-height: 12px;
      color: var(--grey-color);
      text-decoration: underline;
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 850px) {
    width: 85%;
    margin: 0;
  }

  @media screen and (max-width: 550px) {
    width: 100%;

    .draft-img {
      width: 100%;
      svg,
      img {
        width: 100%;
        height: 250px;
      }
    }

    .no-img {
      height: 250px;
      padding: 1.5rem;

      img {
        height: 100px;
        width: 100px;
      }

      p {
        text-align: center;
      }
    }

    .after-img {
      display: block;
      margin-top: 0;
      button {
        width: 100%;
        margin-top: 1rem;
      }
    }

    .status-wrap {
      width: 100%;
    }

    .tag-url {
      display: flex;
      align-items: center;
      height: 60px;
      cursor: not-allowed;

      .url-sec {
        p {
          font-size: 14px;
        }
      }

      .act-btn {
        p {
          font-size: 12px;
        }
      }
    }
  }
`;

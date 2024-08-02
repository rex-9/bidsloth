import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import generateKey from "../services/snippets/generateKey";
import DashboardLayout from "../hoc/dashboardLayout";
import { DashboardContext } from "../context/DashboardContext";
import Tag from "../comps/tag";
import { auctionType, creatorNiches } from "../services/data/aiData";
import Button, { spin } from "../comps/button";
import UsageNotes from "../svgs/usageNotes";
import Axios from "../services/https";
import formatDate from "../services/snippets/formatDate";

export default function Messages() {
  const router = useRouter();
  const [dashboardState, setDashboardState] = useContext(DashboardContext);
  const { creatorData } = dashboardState;

  const [tagList, setTagList] = useState(creatorNiches);
  const [activeAction, setActiveAction] = useState("buttons");
  const [craziness, setCraziness] = useState(0);
  const [formData, setFormData] = useState({
    creatorType: "",
    productType: "",
    uniqueness: 7,
  });
  const [draftData, setDraftData] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bo",
      time: formatDate(new Date()),
      message: `Hi ${creatorData?.username}, I’m Bo, i can help you with the next big auction but first tell me what your niche is`,
    },
  ]);

  const scrollableRef = useRef(null);

  // Function to scroll to the bottom of the section
  const scrollToBottom = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    scrollToBottom();
  }, [messages]);

  const handleActions = (niche) => {
    if (activeAction === "buttons") {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          time: formatDate(new Date()),
          message: niche,
        },
        {
          type: "bo",
          time: formatDate(new Date()),
          message:
            "That’s awesome, now tell me do you want to auction a product or an experience to your fans?",
        },
      ]);
      setTagList(auctionType);
      setFormData((prev) => ({
        ...prev,
        creatorType: niche,
      }));
      setActiveAction("auctionType");
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          time: formatDate(new Date()),
          message: niche,
        },
        {
          type: "bo",
          time: formatDate(new Date()),
          message:
            "Almost done! Now tell me how unique and crazy do you want your idea to be?",
        },
      ]);
      setFormData((prev) => ({
        ...prev,
        productType: niche,
      }));
      setActiveAction("slider");
    }
  };

  const handleRangeComplete = () => {
    setLoading(true);
    setFormData((prev) => ({
      ...prev,
      uniqueness: craziness,
    }));
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        time: formatDate(new Date()),
        message: craziness,
      },
      {
        type: "bo",
        time: formatDate(new Date()),
        message: "I am generating your auction idea!...",
      },
    ]);
    Axios.post("/ideas/generate", formData)
      .then((res) => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bo",
            time: formatDate(new Date()),
            message: (
              <>
                <h3 className="gen-title">
                  Title: {res.data?.data?.idea?.title}
                </h3>
                <h6 className="gen-des">
                  Description: {res.data?.data?.idea?.description}
                </h6>
              </>
            ),
          },
        ]);
        setDraftData({
          title: res.data?.data?.idea?.title,
          description: res.data?.data?.idea?.description,
        });
        setLoading(false);
        setActiveAction("completed");
      })
      .catch((err) => {
        setLoading(false);
        toast(
          err.response?.data?.message ||
            "oh oh, couldn't get to sloth world, try again",
          {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          }
        );
      });
  };

  const handleCreateAuction = () => {
    setDashboardState((prev) => ({
      ...prev,
      draft: draftData,
    }));
    router.push("/auctions/create");
  };

  const handleComps = () => {
    switch (activeAction) {
      case "buttons" || "auctionType":
        return tagList.map((tag) => (
          <Tag label={tag} key={generateKey(tag)} onClick={handleActions} />
        ));

      case "slider":
        return loading ? (
          <div className="loader" />
        ) : (
          <Slider
            min={0}
            max={10}
            value={craziness}
            onChangeComplete={handleRangeComplete}
            handleLabel={craziness}
            onChange={(value) => setCraziness(value)}
            tooltip={false}
            className="slider"
          />
        );

      case "completed":
        return (
          <div className="completed-cta">
            <Button text="Create this Auction" onClick={handleCreateAuction} />
          </div>
        );

      default:
        return tagList.map((tag) => (
          <Tag label={tag} key={generateKey(tag)} onClick={handleActions} />
        ));
    }
  };

  return (
    <DashboardLayout hideHelper pageTitle="Messages">
      <MessageStyled>
        <div className="message-nav">
          {/* <div className="user-message">
            <div className="user">
              <Image src="/red-bo.png" width="40" height="40" alt="user" />
              <div className="sub">
                <h6>bidsloth team</h6>
                <p>Hello there...</p>
              </div>
            </div>
            <p className="date">5:14PM</p>
          </div> */}
          <div className="user-message">
            <div className="user">
              <Image src="/icon.png" width="40" height="40" alt="user" />
              <div className="sub">
                <h6>Bo!</h6>
                <p>Auction something...</p>
              </div>
            </div>
            <p className="date">{formatDate(new Date())}</p>
          </div>
          <div className="counts">
            <UsageNotes />
          </div>
        </div>

        <div className="message-outlet">
          <div className="outlet-head">
            <div className="img-wrap">
              <Image src="/icon.png" width="40" height="40" alt="user" />
            </div>
            <div className="user-details">
              <h5>Bo!</h5>
              <p>Hello lets get you next big auction!</p>
            </div>
          </div>
          <div className="outlet-body" ref={scrollableRef}>
            {messages.map((message) => (
              <div
                key={generateKey(message)}
                className={message.type === "bo" ? "message" : "message sender"}
              >
                <div>{message.message}</div>
                <p className="time">{message.time}</p>
              </div>
            ))}
          </div>
          <div className="text-editor">{handleComps()}</div>
        </div>
      </MessageStyled>
    </DashboardLayout>
  );
}

const MessageStyled = styled.section`
  width: 100%;
  height: 80vh;
  overflow: hidden;
  border: 1px solid var(--grey-color);
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-start;

  --nav-width: 230px;

  .loader {
    border: 2px solid var(--white-color);
    border-top: 2px solid var(--primary-color);
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: ${spin} 0.35s linear infinite;
    margin: auto;
  }

  .message-nav {
    width: var(--nav-width);
    height: 100%;
    padding: 1.5rem 1rem;
    border-right: 1px solid var(--grey-color);
    position: relative;

    .counts {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      svg {
        width: 90%;
        margin: auto;
      }
    }

    .user-message {
      width: 100%;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      cursor: pointer;

      .user {
        display: flex;
        align-items: center;
      }

      .sub {
        margin-left: 3px;
        h6 {
          font-size: 12px;
        }

        p {
          font-size: 10px;
        }
      }

      .date {
        font-size: 10px;
        margin-top: 4px;
        color: var(--grey-color);
      }
    }
  }

  .message-outlet {
    width: calc(100% - var(--nav-width));
    position: relative;
    height: 100%;

    .outlet-head {
      padding: 1rem;
      width: 100%;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      color: var(--white-color);
      p {
        font-size: 10px;
      }
      .img-wrap {
        margin-right: 10px;
        width: 45px;
        height: 45px;
        background: var(--white-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        img {
          width: 70%;
        }
      }
    }

    .outlet-body {
      padding: 1.5rem;
      padding-bottom: 30%;
      overflow-y: scroll;
      height: 100%;
      &::-webkit-scrollbar {
        display: none;
      }

      .message {
        width: 260px;
        font-size: 12px;
        margin: 1rem;

        div {
          border-radius: 10px;
          margin-bottom: 10px;
          border-bottom-left-radius: 0;
          border: 1px solid var(--primary-color);
          background: var(--white-color);
          padding: 12px;
        }

        .time {
          color: var(--grey-color);
        }

        &.sender {
          margin-left: auto;
          div {
            border: 1px solid var(--secondary-color);
            background: var(--light-secondary);
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 10px;
          }
          .time {
            text-align: right;
          }
        }

        .gen-title {
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .gen-des {
          font-weight: 400;
        }
      }
    }

    .text-editor {
      padding: 1rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      max-height: 150px;
      overflow-y: scroll;
      background: #f6f6f6;
      box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 0px 0px 10px 0px;
    }
  }

  .rangeslider,
  .rangeslider .rangeslider__fill {
    box-shadow: none;
    background-color: var(--light-primary);
  }

  .slider {
    .rangeslider__handle {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-color);
      box-shadow: none;
      border-color: var(--primary-color);

      ::after {
        display: none;
      }

      .rangeslider__handle-label {
        color: var(--white-color);
        font-weight: 700;
      }
    }
  }

  .completed-cta {
    width: 80%;
    margin: auto;
  }

  @media screen and (max-width: 850px) {
    margin-top: 6%;
  }

  @media screen and (max-width: 500px) {
    .message-nav {
      display: none;
    }

    .message-outlet {
      width: 100%;

      .outlet-body {
        padding-bottom: 50%;
      }
    }
  }
`;

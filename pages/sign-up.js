import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import useApiHook from "../services/https/hook";
import { dataEncrypt } from "../services/snippets/secureData";

import Button from "../comps/button";
import InputComponent from "../comps/input";
import AuthLayout from "../hoc/authLayout";
import { DeleteStyled } from "./account";
import { AnimatePresence } from "framer-motion";

const InviteModal = ({ setShowInvite, setInviteCode, inviteCode }) => {
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

  const [noCode, setNoCode] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const router = useRouter();

  const handleSubmit = async () => {
    await action(
      "/promos/validate",
      {
        code: inviteCode,
      },
      "post"
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setShowInvite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <DeleteStyled
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {noCode ? (
        <div className="delete-content">
          <h3>Oh, sloth balls!</h3>
          <p>
            bidsloth is invite-only at the moment! But perhaps a fellow creator
            has a spare secret password they can share.
          </p>
          <p>Or, hush hush, tweet us, and we may send you a secret word!</p>

          <Button
            text="Got it"
            onClick={() =>
              window.location.assign("https://twitter.com/bidsloth")
            }
          />
        </div>
      ) : (
        <div className="delete-content">
          <h3>Welcome to bidsloth!</h3>
          <p>Psst! To sign up, you need to have a secret password.</p>

          <InputComponent
            label="Pop it in below!"
            placeholder="invite code"
            value={inviteCode}
            onChange={(e) => {
              setInviteCode(e.target.value);
              if (e.target.value.length > 2) setIsDisable(false);
            }}
          />
          <Button
            text="Continue"
            onClick={handleSubmit}
            isDisabled={isDisable}
            isLoading={isLoading}
          />
          <span onClick={() => setNoCode(true)}>I don’t have one!</span>
        </div>
      )}
    </DeleteStyled>
  );
};

export default function Register() {
  const router = useRouter();
  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const [showCode, setShowCode] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowCode(true);
    }, 1500);
  }, []);

  const handleSubmit = async () => {
    if (
      formData.username &&
      formData.email &&
      formData.password &&
      inviteCode
    ) {
      await action("/auth/register", { code: inviteCode, ...formData }, "post");
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

  // if request is success, redirect
  useEffect(() => {
    if (isSuccess) {
      // encrypt user data and store it in local storage
      const encryptedData = dataEncrypt(JSON.stringify(data?.data?.creator));
      localStorage.setItem("activeUser", encryptedData);
      localStorage.setItem("accessToken", data?.data?.token);

      router.push("/verify");
    }
  }, [isSuccess, data, router]);

  // if request is not successful
  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Couldn't sign you up", {
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
    <AuthLayout pageTitle="Register" hasBo>
      <RegisterStyle>
        <div className="auth-title">
          <h1>Sign up</h1>
          <p>You’ll be up and ready in 2 easy steps!</p>
        </div>
        <div className="form">
          <InputComponent
            id="username"
            name="username"
            type="text"
            placeholder="Pop in a username"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <InputComponent
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <InputComponent
            id="password"
            name="password"
            type="password"
            placeholder="Set a password"
            value={formData.password || ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            text="Continue"
            onClick={handleSubmit}
            isLoading={isLoading}
          />
          <p className="mt-10 text-center">
            By signing up, you agree to bidsloth’s{" "}
            <strong onClick={() => router.push("/policies/terms")}>
              {" "}
              Terms
            </strong>{" "}
            and
            <strong onClick={() => router.push("/policies/privacy")}>
              {" "}
              Privacy Policy.
            </strong>
          </p>
        </div>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span onClick={() => router.push("login")}>Login</span>
        </p>
      </RegisterStyle>
      <AnimatePresence>
        {showCode && (
          <InviteModal
            setShowInvite={setShowCode}
            inviteCode={inviteCode}
            setInviteCode={setInviteCode}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

const RegisterStyle = styled.div`
  position: relative;
  p {
    font-size: 14px;
  }

  strong {
    cursor: pointer;
  }

  .flag-svg {
    position: absolute;
    right: 10%;
    top: 10px;
    width: 55px;
  }

  .form p {
    font-size: 12px;
  }

  .shout-svg {
    position: absolute;
    left: -35px;
    width: 70px;
    height: auto;
    bottom: 16px;
  }

  .arrow-svg {
    position: absolute;
    right: -80px;
    width: 60px;
    height: auto;
    bottom: 50px;
  }

  .cta {
    margin-top: 1.6rem;
  }

  @media screen and (max-width: 600px) {
    .flag-svg {
      right: 7%;
      top: 0;
      width: 45px;
    }

    .shout-svg {
      left: -30px;
      width: 50px;
      bottom: 35px;
    }

    .arrow-svg {
      display: none;
    }
  }
`;

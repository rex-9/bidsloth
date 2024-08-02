import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Button from "../comps/button";
import InputComponent from "../comps/input";
import AuthLayout from "../hoc/authLayout";
import { toast } from "react-toastify";
import useApiHook from "../services/https/hook";

export default function ForgetPassword() {
  const router = useRouter();

  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleSubmit = async () => {
    if (email) {
      const formData = {
        email,
      };
      await action("/auth/request-password-reset", formData, "post");
    } else {
      toast("Email is required!", {
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

  // if request is success, display success
  useEffect(() => {
    if (isSuccess) {
      setLinkSent(true);
    }
  }, [isSuccess, data, router]);

  // if request is not successful
  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Couldn't change your password", {
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
    <AuthLayout pageTitle="forget password">
      {!linkSent ? (
        <ForgetStyle>
          <div className="auth-title">
            <h1>Oopsies...</h1>
            <p>Don’t worry it happens to the best of us!</p>
            <p>Just pop in the email you signed up with, and we’ll send you</p>
            <p>a top secret link to reset your password!</p>
          </div>
          <div className="form">
            <InputComponent
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              text="Send the link"
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </ForgetStyle>
      ) : (
        <>
          <div className="auth-title">
            <h1 className="flex">Phew!</h1>
            <p>We’ve emailed you the secret link to reset your password.</p>
            <p>If you don’t see it in a few minutes check your spam!</p>
          </div>

          <div className="loud">
            <p className="text-center font-thin">
              If you still need help,{" "}
              <span>
                {" "}
                <a href="https://twitter.com/bidsloth/">give us a shout!</a>
              </span>
            </p>
          </div>
        </>
      )}
    </AuthLayout>
  );
}

const ForgetStyle = styled.div`
  position: relative;
  padding-top: 2rem;
`;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import styled from "styled-components";

import { toast } from "react-toastify";
import useApiHook from "../services/https/hook";
import { dataEncrypt, dataDecrypt } from "../services/snippets/secureData";
import Button from "../comps/button";
import AuthLayout from "../hoc/authLayout";

export default function Register() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [creatorId, setCreatorId] = useState("");

  // fetch saved user details
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("activeUser");
      if (userData) {
        const decryptedData = JSON.parse(dataDecrypt(userData));
        setCreatorId(decryptedData?._id);
        if (decryptedData?.emailVerified) router.replace("/login");
      } else router.replace("/sign-up");
    }
  }, [router]);

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleSubmit = async () => {
    if (otp) {
      const formData = {
        creatorId,
        verificationCode: otp,
      };
      await action("/auth/verify-email", formData, "post");
    } else {
      toast("Wait! Pop in your pin!", {
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

  // handle resend code

  const handleResendCode = async () => {
    const data = {
      creatorId,
      isNewUser: true,
    };
    await action("/auth/request-email-verification", data, "post");
  };

  // if request is success, redirect
  useEffect(() => {
    if (isSuccess) {
      // encrypt user data and store it in local storage
      const encryptedData = dataEncrypt(JSON.stringify(data?.data?.creator));
      localStorage.setItem("activeUser", encryptedData);
      localStorage.setItem("accessToken", data?.data?.token);
      toast(`You're logged in as ${data?.data?.creator?.username}`, {
        position: "bottom-center",
        autoClose: 3400,
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
    <AuthLayout pageTitle="Register">
      <VerifyStyle>
        <div className="auth-title">
          <h1>Verify email</h1>
          <p>Sssshhh! We emailed you a 4 digit pin. Pop it in below! </p>
        </div>
        <div className="form">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            containerStyle="otp-input"
            inputStyle="otp"
            renderInput={(props) => <input {...props} />}
          />
          <p className="mt-10 text-left">Didn’t get a code?</p>
          <p className="mt-3 text-left">
            No worries, just <span onClick={handleResendCode}> click here</span>
            , we’ll send you a new one!
          </p>
          <p className="mt-10 text-left">
            Sloth alert! Code expires in 15 mins!
          </p>
          <Button
            text="Done"
            onClick={(e) => handleSubmit(e)}
            isLoading={isLoading}
          />
        </div>
      </VerifyStyle>
    </AuthLayout>
  );
}

const VerifyStyle = styled.div`
  position: relative;
  padding-top: 1.2rem;

  .cta {
    margin-top: 1.6rem;
  }

  .otp-input {
    width: 100%;
    justify-content: space-between;
    /* width: 90%; */
    margin: auto;
  }

  .otp {
    display: block;
    border: 2px solid var(--grey-color);
    border-radius: 5px;
    border-radius: 5px;
    width: 19% !important;
    height: 80px;
    background-color: #fff;
    padding: 0;
    text-indent: 0;
  }

  .form p {
    color: rgba(193, 193, 193, 1);
  }

  @media screen and (max-width: 600px) {
    .form p {
      color: inherit;
    }
  }
`;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { toast } from "react-toastify";
import useApiHook from "../services/https/hook";

import Button from "../comps/button";
import InputComponent from "../comps/input";
import AuthLayout from "../hoc/authLayout";
import isEmptyObj from "../services/snippets/emptyObject";

export default function Reset() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  // check if route has query params
  useEffect(() => {
    if (!isEmptyObj(router.query)) {
      if (!router?.query?.creatorId || !router?.query?.resetToken) {
        router.replace("/login");
      }
    }
  }, [router]);

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const handleSubmit = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const formData = {
          ...router.query,
          newPassword,
        };
        await action("/auth/reset-password", formData, "patch");
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

  // if request is success, redirect
  useEffect(() => {
    if (isSuccess) {
      setResetDone(true);
    }
  }, [isSuccess, data, router]);

  // if request is not successful
  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Couldn't change password", {
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
    <AuthLayout pageTitle="Reset">
      {!resetDone ? (
        <ResetStyle>
          <div className="auth-title">
            <h1 className="smaller">Operation new password!</h1>
            <p>Psst! Pop in a new password below!</p>
          </div>
          <div className="form">
            <InputComponent
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputComponent
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />

            <Button text="Reset" isLoading={isLoading} onClick={handleSubmit} />
          </div>
        </ResetStyle>
      ) : (
        <ResetStyle>
          <div className="auth-title">
            <h1 className="smaller">Operation complete!</h1>
            <p>Well done agent! You can now log back in!</p>
          </div>

          <div className="form">
            <Button text="Log in" onClick={() => router.push("/login")} />
          </div>
        </ResetStyle>
      )}
    </AuthLayout>
  );
}

const ResetStyle = styled.div`
  position: relative;
  padding-top: 2rem;
`;

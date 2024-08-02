import { useRouter } from "next/router";
import Button from "../comps/button";
import InputComponent from "../comps/input";
import AuthLayout from "../hoc/authLayout";
import useApiHook from "../services/https/hook";
import { dataEncrypt } from "../services/snippets/secureData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();

  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // submit form
  const handleLogin = async (event) => {
    if (formData.email && formData.password) {
      await action("/auth/login", formData, "post");
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

      // check if user is verified
      if (!data?.data?.creator?.emailVerified) {
        router.push("/verify");
      } else {
        // everything okay? push to dashboard
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

        window.location.replace(router.query?.return || "/dashboard");
        // router.push("/dashboard");
      }
    }
  }, [isSuccess, data, router]);

  // if request is not successful
  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Couldn't sign you in", {
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
    <AuthLayout pageTitle="login" hasBo>
      <div className="auth-title">
        <h1>Log in</h1>
        <p>Gog-eeee (That’s welcome back in Sloth!)</p>
      </div>
      <div className="form">
        <InputComponent
          placeholder="Enter your email address"
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <InputComponent
          placeholder="Enter your password"
          id="password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button
          text="Continue"
          onClick={(event) => handleLogin(event)}
          isLoading={isLoading}
        />
      </div>
      <p className="text-center mt-10">
        <span onClick={() => router.push("/forget-password")}>
          Oops! Forgotten your password?
        </span>
      </p>
      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <span onClick={() => router.push("/sign-up")}>Sign up </span>
      </p>
    </AuthLayout>
  );
}

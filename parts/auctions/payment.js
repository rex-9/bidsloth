import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import Button from "../../comps/button";
import useApiHook from "../../services/https/hook";
import useLogout from "../../services/snippets/logout";

const ConnectPayment = () => {
  // init api hook
  const [action, { isLoading, error, isSuccess, isError, data }] = useApiHook();
  const logout = useLogout;

  // connect stripe
  const handleConnect = async () => {
    const data = {
      refreshUrl:
        process.env.NEXT_PUBLIC_NODE_ENV === "development"
          ? "https://stg.bidsloth.com/auctions/create"
          : "https://bidsloth.com/auctions/create",
      returnUrl:
        process.env.NEXT_PUBLIC_NODE_ENV === "development"
          ? "https://stg.bidsloth.com/auctions/create"
          : "https://bidsloth.com/auctions/create",
    };
    await action("/stripe/onboard", data, "post");
  };

  useEffect(() => {
    if (isSuccess) {
      // if data is successful redirect to url in data response
      if (data.data) window.location.href = data.data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
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
        toast(error?.data?.message || "couldn't connect stripe", {
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
    <ConnectPaymentStyled>
      <p>
        Before you launch your auction, connect or create your Stripe account.
        Don’t worry it’s easy peasy to do. And thanks to Stripe payouts are
        instant!
      </p>
      <div className="btns">
        <Button
          text="Connect stripe!"
          className="!border-none"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10C21.1313 10 21.2614 9.97419 21.3827 9.92395C21.5041 9.8737 21.6143 9.80005 21.7072 9.70718C21.8 9.61432 21.8737 9.50406 21.9239 9.38272C21.9742 9.26138 22 9.13133 22 9V6C22.0001 5.79017 21.9341 5.58565 21.8114 5.41544C21.6887 5.24524 21.5155 5.11799 21.3164 5.05176L12.3164 2.05176C12.111 1.9834 11.889 1.9834 11.6836 2.05176L2.68359 5.05176C2.48449 5.11799 2.31131 5.24524 2.18861 5.41544C2.0659 5.58565 1.99991 5.79017 2 6V9C1.99997 9.13133 2.02581 9.26138 2.07605 9.38272C2.12629 9.50406 2.19995 9.61432 2.29282 9.70718C2.38568 9.80005 2.49594 9.8737 2.61728 9.92395C2.73862 9.97419 2.86867 10 3 10H4V17.1843C3.41674 17.3897 2.91137 17.7707 2.55327 18.2748C2.19517 18.779 2.0019 19.3816 2 20V22C1.99997 22.1313 2.02581 22.2614 2.07605 22.3827C2.12629 22.5041 2.19995 22.6143 2.29282 22.7072C2.38568 22.8 2.49594 22.8737 2.61728 22.9239C2.73862 22.9742 2.86867 23 3 23H21C21.1313 23 21.2614 22.9742 21.3827 22.9239C21.5041 22.8737 21.6143 22.8 21.7072 22.7072C21.8 22.6143 21.8737 22.5041 21.9239 22.3827C21.9742 22.2614 22 22.1313 22 22V20C21.9981 19.3816 21.8048 18.779 21.4467 18.2748C21.0886 17.7707 20.5833 17.3897 20 17.1843V10H21ZM20 21H4V20C4.00026 19.7349 4.10571 19.4807 4.29319 19.2932C4.48066 19.1057 4.73486 19.0003 5 19H19C19.2651 19.0003 19.5193 19.1057 19.7068 19.2932C19.8943 19.4807 19.9997 19.7349 20 20V21ZM6 17V10H8V17H6ZM10 17V10H14V17H10ZM16 17V10H18V17H16ZM4 8V6.7207L12 4.0537L20 6.7207V8H4Z"
                fill="white"
              />
            </svg>
          }
          isLoading={isLoading}
          onClick={handleConnect}
        />
      </div>
    </ConnectPaymentStyled>
  );
};

export default ConnectPayment;

const ConnectPaymentStyled = styled.section`
  width: 100%;
  margin: 0.9rem 0 2.5rem;

  p {
    font-size: 0.85rem;
    line-height: 1.5625rem;
  }
`;

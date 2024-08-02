import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import DashboardLayout from "../hoc/dashboardLayout";
import Button from "../comps/button";
import GridStyles from "../styles/gridStystem";
import { DashboardContext } from "../context/DashboardContext";
import isEmptyObj from "../services/snippets/emptyObject";

export default function History() {
  const router = useRouter();
  const [dashboardState] = useContext(DashboardContext);
  const { creatorData, draft } = dashboardState;
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isEmptyObj(draft) && creatorData?.auctions?.length) setShow(false);
  }, [creatorData, draft]);

  return (
    <DashboardLayout pageTitle="Payouts">
      <GridStyles>
        <div className="welcome">
          <div className="welcome-text">
            <h3>Nothing to see yet!</h3>

            <p className="intro">This is where you can check out past </p>
            <p className="intro">auctions you’ve held! So let’s make some </p>
            <p className="intro">HISTORY and start you first auction!</p>

            {show && (
              <>
                <Button
                  onClick={() => router.push("/auctions/create")}
                  text="Start my auction!"
                />
                <p className="note">It’s super duper easy & free!</p>
              </>
            )}
          </div>
          <div className="welcome-img sm-wd">
            <Image
              src="/nothing-to-see-here-image.png"
              width="365"
              height="400"
              alt="welcome from bo"
            />
          </div>
        </div>
      </GridStyles>
    </DashboardLayout>
  );
}

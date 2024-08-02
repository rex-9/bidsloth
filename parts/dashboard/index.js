import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "../../comps/button";
import DashboardLayout from "../../hoc/dashboardLayout";
import WelcomeNotes from "../../svgs/welcome";
import GridStyles from "../../styles/gridStystem";
import AvatarFloat from "../../comps/avatarFloat";
import UploadAvatar from "../../comps/uploadAvatar";
import { AnimatePresence } from "framer-motion";
import { DashboardContext } from "../../context/DashboardContext";
import ZinkFloat from "../../comps/zinkFloat";

export default function Home() {
  const router = useRouter();
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [dashboardState] = useContext(DashboardContext);

  useEffect(() => {
    // console.log(dashboardState.creatorData.avatar);
    if (!dashboardState.creatorData.avatar) {
      setShowFloat(true);
    } else {
      setShowFloat(false);
    }
  }, [dashboardState]);

  return (
    <DashboardLayout pageTitle="Dashboard">
      <GridStyles>
        <div className="welcome">
          <div className="welcome-text">
            <h3>Wo-eeee to bidsloth!</h3>

            <p className="intro">
              <strong>(That’s welcome in sloth!) </strong>
            </p>
            <p className="intro">Let’s Go! Auction anything! And start a fan</p>
            <p className="intro">bidding frenzy!</p>

            <Button
              onClick={() => router.push("/auctions/create")}
              text="Start my auction!"
              className="!border-none"
            />
            <p className="note">It’s super duper easy & free!</p>
          </div>
          <div className="welcome-img">
            <Image
              src="/welcome-image-flipped.png"
              width="365"
              height="400"
              alt="welcome from bo"
            />
          </div>
        </div>
        {showFloat && (
          <AvatarFloat openAction={() => setShowAvatarUpload(true)} />
        )}
        <WelcomeNotes className="welcome-notes" />
      </GridStyles>
      <ZinkFloat />
      <AnimatePresence>
        {showAvatarUpload && (
          <UploadAvatar
            userId={dashboardState.creatorData._id}
            closeAction={() => setShowAvatarUpload(false)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

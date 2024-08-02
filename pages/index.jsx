import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../comps/button";
import MenuIcon from "./../svgs/menuIcon";
import Link from "next/link";
import styled from "styled-components";
import processes from "../services/data/payprocess";

const animateCards = {
  initial: {
    y: 40,
  },
  hover: {
    y: -10,
    transition: {
      duration: 1.9,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },

  inView: {
    y: 0,
    transition: {
      duration: 10,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      className="h-[56px] w-auto"
      height={100}
      width={100}
      src="/red-bo.png"
      alt="bidsloth"
    />
    <Image
      className="h-[16px] w-auto"
      height={100}
      width={100}
      src="/trademark.png"
      alt="bidsloth"
    />
  </div>
);

const SelectRole = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const visitSections = (value) => {
    setShowDropDown(!showDropDown);
    // Get the element with the corresponding id (assumes each section has a unique id)
    const selectedSection = document.getElementById(value);

    // Scroll the element into view
    if (selectedSection) {
      selectedSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <HomeDropDownStyle>
      <button className="label" onClick={() => setShowDropDown(!showDropDown)}>
        <p className="!font-normal !text-base">For creators</p>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 0.789628L4 3.71094L1 0.789628"
            stroke="black"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <AnimatePresence>
        {showDropDown && (
          <motion.div
            className="drop-list"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p onClick={() => visitSections("about")}>About bidsloth</p>
            <p onClick={() => visitSections("how")}>How it works</p>
            <p onClick={() => visitSections("free")}>Getting paid</p>
            {/* <p onClick={() => visitSections("sloths")}>Meet the team</p> */}
          </motion.div>
        )}
      </AnimatePresence>
    </HomeDropDownStyle>
  );
};

const HomeDropDownStyle = styled.div`
  width: 115px;
  position: relative;
  .label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-weight: 500;
    }
  }

  .drop-list {
    width: 100%;
    position: absolute;
    background: #fff;
    z-index: 20;
    /* border: 1px solid #c1c1c1; */
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);

    p {
      font-size: 0.83rem;
      padding: 5px 4px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: var(--white-color);
      }
    }
  }
`;

const LoginBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/login")}
      className="!bg-white !text-black !w-20 !my-0 focus:!border-none !font-normal !text-base"
      text="Log in"
    />
  );
};

const StartAuctionBtn = ({ signup }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/sign-up")}
      className="px-4 py-4 !w-fit !h-fit !my-0 min-w-[150px]"
      text={signup ? "Sign up" : "Start My Auction"}
    />
  );
};

const LearnMoreBtn = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/sign-up")}
      className="px-4 py-4 !w-fit !h-fit !my-0 min-w-[150px]"
      text={"Click here to learn more"}
    />
  );
};

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed bg-white top-0 z-10 hidden pb-3 sm:flex justify-around items-center w-full">
        <div className="w-72">
          <SelectRole />
        </div>
        <Logo />
        <div className="flex justify-center items-center gap-10">
          <LoginBtn />
          <StartAuctionBtn signup />
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed bg-white pb-4 top-0 z-10 sm:hidden flex justify-between items-center px-8 w-full">
        <span className="w-11 h-4" />
        <Logo />
        <button onClick={() => setToggleMenu(true)}>
          {MenuIcon("36px", "36px", "#E91367")}
        </button>
      </nav>

      {/* {toggleMenu && ( */}
      <nav
        className={`transition-all duration-[0.3s] top-0 fixed z-20 p-8 flex sm:hidden flex-col items-start gap-4 h-screen w-[80vw] bg-white border-l-2 border-gray-200 ${
          toggleMenu ? "right-0" : "-right-[100vw]"
        }`}
      >
        <button
          className="absolute right-9 top-8"
          onClick={() => setToggleMenu(false)}
        >
          <Image
            width={100}
            height={100}
            src="/close.png"
            className="h-8 w-auto"
            alt="close"
          />
        </button>
        <LoginBtn />
        <StartAuctionBtn signup />
        <Link
          className="block py-3 hover:bg-gray-200 px-4 rounded-lg"
          onClick={() => setToggleMenu(false)}
          href="#creator"
        >
          For creators
        </Link>
        <Link
          className="block py-3 hover:bg-gray-200 px-4 rounded-lg"
          onClick={() => setToggleMenu(false)}
          href="#about"
        >
          About bidsloth
        </Link>
        <Link
          className="block py-3 hover:bg-gray-200 px-4 rounded-lg"
          onClick={() => setToggleMenu(false)}
          href="#how"
        >
          How it works
        </Link>
        <Link
          className="block py-3 hover:bg-gray-200 px-4 rounded-lg"
          onClick={() => setToggleMenu(false)}
          href="#free"
        >
          Getting paid
        </Link>
        {/* <Link
          className="block py-3 hover:bg-gray-200 px-4 rounded-lg"
          onClick={() => setToggleMenu(false)}
          href="#sloths"
        >
          Meet the team
        </Link> */}
      </nav>
      {/* )} */}
    </>
  );
};

const Video = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  const vidRef = useRef(null);

  // useEffect(() => {
  //   if (vidRef) {
  //     vidRef.current.play();
  //   }
  // }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const replay = () => {
    setVideoEnded(false);
    setIsMuted(false);
    vidRef.current.play();
  };

  return (
    <section
      id="creator"
      className="relative w-full md:w-[65%] pt-24 md:pt-23 px-8 border-none"
    >
      <video
        muted={isMuted}
        onEnded={handleVideoEnd}
        playsInline
        preLoad="auto"
        ref={vidRef}
        autoPlay
        defaultMuted
      >
        <source
          src="https://res.cloudinary.com/dfmz4mxod/video/upload/v1689677466/mvp/what-is-bidsloth_webm.webm"
          type="video/webm"
        />
        <source
          src="https://res.cloudinary.com/dfmz4mxod/video/upload/v1689512127/mvp/what-is-bidsloth.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/dfmz4mxod/video/upload/v1689677526/mvp/what-is-bidsloth_ogv.ogv"
          type="video/ogg"
        />
      </video>

      {videoEnded && (
        <button
          onClick={replay}
          className="absolute top-[50%] left-[50%] focus:border-none"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Image
            height={130}
            width={130}
            // className="sm:h-[150px] lg:h-[200px] xl:h-[250px] w-auto h-[80px]"
            src="/play.png"
            alt="replay"
          />
        </button>
      )}
      <button
        className="absolute bottom-[40%] sm:bottom-[25%] sm:left-[7%] focus:border-none"
        onClick={toggleMute}
      >
        {!isMuted ? (
          <Image
            height={100}
            width={100}
            src="/sound-on.png"
            className="h-[20px] w-auto sm:h-[40px]"
            alt="turn on sound"
          />
        ) : (
          <Image
            height={100}
            width={100}
            src="/sound-off.png"
            className="h-[20px] w-auto sm:h-[40px]"
            alt="turn off sound"
          />
        )}
      </button>
      <div className="flex justify-center mt-8">
        <StartAuctionBtn />
      </div>
    </section>
  );
};

const AuctionArticle = ({ image, title, contents }) => (
  <motion.article
    variants={animateCards}
    initial="initial"
    whileHover="hover"
    whileInView="inView"
    className="w-fit lg:w-[490px] flex justify-center items-center flex-col px-4 mb-2"
  >
    <Image
      width={10000}
      height={10000}
      src={image}
      className="w-[444px] h-auto object-cover"
      alt={title}
    />
    <h2 className="text-xl py-6 text-left md:text-center self-start md:self-auto px-4 md:px-0">
      {title}
    </h2>
    <p className="leading-10 text-left md:text-center self-start md:self-auto px-4 md:px-0">
      {contents.map((content) => (
        <>
          <span className="md:mr-0 mr-1.5">{content}</span>
          <br className="md:block hidden" />
        </>
      ))}
    </p>
  </motion.article>
);

const Auction = () => {
  return (
    <section id="about" className="text-center pt-20">
      <motion.h1
        className="text-3xl mx-6"
        variants={animateCards}
        initial="initial"
        // whileHover="hover"
        whileInView="inView"
      >
        Auction anything <span className="text-primary">fan</span>tastic
      </motion.h1>
      <motion.p className="pt-6 mx-6">
        bidsloth is the only free to use tool made just for creators to easily
        auction anything for their fans.
      </motion.p>

      {/* Desktop Articles */}
      <div className="hidden sm:flex justify-center items-center flex-wrap gap-8 mt-12">
        <AuctionArticle
          image={"/excite-your-fans.png"}
          title={"Excite your fans"}
          contents={[
            "Thrill and engage your fans like never before",
            "with the fun, exclusivity and competition auctions bring!",
          ]}
        />
        <AuctionArticle
          image={"/claim-your-worth.png"}
          title={"Claim your worth"}
          contents={[
            "Cash in big! Your creations and items are gold to fans.",
            "A bidding war will get you the value & cash you deserve!",
          ]}
        />
        <AuctionArticle
          image={"/for-any-creator.png"}
          title={"For any creator"}
          contents={[
            "bidsloth is made for all creators. Do you create for fans",
            "on the web? Yes? Well, we desgined bidsloth just for you! ",
          ]}
        />
        <AuctionArticle
          image={"/auction-your-treasure.png"}
          title={"Auction your treasure"}
          contents={[
            "Auction the special things that don’t belong in a shop.",
            "Things your fans will love. Anything at all. Get creative!",
          ]}
        />
      </div>

      {/* Mobile Articles */}
      <div className="sm:hidden flex justify-center items-center flex-wrap gap-8 mt-12">
        <AuctionArticle
          image={"/excite-your-fans.png"}
          title={"Excite your fans"}
          contents={[
            "Thrill and engage your fans",
            "like never before with",
            "the fun, exclusivity and",
            "competition auctions bring!",
          ]}
        />
        <AuctionArticle
          image={"/claim-your-worth.png"}
          title={"Claim your worth"}
          contents={[
            "Cash in big! Your creations",
            "and items are gold to fans.",
            "A bidding war will get you",
            "the value & cash you deserve!",
          ]}
        />
        <AuctionArticle
          image={"/for-any-creator.png"}
          title={"For any creator"}
          contents={[
            "bidsloth is made for all",
            "creators Do you create for",
            "fans on the web? Yes? Well, we",
            "designed bidsloth just for you! ",
          ]}
        />
        <AuctionArticle
          image={"/auction-your-treasure.png"}
          title={"Auction your treasure"}
          contents={[
            "Auction the special things",
            "that don’t belong in a shop.",
            "Things your fans will love.",
            "Anything at all. Get creative!",
          ]}
        />
      </div>
    </section>
  );
};

const HowArticle = ({ image, title, contents }) => (
  <motion.article
    variants={animateCards}
    initial="initial"
    whileHover="hover"
    whileInView="inView"
    className=" lg:w-[400px] w-[320px] flex justify-center items-center flex-col md:px-4 md:mb-4"
  >
    <Image
      width={200}
      height={200}
      src={image}
      className="w-[444px] h-[290px] object-contain"
      alt={title}
    />
    {/* <h2 className="text-xl md:py-6 ">{title}</h2>
    <p className="leading-10  px-4 md:px-0">
      {contents.map((content) => (
        <>
          <span className="md:mr-0 mr-1.5">{content}</span>
          <br className="md:block hidden" />
        </>
      ))}
    </p> */}

    <h2 className="text-xl md:py-6 text-left md:text-center self-start md:self-auto px-4 md:px-0">
      {title}
    </h2>
    <p className="leading-10 text-left md:text-center self-start md:self-auto px-4 md:px-0">
      {contents.map((content) => (
        <>
          <span className="md:mr-0 mr-1.5">{content}</span>
          <br className="md:block hidden" />
        </>
      ))}
    </p>
  </motion.article>
);

const How = () => {
  return (
    <section id="how" className="text-center pt-20">
      <motion.h1
        variants={animateCards}
        initial="initial"
        // whileHover="hover"
        whileInView="inView"
        className="text-3xl mx-6"
      >
        How Bidsloth works
      </motion.h1>
      <motion.p
        variants={animateCards}
        initial="initial"
        // whileHover="hover"
        whileInView="inView"
        className="pt-6 mx-6"
      >
        It&apos;s as easy as 1, 2, 3.
      </motion.p>
      <div className="w-[100vw] mt-12 flex justify-center items-center flex-col">
        {/* Desktop How Article */}
        <div className="px-2 hidden sm:flex justify-around items-center flex-wrap">
          <HowArticle
            image={"/create.png"}
            title={"Create"}
            contents={[
              "Create your auction in a few steps.",
              "Set start price, times, location and more.",
            ]}
          />
          <HowArticle
            image={"/share.png"}
            title={"Share"}
            contents={[
              "Share your bidsloth with fans anywhere,",
              "and watch the bidding frenzy.",
            ]}
          />
          <HowArticle
            image={"/deliver.png"}
            title={"Deliver"}
            contents={[
              "The winner is crowned. Deliver the prize",
              "and get paid after confirmation.",
            ]}
          />
        </div>

        {/* Mobile How Article */}
        <div className="how-wrapper sm:hidden">
          <div className="px-2 sm:hidden mobile-how">
            <HowArticle
              image={"/create.png"}
              title={"Create"}
              contents={[
                "Create your auction in",
                "a few steps. Set start price,",
                "times, location and more.",
              ]}
            />
            <HowArticle
              image={"/share.png"}
              title={"Share"}
              contents={[
                "Share your bidsloth with",
                "fans anywhere, and",
                "watch the bidding frenzy.",
              ]}
            />
            <HowArticle
              image={"/deliver.png"}
              title={"Deliver"}
              contents={[
                "The winner is crowned.",
                "Deliver the prize and",
                "get paid after confirmation.",
              ]}
            />
          </div>
        </div>

        {/* Desktop Article */}
        <div className="w-full mt-12 hidden sm:flex justify-center items-center flex-wrap gap-8">
          <AuctionArticle
            image={"/all-you-need.png"}
            title={"All you need"}
            contents={[
              "Track your auction, reply to comments effortlessly,",
              "connect with the winner on your terms, and even more features.",
            ]}
          />
          <AuctionArticle
            image={"/easy-for-fans.png"}
            title={"Easy for fans"}
            contents={[
              "Fans can bid and leave a comment in just a few clicks.",
              "They don’t have to sign up & we keep them in the loop by mail.",
            ]}
          />
        </div>

        {/* Mobile Article */}
        <div className="w-full mt-12 sm:hidden flex justify-center items-center flex-wrap gap-8">
          <AuctionArticle
            image={"/all-you-need.png"}
            title={"All you need"}
            contents={[
              "Track your auction, reply to",
              "comments effortlessly,",
              "connect with the winner on your",
              "terms, and even more features.",
            ]}
          />
          <AuctionArticle
            image={"/easy-for-fans.png"}
            title={"Easy for fans"}
            contents={[
              "Fans can bid and leave a",
              "comment in just a few clicks.",
              "They don’t have to sign up & we",
              "keep them in the loop by mail.",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const Free = () => {
  return (
    <section id="free" className="text-center px-2 pt-20">
      <motion.h1
        variants={animateCards}
        initial="initial"
        // whileHover="hover"
        whileInView="inView"
        className="text-3xl"
      >
        Launch for free
      </motion.h1>
      <motion.p
        variants={animateCards}
        initial="initial"
        // whileHover="hover"
        whileInView="inView"
        className="py-6"
      >
        Creating and launching your auction is completely free.
      </motion.p>
      <div className="flex justify-center items-center flex-wrap gap-16">
        <Image
          height={10000}
          width={10000}
          src="/launch-for-free.png"
          className="h-auto w-[444px]"
          alt="Launch for free"
        />
        <div className="text-left sm:text-start px-4 md:px-0">
          <motion.h1
            variants={animateCards}
            initial="initial"
            // whileHover="hover"
            whileInView="inView"
            className="text-xl"
          >
            Keep it simple
          </motion.h1>

          {/* Desktop Paragraph */}
          <p className="leading-10 hidden sm:block">
            No hidden costs on bidsloth. We keep 10% <br />
            of the auction price and a small stripe fee (~3%).
          </p>

          {/* Mobile Paragraph */}
          <p className="leading-10 sm:hidden block">
            No hidden costs on bidsloth. We keep 10% of the auction price and a
            small stripe fee (~3%).
          </p>

          {/* <br />
          <motion.h1
            variants={animateCards}
            initial="initial"
            // whileHover="hover"
            whileInView="inView"
            className="text-xl"
          >
            How payments work
          </motion.h1> */}

          {/* Desktop Paragraph */}
          {/* <p className="leading-10 hidden sm:block">
            Winner has 48 hours to pay.
            <br /> If they don&apos;t, we go to the 2nd place.
            <br /> Get paid instantly when the winner receives it.
          </p> */}

          {/* Mobile Paragraph */}
          {/* <p className="leading-10 sm:hidden block">
            Winner has 48 hours to pay. If they don&apos;t, we go to the 2nd
            place. Get paid instantly when the winner receives it.
          </p> */}
        </div>
      </div>
    </section>
  );
};

const Charity = () => {
  return (
    <section id="charity" className="text-center hidden lg:block px-2 pt-20">
      <motion.h1
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="text-3xl"
      >
        Do you know a charity organization that is about <br />
        making the world a<span className="text-primary"> better place?</span>
      </motion.h1>
      <motion.p
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="py-6"
      >
        Register your charity organization on bidsloth and be a benefactor of a
        share of <br />
        proceeds from bids from generous creators who share in your vision
      </motion.p>
      <div className="flex flex-col justify-center py-16 items-center gap-y-16">
        <Image
          height={10000}
          width={10000}
          src="/charity-bo.png"
          className="h-auto w-[444px]"
          alt="Launch for free"
        />
        <LearnMoreBtn />
      </div>
    </section>
  );
};

const PaymentProcess = ({ id, value }) => {
  const parts = value.split("INSTANTLY");

  return (
    <div className="flex items-center gap-5">
      <motion.div
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="bg-primary rounded-full w-[50px] flex items-center justify-center h-[50px]"
      >
        <p className="text-3xl text-white font-bold">{id}</p>
      </motion.div>

      <motion.div
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="px-2.5 flex items-center bg-[#FFD8E74D] h-[55px] flex-1 border border-primary rounded-[10px]"
      >
        <p className="text-primary text-left text-base">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <span className="font-bold">INSTANTLY</span>
              )}
            </span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};

const Payment = () => {
  return (
    <section id="Payment" className="text-center px-2 pt-20">
      <motion.h1
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="text-3xl"
      >
        How your payment works for{" "}
        <span className="text-primary"> winners</span>
      </motion.h1>
      <div className="flex flex-col lg:flex-row justify-center py-16 items-center gap-16">
        <Image
          height={10000}
          width={10000}
          src="/charity.png"
          className="h-auto w-[200px] lg:w-[444px]"
          alt="Launch for free"
        />
        <div className="text-start px-4 md:px-0">
          <motion.h1
            variants={animateCards}
            initial="initial"
            // whileHover="hover"
            whileInView="inView"
            className="text-base lg:text-3xl text-semibold"
          >
            Escrow-style payments powered by
            <span className="text-primary"> Stripe</span>
          </motion.h1>

          <p className="leading-[40px] text-[15px] mt-4">
            Your winning auction is safeguarded. Stripe securely hold the funds
            until you, the winner, confirm receipt of your prize. This
            guarantees that your prize is delivered both safely and promptly.
            Winners have 48 hours to pay before we go to the second place
            winner.
          </p>
        </div>
      </div>
      <motion.h1
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="text-3xl pt-12"
      >
        How your payment works for{" "}
        <span className="text-primary"> creators</span>
      </motion.h1>
      <div className="flex flex-col lg:flex-row justify-center py-16 items-center gap-16">
        <div className="text-start px-4 md:px-0">
          <motion.h1
            variants={animateCards}
            initial="initial"
            // whileHover="hover"
            whileInView="inView"
            className="text-base lg:text-3xl text-semibold"
          >
            Instant payouts upon confirmation through
            <span className="text-primary"> Stripe</span>
          </motion.h1>

          <p className="leading-[40px] text-[15px] mt-4">
            Getting paid is easy! Once the winner confirms receipt of their
            prize, payment is processed instantly through Stripe. No extra
            delays, no hassle—just prompt payouts for your hard work.
          </p>
          {/* <div className="text-left sm:text-start px-4 md:px-0">
          <div className="flex flex-col gap-3.5">
            {processes.map((step) => (
              <PaymentProcess key={step.id} id={step.id} value={step.value} />
            ))}
          </div>
        </div> */}
        </div>
        <Image
          height={10000}
          width={10000}
          src="/bidding-image.png"
          className="h-auto w-[200px] lg:w-[444px]"
          alt="Launch for free"
        />
      </div>
    </section>
  );
};

const BoFeatures = ({ feature }) => {
  return (
    <motion.div
      variants={animateCards}
      initial="initial"
      whileInView="inView"
      className="text-primary border border-primary rounded-[30px] text-xs sm:text-[15px] font-medium px-8 py-3"
    >
      <p>{feature}</p>
    </motion.div>
  );
};

const AIAssistant = () => {
  return (
    <section id="ai-assistant" className="text-center px-2 pt-20">
      <motion.h1
        variants={animateCards}
        initial="initial"
        whileInView="inView"
        className="text-3xl"
      >
        Meet our AI assistant
      </motion.h1>
      <div className="flex flex-col-reverse lg:flex-row justify-center py-16 items-center gap-y-10">
        <div className="text-left space-y-10 lg:text-start px-4">
          <motion.h1
            variants={animateCards}
            initial="initial"
            whileInView="inView"
            className="text-base lg:text-3xl font-semibold"
          >
            Hello there! I am <span className="text-primary">Professor Bo</span>{" "}
            and I am your personal auction assistant.
          </motion.h1>

          <motion.h1
            variants={animateCards}
            initial="initial"
            whileInView="inView"
            className="text-base lg:text-3xl font-semibold"
          >
            Are you stuck on what to auction? Then, let me work my magic to help
            you.
          </motion.h1>
        </div>
        <Image
          height={10000}
          width={10000}
          src="/assistant.png"
          className="h-auto w-[200px] lg:w-[450px]"
          alt="Launch for free"
        />
      </div>

      <div className="flex flex-col justify-center  lg:py-16 items-center gap-y-8 gap-x-16">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            "Chat with Bo",
            "Answer a few simple questions",
            "Receive personalized auction suggestions in seconds",
          ].map((feat, e) => (
            <BoFeatures key={e} feature={feat} />
          ))}
        </div>

        <Image
          height={10000}
          width={10000}
          src="/bochat.png"
          className="h-auto hidden lg:block w-[753px]"
          alt="Launch for free"
        />
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <motion.div
      variants={animateCards}
      initial="initial"
      // whileHover="hover"
      whileInView="inView"
      className="text-center w-[80%] my-8"
    >
      <h1 className="text-3xl">Don&apos;t be a sloth! Start your auction!</h1>
      <div className="flex justify-center py-8">
        <StartAuctionBtn />
      </div>
      <p>
        If you have any questions just send us an email - hello@bidsloth.com
      </p>
    </motion.div>
  );
};

const FooterTrademark = () => (
  <div className="flex justify-center items-center gap-2">
    <Image
      height={100}
      width={100}
      className="h-[20px] w-auto"
      src="/heart.png"
      alt="heart"
    />
    <Image
      height={100}
      width={100}
      className="h-[20px] w-auto"
      src="/white-trademark.png"
      alt="white trademark"
    />
  </div>
);

const Footer = () => {
  const router = useRouter();
  return (
    <>
      {/* Desktop Footer */}
      <nav className="hidden sm:flex justify-around items-center py-8 w-[100vw] bg-primary text-white mt-14">
        <div className="flex items-center gap-8">
          <Button
            onClick={() => router.push("/policies/terms")}
            className="!mt-0 !w-24"
            text="Terms"
          />
          <Button
            onClick={() => router.push("/policies/privacy")}
            className="!mt-0 !w-24"
            text="Privacy"
          />
        </div>

        <div className="flex justify-center items-center flex-col leading-10 pt-4">
          <FooterTrademark />
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
        <div className="flex justify-center items-center gap-12">
          <Link href="https://twitter.com/bidsloth" target="blank">
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/twitter.png"
              alt="twitter"
            />
          </Link>
          <Link href="https://www.instagram.com/bidsloth/" target="blank">
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/insta.png"
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/company/bidsloth/"
            target="blank"
          >
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/linkedin.png"
              alt="linkedin"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Footer */}
      <nav className="sm:hidden flex flex-col justify-around items-center gap-8 py-8 w-full bg-primary text-white mt-14">
        <div className="flex items-center gap-8">
          <Button
            onClick={() => router.push("/policies/terms")}
            className="!mt-0 !w-24 !h-auto"
            text="Terms"
          />
          <Button
            onClick={() => router.push("/policies/privacy")}
            className="!mt-0 !w-24 !h-auto"
            text="Privacy"
          />
        </div>
        <div className="flex justify-center items-center gap-12">
          <Link href="https://twitter.com/bidsloth" target="blank">
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/twitter.png"
              alt="twitter"
            />
          </Link>
          <Link href="https://www.instagram.com/bidsloth/" target="blank">
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/insta.png"
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/company/bidsloth/"
            target="blank"
          >
            <Image
              height={100}
              width={100}
              className="h-[20px] w-auto"
              src="/linkedin.png"
              alt="linkedin"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center flex-col leading-10">
          <FooterTrademark />
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </nav>
    </>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>bidsloth - Auction anything fantastic</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/icon.png" /> */}
      </Head>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center flex-col lg:max-w-[80%]">
          <Nav />
          <Video />
          <Auction />
          <How />
          <Free />
          <Payment />
          <AIAssistant />
          <Charity />
          <CallToAction />
          <Footer />
        </div>
      </div>
    </>
  );
}

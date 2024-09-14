import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiMail, FiMapPin } from "react-icons/fi";
import { SiTiktok, SiTwitter } from "react-icons/si";
import useUserInfo from "../../../../hooks/useUserInfo";
import BannerChart from "./chart/bannerChart";
import CategoryChart from "./chart/categoryChart";

export const RevealBento = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className="min-h-screen px-4 py-4 text-black">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        {/* Truyền userInfo vào HeaderBlock */}
        <HeaderBlock userInfo={userInfo} />
        <SocialsBlock />
        <LocationBlock userInfo={userInfo} />
        <EmailListBlock userInfo={userInfo} />
      </motion.div>
    </div>
  );
};

export const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700  p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = ({ userInfo }) => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src={userInfo?.profile_image}
      alt="Profile"
      className="w-16 h-16 rounded-full cursor-pointer"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight text-gray-700">
      {userInfo?.first_name} {userInfo?.last_name}
      <br />
      <span className="text-gray-500 text-lg">@{userInfo?.username}</span>
    </h1>
    <p className="text-zinc-700">{userInfo?.about || "No bio available"}</p>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
    >
      <BannerChart />
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <CategoryChart />
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <a
        href="/"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiTiktok />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="/"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTwitter />
      </a>
    </Block>
  </>
);

const LocationBlock = ({ userInfo }) => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">
      {" "}
      {userInfo?.location || "No location available"}
    </p>
  </Block>
);

const EmailListBlock = ({ userInfo }) => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder={userInfo?.email}
        className="w-full rounded border border-zinc-700  px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      {userInfo?.email && (
        <a
          href={`mailto:${userInfo.email}`}
          className="flex items-center gap-2 whitespace-nowrap rounded bg-custom-red px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          <FiMail /> Liên hệ
        </a>
      )}
    </form>
  </Block>
);

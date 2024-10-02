import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserProvider";

const Ads_Input = () => {
  const { userInfo } = useUser();

  if (userInfo) {
    return null;
  }

  return (
    <section>
      <Card />
    </section>
  );
};

const Card = () => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-main-blue2 p-8"
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
          New
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-24 font-black leading-[1.2]"
        >
          Đăng ký tài khoản <br />
          ngay!!!{" "}
        </motion.span>
        <p>Để có thể trải nghiệm toàn bộ các chức năng</p>
      </div>
      <Link
        to="/register"
        className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white-blue1 bg-main-blue1 py-2 text-center font-mono font-black uppercase text-white backdrop-blur transition-colors hover:bg-white/30 hover:text-white"
      >
        Đăng Ký{" "}
      </Link>
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#0b2346"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#0b2346"
      />
    </motion.svg>
  );
};

export default Ads_Input;

import { useNavigate, Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";
import useUserInfo from "../../../hooks/useUserInfo";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  const handleClick = () => {
    navigate("/create_blog");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!userInfo ? (
        <Link
          to="/login"
          className="flex items-center px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all"
        >
          <FaExclamationTriangle className="mr-2" />
          <span>Login/Register to create blog</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className="bg-zinc-500 text-white px-8 py-4 rounded hover:opacity-90 transition-opacity"
        >
          <IoIosCreate className="font-bold" />
        </button>
      )}
    </div>
  );
};

export default CreateBlog;

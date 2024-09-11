import { useNavigate } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";

const PopupCreate = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create_product");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!userInfo ? (
        <Link
          to="/login"
          className="flex items-center px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all"
        >
          <FaExclamationTriangle className="mr-2" />
          <span>Login/Register to create product!</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className="bg-zinc-500 text-white px-8 py-4 rounded hover:opacity-90 transition-opacity"
        >
          <MdOutlineCreateNewFolder className="font-bold" />
        </button>
      )}
    </div>
  );
};

export default PopupCreate;

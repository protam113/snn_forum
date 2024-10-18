import { FaRegSadCry } from "react-icons/fa";

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 mb-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
      </div>
      <div className="flex items-center mt-4 text-gray-600">
        <FaRegSadCry className="mr-2 text-2xl" />
        <p className="text-lg">Không có bài viết nào để hiển thị.</p>
      </div>
    </div>
  );
};

export default NoPosts;

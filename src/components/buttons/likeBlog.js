import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import useBlog from "../../hooks/useBlog";
import Loading from "../../pages/error/load";

const LikePost = ({ blogId, liked }) => {
  const { handleLike } = useBlog();
  const [localLiked, setLocalLiked] = useState(liked);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    setLocalLoading(true);
    setLocalError(null);

    try {
      // Gọi hàm handleLike với trạng thái hiện tại
      await handleLike(blogId, localLiked);
      setLocalLiked((prev) => !prev); // Đảo ngược trạng thái liked
    } catch (err) {
      setLocalError("Error handling like/unlike");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleLikeClick}>
      {localLoading ? (
        <div className="text-gray-500 text-2xl">
          <Loading />
        </div>
      ) : localError ? (
        <div className="text-red-500 text-2xl">{localError}</div>
      ) : (
        <FaHeart
          className={`text-2xl ${
            localLiked ? "text-red-500" : "text-gray-500"
          }`}
        />
      )}
    </div>
  );
};

export default LikePost;

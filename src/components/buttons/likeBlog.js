import React, { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { useLikeBlog } from "../../hooks/Blog/useBlogs";
import Loading from "../../pages/error/load";

const LikePost = ({ blogId, liked }) => {
  const { mutate: addLikeBlogMutation } = useLikeBlog(); // Ensure you call the hook correctly

  const [localLiked, setLocalLiked] = useState(liked);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    setLocalLoading(true);
    setLocalError(null);

    try {
      // Make sure to pass the parameters as an object if that's how useLikeBlog expects it
      await addLikeBlogMutation({ blogId, isLiked: localLiked });
      setLocalLiked((prev) => !prev);
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
        <FaFireAlt
          className={`text-2xl ${
            localLiked ? "text-red-500" : "text-gray-500"
          }`}
        />
      )}
    </div>
  );
};

export default LikePost;

// Follow.js
import React, { useState } from "react";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { useFollowUser } from "../../hooks/Follow/useFollow";
import Loading from "../../pages/error/load";

const Follow = ({ personId, is_followed }) => {
  const { mutate: followUserMutation } = useFollowUser();
  const [isFollowing, setIsFollowing] = useState(is_followed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFollowClick = async () => {
    setLoading(true);
    setError(null);

    try {
      await followUserMutation({ personId, isFollowing });
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi theo dõi người dùng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={handleFollowClick} className="flex items-center">
        {loading ? (
          <Loading />
        ) : isFollowing ? (
          <SlUserFollowing className="text-red-500" />
        ) : (
          <SlUserFollow className="text-gray-500" />
        )}
        <span>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</span>
      </button>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default Follow;

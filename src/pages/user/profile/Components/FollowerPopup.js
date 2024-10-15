import React from "react";
import { useFollowerList } from "../../../../hooks/Follow/useFollow";
import { useNavigate } from "react-router-dom";

const FollowerPopup = ({ onClose }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useFollowerList();
  const navigate = useNavigate();

  // Load more followers when scrolling to the end
  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  const handleUserClick = (personId) => {
    navigate(`/profile/${personId}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-2">Danh sách người theo dõi</h2>

        {isLoading && <p>Đang tải...</p>}
        {isError && <p>Lỗi khi tải danh sách người theo dõi.</p>}

        <div className="h-64 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {data?.pages.map((page) =>
              page.Follower.map((follower) => (
                <li
                  key={follower.id}
                  className="flex items-center py-2"
                  onClick={() => handleUserClick(follower.id)}
                >
                  <img
                    src={follower.profile_image}
                    alt={follower.username}
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <span>{follower.username}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {hasNextPage && (
          <button
            onClick={loadMore}
            className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded"
          >
            Tải thêm
          </button>
        )}

        <button
          className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-4"
          onClick={onClose}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default FollowerPopup;

import React, { useState, useEffect } from "react";
import { useFollowerList } from "../../../../hooks/Follow/useFollow";
import { useNavigate } from "react-router-dom";
import { List, Button, Select, Skeleton, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons"; // Import the CloseOutlined icon

const { Title } = Typography;
const { Option } = Select;

const FollowerPopup = ({ onClose, personId }) => {
  const [sortBy, setSortBy] = useState("last"); // Mặc định là "last"
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useFollowerList(personId, sortBy); // Truyền sortBy vào useFollowerList
  const navigate = useNavigate();

  // Load more followers when scrolling to the end
  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const handleUserClick = (followerId) => {
    navigate(`/profile/${followerId}`);
  };

  const handleSortChange = (value) => {
    setSortBy(value); // Cập nhật giá trị sortBy khi người dùng chọn
  };

  useEffect(() => {
    // Khi sortBy thay đổi, cần gọi lại API để lấy dữ liệu mới
    fetchNextPage();
  }, [sortBy, fetchNextPage]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4 relative">
        {" "}
        {/* Add relative positioning */}
        <CloseOutlined
          onClick={onClose} // Attach onClose to the icon's onClick
          className="absolute top-4 right-4 cursor-pointer" // Positioning and styling
          style={{ fontSize: "24px", color: "#000" }} // Customize icon style if needed
        />
        <Title level={4}>Danh sách người theo dõi</Title>
        <Select
          defaultValue="last"
          onChange={handleSortChange}
          style={{ width: 120, marginBottom: 16 }}
        >
          <Option value="last">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
        </Select>
        {isLoading && <Skeleton active />}
        {isError && <p>Lỗi khi tải danh sách người theo dõi.</p>}
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <List
            dataSource={data?.pages.flatMap((page) => page.Follower) || []}
            renderItem={(follower) => (
              <List.Item
                key={follower.id}
                onClick={() => handleUserClick(follower.id)}
                style={{ cursor: "pointer" }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={follower.profile_image}
                      alt={follower.username}
                      className="h-10 w-10 rounded-full"
                    />
                  }
                  title={follower.username}
                />
              </List.Item>
            )}
          />
        </div>
        {hasNextPage && (
          <Button onClick={loadMore} className="mt-2 w-full" type="primary">
            Tải thêm
          </Button>
        )}
      </div>
    </div>
  );
};

export default FollowerPopup;

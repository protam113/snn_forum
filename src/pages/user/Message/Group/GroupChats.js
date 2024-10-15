import React, { useEffect, useState } from "react";
import Loading from "../../../error/load";
import { usePersonContext } from "../../../../context/PersonContext";
import GroupChat from "./Chat";
import useGetGroupMessages from "../../../../hooks/GroupChat/useGetGroupMessages";
import GroupMessageList from "./Components/MessageList";
import GroupMessInput from "./Components/GroupMessInput";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useUser } from "../../../../context/UserProvider";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import UserChatList from "./Components/UserChatList";
import { FaTrashAlt } from "react-icons/fa";
import {
  useDeleteGroupChat,
  useLeaveGroup,
} from "../../../../hooks/GroupChat/useGroupList";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

const GroupChats = () => {
  const { selectedGroup } = usePersonContext();
  const [page, setPage] = useState(1);
  const { messages: fetchedMessages, isLoading } = useGetGroupMessages(
    selectedGroup?.id,
    page
  );
  const { userInfo } = useUser();
  const [showUserGroupPopup, setShowUserGroupPopup] = useState(false);
  const { mutate: deleteGroupChatMutation } = useDeleteGroupChat();
  const { mutate: addLeaveGroup } = useLeaveGroup();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
    }
  }, [fetchedMessages]);

  if (isLoading) {
    return <Loading />;
  }

  const loadMoreMessages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDeleteGroupChat = (groupId) => {
    deleteGroupChatMutation({ groupId });
  };

  const handleLeaveGroup = (groupId) => {
    addLeaveGroup({ groupId });
  };

  return (
    <GroupChat>
      <div className="w-full flex flex-col h-screen">
        {selectedGroup ? (
          <>
            <div className="flex gap-2 items-center bg-main-blue1 px-4 py-2 mb-2">
              <div className="w-12 rounded-full">
                <img
                  src={selectedGroup?.image}
                  alt="group-profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 font-bold text-20 text-white">
                <p>{selectedGroup?.name || "Nhóm không có tên"}</p>
              </div>
              <Menu as="div" className="ml-auto relative">
                <MenuButton>
                  <BsThreeDots className="text-2xl cursor-pointer text-black hover:text-gray-700" />
                </MenuButton>
                <MenuItems
                  as="div"
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10"
                >
                  {userInfo && (
                    <>
                      <MenuItem>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            if (selectedGroup?.id) {
                              setShowUserGroupPopup(true);
                            } else {
                              console.error("No group selected");
                            }
                          }}
                        >
                          <FaPlus className="mr-2 text-black" />
                          User
                        </div>
                      </MenuItem>

                      <MenuItem>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => handleLeaveGroup(selectedGroup?.id)}
                        >
                          <RiLogoutBoxFill className="mr-2 text-black" />
                          Thoát Group
                        </div>
                      </MenuItem>

                      <MenuItem>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => handleLeaveGroup(selectedGroup?.id)}
                        >
                          <MdEditSquare className="mr-2 text-black" />
                          Sửa
                        </div>
                      </MenuItem>

                      <MenuItem>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() =>
                            handleDeleteGroupChat(selectedGroup?.id)
                          }
                        >
                          <FaTrashAlt className="mr-2 text-black" />
                          Xóa Group
                        </div>
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Menu>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[calc(80vh-200px)] bg-zinc-100">
              <GroupMessageList messages={messages} />
            </div>
            <button
              onClick={loadMoreMessages}
              className="p-2 bg-blue-500 text-white rounded mt-2"
            >
              Tải thêm tin nhắn
            </button>
            <div className="p-4 bg-white border-t">
              <GroupMessInput messages={messages} setMessages={setMessages} />
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl text-black font-bold">Hi</h1>
            <h1 className="text-2xl text-black">Let's start conversation</h1>
          </div>
        )}
      </div>
      {showUserGroupPopup && (
        <UserChatList
          groupId={selectedGroup?.id}
          onClose={() => setShowUserGroupPopup(false)}
        />
      )}
    </GroupChat>
  );
};

export default GroupChats;

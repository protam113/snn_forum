import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';

export const CommentChildren = () => (
    const { data: commentChildren, isLoading}=
    useCommentChildren(commentId);
  <div className="ml-10 pl-4 border-l-2 border-gray-300 mt-4">
    <div className="flex items-start mb-2">
      <img
        src={reply.user.profile_image}
        alt="profile"
        className="w-8 h-8 rounded-full mr-2"
      />
      <div>
        <p className="font-semibold text-sm text-black">
          {reply.user.first_name} {reply.user.last_name}
        </p>
        <p className="text-gray-500 text-xs">
          {formatDate(reply.created_date)}
        </p>
      </div>
      <div className="ml-auto">
        {userInfo.id === reply.user.id && (
          <FaTrashAlt
            onClick={() => handleDeleteComment(reply.id, userInfo)}
            className="text-gray-500 cursor-pointer"
          />
        )}
      </div>
    </div>
    <p className="ml-10 text-black">{reply.content}</p>
  </div>
);

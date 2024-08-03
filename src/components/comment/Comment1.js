// src/components/comment/Comment.js
import React from "react";

const Comment1 = ({ comment }) => (
  <div>
    <div>
      <img src={comment.user.profile_image} alt={comment.user.username} />
      <p>{comment.user.username}</p>
      <p>{comment.content}</p>
    </div>
    {comment.children.length > 0 && (
      <div style={{ paddingLeft: "20px" }}>
        {comment.children.map((child) => (
          <Comment1 key={child.id} comment={child} />
        ))}
      </div>
    )}
  </div>
);

export default Comment1;

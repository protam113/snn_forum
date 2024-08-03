// src/components/comment/CommentSection.js
import React, { useState, useEffect } from "react";
import Comment1 from "./Comment1";

const CommentSection = ({ comments }) => {
  const [organizedComments, setOrganizedComments] = useState([]);

  useEffect(() => {
    const organizeComments = (comments) => {
      const commentsMap = new Map();
      const rootComments = [];

      comments.forEach((comment) => {
        commentsMap.set(comment.id, { ...comment, children: [] });
      });

      comments.forEach((comment) => {
        if (comment.parent === null) {
          rootComments.push(commentsMap.get(comment.id));
        } else {
          const parent = commentsMap.get(comment.parent);
          if (parent) {
            parent.children.push(commentsMap.get(comment.id));
          }
        }
      });

      return rootComments;
    };

    setOrganizedComments(organizeComments(comments));
  }, [comments]);

  return (
    <div>
      {organizedComments.map((comment) => (
        <Comment1 key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;

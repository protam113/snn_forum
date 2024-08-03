import { useState, useEffect } from "react";

// Custom hook để tổ chức bình luận
const useOrganizedComments = (comments) => {
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

  return organizedComments;
};

export default useOrganizedComments;

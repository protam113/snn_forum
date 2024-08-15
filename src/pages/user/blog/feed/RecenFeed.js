import React from "react";
import useBlog from "../../../../hooks/useBlog";
import { useNavigate } from "react-router-dom";
import Loading from "../../../error/load";
import formatDate from "../../../../utils/formatDate";

const RecentFeed = () => {
  const { blogs, loading, error } = useBlog();
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p>Error loading activities</p>;

  const recentActivities = blogs.slice(0, 5);
  return (
    <section className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
      {recentActivities.map((activity) => (
        <div
          key={activity.id}
          className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
          onClick={() => handleBlogClick(activity.id)}
        >
          <img
            src={activity.user.profile_image || "default-profile.png"}
            alt={activity.user.username}
            width={400}
            height={300}
            className="object-cover"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-16 font-bold line-clamp-3">
              {activity.content}
            </h3>
            <p className="text-14 text-muted-foreground">
              {formatDate(activity.created_date)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RecentFeed;

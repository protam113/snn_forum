import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../error/load";
import formatDate from "../../../../utils/formatDate";
import { useBlogs } from "../../../../hooks/useFetchList";

const RecentFeed = () => {
  const { data: blogs = [], loading, error } = useBlogs();
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500">Error loading activities</p>;

  const recentActivities = blogs.slice(0, 5);
  return (
    <div className=" sm:px-6 px-4 py-2">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 max-md:max-w-lg mx-auto">
        {recentActivities.map((activity) => (
          <div
            className="cursor-pointer rounded overflow-hidden group"
            key={activity.id}
            onClick={() => handleBlogClick(activity.id)}
          >
            <div>
              <span className="text-sm block text-gray-400 mb-2">
                {" "}
                {formatDate(activity.created_date)}
              </span>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-all">
                {activity.content}
              </h3>
              {/* <div className="mt-4">
                <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div> */}
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={activity.user.profile_image || "default-profile.png"}
                className="w-9 h-9 rounded-full"
                alt={activity.user.username}
              />
              <p className="text-xs text-gray-400 font-semibold">
                {activity.user.username}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RecentFeed;

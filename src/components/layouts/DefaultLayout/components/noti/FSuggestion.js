import React from "react";
import UsersData from "../../../../../data/userData";
import Block from "../../../../design/Block";
import { MdGroups2 } from "react-icons/md";

const FSuggestion = () => {
  const latestUsers = UsersData.slice(0, 4);

  return (
    <Block className="p-4 border-zinc-300 text-black rounded-lg mb-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <span>Group</span>
          <MdGroups2 className="text-blue-500" />
        </h2>
        <a href="/" className="text-blue-500">
          See all
        </a>
      </div>
      <div className="space-y-4">
        {latestUsers.map((user, index) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-4">
                <p className="text-sm text-black">{user.name}</p>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
            </div>
            <button
              className={`px-2 py-1 text-sm rounded ${
                index === 3
                  ? "bg-gray-600 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {index === 3 ? "joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </Block>
  );
};

export default FSuggestion;

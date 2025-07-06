import React from "react";
import { User } from "@/types/blog";

interface UserListItemProps {
  user: User & { createdAt?: string; isDeleted?: boolean };
  handleDeleteUser: (id: string) => void;
}

export default function UserListItem({
  user,
  handleDeleteUser,
}: UserListItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800">
      <th
        scope="row"
        className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm lg:text-base"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs lg:text-sm flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="truncate">{user.name}</span>
        </div>
      </th>
      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 dark:text-gray-300 text-sm lg:text-base">
        <span className="truncate block">{user.email}</span>
      </td>
      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 dark:text-gray-300 text-sm lg:text-base">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
          {user.role}
        </span>
      </td>
      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 dark:text-gray-300 text-sm lg:text-base">
        {user.createdAt ? formatDate(user.createdAt) : ""}
      </td>
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <button
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 text-xs lg:text-sm font-medium"
          onClick={() => handleDeleteUser(user.id)}
          aria-label={`Delete user ${user.name}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

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
  return (
    <tr className="bg-white border-b border-gray-800 dark:bg-gray-900 dark:border-gray-800 text-gray-900">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
      >
        {user.name}
      </th>
      <td className="px-6 py-4 text-gray-900">{user.email}</td>
      <td className="px-6 py-4 text-gray-900">{user.role}</td>
      <td className="px-6 py-4 text-gray-900">
        {user.createdAt ? new Date(user.createdAt).toLocaleString() : ""}
      </td>
      <td>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          onClick={() => handleDeleteUser(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

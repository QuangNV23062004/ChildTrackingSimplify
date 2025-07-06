"use client";
import React from "react";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import { User } from "@/types/user";
import UserListItem from "./UserListItem";
import ServerPagination from "@/components/common/ServerPagination";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import DeleteConfirmModal from "@/components/common/DeleteModal";
import AddUserModal from "./AddUserModal";

export default function UserList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const [usersData, setUsersData] = useState<{
    data: User[];
    totalPages: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = async (
    email: string,
    password: string,
    name: string,
    role: string
  ) => {
    try {
      const result = await userService.createUser(email, password, name, role);
      setIsOpen(false);
      setUsersData({
        data: [...(usersData?.data || []), result.user],
        totalPages: usersData?.totalPages || 0,
      });
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error?.response?.data
          : "Failed to create user"
      );
    }
  };
  const handleDeleteUser = async (id: string) => {
    try {
      setSelectedUser(null);
      await userService.deleteUser(id);

      setUsersData({
        data: usersData?.data.filter((user) => user.id !== id) || [],
        totalPages: usersData?.totalPages || 0,
      });
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error?.response?.data
          : "Failed to delete user"
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getUsers(page, size);
      setUsersData(response);
    };
    fetchUsers();
  }, [page, size]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Users</h1>
        <button
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base transition-colors duration-200"
          onClick={() => setIsOpen(true)}
        >
          Add User
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block w-full rounded-md shadow-md overflow-hidden">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Joined At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData &&
              usersData.data.length > 0 &&
              usersData.data.map((user: User) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  handleDeleteUser={() => {
                    setSelectedUser(user);
                  }}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {usersData &&
          usersData.data.length > 0 &&
          usersData.data.map((user: User) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <div className="flex flex-col space-y-3">
                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {user.name}
                      </h3>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    {user.role}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-gray-500">
                  Joined: {formatDate(user.createdAt)}
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {usersData && usersData.data.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No users found</div>
          <p className="text-gray-500 text-sm">
            Start by adding your first user
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6">
        <ServerPagination
          currentPage={page}
          totalPages={usersData?.totalPages || 0}
          pageSize={size}
        />
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onDelete={() => handleDeleteUser(selectedUser?.id.toString() || "")}
      />
      <AddUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
}

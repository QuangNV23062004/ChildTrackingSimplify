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
      await userService.deleteUser(id);
      setUsersData({
        data: usersData?.data.filter((user) => user.id !== id) || [],
        totalPages: usersData?.totalPages || 0,
      });
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
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add User
        </button>
      </div>
      <div className="flex flex-col w-full mx-2 my-5 rounded-md shadow-md">
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
        <DeleteConfirmModal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onDelete={() => handleDeleteUser(selectedUser?.id.toString() || "")}
        />
        <ServerPagination
          currentPage={page}
          totalPages={usersData?.totalPages || 0}
          pageSize={size}
        />
        <AddUserModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={handleCreateUser}
        />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Blog } from "@/types/blog";
import { BlogStatus } from "@/enum/BlogStatusEnum";
import Image from "next/image";

interface BlogListItemProps {
  blog: Blog;
  setBlogStatus: (blogId: string, status: BlogStatus) => void;
}

export default function BlogListItem({
  blog,
  setBlogStatus,
}: BlogListItemProps) {
  const [status, setStatus] = useState<BlogStatus>(blog.status);
  const isStatusChanged = status !== blog.status;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <td className="p-3 sm:p-4">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={80}
          height={80}
          className="rounded-md object-cover w-16 h-16 sm:w-20 sm:h-20"
        />
      </td>
      <td className="p-3 sm:p-4">
        <div className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 mb-1 line-clamp-2">
          {blog.title}
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mb-1">
          {blog.user ? `By ${blog.user.name}` : "Unknown author"}
        </div>
        <div className="text-xs text-gray-500">
          {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </td>
      <td className="p-3 sm:p-4">
        <select
          className="w-full sm:w-auto border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          value={status}
          onChange={(e) => {
            setStatus(Number(e.target.value));
          }}
        >
          <option value={BlogStatus.Draft}>Draft</option>
          <option value={BlogStatus.Published}>Published</option>
          <option value={BlogStatus.Archived}>Archived</option>
        </select>
      </td>
      <td className="p-3 sm:p-4">
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md"
          onClick={() => {
            setBlogStatus(blog.id, status);
          }}
          disabled={!isStatusChanged}
        >
          Save
        </button>
      </td>
    </tr>
  );
}

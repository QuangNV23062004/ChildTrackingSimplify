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
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="p-4">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={80}
          height={80}
          className="rounded-md object-cover"
          style={{ width: 80, height: 80 }}
        />
      </td>
      <td className="p-4">
        <div className="font-semibold text-lg text-gray-900 mb-1">
          {blog.title}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          {blog.user ? `By ${blog.user.name}` : "Unknown author"}
        </div>
        <div className="text-xs text-gray-500">
          {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </td>
      <td className="p-4">
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
      <td className="p-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
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

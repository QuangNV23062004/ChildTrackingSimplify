import { Blog, BlogStatus } from "@/types/blog";
import React from "react";

function getStatusLabel(status: BlogStatus) {
  switch (status) {
    case BlogStatus.Draft:
      return "Draft";
    case BlogStatus.Published:
      return "Published";
    case BlogStatus.Archived:
      return "Archived";
    default:
      return "Unknown";
  }
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white border mb-4">
      {blog.imageUrl && (
        <img
          className="w-full h-48 object-cover"
          src={blog.imageUrl}
          alt={blog.title}
        />
      )}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-xl text-gray-900 truncate">
            {blog.title}
          </h2>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              blog.status === BlogStatus.Published
                ? "bg-green-100 text-green-800"
                : blog.status === BlogStatus.Draft
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {getStatusLabel(blog.status)}
          </span>
        </div>
        <p className="text-gray-700 text-base line-clamp-3 mb-2">
          {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
          {blog.content.length > 150 ? "..." : ""}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          {blog.user && <span className="mr-2">By {blog.user.name}</span>}
          {blog.createdAt && (
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}

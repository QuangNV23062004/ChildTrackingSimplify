"use client";
import { useEffect, useState } from "react";
import BlogService from "@/services/blogService";
import { Blog, BlogStatus } from "@/types/blog";
import BlogListItem from "./BlogListItem";
import ServerPagination from "@/components/common/ServerPagination";
import blogService from "@/services/blogService";
import { toast } from "react-toastify";

export default function BlogList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const [blogsData, setBlogsData] = useState<{
    data: Blog[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    //had to call api here
    const fetchBlogs = async () => {
      const data = await BlogService.getBlogs(page, size);
      setBlogsData(data);
    };
    fetchBlogs();
  }, [page, size]);

  if (!blogsData) return <div>Loading...</div>;

  const handleStatusChange = async (blogId: string, status: BlogStatus) => {
    await blogService.updateBlogStatus(blogId, status);
    toast.success("Blog status updated successfully");
    setBlogsData({
      ...blogsData,
      data: blogsData.data.map((blog) =>
        blog.id === blogId ? { ...blog, status } : blog
      ),
    });
  };
  return (
    <div className="w-full mx-2 my-3 sm:my-5 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 text-xs sm:text-sm">
                Image
              </th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 text-xs sm:text-sm">
                Blog Details
              </th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 text-xs sm:text-sm">
                Status
              </th>
              <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 text-xs sm:text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {blogsData.data.map((blog) => (
              <BlogListItem
                key={blog.id}
                blog={blog}
                setBlogStatus={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-3 sm:px-4 py-3">
        <ServerPagination
          currentPage={page}
          totalPages={blogsData.totalPages}
          pageSize={size}
        />
      </div>
    </div>
  );
}

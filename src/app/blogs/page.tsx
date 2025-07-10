"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BlogList from "@/components/blogs/BlogList";
import ServerPagination from "@/components/common/ServerPagination";
import BlogService from "@/services/blogService";
import { Blog } from "@/types/blog";
import Loading from "@/components/common/Loading";

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;
  const [blogsData, setBlogsData] = useState<{
    data: Blog[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await BlogService.getBlogs(page, size);
        setBlogsData(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [page, size]);

  if (!blogsData) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center min-h-[60vh]">
        <Loading message="Loading blogs..." />
      </div>
    );
  }

  return (
    <div className="w-[100%] p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blogs</h1>
        {/* <Link href="/admin/blogs/create">
          <button className="bg-green-500 text-black px-4 py-2 rounded-md">
            Add Blog
          </button>
        </Link> */}
      </div>

      <BlogList blogs={blogsData.data} />
      <ServerPagination
        currentPage={page}
        totalPages={blogsData.totalPages}
        pageSize={size}
      />
    </div>
  );
}

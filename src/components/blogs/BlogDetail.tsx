"use client";
import React, { useEffect, useState } from "react";
import blogService from "@/services/blogService";
import { Blog } from "@/types/blog";
import Image from "next/image";

export default function BlogDetail({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogService.getBlogById(id);
        setBlog(response.data.blog);
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-lg">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-4xl sm:text-6xl mb-3 sm:mb-4">
            ⚠️
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Oops!
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {error || "Blog post not found"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Blog Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 sm:mb-8">
        {blog.imageUrl && (
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            {blog.user && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-medium">By {blog.user.name}</span>
              </div>
            )}
            {blog.createdAt && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">•</span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </div>

      {/* Blog Footer */}
      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blogs
        </button>
      </div>
    </div>
  );
}

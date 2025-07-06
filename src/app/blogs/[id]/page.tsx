import BlogDetail from "@/components/blogs/BlogDetail";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Blog Details
          </h1>
        </div>
        <div className="flex justify-center items-start">
          <BlogDetail id={id} />
        </div>
      </div>
    </div>
  );
}

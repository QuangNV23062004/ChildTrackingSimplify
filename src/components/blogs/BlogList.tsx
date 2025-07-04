import React from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/blog";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div>No blogs found</div>
        )}
      </div>
    </div>
  );
}

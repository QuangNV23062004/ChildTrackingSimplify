import React from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/blog";
import Link from "next/link";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <BlogCard blog={blog} />
            </Link>
          ))
        ) : (
          <div>No blogs found</div>
        )}
      </div>
    </div>
  );
}

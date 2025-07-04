import BlogList from "@/components/admin/blogs/BlogList";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; size: string }>;
}) {
  const { page, size } = await searchParams;

  return (
    <div className="w-[100%] p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href="/admin/blogs/create">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Add Blog
          </button>
        </Link>
      </div>
      <BlogList page={Number(page) || 1} size={Number(size) || 6} />
      {/* ServerPagination can be moved into BlogList if it needs totalPages */}
    </div>
  );
}

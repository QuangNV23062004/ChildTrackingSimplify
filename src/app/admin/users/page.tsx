import UserList from "@/components/admin/users/UserList";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page: string;
    size: string;
  };
}) {
  const { page, size } = await searchParams;

  return (
    <div className="w-[100%] p-4">
      <UserList page={Number(page) || 1} size={Number(size) || 6} />
    </div>
  );
}

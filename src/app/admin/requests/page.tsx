import RequestList from "@/components/admin/request/RequestList";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    size?: string;
  };
}) {
  const { page, size } = await searchParams;
  return <RequestList page={Number(page) || 1} size={Number(size) || 10} />;
}

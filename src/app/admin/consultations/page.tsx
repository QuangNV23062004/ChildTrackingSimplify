import ConsultationList from "@/components/admin/consultation/ConsultationList";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    size?: string;
  };
}) {
  const { page, size } = await searchParams;
  return (
    <ConsultationList page={Number(page) || 1} size={Number(size) || 10} />
  );
}

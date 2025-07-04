import LoginForm from "@/components/login/LoginForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] py-8 text-gray-700 bg-cover bg-center bg-no-repeat bg-fixed bg-center bg-cover bg-no-repeat bg-[url('https://nursing.osu.edu/sites/default/files/styles/hd/public/2024-05/Report%20cover%20page%20standalone%20image.jpeg?h=9855f42d&itok=zH7BAXv_')]">
      <LoginForm />
    </div>
  );
}

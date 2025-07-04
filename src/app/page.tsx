import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Growth Tracking",
    text: "Record weight, height, and other metrics easily and keep them organized in one secure place.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
      </svg>
    ),
    title: "Visual Charts",
    text: "Access detailed growth charts that visualize development from infancy to adulthood.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m4 0h-1v-4h-1"
        />
      </svg>
    ),
    title: "Smart Alerts",
    text: "Get automatic notifications when growth patterns require attention.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
        />
      </svg>
    ),
    title: "Doctor Portal",
    text: "Share records with healthcare providers for professional guidance and feedback.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-4-4h-1"
        />
      </svg>
    ),
    title: "Multi-Child Support",
    text: "Track multiple children with individualized profiles and comprehensive records.",
  },
];

const testimonials = [
  {
    icon: "/file.svg",
    text: "This app made it so easy to keep track of my son&apos;s growth. Highly recommended!",
    name: "Anna, Mom of 2",
    color: "text-blue-500",
  },
  {
    icon: "/window.svg",
    text: "The charts and reminders are a lifesaver. My pediatrician loves the reports!",
    name: "Mark, Dad",
    color: "text-blue-700",
  },
  {
    icon: "/globe.svg",
    text: "I can track both my kids in one place. The interface is beautiful and simple.",
    name: "Sarah, Mom",
    color: "text-blue-400",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 min-h-screen bg-[#f7fbff] pb-10">
      {/* Hero Section */}
      <section className="flex justify-center pt-10">
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl bg-blue-100 rounded-3xl shadow-lg p-8 md:p-12 gap-8 md:gap-0">
          <div className="flex-1 flex flex-col justify-center items-start text-left gap-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
              <span className="block text-blue-500">Track &amp; Monitor</span>
              Your Child&apos;s Growth
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              GrowthGuardian helps you track your child&apos;s development, get
              insights from growth charts, and share data with healthcare
              providers for personalized care and advice.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full border border-blue-500 transition"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold px-6 py-2 rounded-full transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
              <Image
                src="https://cdn.cdnparenting.com/articles/2018/04/212743915-H.webp"
                alt="Hero Image"
                width={350}
                height={250}
                className="rounded-xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Main Features</h2>
          <p className="text-gray-500">
            Our comprehensive platform provides essential tools for tracking and
            managing your child&apos;s growth development.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full max-w-6xl">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
                <span className="text-blue-500">{feature.icon}</span>
              </div>
              <div className="font-bold text-lg text-black">
                {feature.title}
              </div>
              <div className="text-gray-500 text-sm">{feature.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="flex flex-col items-center w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            What Parents Say
          </h2>
          <p className="text-gray-500">
            Join thousands of satisfied families tracking their children&apos;s
            growth with GrowthGuardian
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow flex flex-col items-center"
            >
              <Image
                src={t.icon}
                alt={t.name}
                width={40}
                height={40}
                className="mb-2"
              />
              <p className="text-gray-600 italic mb-2 text-center">{t.text}</p>
              <span className={`font-semibold ${t.color}`}>— {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-10 bg-blue-500 rounded-3xl shadow text-white w-full max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">
          Ready to track your child&apos;s growth?
        </h2>
        <p className="text-lg mb-6 max-w-2xl text-center">
          Join thousands of parents who trust GrowthGuardian for monitoring
          their children&apos;s development.
        </p>
        <Link
          href="/register"
          className="bg-white text-blue-500 font-semibold px-8 py-4 rounded-full text-lg hover:bg-blue-50 transition"
        >
          Get Started Today
        </Link>
      </section>
    </div>
  );
}

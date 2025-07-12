"use client";
import { useState } from "react";
import Link from "next/link";
import authService from "@/services/authService";
import { useToast } from "../common/ToastContext";
import { AxiosError } from "axios";
import { RoleEnum } from "@/enum/RoleEnum";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        setSubmitting(true);
        const role = await authService.login(form.email, form.password);
        setSubmitting(false);
        if (role === RoleEnum.Admin) {
          window.location.href = "/admin";
          toast.showToast("Login successful", "success");
        } else {
          window.location.href = "/";
          toast.showToast("Login successful", "success");
        }
      } catch (error) {
        setSubmitting(false);
        if (error instanceof AxiosError) {
          toast.showToast(error.response?.data, "error");
        } else {
          toast.showToast("An error occurred", "error");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 text-black w-full">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-2 bg-blue-500 text-black font-semibold rounded hover:bg-blue-600 transition"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-black-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

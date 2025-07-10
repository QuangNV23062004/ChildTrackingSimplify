"use client";
import { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { useToast } from "../common/ToastContext";
import authService from "@/services/authService";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name) {
      errs.name = "Name is required";
    }
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
    if (!form.confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
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
      setSubmitting(true);
      try {
        await authService.signup(form.name, form.email, form.password);
        setSubmitting(false);
        toast.showToast("Registration successful!", "success");
      } catch (error) {
        setSubmitting(false);
        if (error instanceof AxiosError) {
          toast.showToast(error.response?.data, "error");
        } else {
          toast.showToast("An error occurred", "error");
          setTimeout(() => {}, 5000);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 text-black w-full ">
      <div className="w-full max-w-sm bg-black/50 rounded-lg shadow p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2">Register</h2>
        <div>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="name"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>
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
              autoComplete="new-password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 mt-2 bg-blue-500 text-black font-semibold rounded hover:bg-blue-600 transition"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-black-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

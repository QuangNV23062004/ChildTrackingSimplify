"use client";
import React, { useEffect, useState } from "react";
import userService from "@/services/userService";
import { FaUserMd, FaEnvelope, FaStar } from "react-icons/fa";

const ContactPage = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getDoctors()
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Our Doctors</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow p-5 flex flex-col gap-3 text-black items-center">
              <FaUserMd className="text-blue-500 text-4xl mb-2" />
              <div className="font-bold text-lg mb-1">{doctor.name}</div>
              <div className="text-sm text-gray-700 mb-1">{doctor.email}</div>
              {doctor.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  <FaStar />
                  <span className="font-medium">{doctor.rating.toFixed(1)}</span>
                </div>
              )}
              <button className="mt-2 flex items-center justify-center gap-2 bg-blue-600 text-black px-3 py-2 rounded hover:bg-blue-700 text-sm font-medium">
                <FaEnvelope /> Email
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactPage; 
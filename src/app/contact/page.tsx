"use client";
import React, { useEffect, useState } from "react";
import userService from "@/services/userService";
import { FaUserMd, FaEnvelope, FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import childService from "@/services/childService";
import consultationService from "@/services/consultationService";
import { useToast } from "@/components/common/ToastContext";
import Loading from "@/components/common/Loading";

const ContactPage = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    userService.getDoctors()
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
    // Fetch user's children for selection
    const userData = typeof window !== "undefined" ? localStorage.getItem("user_data") : null;
    if (userData) {
      const parsed = JSON.parse(userData);
      childService.getChildrenByUser(parsed.id).then(res => setChildren(res.data)).catch(() => setChildren([]));
    }
  }, []);

  const openModal = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    setSelectedChildId("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    if (!selectedChildId) {
      toast.showToast("Please select a child for the consultation request.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await consultationService.createConsultationRequest({
        doctorId: selectedDoctor.id,
        childId: selectedChildId,
        message,
      });
      toast.showToast("Consultation request sent successfully!", "success");
      setShowModal(false);
    } catch {
      toast.showToast("Failed to send request. Please try again!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 text-sm" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
    }
    
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Contact Our Doctors</h1>
      {loading ? (
        <Loading fullScreen className="h-screen" message="Loading doctors..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => {
            console.log('Doctor:', doctor);
            const name = doctor.name || 'Unknown';
            const email = doctor.email || 'Unknown email';
            const hasValidRating = typeof doctor.rating === 'number' && doctor.rating > 0;
            return (
              <div key={doctor.id} className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 flex flex-col gap-4 text-black items-center hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <FaUserMd className="text-blue-500 text-5xl mb-2" />
                  {hasValidRating && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      {doctor.rating.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg mb-1 text-gray-800">{name}</div>
                  <div className="text-sm text-gray-600 mb-3">{email}</div>
                  {hasValidRating ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">{renderStars(doctor.rating)}</div>
                      <div className="text-xs text-gray-500">{doctor.rating.toFixed(1)} out of 5</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">No ratings yet</div>
                  )}
                </div>
                <button
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer transition-colors duration-200 shadow-md hover:shadow-lg"
                  onClick={() => openModal(doctor)}
                >
                  Request Consultation
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* Modal for consultation request */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl ml-4 cursor-pointer"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Request Consultation with Doctor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Child <span className="text-red-500">*</span>:</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={selectedChildId}
                  onChange={e => setSelectedChildId(e.target.value)}
                  required
                >
                  <option value="">Select a child...</option>
                  {children.map(child => (
                    <option key={child.id} value={child.id}>{child.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message to Doctor:</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px]"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="Enter your consultation message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition cursor-pointer"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage; 
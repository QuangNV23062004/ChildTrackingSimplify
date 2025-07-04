"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import consultationService from "@/services/consultationService";
import { Consultation } from "@/types/consultation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function ConsultationList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await consultationService.getConsultations(page, size);
      setConsultations(response.result.data);
      setTotalPages(response.result.totalPages);
      setTotal(response.result.total);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast.error("Failed to fetch consultations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [page, size]);

  return (
    <div>
      <h1>Consultations</h1>
      <div className="flex flex-col gap-4">
        {consultations.map((consultation) => (
          <div key={consultation.id}>{consultation.id}</div>
        ))}
      </div>
    </div>
  );
}

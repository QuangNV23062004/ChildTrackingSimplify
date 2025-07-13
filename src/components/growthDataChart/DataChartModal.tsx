import React from "react";
import DataChart, { GrowthData } from "./DataChart";

interface DataChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GrowthData[];
}

export default function DataChartModal({
  isOpen,
  onClose,
  data,
}: DataChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-black relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-2xl font-bold p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Growth Data Charts</h2>
        <DataChart
          data={data}
          metric="weight"
          label="Weight"
          valueUnit="(kg)"
        />
        <DataChart
          data={data}
          metric="height"
          label="Height"
          valueUnit="(cm)"
        />
        <DataChart data={data} metric="bmi" label="BMI" />
        <DataChart
          data={data}
          metric="headCircumference"
          label="Head Circumference"
          valueUnit="(cm)"
        />
        <DataChart
          data={data}
          metric="armCircumference"
          label="Arm Circumference"
          valueUnit="(cm)"
        />
      </div>
    </div>
  );
}

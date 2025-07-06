import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  data,
  label,
  unit,
  rgbaColor = "rgba(136, 132, 216, 0.8)",
}: {
  data: { date: string; count: number }[];
  label: string;
  unit: string;
  rgbaColor: string;
}) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    if (unit === "year") {
      return date.toLocaleDateString("en-US", { month: "short" });
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const chartData = {
    labels: data.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.count),
        backgroundColor: rgbaColor,
        borderColor: rgbaColor,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: { parsed: { y: number } }) {
            return `${context.parsed.y} ${label.toLocaleLowerCase()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

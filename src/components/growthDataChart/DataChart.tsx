import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export interface GrowthResultMetric {
  percentile: number;
  description: string;
  level: number;
}

export interface GrowthResult {
  weight?: GrowthResultMetric;
  height?: GrowthResultMetric;
  bmi?: GrowthResultMetric;
  headCircumference?: GrowthResultMetric;
  armCircumference?: GrowthResultMetric;
  [key: string]: GrowthResultMetric | undefined;
}

export interface GrowthData {
  inputDate: string;
  weight: number;
  height: number;
  bmi: number;
  headCircumference: number;
  armCircumference: number;
  growthResult?: GrowthResult;
}

interface DataChartProps {
  data: GrowthData[];
  metric:
    | "weight"
    | "height"
    | "bmi"
    | "headCircumference"
    | "armCircumference";
  label: string;
  valueUnit?: string;
}

export default function DataChart({
  data,
  metric,
  label,
  valueUnit,
}: DataChartProps) {
  // Prepare chart data: value and percentile
  const chartData = data
    .map((entry) => ({
      inputDate: entry.inputDate,
      value: entry[metric],
      percentile: entry.growthResult?.[metric]?.percentile ?? null,
    }))
    .sort(
      (a, b) =>
        new Date(a.inputDate).getTime() - new Date(b.inputDate).getTime()
    );

  return (
    <div className="mb-8">
      <h4 className="font-bold mb-2 text-black">{label}</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="inputDate"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name={`${label} ${valueUnit || ""}`.trim()}
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="percentile"
            name={`${label} Percentile`}
            stroke="#82ca9d"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

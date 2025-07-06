"use client";
import statisticService from "@/services/statisticService";
import React, { useEffect, useState } from "react";
import BarChart from "./shared/BarChart";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function NewUser() {
  const [newUserStat, setNewUserStat] = useState([{ date: "", count: 0 }]);
  const [unit, setUnit] = useState("year");
  const [value, setValue] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchNewUserStat = async () => {
      try {
        const response = await statisticService.getNewUserStat(value, unit);
        setNewUserStat(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error instanceof AxiosError
            ? error.response?.data.message
            : "Error fetching new user stat"
        );
        setLoading(false);
      }
    };
    fetchNewUserStat();
  }, [unit, value]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = 0; i < 6; i++) {
      yearOptions.push(currentYear - i);
    }
    return yearOptions;
  };
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[400px] gap-4 lg:gap-6">
      {/* Chart Section */}
      <div className="w-full lg:w-3/4 h-[300px] lg:h-full">
        <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4 h-full flex flex-col">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">
            New Users Chart
          </h3>
          <div className="flex-1 min-h-0">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <BarChart
                data={newUserStat}
                label="Users"
                unit={unit}
                rgbaColor="rgba(132, 216, 135, 0.8)"
              />
            )}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full lg:w-1/4 h-auto lg:h-full">
        <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4 h-full flex flex-col">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">
            Filter New Users
          </h3>

          <div className="space-y-3 lg:space-y-4">
            {/* Time Unit Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 lg:mb-2">
                Time Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-2 lg:px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="year">Year</option>
                <option value="month">Month</option>
              </select>
            </div>

            {/* Year/Month Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 lg:mb-2">
                {unit === "year" ? "Year" : "Month"}
              </label>
              <select
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-2 lg:px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {unit === "year"
                  ? generateYearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))
                  : Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
              </select>
            </div>

            {/* Summary Stats */}
            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Summary
              </h4>
              <div className="space-y-1 text-xs lg:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Users:</span>
                  <span className="font-medium">
                    {newUserStat.reduce((sum, item) => sum + item.count, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Users:</span>
                  <span className="font-medium">
                    {Math.max(...newUserStat.map((item) => item.count))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {unit === "year" ? "Monthly Average" : "Daily Average"}:
                  </span>
                  <span className="font-medium">
                    {(
                      newUserStat.reduce((sum, item) => sum + item.count, 0) /
                      newUserStat.length
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

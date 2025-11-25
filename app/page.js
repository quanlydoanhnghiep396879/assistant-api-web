"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip);

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAPI() {
      const res = await axios.post(
        "https://duc.n8n.cloud/webhook/assistant-api/hourly-report"
      );
      setData(res.data);
    }
    fetchAPI();
  }, []);

  if (!data) return <p className="text-gray-300">Đang tải dữ liệu...</p>;

  const chartData = {
    labels: data.hours,
    datasets: [
      {
        label: "Sản lượng theo giờ",
        data: data.production,
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: "#E5E5E5" } } },
    scales: {
      x: { ticks: { color: "#A3A3A3" } },
      y: { ticks: { color: "#A3A3A3" } },
    },
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">
        Assistant API – Dashboard
      </h1>

      <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-[#262626]">
        <h2 className="text-xl mb-4 text-gray-300">Biểu đồ sản lượng theo giờ</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-8 bg-[#1A1A1A] p-6 rounded-xl border border-[#262626]">
        <h2 className="text-xl text-gray-300 mb-2">Tóm tắt KPI giờ</h2>
        <p>KPI rate: {data.summary?.kpi_rate}%</p>
        <p>Nút thắt: {data.summary?.bottleneck}</p>
        <p>Cảnh báo: {data.summary?.warnings?.join(", ")}</p>
        <p>Gợi ý: {data.summary?.recommendations?.join(", ")}</p>
      </div>
    </main>
  );
}



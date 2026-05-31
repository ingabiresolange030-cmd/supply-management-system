import { useEffect, useState } from "react";
import api from "./api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    suppliers: 0,
    shipments: 0,
    deliveries: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };
    load();
  }, []);

  const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">

      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </h2>

        <span className={`w-3 h-3 rounded-full ${color}`} />
      </div>

      <p className="text-3xl font-bold text-gray-800 mt-4">
        {value}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        Total {title.toLowerCase()} in system
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
         Supply Chain Management System
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of your supply chain operations
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Suppliers"
          value={stats.suppliers}
          color="bg-blue-500"
        />

        <Card
          title="Shipments"
          value={stats.shipments}
          color="bg-green-500"
        />

        <Card
          title="Deliveries"
          value={stats.deliveries}
          color="bg-purple-500"
        />

      </div>

      

    </div>
  );
}
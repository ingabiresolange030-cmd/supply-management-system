import { useEffect, useState } from "react";
import api from "./api";

export default function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [report, setReport] = useState({
    suppliers: [],
    shipments: [],
    deliveries: [],
    summary: {
      totalSuppliers: 0,
      totalShipments: 0,
      totalDeliveries: 0,
    },
  });

  const generateReport = async () => {
    try {
      const res = await api.get(
        `/reports?from=${fromDate}&to=${toDate}`
      );
      setReport(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  const Card = ({ title, value, color }) => (
    <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition">
      <h2 className="text-gray-500 font-medium">{title}</h2>
      <p className={`text-4xl font-extrabold mt-2 ${color}`}>{value}</p>
    </div>
  );

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in transit":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
           SCMS Reports 
        </h1>
        <p className="text-gray-500 mt-2">
          Analyze suppliers, shipments, and deliveries performance
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex flex-wrap gap-3 mb-8 border border-gray-100">

        <input
          type="date"
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none"
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none"
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          onClick={generateReport}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
        >
          Generate Report
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card
          title="Total Suppliers"
          value={report.summary.totalSuppliers}
          color="text-blue-600"
        />

        <Card
          title="Total Shipments"
          value={report.summary.totalShipments}
          color="text-green-600"
        />

        <Card
          title="Total Deliveries"
          value={report.summary.totalDeliveries}
          color="text-purple-600"
        />

      </div>

      {/* SUPPLIERS */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden mb-8">

        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
             Suppliers Report
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {report.suppliers.map((s) => (
                <tr key={s.supplierCode} className="border-t hover:bg-indigo-50">
                  <td className="p-3">{s.supplierCode}</td>
                  <td className="p-3">{s.supplierName}</td>
                  <td className="p-3">{s.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* SHIPMENTS */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden mb-8">

        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            Shipment Report
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Number</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Destination</th>
              </tr>
            </thead>

            <tbody>
              {report.shipments.map((s) => (
                <tr key={s.shipmentNumber} className="border-t hover:bg-indigo-50">

                  <td className="p-3 font-medium">{s.shipmentNumber}</td>
                  <td className="p-3">{s.shipmentDate}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(s.shipmentStatus)}`}>
                      {s.shipmentStatus}
                    </span>
                  </td>

                  <td className="p-3">{s.destination}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* DELIVERIES */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
           Delivery Report
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Date</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Status</th>
                <th className="p-3">Shipment</th>
              </tr>
            </thead>

            <tbody>
              {report.deliveries.map((d) => (
                <tr key={d.deliveryCode} className="border-t hover:bg-indigo-50">

                  <td className="p-3 font-medium">{d.deliveryCode}</td>
                  <td className="p-3">{d.deliveryDate}</td>
                  <td className="p-3">{d.quantityDelivered}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(d.deliveryStatus)}`}>
                      {d.deliveryStatus}
                    </span>
                  </td>

                  <td className="p-3">{d.shipmentNumber}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}
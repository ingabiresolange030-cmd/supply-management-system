import { useEffect, useState } from "react";
import api from "./api";

export default function Delivery() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    deliveryCode: "",
    deliveryDate: "",
    quantityDelivered: "",
    deliveryStatus: "",
    shipmentNumber: "",
  });

  const [editMode, setEditMode] = useState(false);

  const loadDeliveries = async () => {
    try {
      const res = await api.get("/delivery");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const save = async () => {
    try {
      await api.post("/delivery", form);
      resetForm();
      loadDeliveries();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/delivery/${id}`);
      loadDeliveries();
    } catch (err) {
      console.log(err);
    }
  };

  const edit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const update = async () => {
    try {
      await api.put(`/delivery/${form.deliveryCode}`, form);
      resetForm();
      setEditMode(false);
      loadDeliveries();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setForm({
      deliveryCode: "",
      deliveryDate: "",
      quantityDelivered: "",
      deliveryStatus: "",
      shipmentNumber: "",
    });
    setEditMode(false);
  };

  // STATUS COLORS
  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in transit":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
           Delivery Management
        </h1>
        <p className="text-gray-500 mt-2">
          Track deliveries, quantities, and shipment status
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 mb-8 border border-gray-100">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {editMode ? " Update Delivery" : " Add New Delivery"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Delivery Code"
            value={form.deliveryCode}
            onChange={(e) =>
              setForm({ ...form, deliveryCode: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
            value={form.deliveryDate}
            onChange={(e) =>
              setForm({ ...form, deliveryDate: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Quantity Delivered"
            value={form.quantityDelivered}
            onChange={(e) =>
              setForm({ ...form, quantityDelivered: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Status (Pending, Delivered)"
            value={form.deliveryStatus}
            onChange={(e) =>
              setForm({ ...form, deliveryStatus: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none md:col-span-2"
            placeholder="Shipment Number"
            value={form.shipmentNumber}
            onChange={(e) =>
              setForm({ ...form, shipmentNumber: e.target.value })
            }
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">

          {!editMode ? (
            <button
              onClick={save}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              Save Delivery
            </button>
          ) : (
            <>
              <button
                onClick={update}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
              >
                Update Delivery
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          )}

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            Delivery List
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
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d) => (
                <tr
                  key={d.deliveryCode}
                  className="border-t hover:bg-purple-50 transition"
                >

                  <td className="p-3 font-medium">{d.deliveryCode}</td>
                  <td className="p-3">{d.deliveryDate}</td>

                  <td className="p-3 font-semibold">
                    {d.quantityDelivered}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        d.deliveryStatus
                      )}`}
                    >
                      {d.deliveryStatus}
                    </span>
                  </td>

                  <td className="p-3">{d.shipmentNumber}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => edit(d)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => remove(d.deliveryCode)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}
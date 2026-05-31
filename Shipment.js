import { useEffect, useState } from "react";
import api from "./api";

export default function Shipment() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    shipmentNumber: "",
    shipmentDate: "",
    shipmentStatus: "",
    destination: "",
  });

  const [editMode, setEditMode] = useState(false);

  const loadShipments = async () => {
    try {
      const res = await api.get("/shipment");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const save = async () => {
    try {
      await api.post("/shipment", form);
      resetForm();
      loadShipments();
    } catch (err) {
      console.error(err);
    }
  };

  const update = async () => {
    try {
      await api.put(`/shipment/${form.shipmentNumber}`, form);
      resetForm();
      loadShipments();
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (shipmentNumber) => {
    if (!window.confirm("Delete this shipment?")) return;

    try {
      await api.delete(`/shipment/${shipmentNumber}`);
      loadShipments();
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (item) => {
    setForm({
      shipmentNumber: item.shipmentNumber,
      shipmentDate: item.shipmentDate
        ? item.shipmentDate.split("T")[0]
        : "",
      shipmentStatus: item.shipmentStatus,
      destination: item.destination,
    });

    setEditMode(true);
  };

  const resetForm = () => {
    setForm({
      shipmentNumber: "",
      shipmentDate: "",
      shipmentStatus: "",
      destination: "",
    });

    setEditMode(false);
  };

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
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Shipment Management
        </h1>

        <p className="text-gray-500 mt-2">
          Track and manage all shipments
        </p>
      </div>

      {/* FORM */}

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-5">
          {editMode ? "Update Shipment" : "Add Shipment"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Shipment Number"
            className="border p-3 rounded-xl"
            value={form.shipmentNumber}
            disabled={editMode}
            onChange={(e) =>
              setForm({
                ...form,
                shipmentNumber: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-xl"
            value={form.shipmentDate}
            onChange={(e) =>
              setForm({
                ...form,
                shipmentDate: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Shipment Status"
            className="border p-3 rounded-xl"
            value={form.shipmentStatus}
            onChange={(e) =>
              setForm({
                ...form,
                shipmentStatus: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Destination"
            className="border p-3 rounded-xl"
            value={form.destination}
            onChange={(e) =>
              setForm({
                ...form,
                destination: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-5 flex gap-3">

          {!editMode ? (
            <button
              onClick={save}
              className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={update}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Update
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-300 px-5 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}

        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            Shipment List
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Number</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.shipmentNumber}
                  className="border-t hover:bg-blue-50"
                >
                  <td className="p-3">
                    {item.shipmentNumber}
                  </td>

                  <td className="p-3">
                    {item.shipmentDate
                      ? new Date(
                          item.shipmentDate
                        ).toLocaleDateString()
                      : ""}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(
                        item.shipmentStatus
                      )}`}
                    >
                      {item.shipmentStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    {item.destination}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => edit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        remove(item.shipmentNumber)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No shipments found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}
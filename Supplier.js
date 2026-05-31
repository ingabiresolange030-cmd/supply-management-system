import { useEffect, useState } from "react";
import api from "./api";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    supplierCode: "",
    supplierName: "",
    telephone: "",
    address: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);

  const loadSuppliers = async () => {
    try {
      const res = await api.get("/supplier");
      setSuppliers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSubmit = async () => {
    try {
      await api.post("/supplier", form);
      resetForm();
      loadSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (code) => {
    try {
      await api.delete(`/supplier/${code}`);
      loadSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/supplier/${form.supplierCode}`, form);
      resetForm();
      loadSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setForm({
      supplierCode: "",
      supplierName: "",
      telephone: "",
      address: "",
      email: "",
    });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
           Supplier Management
        </h1>
        <p className="text-gray-500 mt-2">
          Manage supplier information, contacts, and records
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {editMode ? " Update Supplier" : " Add New Supplier"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
            placeholder="Supplier Code"
            value={form.supplierCode}
            onChange={(e) => setForm({ ...form, supplierCode: e.target.value })}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
            placeholder="Supplier Name"
            value={form.supplierName}
            onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
            placeholder="Telephone"
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl md:col-span-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">

          {!editMode ? (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              Save Supplier
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
              >
                Update Supplier
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
            Supplier List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3">Telephone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((s, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-3 font-medium">{s.supplierCode}</td>
                  <td className="p-3">{s.supplierName}</td>
                  <td className="p-3">{s.telephone}</td>
                  <td className="p-3">{s.address}</td>
                  <td className="p-3 text-gray-600">{s.email}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s.supplierCode)}
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
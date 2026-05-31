

import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/register", form);

      if (res.data.success) {
        setSuccess("Account created successfully!");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">

      {/* CARD */}
      <div className="w-96 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Create Account
        </h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 text-red-200 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-500/20 text-green-200 text-sm p-2 rounded mb-4 text-center">
            {success}
          </div>
        )}

        {/* USERNAME */}
        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={register}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* BACK TO LOGIN LINK */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
}
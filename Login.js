import { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", form);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">

      {/* LOGIN CARD */}
      <div className="w-96 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
       SCMS Login
        </h1>

        <p className="text-center text-gray-300 text-sm mb-6">
          Supply Chain Management System
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-500/20 text-red-200 text-sm p-2 rounded mb-4 text-center">
            {error}
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
          className="w-full p-3 mb-5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/create-account"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create account
          </Link>
        </p>

      </div>

    </div>
  );
}
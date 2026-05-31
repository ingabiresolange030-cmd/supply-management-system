import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    // remove auth token if you have it
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">

        {/* LOGO */}
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold">
            SCMS
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Supply Chain Management System
          </p>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 p-4 space-y-2">

          <Link
            to="/dashboard"
            className={`block p-3 rounded-lg transition ${
              isActive("/dashboard")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
             Dashboard
          </Link>

          <Link
            to="/supplier"
            className={`block p-3 rounded-lg transition ${
              isActive("/supplier")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
             Supplier
          </Link>

          <Link
            to="/shipment"
            className={`block p-3 rounded-lg transition ${
              isActive("/shipment")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
             Shipment
          </Link>

          <Link
            to="/delivery"
            className={`block p-3 rounded-lg transition ${
              isActive("/delivery")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
             Delivery
          </Link>

          <Link
            to="/reports"
            className={`block p-3 rounded-lg transition ${
              isActive("/reports")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
             Reports
          </Link>

        </nav>

        {/* LOGOUT SECTION */}
        <div className="p-4 border-t border-gray-700">

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg"
          >
             Logout
          </button>

         

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
      </div>

    </div>
  );
}

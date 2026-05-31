import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Register from "./components/CreateAccount";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Supplier from "./components/Supplier";
import Shipment from "./components/Shipment";
import Delivery from "./components/Delivery";
import Reports from "./components/Reports";

function WithLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC AUTH PAGES */}
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<Register />} />

        {/* PRIVATE DASHBOARD (WITH SIDEBAR) */}
        <Route path="/dashboard" element={<WithLayout><Dashboard /></WithLayout>} />
        <Route path="/supplier" element={<WithLayout><Supplier /></WithLayout>} />
        <Route path="/shipment" element={<WithLayout><Shipment /></WithLayout>} />
        <Route path="/delivery" element={<WithLayout><Delivery /></WithLayout>} />
        <Route path="/reports" element={<WithLayout><Reports /></WithLayout>} />

        {/* REDIRECT INVALID ROUTES */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
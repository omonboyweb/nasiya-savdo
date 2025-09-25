import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import { ProtectedRoute } from "./components/PrivateRoute";
import AllAdmin from "./pages/admin/all-admin";
import SellerLayout from "./layouts/seller-layout";
import SuperAdmin from "./layouts/super-admin";
import { AdminLayouts } from "./layouts/admin";
import { Store } from "./pages/admin/store";
import { Debtor } from "./pages/admin/debtor";

function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* SUPER ADMIN layout */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute roles={["SUPER ADMIN"]}>
            <SuperAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AllAdmin />} />
        <Route path="admins" element={<AllAdmin />} />
        <Route path="store" element={<Store />} />
        <Route path="debtor" element={<Debtor />} />
      </Route>

      {/* ADMIN layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminLayouts />
          </ProtectedRoute>
        }
      >
        <Route index element={<AllAdmin />} />
        <Route path="users" element={<div>👤 Userlar</div>} />
      </Route>

      {/* STORE layout */}
      <Route
        path="/store"
        element={
          <ProtectedRoute roles={["STORE"]}>
            <SellerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Store Dashboard</div>} />
        <Route path="products" element={<div>📦 Mahsulotlar</div>} />
      </Route>

      {/* Unauthorized va 404 */}
      <Route path="/unauthorized" element={<div>❌ Kirish taqiqlangan</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;

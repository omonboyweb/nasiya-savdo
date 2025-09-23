import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import AdminLayout from "./layouts/admin-layout";
import SellerLayout from "./layouts/seller-layout";
import Home from "./pages/admin/home";
import { getStorage } from "./store/local-storage";

function App() {
  const token = getStorage("access_token");
  const role = getStorage("role");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            role === "admin" ? (
              <Navigate to="/seller" replace />
            ) : (
              <Navigate to="/admin" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={token ? <AdminLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
      </Route>

      <Route
        path="/seller"
        element={token ? <SellerLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<div>Seller Home</div>} />
      </Route>
    </Routes>
  );
}

export default App;

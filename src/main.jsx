import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import UserKostListPage from "./pages/user/UserKostListPage.jsx";
import UserLoginPage from "./pages/user/UserLoginPage.jsx";
import UserRegisterPage from "./pages/user/UserRegisterPage.jsx";
import UserKosDetailPage from "./pages/user/UserKostDetailPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminKosPage from "./pages/admin/AdminKosPage.jsx";
import AdminKosDetailPage from "./pages/admin/AdminKosDetailPage.jsx";
import AdminTambahKosPage from "./pages/admin/AdminTambahKos.jsx";
import AdminUserInfoPage from "./pages/admin/AdminUserInfo.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<UserKostListPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/kos/:id" element={<UserKosDetailPage />} />

      <Route path="/admin">
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="kos" element={<AdminKosPage />} />
          <Route path="kos/:id" element={<AdminKosDetailPage />} />
          <Route path="kos/tambah" element={<AdminTambahKosPage />} />

          {/**User Info */}
          <Route path="user-info" element={<AdminUserInfoPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

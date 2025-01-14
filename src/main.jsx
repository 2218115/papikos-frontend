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
import PemilikKosLayout from "./pages/pemilik-kos/PemilikKosLayout.jsx";
import PemilikKosDashboardPage from "./pages/pemilik-kos/PemilikKosDashboardPage.jsx";
import PemilikKosRegisterPage from "./pages/pemilik-kos/PemilikKosRegisterPage.jsx";
import PemilikKosPage from "./pages/pemilik-kos/kos/PemilikKosKosPage.jsx";
import PemilikKosTambahKosPage from "./pages/pemilik-kos/kos/PemilikKosTambahKosPage.jsx";
import PemilikKosKosDetailPage from "./pages/pemilik-kos/kos/PemilikKosKosDetailPage.jsx";
import UserKosBookingPage from "./pages/user/booking/UserKosBookingPage.jsx";
import UserBookingListPage from "./pages/user/booking/UserBookingListPage.jsx";
import PemilikKosBookingPage from "./pages/pemilik-kos/booking/PemilikKosBookingPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<UserKostListPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/kos/:id" element={<UserKosDetailPage />} />
      <Route path="/pemilik-kos/register" element={<PemilikKosRegisterPage />} />
      <Route path="/kos/:id/booking" element={<UserKosBookingPage />} />
      <Route path="/booking" element={<UserBookingListPage />} />

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

      <Route path="pemilik-kos">
        <Route element={<PemilikKosLayout />}>
          <Route index element={<PemilikKosDashboardPage />} />
          <Route path="kos" element={<PemilikKosPage />} />
          <Route path="kos/tambah" element={<PemilikKosTambahKosPage />} />
          <Route path="kos/:id" element={<PemilikKosKosDetailPage />} />

          <Route path="booking" element={<PemilikKosBookingPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

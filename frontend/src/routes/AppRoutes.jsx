import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import VendorLayout from "@/layouts/VendorLayout";

import Home from "../pages/Customer/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Services from "../pages/Customer/Services";
import ServiceDetails from "../pages/Customer/ServiceDetails";
import ProtectedRoute from "./ProtectedRoute";
import MyBookings from "@/pages/Customer/MyBookings";
import CustomerProfile from "@/pages/Customer/Profile";
import About from "@/pages/Customer/About";
import Dashboard from "@/pages/Vendor/Dashboard";
import MyServices from "@/pages/Vendor/MyServices";
import AddService from "@/pages/Vendor/AddService";
import EditService from "@/pages/Vendor/EditService";
import VendorBookings from "@/pages/Vendor/VendorBookings";
import Profile from "@/pages/Vendor/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute roles={["customer"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["customer"]}>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/vendor/"
          element={
            <ProtectedRoute roles={["vendor"]}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="services" element={<MyServices />} />

          <Route path="services/add" element={<AddService />} />

          <Route path="services/edit/:id" element={<EditService />} />

          <Route path="bookings" element={<VendorBookings />} />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

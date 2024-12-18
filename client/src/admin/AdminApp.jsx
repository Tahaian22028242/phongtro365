import React from "react";
import axios from "axios";
import { AdminContextProvider } from "./components/AdminContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function AdminApp() {
  return (
    <AdminContextProvider>
      <Routes>
        <Route path="/admin" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          } />
          <Route path="register" element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="reports" element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AdminContextProvider>
  );
}

export default AdminApp;
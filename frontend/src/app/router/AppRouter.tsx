import { Routes, Route } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import RoleBasedRoute from "./RoleBasedRoute";

import StudentDashboard from "../../features/workspace/pages/studentDashboard";
import CoordinatorDashboard from "../../features/workspace/pages/coordinatorDashboard";
import AdminDashboard from "../../features/workspace/pages/adminDashboard";
import DashboardLayout from "../../shared/layout/DashboardLayout";
import CreateProjectPage from "../../features/workspace/pages/CreateProject";
import ProjectDetailsPage from "../../features/workspace/pages/projectDetailsPage"; 

function AppRouter() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* STUDENT */}
      <Route
        path="/student/dashboard"
        element={
          <RoleBasedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </RoleBasedRoute>
        }
      />

      {/* COORDINATOR */}
      <Route
        path="/coordinator/dashboard"
        element={
          <RoleBasedRoute allowedRoles={["COORDINATOR"]}>
            <CoordinatorDashboard />
          </RoleBasedRoute>
        }
      />

      {/* ADMIN */}
      <Route element={<DashboardLayout />}>

        <Route
          path="/admin/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route path="/admin/create-project" element={<CreateProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
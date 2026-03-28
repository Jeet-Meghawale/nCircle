import { useState } from "react";
import StatsCard from "../../../shared/components/StatsCard";
import ProjectCard from "../../../shared/components/ProjectCard";
import CreateProjectModal from "../../../shared/components/CreateProjectModal";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    projects,
    totalProjects,
    openProjects,
    pendingApprovals,
    isLoading,
    isError,
  } = useAdminDashboard();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-red-500">Error</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="heading">Welcome back, John</h1>
          <p className="subtext">
            Manage projects and approve applications
          </p>
        </div>

        {/* 🔥 BUTTON */}
        <button
          className="btn-primary"
          onClick={() => navigate("/admin/create-project")}
        >
          + Create Problem Statement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Projects" value={totalProjects} />
        <StatsCard title="Open Projects" value={openProjects} />
        <StatsCard title="Pending Approvals" value={pendingApprovals} />
        <StatsCard title="Your Role" value="Admin" />
      </div>

      {/* Projects */}
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
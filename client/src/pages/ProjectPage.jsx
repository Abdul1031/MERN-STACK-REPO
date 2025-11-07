import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import "../pages/ProjectPage.css";
import ProjectModal from "./ProjectModal";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const userRes = await api.get("/auth/me", { withCredentials: true });
        setRole(userRes.data.role);

        const endpoint =
          userRes.data.role === "admin" ? "/projects" : "/projects/my-projects";

        const res = await api.get(endpoint, { withCredentials: true });
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDel = window.confirm("Delete this project?");
    if (!confirmDel) return;

    try {
      await api.delete(`/projects/${id}`, { withCredentials: true });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="project-container">
      <div className="project-header">
        <h2>Total Projects: {projects.length}</h2>

        {role === "admin" && (
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Project
          </button>
        )}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Created By</th>
            <th>Start</th>
            <th>End</th>
            <th>Assigned To</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.createdBy?.email || "—"}</td>
                <td>{new Date(p.startDate).toLocaleDateString()}</td>
                <td>{new Date(p.endDate).toLocaleDateString()}</td>
                <td>
                  {p.users?.length
                    ? p.users.map((u) => u.name).join(", ")
                    : "—"}
                </td>
                {role === "admin" && (
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingProject(p);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={role === "admin" ? 6 : 5}
                style={{ textAlign: "center", padding: "15px" }}
              >
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <ProjectModal
          closeModal={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          editData={editingProject}
          refresh={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default ProjectPage;

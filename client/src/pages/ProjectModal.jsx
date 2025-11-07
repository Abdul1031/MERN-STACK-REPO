import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import "../pages/ProjectPage.css";

const ProjectModal = ({ closeModal, editData, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    currency: "USD",
    users: [],
  });

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await api.get("/auth/allusers", { withCredentials: true });
        setUserList(res.data?.users || res.data || []);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    }
    loadUsers();

    if (editData) {
      setForm({
        name: editData.name,
        description: editData.description,
        startDate: editData.startDate.slice(0, 10),
        endDate: editData.endDate.slice(0, 10),
        totalBudget: editData.totalBudget || "",
        currency: editData.currency || "USD",
        users: editData.users.map((u) => u._id),
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        users: form.users,
      };
      if (editData) {
        await api.put(`/projects/${editData._id}`, payload, {
          withCredentials: true,
        });
        alert("Project updated!");
      } else {
        await api.post("/projects", payload, { withCredentials: true });
        alert("Project added!");
      }
      closeModal();
      refresh();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box project-modal">
        <h3>{editData ? "Edit Project" : "Add Project"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label>Project Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter project name"
              />
            </div>

            <div className="form-col">
              <label>Users</label>
              <select
                name="users"
                value={form.users[0] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    users: e.target.value ? [e.target.value] : [],
                  })
                }
              >
                <option value="">Select Users</option>
                {userList.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Project description..."
                rows={4}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-col">
              <label>End Date *</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {editData ? "Update" : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;

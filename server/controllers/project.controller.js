const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, users } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({
        error: "Missing required fields: name, description, startDate, endDate",
      });
    }

    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      users: users || [],
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("users", "name email role");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ users: req.user.id }).populate(
      "users",
      "name email"
    );

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, users } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({
        error: "Missing required fields: name, description, startDate, endDate",
      });
    }

    const updateData = {
      name,
      description,
      startDate,
      endDate,
      users: users || [],
    };

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project updated", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

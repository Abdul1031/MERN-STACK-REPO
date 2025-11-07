const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role");

const {
  createProject,
  getAllProjects,
  getUserProjects,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

router.post("/", authenticate, isAdmin, createProject);
router.get("/", authenticate, isAdmin, getAllProjects);
router.put("/:id", authenticate, isAdmin, updateProject);
router.delete("/:id", authenticate, isAdmin, deleteProject);

router.get("/my-projects", authenticate, getUserProjects);

module.exports = router;

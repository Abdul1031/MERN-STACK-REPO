const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const cookieParser = require("cookie-parser");

const app = express();

// ─── CORS Configuration ────────────────────────────────────────────────
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // In production, the frontend is served from the same origin — no CORS needed
  // But allow it for any custom domains if set
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

  if (allowedOrigins.length > 0) {
    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );
  }
} else {
  // In development, allow Vite dev server
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

// ─── Middleware ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── API Routes ─────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// ─── Serve React Static Files (Production) ──────────────────────────────
if (isProduction) {
  const clientBuildPath = path.join(__dirname, "client", "dist");
  app.use(express.static(clientBuildPath));

  // All non-API routes serve the React app (SPA client-side routing)
  // Express 5 requires named wildcard: {*path} instead of *
  app.get("{*path}", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "API route not found" });
    }
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ─── Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

module.exports = app;





const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");



const clientRoutes = require("./routes/clientRoutes");
const serviceTypeRoutes = require("./routes/serviceTypeRoutes");
const taskTemplateRoutes = require("./routes/taskTemplateRoutes");
const engagementRoutes =
  require("./routes/engagementRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/service-types", serviceTypeRoutes);
app.use(
  "/api/engagements",
  engagementRoutes
);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running"
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/service-types", serviceTypeRoutes);
app.use("/api/task-templates", taskTemplateRoutes);
// Protected test route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected profile route",
    user: req.user
  });
});


module.exports = app;
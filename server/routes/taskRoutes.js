const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  getAllTasks
);

router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

router.post(
  "/",
  authMiddleware,
  createTask
);

router.put(
  "/:id",
  authMiddleware,
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);
router.put(
  "/:id/assign",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  assignTask
);
module.exports = router;
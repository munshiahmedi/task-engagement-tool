const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTaskTemplate,getAllTaskTemplates,getTaskTemplateById,updateTaskTemplate,deleteTaskTemplate
} = require("../controllers/taskTemplateController");

router.post(
  "/",
  authMiddleware,
  createTaskTemplate
);

router.get(
  "/",
  authMiddleware,
  getAllTaskTemplates
);

router.get(
  "/:id",
  authMiddleware,
  getTaskTemplateById
);
router.put(
  "/:id",
  authMiddleware,
  updateTaskTemplate
);
router.delete(
  "/:id",
  authMiddleware,
  deleteTaskTemplate
);

module.exports = router;
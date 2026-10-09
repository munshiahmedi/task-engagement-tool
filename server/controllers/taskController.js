const taskService = require("../services/taskService");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks
    });

  } catch (error) {
    console.error("Get tasks error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {
    console.error("Get task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch task"
    });
  }
};

const createTask = async (req, res) => {
  try {
    const {
      engagement_id,
      task_template_id,
      title,
      description,
      assigned_to,
      due_date
    } = req.body;

    if (!engagement_id || !title) {
      return res.status(400).json({
        success: false,
        message: "Engagement and title are required"
      });
    }

    const task = await taskService.createTask({
      engagement_id,
      task_template_id,
      title,
      description,
      assigned_to,
      due_date
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });

  } catch (error) {
    console.error("Create task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigned_to, due_date } = req.body;

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (
      req.user.role === "TEAM_MEMBER" &&
      task.assigned_to !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update tasks assigned to you"
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required"
      });
    }

    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      assigned_to,
      due_date
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    });

  } catch (error) {
    console.error("Update task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await taskService.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Delete task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete task"
    });
  }
};
const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    if (!assigned_to) {
      return res.status(400).json({
        success: false,
        message: "assigned_to is required"
      });
    }

    const task = await taskService.assignTask(id, assigned_to);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      data: task
    });
  } catch (error) {
    console.error("Assign task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to assign task"
    });
  }
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignTask
};
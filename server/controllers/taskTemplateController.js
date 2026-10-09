const taskTemplateService = require("../services/taskTemplateService");

const createTaskTemplate = async (req, res) => {
  try {
    const {
      service_type_id,
      title,
      description
    } = req.body;

    if (!service_type_id || !title) {
      return res.status(400).json({
        success: false,
        message: "Service type and title are required"
      });
    }

    const taskTemplate =
      await taskTemplateService.createTaskTemplate({
        service_type_id,
        title,
        description
      });

    res.status(201).json({
      success: true,
      message: "Task template created successfully",
      data: taskTemplate
    });

  } catch (error) {
    console.error(
      "Create task template error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to create task template"
    });
  }
};
const getAllTaskTemplates = async (req, res) => {
  try {
    const templates =
      await taskTemplateService.getAllTaskTemplates();

    res.status(200).json({
      success: true,
      data: templates
    });

  } catch (error) {
    console.error(
      "Get task templates error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch task templates"
    });
  }
};
const getTaskTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskTemplate = await taskTemplateService.getTaskTemplateById(id);

    if (!taskTemplate) {
      return res.status(404).json({
        success: false,
        message: "Task template not found"
      });
    }

    res.status(200).json({
      success: true,
      data: taskTemplate
    });

  } catch (error) {
    console.error(
      "Get task template error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch task template"
    });
  }
};
const updateTaskTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      service_type_id,
      title,
      description
    } = req.body;

    if (!service_type_id || !title) {
      return res.status(400).json({
        success: false,
        message: "Service type and title are required"
      });
    }

    const template =
      await taskTemplateService.updateTaskTemplate(
        id,
        {
          service_type_id,
          title,
          description
        }
      );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Task template not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task template updated successfully",
      data: template
    });

  } catch (error) {
    console.error(
      "Update task template error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update task template"
    });
  }
};
const deleteTaskTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted =
      await taskTemplateService.deleteTaskTemplate(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task template not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task template deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete task template error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete task template"
    });
  }
};
module.exports = {
  createTaskTemplate,
  getAllTaskTemplates,
  getTaskTemplateById,updateTaskTemplate,deleteTaskTemplate
};
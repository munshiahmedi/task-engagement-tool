const serviceTypeService = require("../services/serviceTypeService");

const createServiceType = async (req, res) => {
  try {
    const {
      name,
      description,
      is_recurring
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service type name is required"
      });
    }

    const serviceType = await serviceTypeService.createServiceType({
      name,
      description,
      is_recurring
    });

    res.status(201).json({
      success: true,
      message: "Service type created successfully",
      data: serviceType
    });

  } catch (error) {
    console.error("Create service type error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create service type"
    });
  }
};
const getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes =
      await serviceTypeService.getAllServiceTypes();

    res.status(200).json({
      success: true,
      data: serviceTypes
    });

  } catch (error) {
    console.error("Get service types error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service types"
    });
  }
};


const getServiceTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceType =
      await serviceTypeService.getServiceTypeById(id);

    if (!serviceType) {
      return res.status(404).json({
        success: false,
        message: "Service type not found"
      });
    }

    res.status(200).json({
      success: true,
      data: serviceType
    });

  } catch (error) {
    console.error("Get service type error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service type"
    });
  }
};
const updateServiceType = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      is_recurring
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service type name is required"
      });
    }

    const serviceType =
      await serviceTypeService.updateServiceType(id, {
        name,
        description,
        is_recurring
      });

    if (!serviceType) {
      return res.status(404).json({
        success: false,
        message: "Service type not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service type updated successfully",
      data: serviceType
    });

  } catch (error) {
    console.error("Update service type error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update service type"
    });
  }
};
const deleteServiceType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted =
      await serviceTypeService.deleteServiceType(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Service type not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service type deleted successfully"
    });

  } catch (error) {
    console.error("Delete service type error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete service type"
    });
  }
};
module.exports = {
  createServiceType,getAllServiceTypes,getServiceTypeById,updateServiceType,deleteServiceType
};
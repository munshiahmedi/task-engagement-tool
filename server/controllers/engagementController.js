const engagementService = require("../services/engagementService");

const createEngagement = async (req, res) => {
  try {
    const {
      client_id,
      service_type_id,
      period_start,
      period_end
    } = req.body;

    if (
      !client_id ||
      !service_type_id ||
      !period_start ||
      !period_end
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Client, service type, period start and period end are required"
      });
    }

    const clientExists =
  await engagementService.checkClientExists(client_id);

if (!clientExists) {
  return res.status(404).json({
    success: false,
    message: "Client not found"
  });
}

const serviceExists =
  await engagementService.checkServiceTypeExists(
    service_type_id
  );

if (!serviceExists) {
  return res.status(404).json({
    success: false,
    message: "Service type not found"
  });
}
if (period_start > period_end) {
  return res.status(400).json({
    success: false,
    message: "Period start cannot be after period end"
  });
}
    const engagement =
      await engagementService.createEngagement({
        client_id,
        service_type_id,
        period_start,
        period_end,
        created_by: req.user.id
      });

    res.status(201).json({
      success: true,
      message: "Engagement created successfully",
      data: engagement
    });

  } catch (error) {
    console.error(
      "Create engagement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to create engagement"
    });
  }
};
const getAllEngagements = async (req, res) => {
  try {
    const engagements =
      await engagementService.getAllEngagements();

    res.status(200).json({
      success: true,
      data: engagements
    });

  } catch (error) {
    console.error(
      "Get engagements error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch engagements"
    });
  }
};
const getEngagementById = async (req, res) => {
  try {
    const { id } = req.params;

    const engagement =
      await engagementService.getEngagementById(id);

    if (!engagement) {
      return res.status(404).json({
        success: false,
        message: "Engagement not found"
      });
    }

    res.status(200).json({
      success: true,
      data: engagement
    });

  } catch (error) {
    console.error(
      "Get engagement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch engagement"
    });
  }
};
const updateEngagement = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      client_id,
      service_type_id,
      period_start,
      period_end
    } = req.body;

    if (
      !client_id ||
      !service_type_id ||
      !period_start ||
      !period_end
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Client, service type, period start and period end are required"
      });
    }

    if (period_start > period_end) {
      return res.status(400).json({
        success: false,
        message:
          "Period start cannot be after period end"
      });
    }

    const clientExists =
      await engagementService.checkClientExists(
        client_id
      );

    if (!clientExists) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    const serviceExists =
      await engagementService.checkServiceTypeExists(
        service_type_id
      );

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Service type not found"
      });
    }

    const engagement =
      await engagementService.updateEngagement(
        id,
        {
          client_id,
          service_type_id,
          period_start,
          period_end
        }
      );

    if (!engagement) {
      return res.status(404).json({
        success: false,
        message: "Engagement not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Engagement updated successfully",
      data: engagement
    });

  } catch (error) {
    console.error(
      "Update engagement error:",
      error.message
    );

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message:
          "Engagement already exists for this client, service and period"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update engagement"
    });
  }
};
const deleteEngagement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted =
      await engagementService.deleteEngagement(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Engagement not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Engagement deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete engagement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete engagement"
    });
  }
};
module.exports = {
  createEngagement,getAllEngagements,getEngagementById,updateEngagement,deleteEngagement
};
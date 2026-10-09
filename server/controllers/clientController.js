const clientService = require("../services/clientService");

const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required"
      });
    }

    const client = await clientService.createClient({
      name,
      email,
      phone
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client
    });

  } catch (error) {
    console.error("Create client error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create client"
    });
  }
};
const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();

    res.status(200).json({
      success: true,
      data: clients
    });

  } catch (error) {
    console.error("Get clients error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch clients"
    });
  }
};
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await clientService.getClientById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });

  } catch (error) {
    console.error("Get client error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch client"
    });
  }
};
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required"
      });
    }

    const client = await clientService.updateClient(id, {
      name,
      email,
      phone
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: client
    });

  } catch (error) {
    console.error("Update client error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update client"
    });
  }
};
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await clientService.deleteClient(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully"
    });

  } catch (error) {
    console.error("Delete client error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete client"
    });
  }
}; 
 
module.exports = {
  createClient,
  getAllClients,getClientById,updateClient,deleteClient
};
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createClient,
  getAllClients,getClientById,updateClient,deleteClient
} = require("../controllers/clientController");

router.post(
  "/",
  authMiddleware,
  createClient
);
router.get(
  "/",
  authMiddleware,
  getAllClients
);
router.get(
  "/:id",
  authMiddleware,
  getClientById
);
router.put(
  "/:id",
  authMiddleware,
  updateClient
);
router.delete(
  "/:id",
  authMiddleware,
  deleteClient
);
module.exports = router;
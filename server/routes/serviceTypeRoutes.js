const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createServiceType,getAllServiceTypes,getServiceTypeById,updateServiceType,deleteServiceType
} = require("../controllers/serviceTypeController");

router.post(
  "/",
  authMiddleware,
  createServiceType
);

router.get(
  "/",
  authMiddleware,
  getAllServiceTypes
);

router.get(
  "/:id",
  authMiddleware,
  getServiceTypeById
);
router.put(
  "/:id",
  authMiddleware,
    updateServiceType
);
router.delete(
  "/:id",
  authMiddleware,
  deleteServiceType
);
module.exports = router;
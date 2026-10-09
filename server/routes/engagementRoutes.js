const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createEngagement,getAllEngagements,getEngagementById,updateEngagement,deleteEngagement
} = require("../controllers/engagementController");

router.post(
  "/",
  authMiddleware,
  createEngagement
);
router.get(
  "/",
  authMiddleware,
    getAllEngagements
);
router.get(
  "/:id",
    authMiddleware,
    getEngagementById
);
router.put(
  "/:id",
    authMiddleware,
    updateEngagement
);
router.delete(
  "/:id",
    authMiddleware,
    deleteEngagement
);
module.exports = router;
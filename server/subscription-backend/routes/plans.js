const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

// GET /api/plans
router.get("/", async (req, res) => {
  const plans = await Plan.find().lean();
  res.json({ data: plans });
});

module.exports = router;

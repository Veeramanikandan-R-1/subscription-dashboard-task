const express = require("express");
const router = express.Router();
const { authenticate, authorizeRole } = require("../middleware/auth");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const User = require("../models/User");

// POST /api/subscribe/:planId (authenticated user subscribes)
router.post("/subscribe/:planId", authenticate, async (req, res) => {
  const planId = req.params.planId;
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ error: "Plan not found" });

  const userId = req.user.id;

  // compute start and end date
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + plan.duration);

  // optionally expire existing active subscriptions for this user
  await Subscription.updateMany(
    { user: userId, status: "active" },
    { status: "expired" }
  );

  const subscription = new Subscription({
    user: userId,
    plan: planId,
    start_date: startDate,
    end_date: endDate,
    status: "active",
  });

  await subscription.save();

  res.status(201).json({ message: "Subscribed", data: subscription });
});

// GET /api/my-subscription (returns user’s active plan)
router.get("/my-subscription", authenticate, async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  // find active subscription where now between start and end and status active
  const sub = await Subscription.findOne({
    user: userId,
    status: "active",
    start_date: { $lte: now },
    end_date: { $gte: now },
  }).populate("plan");

  if (!sub) return res.json({ data: null, message: "No active subscription" });

  res.json({ data: sub });
});

// GET /api/admin/subscriptions (admin only – all subscriptions list)
router.get(
  "/admin/subscriptions",
  authenticate,
  authorizeRole("admin"),
  async (req, res) => {
    const subs = await Subscription.find()
      .populate("user", "name email")
      .populate("plan")
      .sort({ createdAt: -1 });
    res.json({ data: subs });
  }
);

module.exports = router;

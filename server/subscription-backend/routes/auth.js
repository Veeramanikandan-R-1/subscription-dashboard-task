const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signAccessToken, signRefreshToken } = require("../middleware/auth");
const { registerSchema, loginSchema } = require("../validators/validators");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) return next(error);

  const { name, email, password } = value;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role: "user" });
  await user.save();

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  // store refresh token (simple approach)
  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    message: "User registered",
    data: { id: user._id, name: user.name, email: user.email, role: user.role },
    tokens: { accessToken, refreshToken },
  });
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) return next(error);

  const { email, password } = value;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    message: "Logged in",
    data: { id: user._id, name: user.name, email: user.email, role: user.role },
    tokens: { accessToken, refreshToken },
  });
});

// POST /api/auth/refresh
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const accessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
});

// POST /api/auth/logout
router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
});

module.exports = router;

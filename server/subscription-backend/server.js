require("dotenv").config();
require("express-async-errors"); // handles async errors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plans");
const subscriptionRoutes = require("./routes/subscriptions");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api", subscriptionRoutes); // contains /subscribe, /my-subscription, /admin/subscriptions

// fallback
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

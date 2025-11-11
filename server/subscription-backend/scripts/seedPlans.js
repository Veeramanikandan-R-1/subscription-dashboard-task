require("dotenv").config();
const connectDB = require("../config/db");
const Plan = require("../models/Plan");

const seed = async () => {
  await connectDB();

  const plans = [
    {
      name: "Starter",
      price: 0,
      features: ["Basic access", "Community support", "Limited API calls"],
      duration: 30,
    },
    {
      name: "Pro",
      price: 9.99,
      features: [
        "Everything in Starter",
        "Priority support",
        "Unlimited API calls",
      ],
      duration: 30,
    },
    {
      name: "Annual Pro",
      price: 99.99,
      features: ["Everything in Pro", "1 year billing", "Discounted rate"],
      duration: 365,
    },
    {
      name: "Enterprise",
      price: 499.99,
      features: ["Dedicated support", "SLA", "Custom integrations"],
      duration: 365,
    },
  ];

  for (const p of plans) {
    const exists = await Plan.findOne({ name: p.name });
    if (!exists) {
      await Plan.create(p);
      console.log(`Seeded plan: ${p.name}`);
    } else {
      console.log(`Plan exists: ${p.name}`);
    }
  }
  console.log("Seeding done");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

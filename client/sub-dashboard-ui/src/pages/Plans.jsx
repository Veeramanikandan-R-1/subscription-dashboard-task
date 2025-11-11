import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/plans").then((res) => setPlans(res.data));
  }, []);

  const handleSubscribe = async (planId) => {
    if (!accessToken) return navigate("/login");
    await axiosInstance.post(`/subscribe/${planId}`);
    alert("Subscription successful!");
    navigate("/dashboard");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-2">${plan.price}</p>
            <ul className="mb-3 text-sm list-disc pl-5">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

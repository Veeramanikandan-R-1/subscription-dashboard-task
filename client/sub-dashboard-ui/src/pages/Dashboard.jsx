import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Dashboard() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    axiosInstance.get("/my-subscription").then((res) => {
        console.log('res',res)
        setSubscription(res.data.data)});
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Subscription</h2>
      {!subscription ? (
        <p>No active subscription.</p>
      ) : (
        <div className="border rounded p-4 shadow w-80">
          <h3 className="font-semibold">{subscription.plan.name}</h3>
          <p>Status: {subscription.status}</p>
          <p>Start: {new Date(subscription.start_date).toLocaleDateString()}</p>
          <p>End: {new Date(subscription.end_date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/subscriptions").then((res) => setSubs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Subscriptions</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.user?.name}</td>
              <td className="border p-2">{s.plan?.name}</td>
              <td className="border p-2">{s.status}</td>
              <td className="border p-2">
                {new Date(s.start_date).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(s.end_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

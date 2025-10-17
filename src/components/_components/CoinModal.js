"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPage } from "@/lib/getAllPages";

export function GetUserCreditHistory(userId) {
  const SEARCH_QUERY = `
    query GetUserCreditHistory($id: ID!) {
      user(id: $id, idType: DATABASE_ID) {
        id
        creditHistoryProfile {
          creditHistory {
            date
            time
            creditStatus
            transaction
            amount
            balance
          }
        }
      }
    }
  `;
  return fetchPage(SEARCH_QUERY, { id: userId });
}

const decryptId = (id) => {
  // Decode base64 and extract the numeric part
  try {
    const decoded = atob(id); // "user:301"
    const parts = decoded.split(":");
    return parts[1] || id;
  } catch {
    return id;
  }
};

const CoinModal = () => {
  const { user } = useAuth();
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCreditHistory = async () => {
      if (!user?.id) return;
      setLoading(true);
      const decryptedId = decryptId(user.id);
      try {
        const data = await GetUserCreditHistory(decryptedId);
        console.log("Credit history data:", data);
        setCreditHistory(
          data?.data?.user?.creditHistoryProfile?.creditHistory || []
        );
      } catch (err) {
        console.error("Error fetching credit history via fetchPage:", err);
        setCreditHistory([]);
      }
      setLoading(false);
    };
    fetchCreditHistory();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto">
      <Typography variant="h2" className="font-bold text-gray-800 mb-2 mt-4">
        My WIU balance
      </Typography>
      <Typography variant="paragraph" className="mb-4 text-lg text-gray-600">
        Here's an overview of account transactions, including all information on
        income and expenses. Want to learn more about our WIU Coin system?
        Please read the{" "}
        <span className="text-red-600">description under "WIU Coins."</span>
      </Typography>
      <Typography variant="h4" className="font-bold text-green-700 mb-4">
        my current account balance:
      </Typography>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">action</th>
              <th className="py-3 px-4 text-left">+ / -</th>
              <th className="py-3 px-4 text-left">Account balance</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : creditHistory.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              creditHistory.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4">
                    {item.date
                      ? new Date(Number(item.date) * 1000).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-4">{item.transaction}</td>
                  <td className="py-2 px-4">
                    {Array.isArray(item.creditStatus)
                      ? item.creditStatus.join(", ")
                      : item.creditStatus}
                  </td>
                  <td className="py-2 px-4 font-bold">{item.balance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Typography variant="paragraph" className="mt-4 text-lg text-gray-600">
        You'll soon be able to exchange your WIU coins for cool and useful
        things. We're currently working on setting up this system. In the
        meantime, you can collect coins by submitting suggestions for improving
        our posts. Thank you for your support!
      </Typography>
    </div>
  );
};

export default CoinModal;

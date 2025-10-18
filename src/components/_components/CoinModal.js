"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPage } from "@/lib/getAllPages";

export function GetUserCreditHistory(userId) {
  // Determine the appropriate ID type based on the user ID format
  let idType = "DATABASE_ID";

  // If it's an OAuth fallback ID, we might need to use a different approach
  if (typeof userId === "string" && userId.startsWith("oauth_")) {
    // For OAuth fallback IDs, try using the ID directly or as a string
    idType = "ID";
  }

  const SEARCH_QUERY = `
    query GetUserCreditHistory($id: ID!) {
      user(id: $id, idType: ${idType}) {
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
  // Handle different ID formats
  try {
    // Check if it's a base64 encoded ID (like "dXNlcjozMDE=")
    if (id.includes("=") || /^[A-Za-z0-9+/]+=*$/.test(id)) {
      const decoded = atob(id); // "user:301"
      const parts = decoded.split(":");
      return parts[1] || id;
    }

    // Check if it's an OAuth fallback ID (like "oauth_google_1760806012534")
    if (id.startsWith("oauth_")) {
      // For OAuth fallback IDs, we need to handle them differently
      // Extract the numeric part or use the full ID
      const parts = id.split("_");
      const numericPart = parts[parts.length - 1];

      // If the last part is numeric, use it; otherwise use the full ID
      if (/^\d+$/.test(numericPart)) {
        return numericPart;
      }
      return id;
    }

    // For regular numeric IDs, return as is
    return id;
  } catch {
    // If decoding fails, return the original ID
    return id;
  }
};

const CoinModal = () => {
  const { user } = useAuth();
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreditHistory = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);

      const decryptedId = decryptId(user.id);
      console.log("Original user ID:", user.id);
      console.log("Decrypted ID:", decryptedId);

      try {
        const data = await GetUserCreditHistory(decryptedId);
        console.log("Credit history data:", data);

        if (data?.errors) {
          console.error("GraphQL errors:", data.errors);
          setError(
            "Failed to load credit history. This might be because you're a new OAuth user."
          );
          setCreditHistory([]);
        } else {
          setCreditHistory(
            data?.data?.user?.creditHistoryProfile?.creditHistory || []
          );
        }
      } catch (err) {
        console.error("Error fetching credit history via fetchPage:", err);
        setError("Failed to load credit history. Please try again later.");
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

      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md">
          <Typography variant="small" className="text-yellow-800">
            {error}
          </Typography>
        </div>
      )}

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

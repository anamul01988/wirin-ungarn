"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPage } from "@/lib/getAllPages";
import { InlineLoader } from "./Loader";
import Image from "next/image";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

// Brand color used in the WIU wallet design

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
            "Der Kontostand konnte nicht geladen werden. Möglicherweise bist du ein neuer OAuth-Nutzer."
          );
          setCreditHistory([]);
        } else {
          setCreditHistory(
            data?.data?.user?.creditHistoryProfile?.creditHistory || []
          );
        }
      } catch (err) {
        console.error("Error fetching credit history via fetchPage:", err);
        setError(
          "Fehler beim Laden des Kontostands. Bitte versuche es später erneut."
        );
        setCreditHistory([]);
      }
      setLoading(false);
    };
    fetchCreditHistory();
  }, [user]);

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{ fontSize: "14px" }} // base font size for remaining text
    >
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/WIU-Muenzen.jpg"
          imageAlt="WIU-Muenzen"
        />
      </div>

      <Typography
        variant="h4"
        className="mb-2"
        style={{
          fontSize: "22px",
          fontWeight: 400,
          color: "#494158",
        }}
      >
        Mein WIU-Saldo
      </Typography>

      <Typography
        variant="paragraph"
        className="mb-4 text-[#56646F]"
        style={{ fontSize: "14px" }}
      >
        Hier ist die Übersicht über die Konto-Transaktionen mit allen
        Informationen über Einnahmen und Ausgaben. Du möchtest mehr über unser
        WIU-Münzen-System wissen? Dann lies gerne die{" "}
        <span className="text-red-600">
          Beschreibung unter &quot;WIU-Münzen&quot;.
        </span>
      </Typography>

      <Typography
        variant="h4"
        className="mb-4"
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#436f4d",
        }}
      >
        mein aktueller Kontostand:
      </Typography>

      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md">
          <Typography
            variant="small"
            className="text-yellow-800"
            style={{ fontSize: "14px" }}
          >
            {error}
          </Typography>
        </div>
      )}

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: "#436f4d", color: "#FFFFFF" }}>
              <th
                className="py-3 px-4 text-left"
                style={{ fontSize: "14px", borderRight: "1px solid #FFFFFF" }}
              >
                Datum
              </th>
              <th
                className="py-3 px-4 text-left"
                style={{ fontSize: "14px", borderRight: "1px solid #FFFFFF" }}
              >
                Aktion
              </th>
              <th
                className="py-3 px-4 text-left"
                style={{ fontSize: "14px", borderRight: "1px solid #FFFFFF" }}
              >
                + / -
              </th>
              <th className="py-3 px-4 text-left" style={{ fontSize: "14px" }}>
                Kontostand
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center"
                  style={{ fontSize: "14px" }}
                >
                  <InlineLoader size="medium" />
                </td>
              </tr>
            ) : creditHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-500"
                  style={{ fontSize: "14px" }}
                >
                  Keine Transaktionen gefunden.
                </td>
              </tr>
            ) : (
              creditHistory.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4" style={{ fontSize: "14px" }}>
                    {item.date
                      ? new Date(Number(item.date) * 1000).toLocaleDateString(
                          "de-DE"
                        )
                      : "-"}
                  </td>
                  <td className="py-2 px-4" style={{ fontSize: "14px" }}>
                    {item.transaction}
                  </td>
                  <td className="py-2 px-4" style={{ fontSize: "14px" }}>
                    {Array.isArray(item.creditStatus)
                      ? item.creditStatus.join(", ")
                      : item.creditStatus}
                  </td>
                  <td
                    className="py-2 px-4 font-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {item.balance}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Typography
        variant="paragraph"
        className="mt-4 text-[#56646F]"
        style={{ fontSize: "14px" }}
      >
        Du kannst deine WIU-Münzen bald gegen tolle und nützliche Dinge
        eintauschen. Wir arbeiten derzeit daran, dieses System aufzubauen. In
        der Zwischenzeit kannst du Münzen sammeln, indem du uns
        Verbesserungsvorschläge für unsere Beiträge übermittelst. Vielen Dank
        für deine Unterstützung!
      </Typography>
    </div>
  );
};

export default CoinModal;

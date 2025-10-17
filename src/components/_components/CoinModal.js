"use client";

import React, { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const CoinModal = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    status: "Active", // Default status
  });

  console.log("user in coin modal:", user);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        status: user.status || "Active", // Default to 'Active' if no status is provided
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original user data
    if (user) {
      setFormData({
        email: user.email || "",
        status: user.status || "Active",
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update user coin status
      console.log("Updating coin status with data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just show success message
      alert("Coin Status erfolgreich aktualisiert!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating coin status:", error);
      alert(
        "Fehler beim Aktualisieren des Coin-Status. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-red-600 mb-6 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center">
        <Typography
          variant="h4"
          className="font-bold text-center text-[#FFD6D9]"
        >
          Coin Status
        </Typography>
      </div>

      {/* Coin Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center relative overflow-hidden">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 80px) 100vw, 80px"
                />
              ) : (
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <div>
              <Typography variant="h5" className="font-bold text-gray-800">
                {user?.name || "User"}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Status: {formData.status}
              </Typography>
            </div>
          </div>
          <Button
            color="red"
            onClick={isEditing ? handleSave : handleEdit}
            disabled={isLoading}
            className="px-6 py-2"
          >
            {isLoading
              ? "Speichern..."
              : isEditing
              ? "Speichern"
              : "Bearbeiten"}
          </Button>
        </div>

        {/* Coin Form */}
        <div className="grid grid-cols-1 gap-6">
          {/* Email - Read Only */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              E-Mail
            </Typography>
            <Input
              type="email"
              name="email"
              value={formData.email}
              disabled={true}
              crossOrigin={undefined}
              className="!border-gray-300 !bg-gray-50"
            />
          </div>

          {/* Status */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              Status
            </Typography>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full border-gray-300 rounded-lg focus:border-red-500 disabled:bg-gray-50"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              color="gray"
              variant="outlined"
              onClick={handleCancel}
              className="px-6 py-2"
            >
              Abbrechen
            </Button>
            <Button
              color="red"
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2"
            >
              {isLoading ? "Speichern..." : "Änderungen speichern"}
            </Button>
          </div>
        )}

        {/* Info Message */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="small" className="text-blue-800">
            <strong>Hinweis:</strong> Der Status kann jederzeit geändert werden.
            Die E-Mail-Adresse ist schreibgeschützt.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;

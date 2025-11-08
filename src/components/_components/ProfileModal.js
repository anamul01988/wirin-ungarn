"use client";

import React, { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const ProfileModal = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    joinDate: "",
  });

  console.log("user in profile modal:", user);
  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      // Split the name into first and last name if it exists
      const [firstName = "", lastName = ""] = (user.name || "").split(" ");

      setFormData({
        firstName: user.firstName || firstName || "",
        lastName: user.lastName || lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("de-DE")
          : "",
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
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("de-DE")
          : "",
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update user profile
      console.log("Updating profile with data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just show success message
      alert("Profil erfolgreich aktualisiert!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#CC2233] mb-6 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center text-[#fff]">
        <Typography
          variant="h4"
          className="archive__page_title font-bold text-center text-[#FFF]"
        >
          Profil
        </Typography>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center relative overflow-hidden">
              {user?.image ? (
                <Image
                  src={user.image}
                  loading="lazy"
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
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Mitglied seit {formData.joinDate}
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

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              Vorname
            </Typography>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              crossOrigin={undefined}
              className="!border-gray-300 focus:!border-red-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              Nachname
            </Typography>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              crossOrigin={undefined}
              className="!border-gray-300 focus:!border-red-500"
            />
          </div>

          {/* Email - Editable */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              E-Mail <span className="text-red-500">*</span>
            </Typography>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              crossOrigin={undefined}
              className="!border-gray-300 focus:!border-red-500"
            />
            {isEditing && (
              <Typography variant="small" className="text-gray-500 mt-1">
                Sie können Ihre E-Mail-Adresse ändern
              </Typography>
            )}
          </div>

          {/* Phone */}
          <div>
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              Telefon
            </Typography>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              crossOrigin={undefined}
              className="!border-gray-300 focus:!border-red-500"
            />
          </div>

          {/* Join Date - Read Only */}
          <div className="md:col-span-2">
            <Typography
              variant="small"
              className="font-medium text-gray-700 mb-2"
            >
              Mitglied seit
            </Typography>
            <Input
              type="text"
              value={formData.joinDate}
              disabled={true}
              crossOrigin={undefined}
              className="!border-gray-300 !bg-gray-50"
            />
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
            <strong>Hinweis:</strong> Nur die E-Mail-Adresse kann geändert
            werden. Für andere Änderungen wenden Sie sich bitte an den Support.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

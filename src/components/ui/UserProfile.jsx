import React from "react";
import { useAuth } from "../../lib/auth-context";

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <p className="text-gray-900">{user.displayName || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <p className="text-gray-900">{user.username}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="text-gray-900">{user.email || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <p className="text-gray-900">{user.firstName || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <p className="text-gray-900">{user.lastName || "N/A"}</p>
        </div>

        {user.roles && user.roles.nodes && user.roles.nodes.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roles
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.roles.nodes.map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

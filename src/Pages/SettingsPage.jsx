import React, { useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import NotLoggedIn from "../Components/NotLoggedIn";
import ChangePassword from "../Components/settingsComponents/ChangePassword";
import { User, Mail, Shield, Edit } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);

  if (!user) return <NotLoggedIn />;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Header – Matches AdminProfile (no quick actions) */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-lg bg-white text-green-600 border-0">
              User Settings
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-2xl ring ring-white ring-offset-base-100 ring-offset-2 shadow-xl">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <User className="w-20 h-20 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-lg bg-white text-green-600 border-0">
                  <User className="w-4 h-4 mr-1" />
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) ||
                    "User"}
                </span>
                <span className="badge badge-lg bg-green-500 text-white border-0">
                  Active Account
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  {user.name || "User"}
                </h1>
                {/* <button className="btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 border-0">
                  <Edit className="w-5 h-5" />
                </button> */}
              </div>

              <p className="text-xl text-green-50 break-all">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Account Information */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("account")}
              >
                <h2 className="text-2xl font-bold text-green-700 flex items-center gap-3">
                  <User className="w-8 h-8" />
                  Account Information
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "account" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {expandedSection === "account" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <p className="text-lg text-gray-800 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <p className="text-lg text-gray-800 mt-1">
                      {user.name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Account Role
                    </label>
                    <p className="text-lg text-gray-800 mt-1 capitalize">
                      {user.role || "user"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("password")}
              >
                <h2 className="text-2xl font-bold text-green-700 flex items-center gap-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  Change Password
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "password" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {expandedSection === "password" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <ChangePassword />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

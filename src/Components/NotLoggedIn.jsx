import { AlertTriangleIcon, ArrowRight, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = ({ isOpen, onClose, message = "You need to login first to access this feature!" }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <AlertTriangleIcon className="text-green-600 h-16 w-16" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Login Required
          </h2>
          <p className="text-gray-600 mb-8">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
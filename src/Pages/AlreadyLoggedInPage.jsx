import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Home, LogOut, CheckCircle } from 'lucide-react';
import { useAuth } from '../Context/AuthProvider';

const AlreadyLoggedInPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">You're Already Logged In</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Success Message */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Active Session</p>
              <p className="text-sm text-green-700 mt-1">
                You're currently signed in. Continue learning or switch accounts.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go to Home
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>

          {/* User Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadyLoggedInPage;
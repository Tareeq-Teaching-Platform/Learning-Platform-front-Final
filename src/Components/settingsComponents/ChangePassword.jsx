import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config/api';

const ChangePassword = () => {
    const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmed: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const changePassword = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.currentPassword || !formData.newPassword || !formData.newPasswordConfirmed) {
            toast.error("Please fill in all fields")
            return;
        }

        if (formData.newPassword !== formData.newPasswordConfirmed) {
            toast.error("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_BASE_URL}/auth/change-password`,
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            toast.success("Password changed successfully!");
            // Clear form
            setFormData({
                currentPassword: "",
                newPassword: "",
                newPasswordConfirmed: ""
            });
            setIsPasswordSectionOpen(false);
        } catch (error) {
            console.error('Error changing password', error);
            const errorMessage = error.response?.data?.message || "Error changing password. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <button
                onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
                <h2 className="text-xl font-semibold text-green-700">Change Password</h2>
                <svg
                    className={`w-6 h-6 text-green-600 transform transition-transform ${
                        isPasswordSectionOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isPasswordSectionOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-green-100">
                    <form onSubmit={changePassword} className="space-y-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="newPasswordConfirmed" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="newPasswordConfirmed"
                                name="newPasswordConfirmed"
                                value={formData.newPasswordConfirmed}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-green-200 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChangePassword
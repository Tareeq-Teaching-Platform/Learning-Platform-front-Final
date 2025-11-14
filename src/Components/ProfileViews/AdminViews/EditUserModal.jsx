import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const EditUserModal = ({ User, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: User.name || "",
    email: User.email || "",
  });

  // useMutation for updating user
  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/admin/user/update/${User.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher updated successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update teacher");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-lg font-bold">Edit Teacher</h3>
            </div>
            <button
              onClick={onClose}
              disabled={updateUserMutation.isPending}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {updateUserMutation.isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-400 rounded-lg flex items-start gap-2">
              <svg
                className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 text-xs">
                {updateUserMutation.error?.response?.data?.message ||
                  "Failed to update teacher"}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Teacher Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={updateUserMutation.isPending}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={updateUserMutation.isPending}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={updateUserMutation.isPending}
                className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200 cursor-pointer"
              >
                {updateUserMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Teacher"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
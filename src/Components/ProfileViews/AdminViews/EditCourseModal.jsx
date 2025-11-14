import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const EditCourseModal = ({ course, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: course.title || "",
    description: course.description || "",
    price: course.price || "",
    token_price: course.token_price || "",
    status: course.status || "active",
    expires_at: course.expires_at ? course.expires_at.split("T")[0] : "",
    level_name: course.level_name || "",
    subject_name: course.subject_name || "",
  });

  // useMutation for updating course
  const updateCourseMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/courses/${course.id}`,
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
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCourseMutation.mutate(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cursor-default"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-lg font-bold">Edit Course</h3>
            </div>
            <button
              onClick={onClose}
              disabled={updateCourseMutation.isPending}
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
          {updateCourseMutation.isError && (
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
                {updateCourseMutation.error?.response?.data?.message ||
                  "Failed to update course"}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={updateCourseMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  disabled={updateCourseMutation.isPending}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                disabled={updateCourseMutation.isPending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  disabled={updateCourseMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Token Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.token_price}
                  onChange={(e) =>
                    setFormData({ ...formData, token_price: e.target.value })
                  }
                  required
                  disabled={updateCourseMutation.isPending}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Expires At
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.expires_at}
                onChange={(e) =>
                  setFormData({ ...formData, expires_at: e.target.value })
                }
                disabled={updateCourseMutation.isPending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Level <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.level_name}
                  onChange={(e) =>
                    setFormData({ ...formData, level_name: e.target.value })
                  }
                  required
                  disabled={updateCourseMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={formData.subject_name}
                  onChange={(e) =>
                    setFormData({ ...formData, subject_name: e.target.value })
                  }
                  required
                  disabled={updateCourseMutation.isPending}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={updateCourseMutation.isPending}
                className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateCourseMutation.isPending}
                className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200 cursor-pointer"
              >
                {updateCourseMutation.isPending ? (
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
                  "Update Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
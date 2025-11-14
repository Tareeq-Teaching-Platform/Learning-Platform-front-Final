import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../../../config/api";
import { toast } from "react-toastify";

const CreateCourseModal = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    subject_id: "",
    icon: "",
    expires_at: "",
  });

  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/subjects`);
      return res.data.data.subjects;
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/courses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course Created Successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCourseMutation.mutate(formData);
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h3 className="text-lg font-bold">Create New Course</h3>
            </div>
            <button
              onClick={onClose}
              disabled={createCourseMutation.isPending}
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
          {createCourseMutation.isError && (
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
                {createCourseMutation.error?.response?.data?.message ||
                  "Failed to create course"}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                disabled={createCourseMutation.isPending}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                disabled={createCourseMutation.isPending}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                disabled={createCourseMutation.isPending}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.subject_id}
                onChange={(e) =>
                  setFormData({ ...formData, subject_id: e.target.value })
                }
                required
                disabled={createCourseMutation.isPending || subjectsLoading}
              >
                <option value="">Select a subject</option>
                {subjects?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Icon URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                disabled={createCourseMutation.isPending}
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Expires At <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={formData.expires_at}
                onChange={(e) =>
                  setFormData({ ...formData, expires_at: e.target.value })
                }
                required
                disabled={createCourseMutation.isPending}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={createCourseMutation.isPending}
                className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createCourseMutation.isPending}
                className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200 cursor-pointer"
              >
                {createCourseMutation.isPending ? (
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
                    Creating...
                  </span>
                ) : (
                  "Create Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
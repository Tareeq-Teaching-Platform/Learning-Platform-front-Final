import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const EditLectureModal = ({ courseId, lecture, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: lecture.name || "",
    description: lecture.description || "",
    url: lecture.url || "",
    is_preview: lecture.is_preview || false,
    icon: lecture.icon || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/lectures/${lecture.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        onSuccess();
      } else {
        setError(response.data.message || "Failed to update lecture");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update lecture");
      console.error("Update lecture error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-lg font-bold">Edit Lecture</h3>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 text-xs">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Lecture Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Lecture Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter lecture name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                placeholder="Enter lecture description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                required
                disabled={loading}
              />
            </div>

            {/* Icon URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Icon URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="https://example.com/icon.png"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                disabled={loading}
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            {/* Preview Checkbox */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <input
                type="checkbox"
                id="is_preview_edit"
                className="w-4 h-4 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed"
                checked={formData.is_preview}
                onChange={(e) =>
                  setFormData({ ...formData, is_preview: e.target.checked })
                }
                disabled={loading}
              />
              <label
                htmlFor="is_preview_edit"
                className="flex-1 cursor-pointer"
              >
                <span className="block text-xs font-semibold text-gray-700">
                  Make this a preview lecture
                </span>
                <span className="block text-[10px] text-gray-500 mt-0.5">
                  Preview lectures are free for all users
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200 cursor-pointer"
              >
                {loading ? (
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
                  "Update Lecture"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLectureModal;

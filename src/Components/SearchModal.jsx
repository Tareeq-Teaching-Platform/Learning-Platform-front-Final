import React, { useState, useEffect } from "react";
import { Search, X, Sparkles, BookOpen, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchMode, setSearchMode] = useState("regular"); // 'regular' or 'ai'
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults([]);
      setError(null);
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const token = localStorage.getItem("token");

      if (searchMode === "regular") {
        // Regular search using existing API
        const response = await axios.get(
          `${API_BASE_URL}/courses?search=${encodeURIComponent(searchQuery)}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        if (response.data.success) {
          setResults(response.data.data.courses);
          if (response.data.data.courses.length === 0) {
            setError("No courses found matching your search");
          }
        } else {
          setError("Failed to search courses");
        }
      } else {
        // AI-powered search
        const response = await axios.post(
          `${API_BASE_URL}/ai/search-courses`,
          { description: searchQuery },
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (response.data.success) {
          setResults(response.data.data.courses);
          if (response.data.data.courses.length === 0) {
            setError("No courses found matching your description");
          }
        } else {
          setError(response.data.message || "AI search failed");
        }
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while searching. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Navigate to course
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="p-2 text-xl font-bold text-gray-700">Search Courses</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSearchMode("regular")}
              className={`btn btn-sm flex-1 p-2 ${
                searchMode === "regular"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "btn-outline"
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Regular Search
            </button>
            <button
              onClick={() => setSearchMode("ai")}
              className={`btn btn-sm flex-1 p-2 ${
                searchMode === "ai"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  : "btn-outline"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Search
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={
                searchMode === "regular"
                  ? "Search by course title or description..."
                  : 'Describe what you want to learn... (e.g., "I want to learn math for grade 5")'
              }
              className="input input-bordered flex-1 focus:outline-none focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn bg-green-600 text-white hover:bg-green-700 border-none"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mode Description */}
          <p className="text-xs text-gray-500 mt-2 mx-2">
            {searchMode === "regular" ? (
              <> Search courses by keywords in title or description</>
            ) : (
              <>
                 Describe what you want to learn and AI will suggest relevant
                courses
              </>
            )}
          </p>
        </div>

        {/* Results Section */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {/* Error Message */}
          {error && (
            <div className="alert alert-warning mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
                <p className="mt-4 text-gray-600">
                  {searchMode === "ai"
                    ? "AI is analyzing your request..."
                    : "Searching courses..."}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Found {results.length} course{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="card bg-base-100 border-2 border-gray-300 hover:border-green-400 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      {/* Course Icon */}
                      {course.icon ? (
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                          <img
                            src={course.icon}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                      )}

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {course.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="badge badge-sm bg-blue-100 text-blue-700 border-none">
                            {course.level_name}
                          </span>
                          <span className="badge badge-sm bg-purple-100 text-purple-700 border-none">
                            {course.subject_name}
                          </span>
                          {course.price > 0 && (
                            <span className="badge badge-sm bg-green-100 text-green-700 border-none">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {course.price}
                            </span>
                          )}
                          {course.price === 0 && (
                            <span className="badge badge-sm bg-amber-100 text-amber-700 border-none">
                              Free
                            </span>
                          )}
                        </div>

                        {/* Teacher Info */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="avatar">
                            <div className="w-6 h-6 rounded-full">
                              {course.teacher_profile ? (
                                <img
                                  src={course.teacher_profile}
                                  alt={course.teacher_name}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-xs text-gray-600">
                                    {course.teacher_name?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {course.teacher_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && results.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchMode === "ai"
                  ? "Try describing what you want to learn in more detail"
                  : "Try different keywords or use AI search for better results"}
              </p>
            </div>
          )}

          {/* Initial State */}
          {!loading && !searchQuery && (
            <div className="text-center py-12">
              <div className="mb-4">
                {searchMode === "regular" ? (
                  <Search className="w-16 h-16 text-gray-300 mx-auto" />
                ) : (
                  <Sparkles className="w-16 h-16 text-purple-300 mx-auto" />
                )}
              </div>
              <p className="text-gray-500 mb-2">
                {searchMode === "regular"
                  ? "Enter keywords to search for courses"
                  : "Describe what you want to learn"}
              </p>
              <p className="text-xs text-gray-400">
                {searchMode === "ai" &&
                  'Example: "Math for 5th graders" or "Learn English grammar"'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default SearchModal;

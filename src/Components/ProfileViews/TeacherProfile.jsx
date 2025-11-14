import React, { useEffect, useState, Suspense } from "react";
import { useAuth } from "../../Context/AuthProvider";
import {
  BookOpen,
  Edit,
  Plus,
  GraduationCap,
  Users,
  Activity,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import EditProfileModal from "../modals/EditProfileModal";
import CreateCourseModal from "./AdminViews/CreateCourseModal";

const TeacherProfile = () => {
  const { user, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [coursesData, setCoursesData] = useState({ courses: null, total: 0 });
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState("courses");

  const getCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/teachers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { courses, total } = response.data.data;
      setCoursesData({ courses, total });
    } catch (error) {
      console.error("Error getting courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user?.id]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const TableLoadingFallback = () => (
    <div className="flex justify-center py-12">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-lg bg-white text-green-600 border-0">
              Teacher Dashboard
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-2xl ring ring-white ring-offset-base-100 ring-offset-2 shadow-xl">
                  {user.profile_picture ? (
                    <img src={user.profile_picture} alt={user.name} />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <GraduationCap className="w-20 h-20 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-lg bg-white text-green-600 border-0">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Teacher
                </span>
                <span className="badge badge-lg bg-green-500 text-white border-0">
                  Course Creator
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  {user.name}
                </h1>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 border-0"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xl text-green-50 mb-6 break-all">
                {user.email}
              </p>

              <button
                onClick={() => setCreatingCourse(true)}
                className="btn bg-white text-green-600 hover:bg-green-50 border-0 shadow-md"
              >
                <Plus className="w-5 h-5" />
                Create New Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
            <div className="card-body text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : coursesData.total}
              </div>
              <p className="text-green-100 text-sm">Total Courses</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
            <div className="card-body text-center">
              <Activity className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading
                  ? "..."
                  : coursesData.courses?.filter((c) => c.status === "active")
                      .length || 0}
              </div>
              <p className="text-emerald-100 text-sm">Active Courses</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl">
            <div className="card-body text-center">
              <Users className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : "—"}
              </div>
              <p className="text-teal-100 text-sm">Total Students</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl">
            <div className="card-body text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : "$0"}
              </div>
              <p className="text-cyan-100 text-sm">Earnings</p>
            </div>
          </div>
        </div>

        {/* MY COURSES */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("courses")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  My Courses
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "courses" ? "rotate-180" : ""
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

              {expandedSection === "courses" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  {loading ? (
                    <TableLoadingFallback />
                  ) : coursesData.total === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
                      <p className="text-lg text-base-content/60 mb-4">
                        You haven't created any courses yet.
                      </p>
                      <button
                        onClick={() => setCreatingCourse(true)}
                        className="btn bg-green-600 hover:bg-green-700 text-white border-0 shadow-md"
                      >
                        <Plus className="w-5 h-5" />
                        Create Your First Course
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {coursesData.courses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() =>
                            (window.location.href = `/course/${course.id}`)
                          }
                          className="card bg-base-200 shadow-lg hover:shadow-xl transition-all hover:translate-y-1 duration-300 cursor-pointer"
                        >
                          {course.status === "active" && (
                            <div className="w-full text-center bg-green-300 rounded-t-2xl p-2 font-bold font-mono text-sm">
                              Active
                            </div>
                          )}
                          {course.status === "inactive" && (
                            <div className="w-full text-center bg-red-400 rounded-t-2xl p-2 font-bold font-mono text-sm">
                              Inactive
                            </div>
                          )}

                          {course.icon ? (
                            <figure className="px-6 pt-6">
                              <img
                                src={course.icon}
                                alt={course.title}
                                className="rounded-xl max-h-32 mx-auto object-contain"
                              />
                            </figure>
                          ) : (
                            <div className="h-32 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                              <BookOpen className="w-16 h-16 text-green-400" />
                            </div>
                          )}

                          <div className="card-body p-5">
                            <h3 className="card-title text-lg text-green-700">
                              {course.title}
                            </h3>
                            <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                              {course.description ||
                                "No description available."}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              <div className="badge badge-primary badge-sm">
                                {course.subject_name}
                              </div>
                              <div className="badge badge-secondary badge-sm">
                                {course.level_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onUpdate={updateUser}
      />

      {creatingCourse && (
        <CreateCourseModal
          onClose={() => {
            setCreatingCourse(false);
            getCourses();
          }}
        />
      )}
    </div>
  );
};

export default TeacherProfile;

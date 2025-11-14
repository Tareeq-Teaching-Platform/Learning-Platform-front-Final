import React, { useEffect, useState, lazy, Suspense } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  Activity,
  Shield,
  Edit,
  Package,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import EditProfileModal from "../modals/EditProfileModal";
import RegisterTeacherModal from "./AdminViews/ReigsterTeacherModal";
import CreateCourseModal from "./AdminViews/CreateCourseModal";
import CreateSubjectModal from "./AdminViews/CreateSubjectModal";
import CreateLevelModal from "./AdminViews/CreateLevelModal";

// Lazy load the table components
const TeachersTable = lazy(() => import("./AdminViews/TeachersTable"));
const StudentsTable = lazy(() => import("./AdminViews/StudentsTable"));
const CoursesTable = lazy(() => import("./AdminViews/CoursesTable"));
const OrdersTable = lazy(() => import("./AdminViews/OrderHistory"));
const ClassesTable = lazy(() => import("./AdminViews/ClassesTable"));
const SubjectsTable = lazy(() => import("./AdminViews/SubjectsTable"));

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    coursesCount: 0,
    teachersCount: 0,
    studentsCount: 0,
    activeEnrollmentsCount: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [creatingTeacher, setCreatingTeacher] = useState(false);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [creatingSubject, setCreatingSubject] = useState(false);
  const [creatingLevel, setCreatingLevel] = useState(false);

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <Shield className="w-16 h-16 mx-auto text-error mb-4" />
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-base-content/70 mb-4">
              Only admins can view this page.
            </p>
            <button onClick={() => navigate("/")} className="btn btn-error">
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

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
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-lg bg-white text-green-600 border-0">
              Administrator Dashboard
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-2xl ring ring-white ring-offset-base-100 ring-offset-2 shadow-xl">
                  {user.profile_picture ? (
                    <img src={user.profile_picture} alt={user.name} />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <Shield className="w-20 h-20 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-lg bg-white text-green-600 border-0">
                  <Shield className="w-4 h-4 mr-1" />
                  Administrator
                </span>
                <span className="badge badge-lg bg-green-500 text-white border-0">
                  Full Access
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

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCreatingLevel(true)}
                  className="btn bg-white text-green-600 hover:bg-green-50 border-0 shadow-md"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Class Level
                </button>
                <button
                  onClick={() => setCreatingSubject(true)}
                  className="btn bg-white text-green-600 hover:bg-green-50 border-0 shadow-md"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Subject
                </button>
                <button
                  onClick={() => setCreatingCourse(true)}
                  className="btn bg-white text-green-600 hover:bg-green-50 border-0 shadow-md"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Course
                </button>
                <button
                  onClick={() => setCreatingTeacher(true)}
                  className="btn bg-white text-green-600 hover:bg-green-50 border-0 shadow-md"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Register Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
            <div className="card-body text-center">
              <Users className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : stats.studentsCount}
              </div>
              <p className="text-green-100 text-sm">Total Students</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
            <div className="card-body text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : stats.teachersCount}
              </div>
              <p className="text-emerald-100 text-sm">Total Teachers</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl">
            <div className="card-body text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : stats.coursesCount}
              </div>
              <p className="text-teal-100 text-sm">Total Courses</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl">
            <div className="card-body text-center">
              <Activity className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : stats.activeEnrollmentsCount}
              </div>
              <p className="text-cyan-100 text-sm">Active Enrollments</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl">
            <div className="card-body text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-1" />
              <div className="text-2xl font-bold mb-1">
                {loading ? "..." : `$${stats.totalRevenue}`}
              </div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="space-y-6">
          {/* Teachers Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("teachers")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <GraduationCap className="w-8 h-8" />
                  Teachers Management
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "teachers" ? "rotate-180" : ""
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

              {expandedSection === "teachers" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <Suspense fallback={<TableLoadingFallback />}>
                    <TeachersTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Classes Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("classes")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  Classes Management
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "classes" ? "rotate-180" : ""
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

              {expandedSection === "classes" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <Suspense fallback={<TableLoadingFallback />}>
                    <ClassesTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("subjects")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  Subjects Management
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "subjects" ? "rotate-180" : ""
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

              {expandedSection === "subjects" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <Suspense fallback={<TableLoadingFallback />}>
                    <SubjectsTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Students Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("students")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  Students Management
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "students" ? "rotate-180" : ""
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

              {expandedSection === "students" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <Suspense fallback={<TableLoadingFallback />}>
                    <StudentsTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Courses Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("courses")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  Courses Management
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
                  <Suspense fallback={<TableLoadingFallback />}>
                    <CoursesTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="card-body">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("orders")}
              >
                <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  Orders Management
                </h2>
                <button className="btn btn-circle btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform ${
                      expandedSection === "orders" ? "rotate-180" : ""
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

              {expandedSection === "orders" && (
                <div className="mt-6 pt-6 border-t-2 border-green-100">
                  <Suspense fallback={<TableLoadingFallback />}>
                    <OrdersTable />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onUpdate={updateUser}
      />
      {creatingTeacher && (
        <RegisterTeacherModal onClose={() => setCreatingTeacher(false)} />
      )}
      {creatingCourse && (
        <CreateCourseModal onClose={() => setCreatingCourse(false)} />
      )}
      {creatingSubject && (
        <CreateSubjectModal onClose={() => setCreatingSubject(false)} />
      )}
      {creatingLevel && (
        <CreateLevelModal onClose={() => setCreatingLevel(false)} />
      )}
    </div>
  );
};

export default AdminProfile;

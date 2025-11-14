import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import {
  User2,
  BookOpen,
  Award,
  Clock,
  Calendar,
  GraduationCap,
  Edit,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { Link } from "react-router-dom";
import EditProfileModal from "../modals/EditProfileModal";

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [courses, setCourses] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getEnrolledCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/enrollments`, {
        params: { status: "active" },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.data.enrollments);
    } catch (error) {
      console.error("Error fetching enrollments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-lg bg-white text-green-600 border-0">
              Student Dashboard
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Avatar */}
            <div className="w-32 h-32 flex-shrink-0">
              <div className="avatar">
                <div className="w-32 h-32 rounded-2xl ring ring-white ring-offset-base-100 ring-offset-2 shadow-xl">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name}
                      className="rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <User2 className="w-20 h-20 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-lg bg-white text-green-600 border-0">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Student
                </span>
                <span className="badge badge-lg bg-green-500 text-white border-0">
                  Active Learner
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

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                  <BadgeDollarSign className="w-8 h-8 text-yellow-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Credits</p>
                    <p className="text-2xl font-bold">{user.tokens || 0}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-cyan-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Enrolled</p>
                    <p className="text-2xl font-bold">{courses?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Enrolled Courses Section */}
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                My Enrolled Courses
              </h2>
              <Link
                to="/classes"
                className="btn btn-outline btn-primary btn-sm hover:shadow-md"
              >
                Browse More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
              </div>
            ) : courses?.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 max-w-md mx-auto">
                  <BookOpen className="w-20 h-20 mx-auto text-green-300 mb-4" />
                  <p className="text-lg text-gray-600 mb-4">
                    No courses enrolled yet.
                  </p>
                  <Link
                    to="/classes"
                    className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white shadow-md"
                  >
                    Explore Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((enrollment) => (
                  <Link
                    key={enrollment.id}
                    to={`/course/${enrollment.course_id}`}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                  >
                    <figure className="h-48 w-full bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                      {enrollment.course_icon ? (
                        <img
                          src={enrollment.course_icon}
                          alt={enrollment.course_title}
                          className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-green-400" />
                        </div>
                      )}
                    </figure>

                    <div className="card-body p-5">
                      <h3 className="card-title text-lg text-green-700 line-clamp-1">
                        {enrollment.course_title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {enrollment.course_description}
                      </p>

                      {/* Teacher */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full ring ring-green-200 ring-offset-2">
                            {enrollment.teacher_profile ? (
                              <img
                                src={enrollment.teacher_profile}
                                alt={enrollment.teacher_name}
                              />
                            ) : (
                              <div className="w-full h-full bg-green-100 flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-green-600" />
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {enrollment.teacher_name}
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="badge badge-sm bg-green-100 text-green-700 border-0">
                          {enrollment.subject_name}
                        </span>
                        <span className="badge badge-sm bg-emerald-100 text-emerald-700 border-0">
                          {enrollment.level_name}
                        </span>
                      </div>

                      {/* Expiry */}
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {enrollment.is_expired ? (
                          <span className="text-error font-semibold">
                            Expired
                          </span>
                        ) : (
                          <span className="text-gray-600">
                            {enrollment.days_until_expiry} days left
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          Enrolled{" "}
                          {new Date(
                            enrollment.enrolled_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onUpdate={updateUser}
      />
    </div>
  );
};

export default StudentProfile;

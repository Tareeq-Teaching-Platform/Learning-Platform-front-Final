import React from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const SubjectCourses = () => {
  const { user } = useAuth();
  const { subject_id } = useParams();
  const { addToCart, isInCart, removeFromCart } = useCart();

  // Fetch enrolled course IDs
  const { data: enrolledCourseIds = [], isLoading: enrollmentsLoading } =
    useQuery({
      queryKey: ["enrolled-course-ids", user?.id],
      queryFn: async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/users/enrolled-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data.enrolled_course_ids;
      },
      enabled: !!user,
      staleTime: 5 * 60 * 1000,
    });

  // Fetch courses list (now cached!)
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["subject-courses", subject_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/courses`, {
        params: {
          subject: subject_id,
        },
      });
      console.log(response.data.data.courses);
      return response.data.data.courses;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Create a Set for fast lookup
  const enrolledSet = new Set(enrolledCourseIds);

  // Helper function to check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledSet.has(courseId);
  };

  if (coursesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="alert alert-info shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No courses available for this subject</span>
          </div>
        </div>
      </div>
    );
  }

  // Get subject info from first course
  const subjectInfo = courses[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="breadcrumbs text-sm text-green-100 mb-4">
            <ul>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>
                <Link to={`/classes/${subjectInfo.level_id}`}>Subjects</Link>
              </li>
              <li>{subjectInfo.subject_name}</li>
            </ul>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                {subjectInfo.subject_name}
              </h1>
              <p className="text-green-100 text-lg mt-1">
                {subjectInfo.level_name}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="badge badge-lg bg-white text-green-600 border-0">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}{" "}
              Available
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              key={course.id}
            >
              <Link to={`/course/${course.id}`}>
                <figure className="w-full h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      course?.icon ||
                      "https://tse3.mm.bing.net/th/id/OIP.b24O8PL795Ze4GaRBCOEegHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                    }
                    alt={course.title}
                  />
                </figure>
              </Link>

              <div className="card-body px-4 py-4">
                <Link to={`/course/${course.id}`}>
                  <h2 className="card-title text-lg text-green-700 hover:text-green-800 transition-colors">
                    {course.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="badge badge-outline text-xs">
                    {course.teacher_name}
                  </div>
                  <div className="badge bg-green-100 text-green-700 border-0 text-xs font-semibold">
                    ${course.price}
                  </div>
                </div>

                <div className="divider my-1"></div>

                <div className="card-actions mt-2">
                  {user && isEnrolled(course.id) ? (
                    <Link
                      to={`/course/${course.id}`}
                      className="btn btn-success w-full btn-sm text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Go to Course
                    </Link>
                  ) : isInCart(course.id) ? (
                    <div className="flex gap-2 w-full">
                      <button
                        disabled
                        className="btn btn-success flex-1 btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        In Cart
                      </button>
                      <button
                        onClick={() => removeFromCart(course.id)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(course)}
                      className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white w-full btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectCourses;
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartContext";
import { API_BASE_URL } from "../../config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const StudentCourseView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart, isInCart, removeFromCart } = useCart();

  const {
    data: courseData,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["course-details", id],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(`${API_BASE_URL}/courses/${id}`, {
        headers,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch course details"
        );
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="p-6 m-6">
        <div className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{queryError.message || "Unable to load course details"}</span>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="p-6 m-6">
        <div className="alert alert-warning shadow-lg">
          <span>Course not found</span>
        </div>
      </div>
    );
  }

  const { course, lectures, exercises, isEnrolled, enrollmentDetails, stats } =
    courseData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Course Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {course.icon && (
              <div className="w-64 h-64 flex-shrink-0">
                <img
                  src={course.icon}
                  alt={course.title}
                  className="w-fit h-fit border-3 rounded-2xl"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-lg bg-white text-green-600 border-0">
                  {course.subject_name}
                </span>
                <span className="badge badge-lg bg-green-500 text-white border-0">
                  {course.level_name}
                </span>
                <span className="badge badge-lg bg-emerald-500 text-white border-0">
                  {course.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                {course.title}
              </h1>
              <p className="text-xl text-green-50 mb-4 max-w-3xl">
                {course.description}
              </p>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-flex">
                {course.teacher_profile && (
                  <img
                    src={course.teacher_profile}
                    alt={course.teacher_name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-white">Instructor</p>
                  <p className="font-semibold text-lg">{course.teacher_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enrollment Status Card */}
        {isEnrolled ? (
          <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl mb-8">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-2xl font-bold">Enrolled</p>
                  <p className="text-green-100">
                    Full access until{" "}
                    {new Date(
                      enrollmentDetails.expires_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 border-2 border-green-200 shadow-xl mb-8">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Ready to Start Learning?
              </h3>
              <p className="text-gray-600 mb-4">
                Get instant access to {stats.totalLectures} lectures and{" "}
                {stats.totalExercises} exercises
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ${course.price}
                </span>

                {isInCart(course.id) ? (
                  <div className="flex gap-2">
                    <button disabled className="btn btn-success">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      In Cart
                    </button>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="btn btn-error btn-outline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(course)}
                    className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
            <div className="card-body text-center">
              <div className="text-lg font-bold mb-1">
                {stats.totalLectures}
              </div>
              <p className="text-green-100 text-lg">Total Lectures</p>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
            <div className="card-body text-center">
              <div className="text-lg font-bold mb-1">
                {stats.totalExercises}
              </div>
              <p className="text-emerald-100 text-lg">Exercises</p>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl">
            <div className="card-body text-center">
              <div className="text-lg font-bold mb-1">
                {stats.availableLectures}
              </div>
              <p className="text-teal-100 text-lg">Available to You</p>
            </div>
          </div>
        </div>

        {/* Lectures Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-green-700">Lectures</h2>
            {!isEnrolled && (
              <span className="badge badge-lg bg-yellow-100 text-yellow-800 border-0">
                Preview Only
              </span>
            )}
          </div>

          {lectures.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <p className="text-gray-500 text-center">
                  No lectures available yet
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {lectures.map((lecture) => (
                <div
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                  key={lecture.id}
                >
                  <figure className="h-48 w-full">
                    {lecture.icon || course.icon ? (
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                        <img
                          src={lecture.icon || course.icon}
                          alt={lecture.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      /* Default fallback icon when neither lecture nor course has an icon */
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-base text-green-700">
                      {lecture.name}
                    </h3>
                    {lecture.is_preview && (
                      <span className="badge badge-info badge-sm">
                        Free Preview
                      </span>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {lecture.description}
                    </p>
                    <div className="card-actions justify-end mt-3">
                      {isEnrolled || lecture.is_preview ? (
                        <Link
                          to={`/course/${id}/lectures/${lecture.id}`}
                          className="btn btn-primary bg-green-500 hover:bg-green-600 border-0 text-white btn-sm w-full"
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
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Watch Lecture
                        </Link>
                      ) : (
                        <button className="btn btn-disabled btn-sm w-full">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercises Section */}
        {isEnrolled ? (
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Exercises
            </h2>
            {exercises.length === 0 ? (
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <p className="text-gray-500 text-center">
                    No exercises available yet
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {exercises.map((exercise) => (
                  <div
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    key={exercise.id}
                  >
                    <figure className="h-48 w-full">
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-base text-green-700">
                        {exercise.name}
                      </h3>
                      <div className="card-actions justify-end mt-3">
                        <Link
                          to={`/course/${id}/exercises/${exercise.id}`}
                          className="btn btn-primary bg-green-500 hover:bg-green-600 border-0 text-white btn-sm w-full"
                        >
                          Start Exercise
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          stats.totalExercises > 0 && (
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  {stats.totalExercises} Exercises Waiting
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Enroll now to access all exercises and test your knowledge
                </p>

                {isInCart(course.id) ? (
                  <div className="flex gap-3 justify-center">
                    <button disabled className="btn btn-success">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      In Cart
                    </button>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="btn btn-error btn-outline"
                    >
                      Remove from Cart
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(course)}
                    className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white btn-lg"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentCourseView;

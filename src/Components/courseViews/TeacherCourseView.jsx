import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { API_BASE_URL } from "../../config/api";
import axios from "axios";
import StudentCourseView from "./StudentCourseView";
import AddLectureModal from "../../Components/modals/AddLectureModal";
import EditLectureModal from "../../Components/modals/EditLectureModal";
import AddExerciseModal from "../../Components/modals/AddExerciseModal";
import EditExerciseModal from "../modals/EditExerciseModal";

const TeacherCourseView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);

  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showEditLectureModal, setShowEditLectureModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(`${API_BASE_URL}/courses/${id}`, {
        headers,
      });

      if (response.data.success) {
        setCourseData(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch course details");
      }
    } catch (err) {
      setError("Unable to load course details");
      console.error("Fetch course error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/lectures/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCourseDetails();
    } catch (err) {
      console.error("Delete lecture error:", err);
      alert("Failed to delete lecture");
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    if (!window.confirm("Are you sure you want to delete this exercise?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/exercises/${exerciseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCourseDetails();
    } catch (err) {
      console.error("Delete exercise error:", err);
      alert("Failed to delete exercise");
    }
  };

  const openEditLectureModal = (lecture) => {
    setSelectedLecture(lecture);
    setShowEditLectureModal(true);
  };

  const openEditExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowEditExerciseModal(true);
  };

  const handleModalSuccess = () => {
    fetchCourseDetails();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (error) {
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
          <span>{error}</span>
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

  const { course, lectures, exercises, stats } = courseData;
  const isTeacher = user && course.teacher_id === user.id;
  const isAdmin = user && user.role === "admin";

  if (!isTeacher && !isAdmin) {
    return <StudentCourseView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Teacher Course Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-lg bg-white text-green-600 border-0">
              Teacher Dashboard
            </span>
          </div>

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

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  {course.teacher_profile && (
                    <img
                      src={course.teacher_profile}
                      alt={course.teacher_name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white ">
                      Instructor
                    </p>
                    <p className="font-semibold text-lg">
                      {course.teacher_name}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm font-semibold text-white ">Pricing</p>
                  <div className="flex gap-3 items-center">
                    <span className="text-lg font-bold">${course.price}</span>
                    {/* <span className="text-lg opacity-75">
                      or {course.token_price} tokens
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-emerald-100 text-lg">Total Exercises</p>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl">
            <div className="card-body text-center">
              <div className="text-lg font-bold mb-1">
                {stats.availableLectures}
              </div>
              <p className="text-teal-100 text-lg">Preview Lectures</p>
            </div>
          </div>
        </div>

        {/* Lectures Section */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-green-700">Lectures</h2>
            <button
              onClick={() => setShowAddLectureModal(true)}
              className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white shadow-md"
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
              Add Lecture
            </button>
          </div>

          {lectures.length === 0 ? (
            <div className="card bg-base-100 shadow-lg border-2 border-dashed border-green-300">
              <div className="card-body text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-green-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">
                  No lectures yet. Create your first lecture!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {lectures.map((lecture) => (
                <div
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
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

                    <div className="divider my-1"></div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/course/${id}/lectures/${lecture.id}`}
                        className="btn btn-sm btn-outline btn-primary flex-1"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </Link>
                      <button
                        onClick={() => openEditLectureModal(lecture)}
                        className="btn btn-sm bg-blue-400 hover:bg-blue-500 border-0 text-white flex-1"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLecture(lecture.id)}
                        className="btn btn-sm bg-red-400 hover:bg-red-500 border-0 text-white"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercises Section */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-green-700">Exercises</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddExerciseModal(true)}
                className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white shadow-md btn-sm"
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
                Add Exercise
              </button>
              <Link
                to={`/course/${id}/exercise/create`}
                className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 border-0 text-white shadow-md btn-sm"
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
                New Exercise
              </Link>
            </div>
          </div>

          {exercises.length === 0 ? (
            <div className="card bg-base-100 shadow-lg border-2 border-dashed border-green-300">
              <div className="card-body text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-green-300 mb-4"
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
                <p className="text-gray-500 text-lg">
                  No exercises yet. Create your first exercise!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {exercises.map((exercise) => (
                <div
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                    <h3 className="card-title text-lg text-green-700">
                      {exercise.name}
                    </h3>

                    <div className="divider my-2"></div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/course/${id}/exercises/${exercise.id}`}
                        className="btn btn-sm btn-outline btn-primary flex-1"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </Link>
                      <button
                        onClick={() => openEditExerciseModal(exercise)}
                        className="btn btn-sm bg-blue-400 hover:bg-blue-500 border-0 text-white flex-1"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExercise(exercise.id)}
                        className="btn btn-sm bg-red-400 hover:bg-red-500 border-0 text-white"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddLectureModal && (
        <AddLectureModal
          courseId={id}
          onClose={() => setShowAddLectureModal(false)}
          onSuccess={() => {
            setShowAddLectureModal(false);
            handleModalSuccess();
          }}
        />
      )}

      {showEditLectureModal && selectedLecture && (
        <EditLectureModal
          courseId={id}
          lecture={selectedLecture}
          onClose={() => {
            setShowEditLectureModal(false);
            setSelectedLecture(null);
          }}
          onSuccess={() => {
            setShowEditLectureModal(false);
            setSelectedLecture(null);
            handleModalSuccess();
          }}
        />
      )}

      {showAddExerciseModal && (
        <AddExerciseModal
          courseId={id}
          onClose={() => setShowAddExerciseModal(false)}
          onSuccess={() => {
            setShowAddExerciseModal(false);
            handleModalSuccess();
          }}
        />
      )}

      {showEditExerciseModal && selectedExercise && (
        <EditExerciseModal
          courseId={id}
          exercise={selectedExercise}
          onClose={() => {
            setShowEditExerciseModal(false);
            setSelectedExercise(null);
          }}
          onSuccess={() => {
            setShowEditExerciseModal(false);
            setSelectedExercise(null);
            handleModalSuccess();
          }}
        />
      )}
    </div>
  );
};

export default TeacherCourseView;

import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../config/api";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const LevelSubjectsPage = () => {
  const { level_id } = useParams();

  const fetchSubjects = async () => {
    const response = await axios.get(`${API_BASE_URL}/subjects`, {
      params: {
        level_id: level_id,
      },
    });
    return response.data.data.subjects;
  };

  const {
    data: subjects,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subjects", level_id],
    queryFn: fetchSubjects,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: !!level_id, // Only fetch if level_id exists
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto">
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
            <span>Error fetching subjects: {error.message}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
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
            <span>No subjects available for this level</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="breadcrumbs text-sm text-green-100 mb-4">
            <ul>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>Subjects</li>
            </ul>
          </div>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
            Choose Your Subject
          </h1>
          <p className="text-xl text-green-50 max-w-2xl">
            Select a subject to explore available courses
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              key={subject.id}
            >
              <figure className="w-full h-48">
                <img
                  src={
                    subject.icon ||
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500"
                  }
                  alt={subject.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500";
                  }}
                />
              </figure>
              <div className="card-body px-4 py-5">
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  {subject.name}
                </h2>

                <p className="text-gray-600 flex-grow min-h-[3rem] line-clamp-3 text-sm">
                  {subject.description ||
                    "Explore this subject and discover exciting courses"}
                </p>

                <div className="divider my-1"></div>

                <div className="card-actions justify-end mt-1">
                  <Link
                    to={`/classes/subject/${subject.id}`}
                    className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 text-white w-full shadow-md"
                  >
                    View Courses
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSubjectsPage;
import React from "react";
import { API_BASE_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ClassesPage = () => {
  const fetchClasses = async () => {
    const response = await axios.get(`${API_BASE_URL}/levels`);
    return response.data.data.levels;
  };

  const {
    data: classes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: fetchClasses,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
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
          <span>Error fetching classes: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="p-6 m-6">
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
          <span>No classes available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Explore Our Courses
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Browse courses by class level and start your learning journey today
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="badge badge-lg bg-white text-green-600 border-0">
              {classes.length} Levels Available
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classLevel) => (
            <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              key={classLevel.id}
            >
              <figure className="w-full h-48">
                <img
                  src={classLevel.icon}
                  alt={classLevel.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center px-4 py-5">
                <h2 className="card-title text-xl font-bold text-green-700 mb-2">
                  {classLevel.name}
                </h2>
                <div className="divider my-1"></div>
                <div className="card-actions w-full mt-2">
                  <Link
                    to={`/classes/${classLevel.id}`}
                    className="btn btn-primary bg-green-600 hover:bg-green-700 border-0 w-full text-white shadow-md"
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

export default ClassesPage;

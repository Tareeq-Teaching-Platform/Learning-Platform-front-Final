import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const ExercisePage = () => {
  const { id, exercise_id } = useParams();
  const [exercise, setExercise] = useState("");
  const [studentAnswers, setStudentAnswers] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getExercise = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/exercises/${exercise_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExercise(response.data.data);
      } catch (error) {
        console.error("Error fetching exercise: ", error);
      }
    };
    getExercise();
  }, [id, exercise_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentAnswers.trim()) {
      alert("Please provide your answers before submitting!");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/ai/feedback`,
        {
          exerciseContent: exercise.content,
          studentAnswers: studentAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFeedback(response.data.text);
      setSubmitted(true);
    } catch (error) {
      console.error("Error getting feedback: ", error);
      alert("Failed to get feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStudentAnswers("");
    setFeedback("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        {/* Back Button */}
        <Link
          to={`/course/${id}`}
          className="btn btn-ghost text-green-700 hover:bg-green-100"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Course
        </Link>

        {/* Exercise Header */}
        <div className="card bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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
              <div>
                <h1 className="text-3xl font-bold">{exercise.name}</h1>
                <p className="text-green-100 mt-1">
                  Complete the exercise and submit for AI feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="card bg-base-100 shadow-xl border border-green-200">
          <div className="card-body">
            <h2 className="card-title text-green-700 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              Exercise Instructions
            </h2>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="text-2xl font-bold mt-6 mb-4 text-green-700"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="text-xl font-bold mt-5 mb-3 text-green-600"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="text-lg font-semibold mt-4 mb-2 text-green-600"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p
                      className="mb-4 leading-relaxed text-gray-700"
                      {...props}
                    />
                  ),
                  ul: ({ depth, ...props }) => (
                    <ul
                      className={
                        depth === 0
                          ? "list-disc ml-6 mb-4 space-y-2"
                          : "list-none ml-4 space-y-1"
                      }
                      {...props}
                    />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="list-decimal ml-6 mb-4 space-y-3"
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => (
                    <li className="leading-relaxed" {...props} />
                  ),
                  code: ({ inline, ...props }) =>
                    inline ? (
                      <code
                        className="bg-green-100 px-2 py-1 rounded text-sm font-mono text-green-700"
                        {...props}
                      />
                    ) : (
                      <code
                        className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"
                        {...props}
                      />
                    ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600"
                      {...props}
                    />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-bold text-green-700" {...props} />
                  ),
                  em: ({ ...props }) => <em className="italic" {...props} />,
                }}
              >
                {exercise.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Answer Input Section */}
        {!submitted && (
          <div className="card bg-base-100 shadow-xl border border-green-200">
            <div className="card-body">
              <h2 className="card-title text-green-700 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Your Answers
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={studentAnswers}
                  onChange={(e) => setStudentAnswers(e.target.value)}
                  placeholder="Write your answers here...&#10;Example:&#10;Question 1: C&#10;Question 2: B&#10;Question 3: A"
                  className="textarea textarea-bordered w-full h-48 focus:border-green-500 focus:outline-none font-mono text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary bg-green-500 hover:bg-green-600 border-0 text-white w-full"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      Getting Feedback...
                    </span>
                  ) : (
                    <>
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Submit & Get Feedback
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl border-2 border-green-300">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title text-green-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  Your Feedback
                </h2>
                <button
                  onClick={handleReset}
                  className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ ...props }) => (
                        <h1
                          className="text-2xl font-bold mt-4 mb-3 text-green-700"
                          {...props}
                        />
                      ),
                      h2: ({ ...props }) => (
                        <h2
                          className="text-xl font-bold mt-4 mb-2 text-green-600"
                          {...props}
                        />
                      ),
                      h3: ({ ...props }) => (
                        <h3
                          className="text-lg font-semibold mt-3 mb-2 text-green-600"
                          {...props}
                        />
                      ),
                      p: ({ ...props }) => (
                        <p
                          className="mb-3 leading-relaxed text-gray-700"
                          {...props}
                        />
                      ),
                      ul: ({ ...props }) => (
                        <ul
                          className="list-disc ml-6 mb-3 space-y-1"
                          {...props}
                        />
                      ),
                      ol: ({ ...props }) => (
                        <ol
                          className="list-decimal ml-6 mb-3 space-y-2"
                          {...props}
                        />
                      ),
                      li: ({ ...props }) => (
                        <li className="leading-relaxed" {...props} />
                      ),
                      strong: ({ ...props }) => (
                        <strong
                          className="font-bold text-green-700"
                          {...props}
                        />
                      ),
                      em: ({ ...props }) => (
                        <em className="italic" {...props} />
                      ),
                    }}
                  >
                    {feedback}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;

import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { toast } from "react-toastify";
import { Loader2, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ExerciseCreation = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [editableResponse, setEditableResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        const teacher_id = response.data.data.course.teacher_id;

        if (!user || (user.role !== "admin" && user.id !== teacher_id)) {
          toast.error(
            "You do not have permission to create exercises for this course."
          );
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error checking access");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/generate`, {
        prompt: prompt,
      });

      setAiResponse(response.data.text);
      setEditableResponse(response.data.text);
      setIsEditing(false);
      toast.success("Exercise generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate exercise");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveExercise = async () => {
    if (!editableResponse.trim()) {
      toast.error("Cannot save empty exercise");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter an exercise name");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/exercises/`,
        {
          name: name,
          content: editableResponse,
          course_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Exercise saved successfully!");
      navigate(`/course/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save exercise");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Link
            to={`/course/${id}`}
            className="btn btn-ghost text-green-700 hover:bg-green-100 mb-2"
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
          <h1 className="text-4xl font-bold text-green-700">
            Create Exercise with AI
          </h1>
          <p className="text-gray-600 mt-2">
            Generate AI-powered exercises for your students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Exercise Name Card */}
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Exercise Name
                </h2>
                <input
                  className="input input-bordered w-full focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Photosynthesis Quiz"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Prompt Card */}
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  AI Prompt
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    className="textarea textarea-bordered w-full h-40 focus:border-green-500 focus:outline-none resize-none"
                    placeholder='Enter your exercise prompt (e.g., "Create 5 multiple choice questions about photosynthesis")'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />

                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="btn btn-primary bg-green-500 hover:bg-green-600 border-0 text-white w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin size-5" />
                        Generating...
                      </>
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {aiResponse
                          ? "Generate Different Exercise"
                          : "Generate Exercise"}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - AI Response */}
          <div className="card bg-base-100 shadow-xl border border-green-200 lg:min-h-[550px]">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  AI Response
                </h2>
                {aiResponse && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-sm bg-gray-400 hover:bg-gray-500 text-white border-0"
                    >
                      {isEditing ? "Preview" : "Edit"}
                    </button>
                    <button
                      onClick={handleSaveExercise}
                      disabled={isSaving}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="animate-spin size-4" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="size-4" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {aiResponse ? (
                isEditing ? (
                  <textarea
                    value={editableResponse}
                    onChange={(e) => setEditableResponse(e.target.value)}
                    className="textarea textarea-bordered w-full h-96 font-mono text-sm focus:border-green-500 focus:outline-none"
                  />
                ) : (
                  <div className="prose prose-slate max-w-none overflow-y-auto max-h-[500px]">
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
                            className="border-l-4 border-green-500 pl-4 italic my-4"
                            {...props}
                          />
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
                      {editableResponse}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-200 mb-4"
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
                  <p className="text-gray-400 italic">
                    No response yet. Enter a prompt to generate an exercise.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCreation;

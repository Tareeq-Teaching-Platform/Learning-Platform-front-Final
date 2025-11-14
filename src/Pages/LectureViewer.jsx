import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const LectureViewer = () => {
  const { id: courseId, lecture_id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    // Check if it's already an embed URL
    if (url.includes("/embed/")) {
      return url;
    }

    // Extract video ID from various YouTube URL formats
    let videoId = "";

    // Standard: https://www.youtube.com/watch?v=VIDEO_ID
    const standardMatch = url.match(/[?&]v=([^&]+)/);
    if (standardMatch) {
      videoId = standardMatch[1];
    }

    // Short: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }

    // Return embed URL if we found a video ID
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/lectures/${lecture_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLecture(response.data.data);
      } catch (error) {
        console.error("Error fetching lecture:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lecture_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
        <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
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
          <span>Lecture not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Back Button */}
        <Link
          to={`/course/${courseId}`}
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

        {/* Lecture Header */}
        <div className="card bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl mb-2">
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{lecture.name}</h1>
                {lecture.is_preview && (
                  <span className="badge badge-lg bg-white/20 text-white border-0 mt-2">
                    Free Preview
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="card bg-base-100 shadow-xl border border-green-200 mb-6">
          <div className="card-body p-0">
            <div className="aspect-video bg-black rounded-t-2xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(lecture.url)}
                title={lecture.name || "Video player"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Lecture Description */}
        {lecture.description && (
          <div className="card bg-base-100 shadow-xl border border-green-200">
            <div className="card-body">
              <h3 className="card-title text-green-700 mb-4">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About this lecture
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lecture.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureViewer;

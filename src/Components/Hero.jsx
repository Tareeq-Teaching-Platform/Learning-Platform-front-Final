import React from "react";
import { Sparkles, BookOpen, GraduationCap, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-16 px-4">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-green-50"></div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-700 text-xs font-medium">
                AI-Powered Learning
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Transform your learning experience
            </h1>

            <p className="text-lg text-slate-600 max-w-lg">
              Discover personalized courses and generate custom exercises
              instantly with our intelligent platform.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">
                  Smart Course Search
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <GraduationCap className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">
                  AI Exercise Generator
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">Instant Results</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/classes"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border-2 border-slate-300 hover:border-green-500 hover:text-green-600 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <p className="text-sm text-slate-500 pt-4">
              Join thousands transforming education with AI
            </p>
          </div>

          {/* Right Illustration */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute top-10 -left-10 w-40 h-40 bg-green-200/40 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-0 w-56 h-56 bg-emerald-200/30 rounded-full blur-3xl"></div>

              {/* Main illustration container */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  {/* Book/Course illustration */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-green-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-green-100 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* AI Processing visualization */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl"></div>
                    <div className="relative flex items-center justify-center p-6 bg-white rounded-xl border-2 border-green-200">
                      <Sparkles className="w-12 h-12 text-green-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Generated content visualization */}
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded w-4/6"></div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 px-4 py-2 bg-white rounded-full shadow-xl border border-green-200 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-slate-700">
                  AI Powered
                </span>
              </div>

              <div className="absolute -bottom-6 -left-6 px-4 py-2 bg-white rounded-full shadow-xl border border-emerald-200 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Instant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

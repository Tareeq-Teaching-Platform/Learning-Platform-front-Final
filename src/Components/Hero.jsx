import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, GraduationCap, Zap, TrendingUp, Users, Award, BotIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [floatingIndex, setFloatingIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, label: "Active Learners", value: "5K+" },
    { icon: BookOpen, label: "Courses", value: "200+" },
    { icon: Award, label: "Success Rate", value: "95%" }
  ];

  return (
    <div className="relative min-h-screen py-16 px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">

            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-green-700 to-emerald-600 leading-tight">
              Transform Your Learning Journey
            </h1>

            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Experience the future of education with{" "}
              <span className="text-green-600 font-semibold">AI-powered</span> course recommendations 
              and intelligent exercise generation.
            </p>

            {/* Animated Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: BookOpen, text: "Smart Course Search", color: "green" },
                { icon: GraduationCap, text: "AI Exercise Generator", color: "emerald" },
                { icon: Zap, text: "Instant Feedback", color: "teal" }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md border-2 border-green-200 hover:border-green-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <feature.icon className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={'/classes'} className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Start Learning
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={'/about'} className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-300 hover:border-green-500 hover:text-green-600 hover:shadow-lg transition-all duration-300">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative lg:block hidden">
            <div className="relative animate-fadeInRight">
              {/* Glowing orbs */}
              <div className="absolute top-10 -left-10 w-52 h-52 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute bottom-10 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

              {/* Main illustration container */}
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-green-200 hover:shadow-3xl transition-all duration-500">
                <div className="space-y-6">
                  {/* Book/Course illustration with animation */}
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gradient-to-r from-green-300 to-green-200 rounded-lg w-3/4 animate-shimmer"></div>
                      <div className="h-3 bg-green-100 rounded-lg w-1/2"></div>
                    </div>
                  </div>

                  {/* AI Processing visualization with glow */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-300 shadow-lg">
                      <div className="relative">
                        <Sparkles className="w-16 h-16 text-green-500 animate-spin-slow" />
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Generated content with stagger animation */}
                  <div className="space-y-3">
                    {[1, 0.8, 0.6].map((opacity, idx) => (
                      <div
                        key={idx}
                        className={`p-4 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 ${
                          floatingIndex === idx ? 'scale-105 shadow-lg' : ''
                        }`}
                        style={{ 
                          opacity,
                          transitionDelay: `${idx * 100}ms`
                        }}
                      >
                        <div className="h-3 bg-gradient-to-r from-slate-300 to-slate-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded" style={{ width: `${100 - idx * 20}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges with animations */}
              <div className="absolute -top-6 -right-6 px-5 py-3 bg-white rounded-full shadow-2xl border-2 border-green-300 flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer animate-bounce-slow">
                <BotIcon className="w-6 h-6 text-green-600" />
                <span className="text-sm font-bold text-slate-700">
                  AI Powered
                </span>
              </div>

              <div className="absolute -bottom-6 -left-6 px-5 py-3 bg-white rounded-full shadow-2xl border-2 border-emerald-300 flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer animate-bounce-slow animation-delay-1000">
                <Zap className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">
                  Instant Results
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
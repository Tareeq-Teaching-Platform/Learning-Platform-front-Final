import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Brain, Users, Globe, TrendingUp, Award, Target, Eye, BotIcon } from 'lucide-react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "From Grade 1 to Grade 12, our complete subject coverage ensures no gap in your educational journey. Mathematics, sciences, languages, social studies—every branch of knowledge is here.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Expert-Crafted Content",
      description: "Our courses are developed by seasoned educators who understand learning. Each lesson is carefully designed, enriched with engaging materials that help concepts come alive.",
      gradient: "from-emerald-400 to-green-500"
    },
    {
      icon: Globe,
      title: "Learn Anytime, Anywhere",
      description: "Access your courses 24/7, allowing education to adapt to your schedule. Whether you're an early bird or a night owl, learning happens on your terms.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "Our intelligent system tracks your progress and provides instant, personalized feedback. Understand where you're thriving and where you need more support to grow stronger.",
      gradient: "from-green-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Accessible for All",
      description: "Quality education for every student. Our thoughtfully priced courses ensure everyone can reach their potential, regardless of their starting point.",
      gradient: "from-teal-400 to-green-500"
    },
    {
      icon: Award,
      title: "Interactive Exercises",
      description: "Teachers can create AI-powered exercises, and students receive detailed explanations on their answers, making learning more engaging and effective.",
      gradient: "from-emerald-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Floating Badge */}
          <div 
            className="inline-block mb-8 animate-fadeInDown"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-md shadow-lg px-6 py-3 rounded-full border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105">
              <BotIcon className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="text-green-800 font-bold">AI-Powered Education Platform</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 mb-8 leading-tight animate-fadeInUp">
            Welcome to <br/><span className="text-green-600">Learning Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            Where education meets innovation, nurturing young minds from their first steps to full mastery
          </p>

          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 animate-fadeInUp animation-delay-400">
            {[
              { number: "12", label: "Grade Levels", icon: TrendingUp },
              { number: "200+", label: "Courses", icon: BookOpen },
              { number: "5K+", label: "Students", icon: Users }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-700">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0 C300,60 600,60 900,30 C1050,15 1125,0 1200,0 L1200,120 L0,120 Z" fill="white" opacity="0.8"/>
          </svg>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 mb-16 border-2 border-green-200 hover:shadow-3xl transition-all duration-500 animate-fadeInUp">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg hover:rotate-12 transition-transform duration-300">
              <Target className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every student's journey begins with potential waiting to be unlocked. At Learning Path, we create learning environments where knowledge takes root and flourishes. Our mission is to provide comprehensive, expertly-crafted courses spanning Grades 1 through 12, designed to help every student reach for their highest aspirations with the power of AI-enhanced education.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 text-center mb-12 animate-fadeInUp">
            Our Educational Ecosystem
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <div 
                key={index}
                className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-green-100 hover:border-green-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-10 md:p-14 mb-16 text-white overflow-hidden animate-fadeInUp">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative">
            <div className="flex items-center mb-8">
              <Users className="w-12 h-12 mr-4" />
              <h2 className="text-4xl font-bold">For Every Learner</h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                Every student is unique with infinite potential. Whether you're a <span className="font-bold">parent</span> seeking to enrich your child's education, a <span className="font-bold">student</span> eager to learn, or an <span className="font-bold">educator</span> recommending quality resources, Learning Path welcomes you.
              </p>
              <p className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                From elementary exploration to high school mastery, we nurture understanding across all subjects—<span className="font-semibold">mathematics, sciences, languages, and social studies</span>. Our AI-powered platform adapts to each learner's pace and style.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
                <p className="font-bold text-xl">
                  Together, we're shaping the next generation of thinkers, innovators, and leaders—one student, one course, one breakthrough at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 border-2 border-green-200 animate-fadeInUp">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg hover:rotate-12 transition-transform duration-300">
              <Eye className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">Our Vision</h2>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We envision a world where quality education is accessible to all—where every student has the resources to learn, the support to grow strong, and the freedom to reach their dreams. Through Learning Path, we're creating knowledge that transforms into achievements.
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Our commitment is to break down barriers that prevent access to quality education. We create environments where <span className="text-green-600 font-semibold">curiosity sprouts, confidence grows, and academic excellence blossoms</span>—powered by cutting-edge AI technology that personalizes every learning experience.
          </p>
          
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300">
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 text-center italic">
              "Watch knowledge grow. Watch potential bloom. Watch futures transform."
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="relative h-32 overflow-hidden mt-16">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,60 600,60 900,30 C1050,15 1125,0 1200,0 L1200,120 L0,120 Z" fill="#059669" opacity="0.15"/>
          <path d="M0,20 C300,80 600,80 900,50 C1050,35 1125,20 1200,20 L1200,120 L0,120 Z" fill="#10b981" opacity="0.15"/>
          <path d="M0,40 C300,100 600,100 900,70 C1050,55 1125,40 1200,40 L1200,120 L0,120 Z" fill="#14b8a6" opacity="0.15"/>
        </svg>
      </div>

      <style>{`
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
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
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

export default About;
import React, { useState } from 'react';
import { HelpCircle, Mail, MessageCircle, ChevronDown, Sparkles, Search, BotIcon } from 'lucide-react';

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What grade levels do you offer courses for?",
      answer: "Learning Path provides comprehensive courses for students from Grade 1 all the way through Grade 12. Whether your child is just beginning their educational journey or preparing for their final year of high school, we have expertly designed courses to support every step of their academic growth.",
      category: "General"
    },
    {
      question: "What subjects are covered in your courses?",
      answer: "We offer a full spectrum of subjects across all grade levels, including Mathematics, Science (Biology, Chemistry, Physics), Languages (English, and more), Social Studies, History, Geography, and other core curriculum subjects. Our goal is to provide complete academic support across all areas of learning.",
      category: "Courses"
    },
    {
      question: "How do the AI-powered exercises work?",
      answer: "Our intelligent exercise system provides interactive practice questions throughout each course. After you submit your answers, our AI analyzes your responses and provides personalized feedback—not just telling you if you're right or wrong, but explaining concepts, offering alternative approaches, and suggesting areas where you might need more practice. It's like having a personal tutor available 24/7.",
      category: "AI Features"
    },
    {
      question: "Can I access courses anytime, or are there scheduled classes?",
      answer: "All our courses are self-paced and available 24/7. You can learn whenever it suits your schedule—early morning, late evening, or anytime in between. There are no scheduled classes or deadlines (unless you set them yourself!), giving you complete flexibility to learn at your own natural rhythm.",
      category: "Access"
    },
    {
      question: "How much do the courses cost?",
      answer: "We believe quality education should be accessible to everyone. Our courses are competitively priced, and we offer various purchasing options including individual courses, subject bundles, and full-grade packages. Visit our courses page for detailed pricing information, and keep an eye out for seasonal promotions and discounts.",
      category: "Pricing"
    },
    {
      question: "Do I need any special software or equipment to access the courses?",
      answer: "No special software is required! All you need is a device with internet access—whether it's a computer, tablet, or smartphone—and a modern web browser. Our platform is designed to work seamlessly across all devices, so you can learn wherever you are.",
      category: "Technical"
    },
    {
      question: "Are the courses aligned with standard educational curricula?",
      answer: "Yes! Our courses are developed by experienced educators and are carefully aligned with widely recognized educational standards. This ensures that the material you're learning complements and reinforces what students encounter in traditional school settings.",
      category: "Courses"
    },
    {
      question: "How long does it take to complete a course?",
      answer: "Course completion time varies depending on the subject, grade level, and your personal learning pace. Most courses are designed to cover a semester's or full year's worth of material, but since our platform is self-paced, you can move faster through topics you grasp quickly or spend more time on challenging concepts.",
      category: "Courses"
    },
    {
      question: "Can parents track their child's progress?",
      answer: "Absolutely! Parents have access to detailed progress reports that show which lessons have been completed, exercise scores, areas of strength, and topics that may need additional attention. This transparency helps parents stay involved in their child's learning journey and provide support where needed.",
      category: "Progress"
    },
    {
      question: "What if I need help or have questions about the course material?",
      answer: "We offer multiple support channels. Our AI feedback system provides immediate guidance on exercises, and we also have a support team ready to help with technical issues or general questions. Additionally, many courses include supplementary resources and explanations to help clarify difficult concepts.",
      category: "Support"
    },
    {
      question: "Can I try a course before purchasing?",
      answer: "Yes! We offer preview lessons for most of our courses so you can explore the content, teaching style, and platform features before making a purchase. This helps ensure you're confident in your choice and find the right fit for your learning needs.",
      category: "Pricing"
    },
    {
      question: "Do you offer certificates upon course completion?",
      answer: "Yes, students receive a certificate of completion for each course they finish. These certificates recognize their hard work and achievement, and can be a great addition to their educational portfolio.",
      category: "Certificates"
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, Learning Path is fully accessible through any web browser on your mobile device, tablet, or computer. Our responsive design ensures a smooth learning experience regardless of which device you're using. We're always working to improve accessibility and may introduce dedicated apps in the future.",
      category: "Technical"
    },
    {
      question: "What makes Learning Path different from other online learning platforms?",
      answer: "Learning Path combines comprehensive K-12 curriculum coverage with cutting-edge AI technology to provide personalized feedback and support. Our approach emphasizes organic, student-paced learning, while our intelligent exercise system ensures students truly understand the material—not just memorize it. We're committed to nurturing every student's unique potential.",
      category: "General"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-block mb-8 animate-fadeInDown">
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-md shadow-lg px-6 py-3 rounded-full border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105">
              <HelpCircle className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="text-green-800 font-bold">We're Here to Help</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 mb-8 leading-tight animate-fadeInUp">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-12 animate-fadeInUp animation-delay-200">
            Find answers to common questions about Learning Path and how we help students grow
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-green-200 focus:border-green-400 focus:outline-none bg-white/90 backdrop-blur-md shadow-lg text-slate-700 placeholder-slate-400 text-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="relative max-w-4xl mx-auto px-4 pb-20">
        {/* Results count */}
        {searchTerm && (
          <div className="mb-6 text-center">
            <span className="text-slate-600 font-medium">
              Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </span>
          </div>
        )}

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-green-100 overflow-hidden hover:shadow-2xl hover:border-green-300 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-green-50/50 transition-all duration-200 group"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-800 group-hover:text-green-600 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center transform transition-all duration-300 shadow-lg group-hover:scale-110 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-white" />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-6 pt-2 border-t-2 border-green-100 bg-gradient-to-br from-green-50/50 to-emerald-50/30">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {searchTerm && filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No results found</h3>
            <p className="text-slate-600">Try searching with different keywords</p>
          </div>
        )}

        {/* Still Have Questions Section */}
        <div className="mt-16 relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-10 text-center text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              We're here to help you grow! If you couldn't find the answer you're looking for, our support team is ready to assist you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Contact Support
              </button>
              <button className="group bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BotIcon, label: "AI-Powered", value: "24/7" },
            { icon: HelpCircle, label: "Quick Response", value: "<2hrs" },
            { icon: MessageCircle, label: "Support Channels", value: "3+" }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-700 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="relative h-32 overflow-hidden">
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
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
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

export default FAQsPage;
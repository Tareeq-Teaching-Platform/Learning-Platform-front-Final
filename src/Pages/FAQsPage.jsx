import React, { useState } from 'react'

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What grade levels do you offer courses for?",
      answer: "Learning Path provides comprehensive courses for students from Grade 1 all the way through Grade 12. Whether your child is just beginning their educational journey or preparing for their final year of high school, we have expertly designed courses to support every step of their academic growth."
    },
    {
      question: "What subjects are covered in your courses?",
      answer: "We offer a full spectrum of subjects across all grade levels, including Mathematics, Science (Biology, Chemistry, Physics), Languages (English, and more), Social Studies, History, Geography, and other core curriculum subjects. Our goal is to provide complete academic support across all areas of learning."
    },
    {
      question: "How do the AI-powered exercises work?",
      answer: "Our intelligent exercise system provides interactive practice questions throughout each course. After you submit your answers, our AI analyzes your responses and provides personalized feedback—not just telling you if you're right or wrong, but explaining concepts, offering alternative approaches, and suggesting areas where you might need more practice. It's like having a personal tutor available 24/7."
    },
    {
      question: "Can I access courses anytime, or are there scheduled classes?",
      answer: "All our courses are self-paced and available 24/7. You can learn whenever it suits your schedule—early morning, late evening, or anytime in between. There are no scheduled classes or deadlines (unless you set them yourself!), giving you complete flexibility to learn at your own natural rhythm."
    },
    {
      question: "How much do the courses cost?",
      answer: "We believe quality education should be accessible to everyone. Our courses are competitively priced, and we offer various purchasing options including individual courses, subject bundles, and full-grade packages. Visit our courses page for detailed pricing information, and keep an eye out for seasonal promotions and discounts."
    },
    {
      question: "Do I need any special software or equipment to access the courses?",
      answer: "No special software is required! All you need is a device with internet access—whether it's a computer, tablet, or smartphone—and a modern web browser. Our platform is designed to work seamlessly across all devices, so you can learn wherever you are."
    },
    {
      question: "Are the courses aligned with standard educational curricula?",
      answer: "Yes! Our courses are developed by experienced educators and are carefully aligned with widely recognized educational standards. This ensures that the material you're learning complements and reinforces what students encounter in traditional school settings."
    },
    {
      question: "How long does it take to complete a course?",
      answer: "Course completion time varies depending on the subject, grade level, and your personal learning pace. Most courses are designed to cover a semester's or full year's worth of material, but since our platform is self-paced, you can move faster through topics you grasp quickly or spend more time on challenging concepts."
    },
    {
      question: "Can parents track their child's progress?",
      answer: "Absolutely! Parents have access to detailed progress reports that show which lessons have been completed, exercise scores, areas of strength, and topics that may need additional attention. This transparency helps parents stay involved in their child's learning journey and provide support where needed."
    },
    {
      question: "What if I need help or have questions about the course material?",
      answer: "We offer multiple support channels. Our AI feedback system provides immediate guidance on exercises, and we also have a support team ready to help with technical issues or general questions. Additionally, many courses include supplementary resources and explanations to help clarify difficult concepts."
    },
    {
      question: "Can I try a course before purchasing?",
      answer: "Yes! We offer preview lessons for most of our courses so you can explore the content, teaching style, and platform features before making a purchase. This helps ensure you're confident in your choice and find the right fit for your learning needs."
    },
    {
      question: "Do you offer certificates upon course completion?",
      answer: "Yes, students receive a certificate of completion for each course they finish. These certificates recognize their hard work and achievement, and can be a great addition to their educational portfolio."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, Learning Path is fully accessible through any web browser on your mobile device, tablet, or computer. Our responsive design ensures a smooth learning experience regardless of which device you're using. We're always working to improve accessibility and may introduce dedicated apps in the future."
    },
    {
      question: "What makes Learning Path different from other online learning platforms?",
      answer: "Learning Path combines comprehensive K-12 curriculum coverage with cutting-edge AI technology to provide personalized feedback and support. Our nature-inspired approach emphasizes organic, student-paced learning, while our intelligent exercise system ensures students truly understand the material—not just memorize it. We're committed to nurturing every student's unique potential."
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">

        
        <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-2 bg-green-200 bg-opacity-50 backdrop-blur-sm px-6 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-semibold">We're Here to Help</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Learning Path and how we help students grow
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-md border border-green-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-green-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-green-800 pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-green-100">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-xl p-8 text-center text-white">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-lg mb-6 opacity-90">
            We're here to help you grow! If you couldn't find the answer you're looking for, our support team is ready to assist you.
          </p>
          <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-colors duration-200 shadow-lg">
            Contact Support
          </button>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,60 600,60 900,30 C1050,15 1125,0 1200,0 L1200,120 L0,120 Z" fill="#059669" opacity="0.1"/>
          <path d="M0,20 C300,80 600,80 900,50 C1050,35 1125,20 1200,20 L1200,120 L0,120 Z" fill="#10b981" opacity="0.1"/>
        </svg>
      </div>
    </div>
  )
}

export default FAQsPage
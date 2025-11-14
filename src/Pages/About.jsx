import React from 'react'

const About = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Hero Section with Organic Shape */}
      <div className="relative overflow-hidden">

        
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-2 bg-green-200 bg-opacity-50 backdrop-blur-sm px-6 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-green-800 font-semibold">Growing Minds, Naturally</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 leading-tight">
            Welcome to <span className="text-green-600">Learning Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Where education grows naturally, nurturing young minds from their first seedling steps to full bloom
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mission Section with Leaf Accent */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-green-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Like a tree that grows from a tiny seed into a mighty oak, every student's journey begins with potential waiting to be unlocked. At Learning Path, we cultivate learning environments where knowledge takes root and flourishes. Our mission is to provide the richest soil for academic growth—comprehensive, expertly-crafted courses spanning Grades 1 through 12, designed to help every student branch out and reach for their highest aspirations.
          </p>
        </div>

        {/* What We Offer - Garden Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-10">Our Educational Ecosystem</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                ),
                title: "Comprehensive Curriculum Forest",
                description: "From the first sprouts of Grade 1 to the towering achievements of Grade 12, our complete subject coverage ensures no gap in your educational canopy. Mathematics, sciences, languages, social studies—every branch of knowledge is here.",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                ),
                title: "Expert-Nurtured Content",
                description: "Our courses are cultivated by seasoned educators who understand the unique seasons of learning. Each lesson is carefully tended, pruned for clarity, and enriched with engaging materials that help concepts bloom in young minds.",
                color: "from-emerald-400 to-green-500"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Flexible Growth Cycles",
                description: "Just as plants grow at their own pace, so do learners. Access your courses 24/7, allowing education to adapt to your natural rhythm. Whether you're an early bird or a night owl, learning blooms on your schedule.",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                ),
                title: "AI-Powered Growth Tracking",
                description: "Like a gardener who knows each plant's needs, our intelligent exercises and AI feedback system monitors your progress. Get instant, personalized insights that help you understand where you're thriving and where you need more nourishment to grow stronger.",
                color: "from-green-500 to-cyan-500"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Accessible Learning Gardens",
                description: "Quality education shouldn't be a rare orchid—it should be as accessible as wildflowers. Our thoughtfully priced courses ensure every student can cultivate their potential, regardless of their starting point.",
                color: "from-teal-400 to-green-500"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve - Nature Metaphor */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Cultivating Every Learner's Garden</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Every student is a unique seed with infinite potential. Whether you're a parent seeking to enrich the soil of your child's education, a student eager to cultivate new knowledge, or an educator recommending fertile ground for growth, Learning Path welcomes you to our thriving educational ecosystem.
            </p>
            <p>
              From the tender shoots of elementary exploration to the mature branches of high school mastery, we nurture understanding across all subjects—mathematics that counts like tree rings, sciences that observe nature's patterns, languages that flow like streams, and social studies that root us in our shared human forest.
            </p>
            <p className="font-semibold">
              Together, we're growing the next generation of thinkers, innovators, and leaders—one student, one course, one breakthrough at a time.
            </p>
          </div>
        </div>

        {/* Vision Section with Growth Theme */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border border-green-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-800">Our Vision: A Forest of Opportunity</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We envision a world where education grows as naturally and abundantly as a thriving forest—where every student has the resources to take root, the support to grow strong, and the freedom to reach for the sunlight of their dreams. Through Learning Path, we're planting seeds of knowledge that will grow into towering achievements.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our commitment is to break down the barriers that prevent access to quality education, creating an environment where curiosity sprouts, confidence grows, and academic excellence blossoms. Join us in this journey to transform education—not with force, but with nurture; not with pressure, but with patience; not with restriction, but with the boundless growth that comes from giving every learner what they need to flourish.
          </p>
          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-green-700 italic">
              "Watch knowledge grow. Watch potential bloom. Watch futures take root."
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="relative h-32 overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,60 600,60 900,30 C1050,15 1125,0 1200,0 L1200,120 L0,120 Z" fill="#059669" opacity="0.1"/>
          <path d="M0,20 C300,80 600,80 900,50 C1050,35 1125,20 1200,20 L1200,120 L0,120 Z" fill="#10b981" opacity="0.1"/>
        </svg>
      </div>
    </div>
  )
}

export default About
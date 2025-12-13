import { Zap, ArrowRight, Bot, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Content Generation",
      description: "Our advanced AI analyzes your industry and generates professional, tailored content that gets past ATS systems and impresses hiring managers.",
      color: "from-blue-500 to-cyan-500",
      highlight: "80% faster resume creation"
    },
    {
      icon: Sparkles,
      title: "Smart Optimization",
      description: "Real-time suggestions to improve your resume's impact, keyword density, and overall effectiveness based on industry best practices.",
      color: "from-purple-500 to-pink-500",
      highlight: "3x more interview calls"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your resume's performance with detailed analytics. See which sections work best and get insights to improve your job search.",
      color: "from-purple-500 to-emerald-500",
      highlight: "85% success rate"
    },
    {
      icon: Shield,
      title: "ATS-Friendly Templates",
      description: "Professionally designed templates that pass Applicant Tracking Systems while looking modern and visually appealing.",
      color: "from-orange-500 to-red-500",
      highlight: "100% ATS compatible"
    },
    {
      icon: Clock,
      title: "Quick & Easy Process",
      description: "Create a professional resume in minutes with our intuitive interface. No design skills required - just answer a few questions.",
      color: "from-teal-500 to-blue-500",
      highlight: "5-minute setup"
    }
  ];

  return (
    <div id="features" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600 bg-purple-100 rounded-full px-4 py-2 mb-4 max-w-fit mx-auto">
            <Zap width={14} />
            <span>AI-Powered Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Create Resumes That{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get You Hired
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge AI technology helps you craft professional resumes that stand out, 
            pass ATS systems, and land interviews faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 shadow-blue-100' : ''
                }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              </div>
            );
          })}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                See the Magic in Action
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Watch how our AI transforms your basic information into a professional, 
                interview-winning resume in just minutes. No more writer's block or formatting headaches.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-500">Simple Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
                </div>
              </div>
              <Link to="/app" className="btn-primary inline-flex items-center gap-2 group">
                Try It Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Demo Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-500 ml-auto">AI Resume Builder</span>
                  </div>
                  
                  {/* Mock AI Interface */}
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium">✨ AI Enhancement Complete!</p>
                    <p className="text-xs text-gray-600 mt-1">Your resume is now optimized for ATS and ready to impress recruiters.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
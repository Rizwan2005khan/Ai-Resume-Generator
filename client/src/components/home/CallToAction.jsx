import { Rocket, ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div id="cta" className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-sm text-gray-300">Resumes Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
            <div className="text-sm text-gray-300">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">85%</div>
            <div className="text-sm text-gray-300">Interview Rate</div>
          </div>
        </div>

        {/* Main CTA Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Land Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of professionals who have secured their dream positions with AI-powered resumes. 
            Don't let opportunities pass you by - create your winning resume today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/app?state=register" 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
            >
              <div className="relative flex items-center gap-3">
                <Rocket className="w-5 h-5" />
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all">
              View Success Stories
            </button>
          </div>

          {/* Risk-Free Guarantee */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">24/7 customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Proven results</span>
              </div>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              ⚡ Limited time: Get 50% off premium features this week only
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 100C120 80 240 40 360 30C480 20 600 40 720 50C840 60 960 50 1080 40C1140 35 1200 25 1260 20L1320 15V0H1260C1200 0 1140 0 1080 0C1020 0 960 0 900 0C840 0 780 0 720 0C660 0 600 0 540 0C480 0 420 0 360 0C300 0 240 0 180 0C120 0 60 0 30 0H0V120Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default CallToAction;
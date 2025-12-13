import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Play, Star, TrendingUp, Users, Award, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  const achievements = [
    { number: "50K+", label: "Resumes Created", icon: Users },
    { number: "4.9/5", label: "User Rating", icon: Star },
    { number: "85%", label: "Interview Rate", icon: TrendingUp },
    { number: "2025", label: "Award Winner", icon: Award },
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden ">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation */}
        <nav className={`relative z-50 flex items-center justify-between w-full py-6 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg fixed top-0' : ''}`}>
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumePro
              </span>
              <p className="text-xs text-gray-500">AI-Powered Builder</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
             <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Success Stories</a>
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <Link to="/app?state=login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Sign In
                  </Link>
                  <Link to="/app?state=register" className="btn-primary">
                    Get Started Free
                  </Link>
                </>
              ) : (
                <Link to="/app" className="btn-primary">
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 bg-white rounded-lg text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-white text-xl">Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-white text-xl">Success Stories</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-white text-xl">Pricing</a>
          {!user ? (
            <Link to="/app?state=register" onClick={() => setMenuOpen(false)} className="btn-primary text-xl">
              Get Started Free
            </Link>
          ) : (
            <Link to="/app" onClick={() => setMenuOpen(false)} className="btn-primary text-xl">
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-16">
          
          {/* Achievement Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-sm font-bold text-gray-900">{achievement.number}</span>
                    <span className="text-xs text-gray-600 ml-1">{achievement.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 max-w-5xl leading-tight">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Resumes
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
            Create professional resumes that get you hired. Our AI helps you craft compelling content, 
            optimize for ATS, and stand out from the competition.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/app" className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
              Build My Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setVideoModalOpen(true)}
              className="flex items-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <Play className="w-5 h-5 group-hover:text-blue-600" />
              <span className="group-hover:text-blue-600">Watch Demo</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                  alt={`User ${i + 1}`}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Trusted by 50,000+ professionals worldwide</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="relative z-10 bg-white/50 backdrop-blur-sm py-8 mt-auto">
          <p className="text-center text-sm text-gray-600 mb-6">Trusted by professionals from leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto px-6">
            {logos.map((logo, index) => (
              <img key={index} src={logo} className="h-8 opacity-60 hover:opacity-100 transition-opacity" alt={`Company ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur flex items-center justify-center p-6" onClick={() => setVideoModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">See ResumePro in Action</h3>
              <button onClick={() => setVideoModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Hero;
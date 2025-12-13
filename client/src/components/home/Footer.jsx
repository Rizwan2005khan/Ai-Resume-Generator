import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 group mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ResumePro
                  </span>
                </div>
              </Link>
              <p className="text-gray-600 mb-6 max-w-md">
                Create professional resumes with AI-powered technology. Land your dream job faster with optimized, ATS-friendly resumes.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/app" className="text-gray-600 hover:text-blue-600 transition-colors">Resume Builder</Link></li>
                <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">AI Features</a></li>
                <li><a href="#templates" className="text-gray-600 hover:text-blue-600 transition-colors">Templates</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Career Advice</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Resume Examples</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">support@resumepro.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 ResumePro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
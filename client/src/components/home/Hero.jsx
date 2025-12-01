import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  Video,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";

const Hero = () => {

  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <>
      <div className="min-h-screen pb-20">
        
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="https://prebuiltui.com">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-slate-800">
            <a href="#" className="hover:text-green-600">Home</a>
            <a href="#features" className="hover:text-green-600">Features</a>
            <a href="#testimonials" className="hover:text-green-600">Testimonials</a>
            <a href="#cta" className="hover:text-green-600">Contact</a>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 rounded-full text-white" hidden={user}
            >
              Get started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border rounded-full text-slate-700 hover:bg-slate-50" hidden={user}
            >
              Login
            </Link>
            <Link to='/app' className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={!user}>
             Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <Menu size={26} strokeWidth={2} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">Home</a>
          <a href="#features" className="text-white">Features</a>
          <a href="#testimonials" className="text-white">Testimonials</a>
          <a href="#contact" className="text-white">Contact</a>

          <button
            onClick={() => setMenuOpen(false)}
            className="size-10 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-md text-white"
          >
            <X />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">

          {/* Gradient background */}
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-green-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              {/* avatars unchanged */}
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" className="size-8 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-green-600 fill-green-600"
                    />
                  ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4">
            Land your dream job with{" "}
            <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              Ai-powered
            </span>{" "}
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit, and download professional resumes with AI-powered assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center transition-all"
            >
              Get started
              <ArrowRight className="ml-1 size-4" />
            </Link>

            <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 rounded-full px-7 h-12 text-slate-700">
              <Video className="size-5" />
              <span>Try demo</span>
            </button>
          </div>

          <p className="py-6 text-slate-600 mt-14">
            Trusted by leading brands, including
          </p>

          <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4">
            {logos.map((logo, index) => (
              <img key={index} src={logo} className="h-6" />
            ))}
          </div>
        </div>
      </div>

      {/* Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </>
  );
};

export default Hero;

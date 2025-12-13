import { BookUserIcon, Star } from "lucide-react";
import React from "react";
import Title from "./Title";

const Testimonial = () => {
  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Sarah Johnson",
      handle: "@sarahj",
      role: "Marketing Manager",
      company: "Tech Corp",
      testimonial: "ResumePro's AI helped me land 5 interviews in my first week! The optimization suggestions were spot-on.",
      rating: 5
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Michael Chen",
      handle: "@mikechen",
      role: "Software Engineer",
      company: "Google",
      testimonial: "The AI enhancement feature is incredible. It transformed my basic resume into something I'm proud to submit.",
      rating: 5
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Emily Rodriguez",
      handle: "@emilyrod",
      role: "Product Designer",
      company: "Adobe",
      testimonial: "Finally, a resume builder that understands design! Beautiful templates and the AI suggestions are brilliant.",
      rating: 5
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "David Kim",
      handle: "@davidkim",
      role: "Data Analyst",
      company: "Microsoft",
      testimonial: "Went from no callbacks to multiple interviews. The ATS optimization really works!",
      rating: 5
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-6 rounded-2xl mx-4 shadow-lg hover:shadow-xl transition-all duration-300 w-80 shrink-0 bg-white border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src={card.image}
          alt={card.name}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{card.name}</h4>
            <div className="flex">
              {[...Array(card.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <span className="text-sm text-gray-500">{card.role} at {card.company}</span>
        </div>
      </div>
      <blockquote className="text-gray-700 italic mb-4">
        "{card.testimonial}"
      </blockquote>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium">{card.handle}</span>
        <span className="text-purple-500">✓ Verified User</span>
      </div>
    </div>
  );

  return (
    <>
      <div
        id="testimonials"
        className="flex flex-col items-center my-16 scroll-mt-12 bg-gradient-to-br from-gray-50 to-blue-50 py-16 rounded-3xl"
      >
        <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-100 rounded-full px-6 py-1.5 mb-6">
          <BookUserIcon className="w-4 h-4 stroke-purple-600" />
          <span>Success Stories</span>
        </div>
        
        <Title
          title="Join 50,000+ Successful Job Seekers"
          description="Real stories from real people who landed their dream jobs with ResumePro. Your success could be next!"
        />
        
        {/* Testimonials Marquee */}
        <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative mt-10">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] py-6">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>

        <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative mt-6">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-6">
            {[...cardsData.reverse(), ...cardsData.reverse()].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Ready to write your success story?</p>
          <button className="btn-primary">
            Start Building Your Resume
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
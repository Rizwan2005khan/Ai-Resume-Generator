import { Loader2, Sparkles, FileText, Lightbulb, Quote, PenTool } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector(state => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(data ? data.split(' ').filter(word => word.length > 0).length : 0);
  const [showExamples, setShowExamples] = useState(false);

  const generateSummary = async () => {
    if (!data || data.trim().length < 10) {
      toast.error("Please write a brief summary first");
      return;
    }

    try {
      setIsGenerating(true);
      const prompt = `Enhance this professional summary for a resume: "${data}". Make it more compelling, professional, and impactful while maintaining authenticity.`;
      
       const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      
      setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}));
      toast.success("Summary enhanced with AI! ✨");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextChange = (value) => {
    onChange(value);
    setWordCount(value.split(' ').filter(word => word.length > 0).length);
  };

  const getSummaryStrength = () => {
    if (wordCount < 20) return { level: 'weak', color: 'text-red-500', bg: 'bg-red-50', message: 'Too brief - add more detail', icon: '📝' };
    if (wordCount < 40) return { level: 'good', color: 'text-yellow-500', bg: 'bg-yellow-50', message: 'Good start - could be more detailed', icon: '⭐' };
    if (wordCount < 80) return { level: 'strong', color: 'text-purple-500', bg: 'bg-purple-50', message: 'Excellent length and detail', icon: '💪' };
    return { level: 'too-long', color: 'text-orange-500', bg: 'bg-orange-50', message: 'Consider making it more concise', icon: '✂️' };
  };

  const strength = getSummaryStrength();

  const summaryTemplates = [
    {
      title: "Results-Driven Professional",
      content: "Results-driven professional with 5+ years of experience in [industry]. Proven track record of [achievement] and expertise in [skills]. Seeking to leverage my [strengths] to drive success at [company type].",
      category: "General"
    },
    {
      title: "Technical Leader",
      content: "Experienced [job title] with a strong background in [field]. Skilled in [technical skills] with demonstrated success in [achievement]. Passionate about [industry/field] and committed to delivering exceptional results.",
      category: "Technical"
    },
    {
      title: "Creative Professional",
      content: "Creative professional with expertise in [creative field]. Proven ability to [creative achievement] and deliver innovative solutions. Passionate about pushing boundaries and creating impactful work.",
      category: "Creative"
    },
    {
      title: "Business Leader",
      content: "Strategic business leader with extensive experience in [business area]. Proven track record of driving growth, optimizing operations, and leading high-performing teams to achieve exceptional results.",
      category: "Business"
    }
  ];

  return (
    <div className="modern-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">Craft a compelling introduction to your professional story</p>
        </div>
        <button 
          disabled={isGenerating} 
          onClick={generateSummary} 
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => handleTextChange(e.target.value)}
            rows={8}
            className="modern-input w-full resize-none text-base leading-relaxed"
            placeholder="Write a compelling professional summary..."
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${strength.bg} ${strength.color} flex items-center gap-1`}>
              <span>{strength.icon}</span>
              {wordCount} words
            </span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${strength.bg} border-current/20`}>
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-4 h-4 ${strength.color}`} />
            <span className={`text-sm font-medium ${strength.color}`}>{strength.message}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                strength.level === 'weak' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                strength.level === 'good' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                strength.level === 'strong' ? 'bg-gradient-to-r from-purple-400 to-blue-500' : 'bg-gradient-to-r from-orange-400 to-red-500'
              }`}
              style={{ width: `${Math.min((wordCount / 80) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-2">💡 Writing Tips</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Start with your years of experience</li>
                  <li>• Highlight your key strengths</li>
                  <li>• Mention your career goals</li>
                  <li>• Keep it concise (3-4 sentences)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-900 mb-2">🎯 What to Include</p>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Industry expertise</li>
                  <li>• Key achievements</li>
                  <li>• Technical skills</li>
                  <li>• Value proposition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-3"
          >
            <Lightbulb className="w-4 h-4" />
            {showExamples ? 'Hide' : 'Show'} Professional Templates
          </button>
          
          {showExamples && (
            <div className="space-y-3">
              {summaryTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTextChange(template.content)}
                  className="w-full text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-gray-700 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{template.title}</span>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{template.category}</span>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{template.content}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;

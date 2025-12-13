import { Briefcase, Loader2, Plus, Sparkles, Trash2, Calendar, Building, UserCheck, Award, Target } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector(state => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);
  const [activeSection, setActiveSection] = useState(null);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
      achievements: []
    };
    onChange([...data, newExperience]);
    setActiveSection(data.length);
  };

  const removeExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
    if (activeSection === index) setActiveSection(null);
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...data];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onChange(updatedExperience);
  };

  const addAchievement = (expIndex) => {
    const updated = [...data];
    if (!updated[expIndex].achievements) updated[expIndex].achievements = [];
    updated[expIndex].achievements.push("");
    onChange(updated);
  };

  const updateAchievement = (expIndex, achIndex, value) => {
    const updated = [...data];
    updated[expIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updated = [...data];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    
    if (!experience.position || !experience.company) {
      toast.error("Please fill in position and company first");
      setGeneratingIndex(-1);
      return;
    }

    const prompt = `Enhance this job description for ${experience.position} at ${experience.company}. Current description: ${experience.description}. Make it more professional and impactful for a resume.`;
    
    try {
      const { data: response } = await api.post('/api/ai/enhance-job-desc', 
        { userContent: prompt }, 
        { headers: { Authorization: token } }
      );
      updateExperience(index, "description", response.enhancedContent);
      toast.success("Description enhanced with AI! ✨");
    } catch (error) {
      toast.error(error.message || "Failed to enhance description");
    } finally {
      setGeneratingIndex(-1);
    }
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500 mt-1">Showcase your career journey and achievements</p>
        </div>
        <button onClick={addExperience} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="modern-card text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No experience added yet</h4>
          <p className="text-gray-500 mb-6">Start building your professional story</p>
          <button onClick={addExperience} className="btn-primary">
            Add Your First Role
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="modern-card overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-all"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {experience.position || experience.company ? 
                        `${experience.position || 'Position'} at ${experience.company || 'Company'}` : 
                        `Experience ${index + 1}`
                      }
                    </h4>
                    <p className="text-sm text-gray-500">
                      {experience.start_date && experience.end_date ? 
                        `${new Date(experience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${experience.is_current ? 'Present' : new Date(experience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` :
                        'Click to add details'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(index);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${activeSection === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className={`transition-all duration-300 ${activeSection === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 space-y-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Building className="w-4 h-4 text-gray-500" />
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={experience.company || ""}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        className="modern-input w-full"
                        placeholder="e.g., Google, Microsoft"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <UserCheck className="w-4 h-4 text-gray-500" />
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={experience.position || ""}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                        className="modern-input w-full"
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={experience.start_date || ""}
                        onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                        className="modern-input w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        End Date
                      </label>
                      <input
                        type="month"
                        value={experience.end_date || ""}
                        onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                        disabled={experience.is_current}
                        className="modern-input w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={experience.is_current || false}
                      onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I currently work here
                    </span>
                  </label>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        Job Description & Achievements
                      </label>
                      <button 
                        onClick={() => generateDescription(index)} 
                        disabled={generatingIndex === index || !experience.position || !experience.company} 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all disabled:opacity-50"
                      >
                        {generatingIndex === index ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        {generatingIndex === index ? 'Enhancing...' : 'AI Enhance'}
                      </button>
                    </div>
                    
                    <textarea
                      rows={4}
                      value={experience.description || ""}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      className="modern-input w-full resize-none"
                      placeholder="Describe your key responsibilities and achievements..."
                    />

                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <p className="text-sm font-medium text-gray-700">Key Achievements</p>
                        <button
                          onClick={() => addAchievement(index)}
                          className="ml-auto flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-3 h-3" />
                          Add Achievement
                        </button>
                      </div>
                      
                      {experience.achievements?.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex gap-2 mb-2">
                          <Target className="w-4 h-4 text-gray-400 mt-2" />
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                            className="modern-input flex-1"
                            placeholder="e.g., Increased sales by 25% through..."
                          />
                          <button
                            onClick={() => removeAchievement(index, achIndex)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      {!experience.achievements?.length && (
                        <p className="text-sm text-gray-500 italic">Add measurable achievements to make your experience stand out</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;

import { Plus, Sparkles, X, TrendingUp, Brain, Zap, Trophy } from 'lucide-react';
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");
  const [suggestedSkills] = useState([
    "JavaScript", "React", "Node.js", "Python", "SQL", "Project Management",
    "Leadership", "Communication", "Problem Solving", "Agile", "Git", "AWS",
    "TypeScript", "Vue.js", "Angular", "Docker", "Kubernetes", "MongoDB"
  ]);

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSuggestedSkill = (skill) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  const categorizeSkills = (skills) => {
    const categories = {
      technical: skills.filter(skill => 
        ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'TypeScript', 'Vue.js', 'Angular', 'Docker', 'Kubernetes', 'MongoDB'].includes(skill)
      ),
      soft: skills.filter(skill => 
        ['Leadership', 'Communication', 'Problem Solving', 'Project Management', 'Agile'].includes(skill)
      ),
      other: skills.filter(skill => 
        !['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'TypeScript', 'Vue.js', 'Angular', 'Docker', 'Kubernetes', 'MongoDB', 'Leadership', 'Communication', 'Problem Solving', 'Project Management', 'Agile'].includes(skill)
      )
    };
    return categories;
  };

  const getSkillLevel = (skill) => {
    // Simple heuristic for skill levels
    if (['JavaScript', 'React', 'Python', 'SQL'].includes(skill)) return 'expert';
    if (['Node.js', 'TypeScript', 'Git'].includes(skill)) return 'advanced';
    return 'intermediate';
  };

  const categories = categorizeSkills(data);
  const strength = data.length < 6 ? 'beginner' : data.length < 12 ? 'intermediate' : data.length < 18 ? 'advanced' : 'expert';

  return (
    <div className="modern-card">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-900">Skills & Expertise</h3>
        </div>
        <p className="text-sm text-gray-500">Showcase your technical and professional skills</p>
      </div>

      {/* Enhanced Skill Input */}
      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Enter a skill (e.g., JavaScript, Project Management)" 
          className="modern-input flex-1"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addSkill} disabled={!newSkill.trim()} className="btn-primary flex items-center gap-2">
          <Plus className='w-4 h-4' /> 
          Add Skill
        </button>
      </div>

      {/* Skills Strength Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-900">Skills Profile Strength</span>
          </div>
          <span className="text-sm font-bold text-blue-900">{data.length}/20</span>
        </div>
        <div className="w-full bg-white rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              strength === 'expert' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              strength === 'advanced' ? 'bg-gradient-to-r from-purple-400 to-blue-500' :
              strength === 'intermediate' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
              'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}
            style={{ width: `${Math.min((data.length / 20) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-blue-800">
          {strength === 'expert' ? '🏆 Outstanding skills profile!' :
           strength === 'advanced' ? '⭐ Excellent range of skills' :
           strength === 'intermediate' ? '👍 Good foundation, keep adding' :
           '🚀 Start building your skills profile'}
        </p>
      </div>

      {/* Enhanced Suggested Skills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-500" />
          <p className="text-sm font-medium text-gray-700">AI-Suggested Skills</p>
          <span className="text-xs text-gray-500 ml-auto">Click to add</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.slice(0, 12).map((skill, index) => (
            <button
              key={index}
              onClick={() => addSuggestedSkill(skill)}
              disabled={data.includes(skill)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all transform hover:scale-105 ${
                data.includes(skill) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 border border-blue-200 hover:border-blue-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Categorized Skills Display */}
      {data.length > 0 ? (
        <div className="space-y-6">
          {/* Technical Skills with Levels */}
          {categories.technical.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Technical Skills ({categories.technical.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {categories.technical.map((skill, index) => (
                  <EnhancedSkillTag 
                    key={index} 
                    skill={skill} 
                    level={getSkillLevel(skill)}
                    onRemove={() => removeSkill(data.indexOf(skill))} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {categories.soft.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                Professional Skills ({categories.soft.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {categories.soft.map((skill, index) => (
                  <SkillTag key={index} skill={skill} onRemove={() => removeSkill(data.indexOf(skill))} />
                ))}
              </div>
            </div>
          )}

          {/* Other Skills */}
          {categories.other.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Additional Skills ({categories.other.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {categories.other.map((skill, index) => (
                  <SkillTag key={index} skill={skill} onRemove={() => removeSkill(data.indexOf(skill))} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Sparkles className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
          <p className="text-gray-500 font-medium mb-1">No skills added yet</p>
          <p className="text-sm text-gray-400">Start building your skills profile above</p>
        </div>
      )}

      {/* Enhanced Pro Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-2">💡 AI Optimization Tips</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Include 8-20 relevant skills for optimal ATS matching</li>
              <li>• Mix technical skills with soft skills (70/30 ratio)</li>
              <li>• Order by proficiency: Expert → Advanced → Intermediate</li>
              <li>• Update skills based on job descriptions you're targeting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Skill Tag Component with Level Indicator
const EnhancedSkillTag = ({ skill, level, onRemove }) => (
  <span className="group relative flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all border border-blue-200">
    <span className="flex-1">{skill}</span>
    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
      level === 'expert' ? 'bg-yellow-200 text-yellow-800' :
      level === 'advanced' ? 'bg-purple-200 text-purple-800' :
      'bg-gray-200 text-gray-700'
    }`}>
      {level}
    </span>
    <button 
      onClick={onRemove}
      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50 rounded-full p-0.5"
    >
      <X className='w-3 h-3' />
    </button>
  </span>
);

// Standard Skill Tag
const SkillTag = ({ skill, onRemove }) => (
  <span className="group relative flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-teal-100 text-purple-800 rounded-full text-sm font-medium hover:from-purple-200 hover:to-teal-200 transition-all border border-purple-200">
    {skill}
    <button 
      onClick={onRemove}
      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50 rounded-full p-0.5"
    >
      <X className='w-3 h-3' />
    </button>
  </span>
);

export default SkillsForm;
// PersonalInfoForm.jsx (Complete Fixed Version)
import React, { useState } from 'react';
import { 
  BriefcaseBusiness, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  Globe,
  Sparkles,
  Upload,
  CheckCircle 
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onchange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (field, value) => {
    console.log(`📝 Field ${field} changed to:`, value);
    onchange({ ...data, [field]: value });
  };

  // FIXED: Better image upload handler
  const handleImageUpload = (file) => {
    if (!file) return;
    
    console.log('📁 File selected:', file.name, file.size, file.type);
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadStatus('error');
      alert('File must be less than 5MB');
      return;
    }

    // Handle the file
    handleChange("image", file);
    setUploadStatus('success');
    console.log('✅ Image uploaded successfully:', file.name);
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
    },
    {
      key: "Website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

  return (
    <div className="modern-card">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Personal Information
        </h3>
        <p className="text-sm text-gray-500 mt-1">Let's start with your basic details</p>
      </div>

      {/* Image Upload Section - FIXED */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo</label>
        <div className="flex items-center gap-6">
          <div className="relative">
            {data.image ? (
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ring-4 ring-blue-50 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <User className="w-8 h-8 text-blue-500" />
              </div>
            )}
            
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-all hover:scale-110">
              <Upload className="w-4 h-4 text-gray-600" />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>
          
          <div className="flex-1">
            <button
              onClick={() => document.querySelector('input[type="file"]')?.click()}
              className="btn-primary flex items-center gap-2 mb-3"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
            
            {/* Upload Status */}
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                Image uploaded successfully!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                Upload failed. Please try again.
              </div>
            )}
            
            {/* Background Removal Toggle */}
            {typeof data.image === "object" && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={() => setRemoveBackground((prev) => !prev)}
                  checked={removeBackground}
                />
                <span className="text-sm text-gray-700 font-medium">✨ AI Remove Background</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4 text-gray-500" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input 
                type={field.type} 
                value={data[field.key] || ""} 
                onChange={(e) => handleChange(field.key, e.target.value)} 
                className="modern-input w-full" 
                placeholder={`Enter your ${field.label.toLowerCase()}`} 
                required={field.required}
              />
            </div>
          );
        })}
      </div>

      {/* AI Tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">💡 AI Optimization Tip</p>
            <p className="text-sm text-blue-800">
              Profiles with professional photos get 21x more views. Use a high-quality headshot with good lighting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
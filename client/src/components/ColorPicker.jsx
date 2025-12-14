import { Check, Palette, Sparkles, Eye, RefreshCw } from "lucide-react";
import React, { useState, useEffect } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const colorPalettes = [
    {
      name: "Professional Blue",
      colors: [
        { name: "Deep Blue", value: "#1e40af", description: "Trust & reliability" },
        { name: "Royal Blue", value: "#3b82f6", description: "Professional & modern" },
        { name: "Sky Blue", value: "#0ea5e9", description: "Fresh & innovative" },
        { name: "Teal", value: "#0891b2", description: "Creative & balanced" },
      ]
    },
    {
      name: "Creative Purple",
      colors: [
        { name: "Deep Purple", value: "#6d28d9", description: "Luxury & wisdom" },
        { name: "Royal Purple", value: "#8b5cf6", description: "Creative & unique" },
        { name: "Lavender", value: "#a855f7", description: "Imaginative & elegant" },
        { name: "Pink", value: "#ec4899", description: "Energetic & passionate" },
      ]
    },
    {
      name: "Modern purple",
      colors: [
        { name: "Forest purple", value: "#166534", description: "Growth & stability" },
        { name: "Emerald", value: "#059669", description: "Success & prosperity" },
        { name: "Teal purple", value: "#0d9488", description: "Sophisticated & calm" },
        { name: "Mint", value: "#10b981", description: "Fresh & innovative" },
      ]
    },
    {
      name: "Elegant Gray",
      colors: [
        { name: "Charcoal", value: "#1f2937", description: "Professional & strong" },
        { name: "Slate", value: "#475569", description: "Modern & reliable" },
        { name: "Steel", value: "#64748b", description: "Neutral & balanced" },
        { name: "Silver", value: "#94a3b8", description: "Clean & minimal" },
      ]
    },
    {
      name: "Bold Red",
      colors: [
        { name: "Crimson", value: "#991b1b", description: "Bold & energetic" },
        { name: "Scarlet", value: "#dc2626", description: "Passionate & dynamic" },
        { name: "Coral", value: "#f87171", description: "Friendly & warm" },
        { name: "Orange", value: "#f97316", description: "Creative & enthusiastic" },
      ]
    },
  ];

  const generateRandomColor = () => {
    const colors = colorPalettes.flatMap(palette => palette.colors.map(color => color.value));
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    onChange(randomColor);
  };

  const getColorPsychology = (color) => {
    const psychologies = {
      blue: "Trust, reliability, professionalism",
      purple: "Growth, stability, success",
      gray: "Professionalism, balance, modern",
      red: "Energy, passion, boldness",
      orange: "Enthusiasm, creativity, warmth"
    };
    
    const hue = hexToHsl(color)[0];
    if (hue < 30 || hue > 330) return psychologies.red;
    if (hue < 90) return psychologies.orange;
    if (hue < 150) return psychologies.purple;
    if (hue < 210) return psychologies.blue;
    if (hue < 270) return psychologies.purple;
    return psychologies.gray;
  };

  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} className="text-blue-600" /> 
        <span className="font-medium">Accent Color</span>
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full w-96 mt-2 space-y-4 z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-6">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Choose Accent Color</h3>
              <p className="text-xs text-gray-500">Select a color that represents your professional brand</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generateRandomColor}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Random color"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                AI-Picked
              </div>
            </div>
          </div>

          {/* Enhanced Color Palettes */}
          <div className="space-y-6 max-h-80 overflow-y-auto">
            {colorPalettes.map((palette) => (
              <div key={palette.name} className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${palette.colors[0].value.includes('blue') ? 'from-blue-400 to-blue-600' : palette.colors[0].value.includes('purple') ? 'from-purple-400 to-purple-600' : palette.colors[0].value.includes('purple') ? 'from-purple-400 to-purple-600' : palette.colors[0].value.includes('gray') ? 'from-gray-400 to-gray-600' : 'from-red-400 to-red-600'}`} />
                  {palette.name}
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {palette.colors.map((color) => (
                    <div
                      key={color.value}
                      className="relative group cursor-pointer"
                      onClick={() => {
                        onChange(color.value);
                        setIsOpen(false);
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-lg border-2 border-transparent group-hover:border-gray-400 transition-all group-hover:scale-110 shadow-md"
                        style={{ backgroundColor: color.value }}
                      />
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-current">
                            <Check className="w-4 h-4 text-gray-700" />
                          </div>
                        </div>
                      )}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <div className="font-medium">{color.name}</div>
                        <div className="text-gray-300">{color.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Custom Color Input */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => onChange(e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 modern-input text-sm"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {/* Enhanced Color Psychology */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-2">🎨 Color Psychology</p>
                <p className="text-sm text-blue-800 mb-2">{getColorPsychology(selectedColor)}</p>
                <div className="text-xs text-blue-700 bg-white/50 rounded px-2 py-1 inline-block">
                  HSL: {hexToHsl(selectedColor).join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Current Selection Preview */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-white shadow-lg"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Currently Selected</p>
                <p className="text-xs text-gray-600 font-mono">{selectedColor}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
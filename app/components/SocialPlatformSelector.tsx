'use client';

import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface SocialPlatformSelectorProps {
  onPlatformSelect: (platforms: string[]) => void;
  selectedPlatforms: string[];
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const platforms: Platform[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: 'bg-pink-500',
    description: 'Short-form vertical videos'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'Visual content and stories'
  }
];

export default function SocialPlatformSelector({ 
  onPlatformSelect, 
  selectedPlatforms 
}: SocialPlatformSelectorProps) {
  const togglePlatform = (platformId: string) => {
    const newSelection = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    
    onPlatformSelect(newSelection);
  };

  return (
    <div className="space-y-3">
      {platforms.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id);
        
        return (
          <div
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`
              card p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]
              ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-on-surface/30'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-lg`}>
                {platform.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-on-surface">{platform.name}</h4>
                <p className="text-sm text-on-surface/60">{platform.description}</p>
              </div>
              
              <div className="text-primary">
                {isSelected ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-on-surface/50 text-center py-2">
          Select at least one platform to continue
        </p>
      )}
    </div>
  );
}

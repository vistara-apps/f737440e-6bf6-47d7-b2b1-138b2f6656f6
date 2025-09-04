'use client';

import { useState } from 'react';
import { ExternalLink, Share2, Heart, MessageCircle } from 'lucide-react';
import ActionButton from './ActionButton';

interface AdVariation {
  id: string;
  imageUrl: string;
  prompt: string;
  caption: string;
  platform: 'tiktok' | 'instagram' | 'both';
}

interface AdVariantCardProps {
  ad: AdVariation;
  variant: 'displayingImage' | 'generating';
  onPost?: (platform: string) => void;
}

export default function AdVariantCard({ ad, variant, onPost }: AdVariantCardProps) {
  const [isPosting, setIsPosting] = useState<string | null>(null);

  const handlePost = async (platform: string) => {
    if (!onPost) return;
    
    setIsPosting(platform);
    try {
      await onPost(platform);
    } finally {
      setIsPosting(null);
    }
  };

  if (variant === 'generating') {
    return (
      <div className="card p-4 animate-pulse">
        <div className="bg-surface rounded-lg h-48 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-surface rounded w-3/4"></div>
          <div className="h-3 bg-surface rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 space-y-4">
      {/* Ad Preview */}
      <div className="relative rounded-lg overflow-hidden bg-surface">
        <img
          src={ad.imageUrl}
          alt="Generated ad variation"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-sm font-medium">
            {ad.platform === 'both' ? 'Multi-Platform' : ad.platform.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Ad Caption */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-on-surface/90">{ad.caption}</p>
        {ad.prompt && (
          <p className="text-xs text-on-surface/60 italic">Style: {ad.prompt}</p>
        )}
      </div>

      {/* Engagement Preview */}
      <div className="flex items-center gap-4 text-sm text-on-surface/60">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          <span>2.4k</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>156</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          <span>89</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {(ad.platform === 'tiktok' || ad.platform === 'both') && (
          <ActionButton
            variant="primary"
            onClick={() => handlePost('tiktok')}
            disabled={isPosting !== null}
            className="flex-1 text-sm"
          >
            {isPosting === 'tiktok' ? 'Posting...' : 'Post to TikTok'}
          </ActionButton>
        )}
        {(ad.platform === 'instagram' || ad.platform === 'both') && (
          <ActionButton
            variant="primary"
            onClick={() => handlePost('instagram')}
            disabled={isPosting !== null}
            className="flex-1 text-sm"
          >
            {isPosting === 'instagram' ? 'Posting...' : 'Post to Instagram'}
          </ActionButton>
        )}
        <ActionButton
          variant="secondary"
          className="px-3"
          title="View Details"
        >
          <ExternalLink className="w-4 h-4" />
        </ActionButton>
      </div>
    </div>
  );
}

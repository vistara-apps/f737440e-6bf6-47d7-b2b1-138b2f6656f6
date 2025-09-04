'use client';

import { useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import ImageUploader from './components/ImageUploader';
import AdVariantCard from './components/AdVariantCard';
import SocialPlatformSelector from './components/SocialPlatformSelector';
import AIGenerationStatusIndicator from './components/AIGenerationStatusIndicator';
import ActionButton from './components/ActionButton';
import { Sparkles, Zap, Target } from 'lucide-react';

interface AdVariation {
  id: string;
  imageUrl: string;
  prompt: string;
  caption: string;
  platform: 'tiktok' | 'instagram' | 'both';
}

export default function Home() {
  const { isConnected } = useAccount();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<AdVariation[]>([]);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'processing' | 'complete' | 'error'>('idle');

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setGeneratedAds([]);
    setGenerationStatus('idle');
  };

  const handlePlatformSelect = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };

  const generateAdVariations = async () => {
    if (!uploadedImage || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    setGenerationStatus('processing');

    try {
      const response = await fetch('/api/generate-ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          prompt: userPrompt,
          platforms: selectedPlatforms,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate ads');
      }

      const data = await response.json();
      setGeneratedAds(data.variations);
      setGenerationStatus('complete');
    } catch (error) {
      console.error('Error generating ads:', error);
      setGenerationStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  const postToSocial = async (adId: string, platform: string) => {
    try {
      const response = await fetch('/api/post-to-social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adId,
          platform,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post to social media');
      }

      const data = await response.json();
      console.log('Posted successfully:', data);
    } catch (error) {
      console.error('Error posting to social:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">AdRemix AI</h1>
            <p className="text-on-surface/70">
              Spin up social ad variations and post them instantly
            </p>
          </div>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" />
            AdRemix AI
          </h1>
          <p className="text-on-surface/70 text-lg">
            Generate AI-powered ad variations and post them instantly
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Upload Product Image
              </h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            {uploadedImage && (
              <>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Select Target Platforms
                  </h3>
                  <SocialPlatformSelector 
                    onPlatformSelect={handlePlatformSelect}
                    selectedPlatforms={selectedPlatforms}
                  />
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Ad Style Prompt (Optional)
                  </h3>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Describe the style or messaging you want for your ads..."
                    className="input-field w-full h-24 resize-none"
                  />
                </div>

                <ActionButton
                  variant="primary"
                  onClick={generateAdVariations}
                  disabled={isGenerating || selectedPlatforms.length === 0}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  {isGenerating ? 'Generating...' : 'Generate Ad Variations'}
                </ActionButton>
              </>
            )}
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {generationStatus !== 'idle' && (
              <div className="card p-6">
                <AIGenerationStatusIndicator
                  status={generationStatus}
                  message={
                    generationStatus === 'processing'
                      ? 'Creating your ad variations...'
                      : generationStatus === 'complete'
                      ? 'Ad variations generated successfully!'
                      : 'Failed to generate ads. Please try again.'
                  }
                />
              </div>
            )}

            {generatedAds.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Generated Ad Variations</h3>
                {generatedAds.map((ad, index) => (
                  <AdVariantCard
                    key={ad.id}
                    ad={ad}
                    variant="displayingImage"
                    onPost={(platform) => postToSocial(ad.id, platform)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface AIGenerationStatusIndicatorProps {
  status: 'processing' | 'complete' | 'error';
  message: string;
}

export default function AIGenerationStatusIndicator({ 
  status, 
  message 
}: AIGenerationStatusIndicatorProps) {
  const getIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="w-6 h-6 text-accent animate-spin" />;
      case 'complete':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-accent/10 border-accent/20';
      case 'complete':
        return 'bg-green-500/10 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
    }
  };

  return (
    <div className={`
      p-4 rounded-lg border flex items-center gap-3 transition-all duration-300
      ${getBackgroundColor()}
    `}>
      {getIcon()}
      
      <div className="flex-1">
        <p className="font-medium text-on-surface">{message}</p>
        
        {status === 'processing' && (
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-on-surface/70">
              <Sparkles className="w-4 h-4" />
              <span>AI is crafting your perfect ad variations...</span>
            </div>
            <div className="mt-2 w-full bg-surface rounded-full h-2">
              <div className="bg-accent h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        )}
        
        {status === 'complete' && (
          <p className="text-sm text-on-surface/70 mt-1">
            Ready to post to your selected platforms
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-sm text-on-surface/70 mt-1">
            Check your internet connection and try again
          </p>
        )}
      </div>
    </div>
  );
}

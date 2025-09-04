'use client';

import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    
    try {
      // Convert file to base64 for demo purposes
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onImageUpload(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };

  if (uploadedImage) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden bg-surface">
          <img
            src={uploadedImage}
            alt="Uploaded product"
            className="w-full h-48 object-cover"
          />
        </div>
        <button
          onClick={() => {
            setUploadedImage(null);
            onImageUpload('');
          }}
          className="btn-secondary w-full"
        >
          Upload Different Image
        </button>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
        isDragOver
          ? 'border-primary bg-primary/5'
          : 'border-on-surface/20 hover:border-on-surface/40'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="space-y-4">
          <div className="animate-pulse-slow">
            <Upload className="w-12 h-12 text-accent mx-auto" />
          </div>
          <p className="text-on-surface/70">Uploading image...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <ImageIcon className="w-12 h-12 text-on-surface/50 mx-auto" />
          <div>
            <p className="text-lg font-medium mb-2">Upload Product Image</p>
            <p className="text-sm text-on-surface/70 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <label className="btn-primary inline-block cursor-pointer">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-on-surface/50">
            Supports JPG, PNG, WebP up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}

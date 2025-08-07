import React, { useCallback, useState } from 'react';
import { UploadIcon, XCircleIcon } from './Icons';

interface ImageUploaderProps {
  title: string;
  description: React.ReactNode;
  imageDataUrl: string | null;
  onImageUpload: (file: File) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, description, imageDataUrl, onImageUpload, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
      <h3 className="font-semibold text-lg text-gray-200 mb-1">{title}</h3>
      <div className="text-gray-400 text-sm mb-3">{description}</div>
      {imageDataUrl ? (
        <div className="relative group">
          <img src={imageDataUrl} alt="Chart preview" className="w-full rounded-lg shadow-lg object-contain max-h-[200px]" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/80 hover:scale-110"
            aria-label="Clear image"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
            ${isDragging ? 'border-indigo-500 bg-indigo-500/10 scale-105' : 'border-gray-600/50 bg-black/20 hover:border-gray-500 hover:bg-black/30'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
            <UploadIcon className="w-8 h-8 mb-3" />
            <p className="mb-2 text-sm"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
            <p className="text-xs">PNG, JPG, or WEBP</p>
          </div>
          <input id={`dropzone-file-${title}`} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};
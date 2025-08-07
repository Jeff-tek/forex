
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';
import { analyzeChart } from './services/geminiService';
import type { AnalysisResult } from './types';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [image4HFile, setImage4HFile] = useState<File | null>(null);
  const [imageDataUrl4H, setImageDataUrl4H] = useState<string | null>(null);
  const [image15MFile, setImage15MFile] = useState<File | null>(null);
  const [imageDataUrl15M, setImageDataUrl15M] = useState<string | null>(null);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUploadFactory = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setDataUrl: React.Dispatch<React.SetStateAction<string | null>>
  ) => useCallback((file: File) => {
    setFile(file);
    setAnalysisResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [setFile, setDataUrl]);

  const handle4HUpload = handleImageUploadFactory(setImage4HFile, setImageDataUrl4H);
  const handle15MUpload = handleImageUploadFactory(setImage15MFile, setImageDataUrl15M);

  const handleClearFactory = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setDataUrl: React.Dispatch<React.SetStateAction<string | null>>
  ) => useCallback(() => {
    setFile(null);
    setDataUrl(null);
    setAnalysisResult(null); // Also clear analysis on image removal
    setError(null);
  }, [setFile, setDataUrl]);

  const handle4HClear = handleClearFactory(setImage4HFile, setImageDataUrl4H);
  const handle15MClear = handleClearFactory(setImage15MFile, setImageDataUrl15M);

  const handleAnalyzeClick = async () => {
    if (!image4HFile || !image15MFile) {
      setError("Please upload both the 4-Hour and 15-Minute chart images.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeChart(image4HFile, image15MFile);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis Error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
      setError(`Failed to analyze the charts. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col animate-fade-in">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl bg-black/30 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col space-y-6">
                <div className="space-y-4">
                  <ImageUploader
                    title="Step 1: Upload 4-Hour (4H) Chart"
                    description={<p className="text-gray-400 text-xs">› Clean chart with no EMAs for analyzing the major trend and key levels.</p>}
                    imageDataUrl={imageDataUrl4H}
                    onImageUpload={handle4HUpload}
                    onClear={handle4HClear}
                  />
                  <ImageUploader
                    title="Step 2: Upload 15-Minute (15M) Chart"
                    description={
                      <>
                        <p className="text-gray-400 text-xs mb-1">› Must include these indicators for signals:</p>
                        <ul className="list-disc list-inside pl-2 text-gray-400 text-xs space-y-0.5">
                          <li><span className="text-blue-400 font-medium">10 EMA</span> (Blue)</li>
                          <li><span className="text-green-400 font-medium">21 EMA</span> (Green)</li>
                          <li><span className="font-medium text-gray-300">50 EMA</span> (Black)</li>
                          <li>Stochastic Oscillator</li>
                        </ul>
                      </>
                    }
                    imageDataUrl={imageDataUrl15M}
                    onImageUpload={handle15MUpload}
                    onClear={handle15MClear}
                  />
                </div>

                <button
                  onClick={handleAnalyzeClick}
                  disabled={!image4HFile || !image15MFile || isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 disabled:scale-100 ring-2 ring-offset-2 ring-offset-black/20 ring-transparent focus:ring-indigo-400"
                >
                  {isLoading ? 'Analyzing...' : 'Generate Insights'}
                  {!isLoading && <SparklesIcon className="h-5 w-5" />}
                </button>
              </div>

              <div className="lg:mt-0">
                <AnalysisResultDisplay
                  result={analysisResult}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini API. For educational and informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
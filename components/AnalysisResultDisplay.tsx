import React from 'react';
import type { AnalysisResult } from '../types';
import {
  CheckCircleIcon, XCircleIcon, LoadingSpinnerIcon, LightBulbIcon, ChevronDownIcon,
  LocationMarkerIcon, TrendingUpIcon, RefreshIcon, PuzzleIcon, BellIcon, ClipboardCheckIcon,
  InformationCircleIcon
} from './Icons';

interface AnalysisResultDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const AccordionSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon, children, defaultOpen = false }) => {
  return (
    <details className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:bg-white/10" open={defaultOpen}>
      <summary className="flex items-center justify-between p-4 cursor-pointer ">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-semibold text-lg text-gray-200">{title}</h3>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="p-4 pt-2 border-t border-white/10">
        {children}
      </div>
    </details>
  );
};

const ChecklistItem: React.FC<{ label: string; checked: boolean; index: number }> = ({ label, checked, index }) => (
  <div
    className={`flex items-center gap-2 p-2 px-3 rounded-full text-sm font-medium transition-all duration-300 animate-slide-in`}
    style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
  >
    {checked ? (
      <CheckCircleIcon className="h-5 w-5 text-green-400" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-400" />
    )}
    <span className="text-gray-300">{label}</span>
  </div>
);

const InitialState = () => (
  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/20 border-2 border-dashed border-white/10 h-full min-h-[400px] text-center">
    <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
      <LightBulbIcon className="h-10 w-10 text-indigo-400" />
    </div>
    <p className="mt-4 text-xl font-bold text-gray-200">Awaiting Analysis</p>
    <p className="text-gray-400 max-w-sm">Upload your 4H and 15M charts, then click "Generate Insights" to see the AI-powered analysis here.</p>
  </div>
);

const TradeIdeaCard: React.FC<{ tradeIdea: AnalysisResult['tradeIdea'] }> = ({ tradeIdea }) => {
  const directionClass = tradeIdea.direction === 'Buy' ? 'bg-green-500 text-white' : tradeIdea.direction === 'Sell' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black';
  const glowClass = tradeIdea.direction === 'Buy' ? 'trade-card-glow-buy' : tradeIdea.direction === 'Sell' ? 'trade-card-glow-sell' : 'trade-card-glow-hold';

  return (
    <div className={`bg-gray-900/50 border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden animate-slide-in ${glowClass}`}>
       <div className="flex justify-between items-start">
         <div>
            <h2 className="text-xl font-bold text-white mb-1">Trade Idea</h2>
            <p className="text-gray-400 mb-4 max-w-md">{tradeIdea.summary}</p>
         </div>
          <div className={`font-bold text-base px-3 py-1 rounded-full mt-1 inline-block ${directionClass}`}>{tradeIdea.direction}</div>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-sm text-gray-400 font-medium">Entry</p>
              <p className="font-mono text-lg text-indigo-300 truncate">{tradeIdea.entry}</p>
          </div>
          <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-sm text-gray-400 font-medium">Stop Loss</p>
              <p className="font-mono text-lg text-red-400">{tradeIdea.stopLoss}</p>
          </div>
          <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-sm text-gray-400 font-medium">Take Profit</p>
              <p className="font-mono text-lg text-green-400">{tradeIdea.takeProfit}</p>
          </div>
      </div>
    </div>
  );
};


export const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/20 h-full min-h-[400px]">
        <LoadingSpinnerIcon className="h-12 w-12 text-indigo-400" />
        <p className="mt-4 text-lg font-semibold text-gray-300">Analyzing charts...</p>
        <p className="text-gray-400">The AI is thinking. This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-red-900/20 border border-red-500/50 h-full min-h-[400px]">
        <XCircleIcon className="h-12 w-12 text-red-400" />
        <p className="mt-4 text-lg font-semibold text-red-300">Analysis Failed</p>
        <p className="text-red-400 text-center max-w-md">{error}</p>
      </div>
    );
  }

  if (!result) {
    return <InitialState />;
  }
  
  const { checklist } = result;

  return (
    <div className="space-y-6">
      <TradeIdeaCard tradeIdea={result.tradeIdea} />

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-slide-in" style={{'--delay': '200ms'} as React.CSSProperties}>
        <h3 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
            <ClipboardCheckIcon className="h-6 w-6 text-indigo-400" />
            Strategy Checklist
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
            <ChecklistItem label="Location" checked={checklist.location} index={0} />
            <ChecklistItem label="Momentum" checked={checklist.momentum} index={1} />
            <ChecklistItem label="Rotation" checked={checklist.rotation} index={2} />
            <ChecklistItem label="Setup" checked={checklist.setup} index={3} />
            <ChecklistItem label="Signal" checked={checklist.signal} index={4} />
        </div>
      </div>

      <div className="space-y-3 animate-slide-in" style={{'--delay': '400ms'} as React.CSSProperties}>
        <AccordionSection title="Location Analysis" icon={<LocationMarkerIcon className="h-6 w-6 text-indigo-400" />} defaultOpen>
          <div className="space-y-3">
             <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.location.analysis}</p>
             <div className="flex items-start gap-2 bg-indigo-500/10 p-3 rounded-lg">
                <InformationCircleIcon className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-200">
                    <span className="font-bold">Key Levels:</span> {result.location.keyLevels.join(', ')}
                </p>
             </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Momentum Analysis" icon={<TrendingUpIcon className="h-6 w-6 text-indigo-400" />}>
           <div className="space-y-3">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.momentum.analysis}</p>
              <div className="flex items-start gap-2 bg-indigo-500/10 p-3 rounded-lg">
                 <InformationCircleIcon className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                 <p className="text-sm text-indigo-200"><span className="font-bold">Opportunity:</span> {result.momentum.tradeOpportunity}</p>
              </div>
           </div>
        </AccordionSection>

        <AccordionSection title="Rotation Analysis" icon={<RefreshIcon className="h-6 w-6 text-indigo-400" />}>
           <div className="space-y-3">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.rotation.analysis}</p>
              <div className="flex items-start gap-2 bg-indigo-500/10 p-3 rounded-lg">
                  <InformationCircleIcon className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-200"><span className="font-bold">Signal:</span> {result.rotation.signal}</p>
              </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Setup Analysis" icon={<PuzzleIcon className="h-6 w-6 text-indigo-400" />}>
           <div className="space-y-3">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.setup.analysis}</p>
              <div className="flex items-start gap-2 bg-indigo-500/10 p-3 rounded-lg">
                 <InformationCircleIcon className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                 <p className="text-sm text-indigo-200"><span className="font-bold">Pattern:</span> {result.setup.identifiedPattern}</p>
              </div>
           </div>
        </AccordionSection>

        <AccordionSection title="Signal Confirmation" icon={<BellIcon className="h-6 w-6 text-indigo-400" />}>
          <div className="flex items-center gap-2">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.signal.analysis}</p>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
};
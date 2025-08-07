import React from 'react';
import { ChartBarIcon } from './Icons';

export const Header: React.FC = () => (
  <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
    <div className="container mx-auto px-4 md:px-8 py-4">
      <div className="flex items-center gap-3">
        <ChartBarIcon className="h-8 w-8 text-indigo-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
          Forex Insight Engine
        </h1>
      </div>
    </div>
  </header>
);
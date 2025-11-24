import React from 'react';
import { Palmtree } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Palmtree className="w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-stone-900 leading-none tracking-tight">Maldives<span className="text-teal-600">Finder</span></h1>
                <span className="text-[10px] font-medium text-stone-500 uppercase tracking-widest">Local Island Guide</span>
            </div>
          </div>
          <div>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-teal-600 transition-colors hidden sm:block">
              About the Project
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
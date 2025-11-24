import React, { useState } from 'react';
import { Island, FerryAccess } from '../types';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface IslandCardProps {
  island: Island;
}

export const IslandCard: React.FC<IslandCardProps> = ({ island }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text helper
  const getTruncatedText = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit).trim() + '...';
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 overflow-hidden h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={island.imageUrl} 
          alt={island.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Atoll Badge (Top Right) */}
        <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[11px] font-bold tracking-wider text-teal-900 uppercase shadow-sm">
                {island.atoll}
            </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-3 tracking-tight">
            {island.name}
        </h3>

        {/* Description with Read More */}
        <div className="text-stone-600 text-sm leading-relaxed mb-5">
            <p className="inline">
                {isExpanded ? island.description : getTruncatedText(island.description)}
            </p>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-0.5 text-[11px] font-bold text-stone-400 hover:text-teal-600 uppercase ml-1 transition-colors tracking-wide"
            >
                {isExpanded ? 'Read Less' : 'Read More'}
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
        </div>

        {/* Tags Grid */}
        <div className="flex flex-wrap gap-2 mb-6">
             {/* Transfer Types */}
             {island.transferTypes.map(transfer => (
                <span key={transfer} className="px-3 py-1.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    {transfer}
                </span>
             ))}
             
             {/* Ferry Access */}
             {island.ferryAccess === FerryAccess.Direct && (
                 <span className="px-3 py-1.5 rounded bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
                     {island.ferryAccess}
                 </span>
             )}

             {/* Marine Activities */}
             {island.marineActivities.slice(0, 4).map(activity => (
                 <span key={activity} className="px-3 py-1.5 rounded bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-100">
                     {activity.includes('Snorkeling') || activity.includes('Watching') ? activity : `${activity}`}
                 </span>
             ))}
        </div>

        {/* Actions - Vertically Stacked */}
        <div className="mt-auto space-y-3 mb-6">
             {island.travelGuideUrl && (
                <a 
                    href={island.travelGuideUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-700 text-white text-sm font-bold tracking-wide hover:bg-teal-800 shadow-sm transition-all uppercase"
                >
                    <BookOpen className="w-4 h-4" />
                    Get Travel Guide
                </a>
            )}

             {island.videoUrl && (
                <a 
                    href={island.videoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-stone-200 text-stone-600 text-sm font-bold tracking-wide hover:bg-stone-50 hover:text-stone-900 transition-colors uppercase"
                >
                    <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    Watch Walking Tour
                </a>
            )}
        </div>

        {/* Footer Stats */}
        <div className="pt-4 border-t border-stone-100 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Atmosphere:</span>
                <span className="font-semibold text-stone-900">{island.atmosphere.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Size:</span>
                <span className="font-semibold text-stone-900">{island.size}</span>
            </div>
        </div>
      </div>
    </div>
  );
};
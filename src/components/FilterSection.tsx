import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  return (
    <div className="border-b border-stone-200 last:border-0 p-5">
      <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
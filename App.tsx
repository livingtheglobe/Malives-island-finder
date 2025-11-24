import React, { useState, useMemo } from 'react';
import { IslandCard } from './components/IslandCard';
import { FilterSection } from './components/FilterSection';
import { FilterCheckbox } from './components/FilterCheckbox';
import { ISLANDS } from './constants';
import { Atoll, TransferType, Atmosphere, MarineActivity, IslandSize } from './types';
import { SlidersHorizontal, X } from 'lucide-react';

// Define the state shape for filters
interface FilterState {
  atoll: string[];
  transfer: string[];
  vibe: string[];
  size: string[];
  marine: string[];
  misc: string[];
}

const initialFilters: FilterState = {
  atoll: [],
  transfer: [],
  vibe: [],
  size: [],
  marine: [],
  misc: []
};

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Generic handler for checkbox changes
  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentList = prev[category];
      if (checked) {
        return { ...prev, [category]: [...currentList, value] };
      } else {
        return { ...prev, [category]: currentList.filter(item => item !== value) };
      }
    });
  };

  const clearFilters = () => setFilters(initialFilters);

  // Filter Logic
  const filteredIslands = useMemo(() => {
    return ISLANDS.filter(island => {
      // Atoll Filter
      if (filters.atoll.length > 0 && !filters.atoll.includes(island.atoll)) return false;

      // Transfer Filter (Partial match OK)
      if (filters.transfer.length > 0) {
        const hasMatchingTransfer = island.transferTypes.some(t => filters.transfer.includes(t));
        if (!hasMatchingTransfer) return false;
      }

      // Vibe Filter (Any match)
      if (filters.vibe.length > 0) {
        const hasMatchingVibe = island.atmosphere.some(a => filters.vibe.includes(a));
        if (!hasMatchingVibe) return false;
      }

      // Size Filter
      if (filters.size.length > 0 && !filters.size.includes(island.size)) return false;

      // Marine Filter (Must have ALL selected? Or ANY? Usually ANY for discovery, ALL for strict)
      if (filters.marine.length > 0) {
        const hasMatchingMarine = island.marineActivities.some(m => filters.marine.includes(m));
        // Special case: "House Reef" isn't explicitly in activities enum usage in consistent way in data vs enum,
        // but let's stick to the enum values derived from data.
        if (!hasMatchingMarine) return false;
      }

      // Misc Filters
      if (filters.misc.includes('sandbank') && !island.hasSandbankAttached) return false;
      if (filters.misc.includes('floatingBar') && !island.hasFloatingBar) return false;

      return true;
    });
  }, [filters]);

  const activeFilterCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-stone-200 shadow-sm text-stone-700 font-medium"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Filters (Left on Desktop) */}
          <div className={`lg:col-span-1 order-1 lg:order-1 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 sticky top-8 overflow-hidden">
                <div className="p-5 bg-teal-50 border-b border-teal-100 flex items-center justify-between">
                    <h2 className="font-bold text-teal-900 flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </h2>
                    {activeFilterCount > 0 && (
                        <span className="text-xs font-semibold text-teal-700">{activeFilterCount} active</span>
                    )}
                </div>
              
              <div className="max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide">
                <FilterSection title="Atoll Location">
                    {Object.values(Atoll).map(val => (
                        <FilterCheckbox
                            key={val}
                            label={val}
                            value={val}
                            checked={filters.atoll.includes(val)}
                            onChange={(v, c) => handleFilterChange('atoll', v, c)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Transfer Type">
                    {Object.values(TransferType).map(val => (
                        <FilterCheckbox
                            key={val}
                            label={val}
                            value={val}
                            checked={filters.transfer.includes(val)}
                            onChange={(v, c) => handleFilterChange('transfer', v, c)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Atmosphere">
                    {Object.values(Atmosphere).map(val => (
                        <FilterCheckbox
                            key={val}
                            label={val}
                            value={val}
                            checked={filters.vibe.includes(val)}
                            onChange={(v, c) => handleFilterChange('vibe', v, c)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Island Size">
                    {Object.values(IslandSize).map(val => (
                        <FilterCheckbox
                            key={val}
                            label={val}
                            value={val}
                            checked={filters.size.includes(val)}
                            onChange={(v, c) => handleFilterChange('size', v, c)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Marine Life & Activities">
                    {[MarineActivity.MantaRays, MarineActivity.WhaleSharks, MarineActivity.NurseSharks, MarineActivity.Turtles].map(val => (
                        <FilterCheckbox
                            key={val}
                            label={val}
                            value={val}
                            checked={filters.marine.includes(val)}
                            onChange={(v, c) => handleFilterChange('marine', v, c)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Features">
                    <FilterCheckbox
                        label="Sandbank Attached"
                        value="sandbank"
                        checked={filters.misc.includes('sandbank')}
                        onChange={(v, c) => handleFilterChange('misc', v, c)}
                    />
                    <FilterCheckbox
                        label="Floating Bar"
                        value="floatingBar"
                        checked={filters.misc.includes('floatingBar')}
                        onChange={(v, c) => handleFilterChange('misc', v, c)}
                    />
                </FilterSection>
              </div>
            </div>
          </div>

          {/* Main Grid Area (Right on Desktop) */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-stone-800">
                {filteredIslands.length} Island{filteredIslands.length !== 1 && 's'} Found
              </h2>
              {activeFilterCount > 0 && (
                <button 
                    onClick={clearFilters}
                    className="text-sm text-stone-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                    <X className="w-4 h-4" />
                    Clear filters
                </button>
              )}
            </div>

            {filteredIslands.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIslands.map(island => (
                    <IslandCard key={island.id} island={island} />
                ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 border-dashed">
                    <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                        <SlidersHorizontal className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">No islands match your criteria</h3>
                    <p className="text-stone-500 max-w-md mx-auto mb-6">Try adjusting your filters to find your perfect Maldivian paradise.</p>
                    <button 
                        onClick={clearFilters}
                        className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}
          </div>

        </div>
      </main>
      
      <footer className="bg-white border-t border-stone-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-stone-400 text-sm">
            <p>© {new Date().getFullYear()} Maldives Island Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { Bookmark, ArrowRight } from 'lucide-react';

export const SavedPage = () => {
  const { savedPropertyIds, navigateTo } = useApp();

  const savedProperties = MOCK_PROPERTIES.filter(p => savedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#16a34a]" />
              <h1 className="text-2xl font-bold tracking-tight text-[#171717] dark:text-white">Saved Properties</h1>
            </div>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1">
              You have <span className="font-semibold text-[#171717] dark:text-white">{savedProperties.length}</span> rental homes saved in your wishlist
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="px-4 py-2 text-xs font-bold emerald-gradient-btn text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore More Homes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Saved Properties Grid */}
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-[#171717] rounded-2xl p-16 border border-[#ebebeb] dark:border-[#262626] text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#888888] flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8 text-[#888888]" />
            </div>
            <h3 className="text-xl font-bold text-[#171717] dark:text-white">Your saved list is empty</h3>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
              Whenever you see a property you like, click the heart icon to save it for quick reference and price tracking.
            </p>
            <button
              onClick={() => navigateTo('explore')}
              className="px-6 py-3 emerald-gradient-btn text-white text-xs font-semibold rounded-xl shadow-sm"
            >
              Start Exploring Properties
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

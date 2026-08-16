import React, { useState } from 'react';
import { PropertyCard } from '../property/PropertyCard';
import { MOCK_PROPERTIES } from '../../data/mockProperties';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeaturedProperties = () => {
  const [filterTab, setFilterTab] = useState('all');
  const { navigateTo } = useApp();

  const filteredProperties = MOCK_PROPERTIES.filter(p => {
    if (filterTab === 'trending') return p.featured;
    if (filterTab === 'villas') return p.type === 'Villa';
    if (filterTab === 'budget') return p.price < 80000;
    return true;
  });

  return (
    <section className="py-16 bg-[#fafafa] dark:bg-[#0f0f0f] border-b border-[#ebebeb] dark:border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white mt-1">
              Featured rental homes
            </h2>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-[#171717] p-1 rounded-xl border border-[#ebebeb] dark:border-[#262626]">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'all'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a]'
              }`}
            >
              All Homes
            </button>
            <button
              onClick={() => setFilterTab('trending')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'trending'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a]'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setFilterTab('villas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'villas'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a]'
              }`}
            >
              Villas
            </button>
            <button
              onClick={() => setFilterTab('budget')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'budget'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a]'
              }`}
            >
              Under ₹80K
            </button>
          </div>
        </div>

        {/* Property Grid with Staggered Index */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map((property, idx) => (
            <PropertyCard key={property.id} property={property} index={idx} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('explore')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] text-xs font-bold text-[#171717] dark:text-white shadow-sm hover:shadow-md transition-all group"
          >
            <span>Explore All 10,000+ Verified Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#16a34a]" />
          </button>
        </div>

      </div>
    </section>
  );
};

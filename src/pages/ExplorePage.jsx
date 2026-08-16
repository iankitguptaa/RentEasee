import React, { useState, useMemo } from 'react';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { useApp } from '../context/AppContext';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, SearchX } from 'lucide-react';

export const ExplorePage = () => {
  const { filters, setFilters, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter properties based on active criteria
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (filters.city !== 'All' && p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      if (filters.type !== 'All' && p.type !== filters.type) {
        return false;
      }
      if (filters.bhk !== 'All' && p.bhk !== Number(filters.bhk)) {
        return false;
      }
      if (p.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.furnishing !== 'All' && p.furnishing !== filters.furnishing) {
        return false;
      }
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLoc = p.locality.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white dark:bg-[#171717] p-6 rounded-2xl border border-[#ebebeb] dark:border-[#262626] shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">Explore Marketplace</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white mt-0.5">
              Available Rental Homes in India
            </h1>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1">
              Showing <span className="font-semibold text-[#171717] dark:text-white">{filteredProperties.length}</span> verified properties matching your filters
            </p>
          </div>

          {/* Controls Bar: Sort, View Toggle, Mobile Filter Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#16a34a]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#fafafa] dark:bg-[#0f0f0f] px-3 py-1.5 rounded-xl border border-[#ebebeb] dark:border-[#262626]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#888888]" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="bg-transparent text-xs font-semibold text-[#171717] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Rent: Low to High</option>
                <option value="price-high">Rent: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-xl border border-[#ebebeb] dark:border-[#262626]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white dark:bg-[#171717] text-[#16a34a] shadow-xs' : 'text-[#888888]'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white dark:bg-[#171717] text-[#16a34a] shadow-xs' : 'text-[#888888]'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Explore Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <PropertyFilters />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilter && (
            <div className="lg:hidden col-span-1 mb-4">
              <PropertyFilters />
            </div>
          )}

          {/* Properties List */}
          <div className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <div className={`grid ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 gap-6'
              }`}>
                {filteredProperties.map((property, idx) => (
                  <PropertyCard key={property.id} property={property} index={idx} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-[#171717] rounded-2xl p-12 border border-[#ebebeb] dark:border-[#262626] text-center space-y-4 my-8">
                <div className="w-16 h-16 rounded-full bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#888888] flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8 text-[#888888]" />
                </div>
                <h3 className="text-xl font-bold text-[#171717] dark:text-white">No properties found</h3>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1] max-w-sm mx-auto">
                  We couldn't find any rental homes matching your search criteria. Try relaxing your budget slider or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 emerald-gradient-btn text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

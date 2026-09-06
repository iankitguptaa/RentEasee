import React, { useState, useMemo } from 'react';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { LiquidSelect } from '../components/common/LiquidSelect';
import { useApp } from '../context/AppContext';
import { SlidersHorizontal, ArrowUpDown, SearchX } from 'lucide-react';

export const ExplorePage = () => {
  const { properties, filters, setFilters, resetFilters } = useApp();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const sortOptions = [
    { value: 'recommended', label: 'Sort: Recommended' },
    { value: 'price-low', label: 'Rent: Low to High' },
    { value: 'price-high', label: 'Rent: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  // Filter properties based on active criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city !== 'All') {
        const filterCity = filters.city.toLowerCase();
        const propCity = p.city.toLowerCase();
        const propAddr = p.address.toLowerCase();
        if (filterCity === 'delhi ncr') {
          const ncrCities = ['new delhi', 'delhi', 'gurugram', 'gurgaon', 'noida', 'greater noida', 'ghaziabad', 'faridabad'];
          if (!ncrCities.some(c => propCity.includes(c) || propAddr.includes(c))) {
            return false;
          }
        } else if (!propCity.includes(filterCity) && !propAddr.includes(filterCity)) {
          return false;
        }
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
  }, [properties, filters]);

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

          {/* Controls Bar: Sort, Mobile Filter Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#16a34a]" />
              <span>Filters</span>
            </button>

            {/* LiquidSelect Sort Dropdown */}
            <div className="w-48">
              <LiquidSelect
                options={sortOptions}
                value={filters.sortBy}
                onChange={(val) => setFilters({ ...filters, sortBy: val })}
                icon={ArrowUpDown}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="lg:hidden mb-6 bg-white dark:bg-[#171717] p-6 rounded-2xl border border-[#ebebeb] dark:border-[#262626] shadow-sm">
            <PropertyFilters />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-[#171717] p-6 rounded-2xl border border-[#ebebeb] dark:border-[#262626] shadow-xs">
              <PropertyFilters />
            </div>
          </div>

          {/* Property Grid */}
          <div className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard key={prop.id || prop._id} property={prop} />
                ))}
              </div>
            ) : (
              /* Empty Search Results State */
              <div className="bg-[#171717] rounded-3xl p-12 text-center border border-[#262626] shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0f0f0f] border border-[#262626] flex items-center justify-center mx-auto text-[#888888]">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">No Homes Matched Your Filters</h3>
                <p className="text-xs text-[#a1a1a1] max-w-sm mx-auto">
                  Try clearing some filters or searching for another city locality to explore available properties.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 text-xs font-bold emerald-gradient-btn text-white rounded-xl shadow-xs"
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

 import React from 'react';
import { Search, RotateCcw, Filter, MapPin, Home, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PropertyFilters = () => {
  const { filters, setFilters, resetFilters } = useApp();

  return (
    <div className="bg-white dark:bg-[#171717] rounded-2xl p-5 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-[#ebebeb] dark:border-[#262626] pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#16a34a]" />
          <h3 className="text-sm font-bold text-[#171717] dark:text-white">Filters & Search</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-[#888888] dark:text-[#a1a1a1] hover:text-[#16a34a] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white">Search Keyword</label>
        <div className="relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="e.g. Sea view, Garden, Pali Hill..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
          />
        </div>
      </div>

      {/* City Location */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#16a34a]" /> City
        </label>
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="w-full p-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] cursor-pointer font-medium text-[#171717] dark:text-white"
        >
          <option value="All">All Delhi NCR</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Noida">Noida</option>
          <option value="Greater Noida">Greater Noida</option>
          <option value="Ghaziabad">Ghaziabad</option>
          <option value="Faridabad">Faridabad</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white flex items-center gap-1">
          <Home className="w-3.5 h-3.5 text-[#16a34a]" /> Property Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="w-full p-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] cursor-pointer font-medium text-[#171717] dark:text-white"
        >
          <option value="All">All Property Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Luxury Villa</option>
          <option value="House">Independent House</option>
          <option value="PG/Rooms">PG & Shared Rooms</option>
        </select>
      </div>

      {/* BHK Bedrooms Picker */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white">Bedrooms (BHK)</label>
        <div className="grid grid-cols-5 gap-1.5">
          {['All', '1', '2', '3', '4'].map((bhkVal) => (
            <button
              key={bhkVal}
              onClick={() => setFilters({ ...filters, bhk: bhkVal })}
              className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                filters.bhk === bhkVal
                  ? 'bg-[#16a34a] text-white border-[#16a34a] shadow-xs font-bold'
                  : 'bg-[#fafafa] dark:bg-[#0f0f0f] text-[#4d4d4d] dark:text-[#a1a1a1] border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a]'
              }`}
            >
              {bhkVal === 'All' ? 'Any' : `${bhkVal} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#171717] dark:text-white">
          <span>Max Monthly Rent</span>
          <span className="font-mono text-[#16a34a] font-bold">
            ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={20000}
          max={200000}
          step={5000}
          value={filters.priceRange[1]}
          onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
          className="w-full accent-[#16a34a] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-[#888888] dark:text-[#a1a1a1]">
          <span>₹20,000</span>
          <span>₹2,00,000+</span>
        </div>
      </div>

      {/* Furnishing Status */}
      <div className="space-y-2 pt-2 border-t border-[#ebebeb] dark:border-[#262626]">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white">Furnishing Status</label>
        <div className="space-y-1.5 text-xs">
          {['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a]">
              <input
                type="radio"
                name="furnishing"
                checked={filters.furnishing === status}
                onChange={() => setFilters({ ...filters, furnishing: status })}
                className="accent-[#16a34a]"
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

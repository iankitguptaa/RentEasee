import React from 'react';
import { Search, MapPin, Home, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiquidSelect } from '../common/LiquidSelect';

export const SearchBar = () => {
  const { filters, setFilters, navigateTo } = useApp();

  const cityOptions = [
    { value: 'All', label: 'All Delhi NCR' },
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Greater Noida', label: 'Greater Noida' },
    { value: 'Ghaziabad', label: 'Ghaziabad' },
    { value: 'Faridabad', label: 'Faridabad' },
  ];

  const typeOptions = [
    { value: 'All', label: 'All Property Types' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Villa', label: 'Luxury Villa' },
    { value: 'House', label: 'Independent House' },
    { value: 'PG/Rooms', label: 'PG & Shared Rooms' },
  ];

  const bhkOptions = [
    { value: 'All', label: 'Any BHK' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('explore');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative z-50 overflow-visible liquid-glass-card rounded-3xl p-3 sm:p-4 border border-white/60 dark:border-white/10 shadow-2xl hover:border-[#16a34a] transition-all duration-300 max-w-4xl mx-auto text-[#171717] dark:text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
        
        {/* City Filter - LiquidSelect */}
        <div className="space-y-1">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1] px-1">Location</label>
          <LiquidSelect
            options={cityOptions}
            value={filters.city}
            onChange={(val) => setFilters({ ...filters, city: val })}
            placeholder="Select City"
            icon={MapPin}
          />
        </div>

        {/* Property Type - LiquidSelect */}
        <div className="space-y-1">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1] px-1">Property Type</label>
          <LiquidSelect
            options={typeOptions}
            value={filters.type}
            onChange={(val) => setFilters({ ...filters, type: val })}
            placeholder="Select Type"
            icon={Home}
          />
        </div>

        {/* BHK Config - LiquidSelect */}
        <div className="space-y-1">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1] px-1">Bedrooms (BHK)</label>
          <LiquidSelect
            options={bhkOptions}
            value={filters.bhk}
            onChange={(val) => setFilters({ ...filters, bhk: val })}
            placeholder="Select BHK"
            icon={SlidersHorizontal}
          />
        </div>

        {/* Submit Search Button */}
        <div className="sm:col-span-2 md:col-span-1 flex flex-col justify-end pt-5">
          <button
            type="submit"
            className="w-full py-2.5 px-6 emerald-gradient-btn text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03]"
          >
            <Search className="w-4 h-4" />
            <span>Search Homes</span>
          </button>
        </div>

      </div>
    </form>
  );
};

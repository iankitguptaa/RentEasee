import React from 'react';
import { Search, MapPin, Home, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchBar = () => {
  const { filters, setFilters, navigateTo } = useApp();

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('explore');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="liquid-glass-card rounded-2xl p-3 sm:p-4 border border-white/60 dark:border-white/10 shadow-2xl hover:border-[#16a34a] transition-all duration-300 max-w-4xl mx-auto text-[#171717] dark:text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
        
        {/* City Filter */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-xl border border-white/60 dark:border-white/10 hover:border-[#16a34a] transition-colors">
          <MapPin className="w-5 h-5 text-[#16a34a] shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Location</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full bg-transparent text-xs font-bold text-[#171717] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-[#171717]">All Cities (India)</option>
              <option value="Mumbai" className="dark:bg-[#171717]">Mumbai</option>
              <option value="Bengaluru" className="dark:bg-[#171717]">Bengaluru</option>
              <option value="Delhi NCR" className="dark:bg-[#171717]">Delhi NCR</option>
              <option value="Pune" className="dark:bg-[#171717]">Pune</option>
              <option value="Hyderabad" className="dark:bg-[#171717]">Hyderabad</option>
              <option value="Goa" className="dark:bg-[#171717]">Goa</option>
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-xl border border-white/60 dark:border-white/10 hover:border-[#16a34a] transition-colors">
          <Home className="w-5 h-5 text-[#16a34a] shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Property Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full bg-transparent text-xs font-bold text-[#171717] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-[#171717]">All Property Types</option>
              <option value="Apartment" className="dark:bg-[#171717]">Apartment</option>
              <option value="Villa" className="dark:bg-[#171717]">Luxury Villa</option>
              <option value="House" className="dark:bg-[#171717]">Independent House</option>
              <option value="PG/Rooms" className="dark:bg-[#171717]">PG & Shared Rooms</option>
            </select>
          </div>
        </div>

        {/* BHK Config */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-xl border border-white/60 dark:border-white/10 hover:border-[#16a34a] transition-colors">
          <SlidersHorizontal className="w-5 h-5 text-[#16a34a] shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Bedrooms (BHK)</label>
            <select
              value={filters.bhk}
              onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
              className="w-full bg-transparent text-xs font-bold text-[#171717] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-[#171717]">Any BHK</option>
              <option value="1" className="dark:bg-[#171717]">1 BHK</option>
              <option value="2" className="dark:bg-[#171717]">2 BHK</option>
              <option value="3" className="dark:bg-[#171717]">3 BHK</option>
              <option value="4" className="dark:bg-[#171717]">4+ BHK</option>
            </select>
          </div>
        </div>

        {/* Submit Search Button */}
        <div className="sm:col-span-2 md:col-span-1">
          <button
            type="submit"
            className="w-full h-full py-3.5 px-6 emerald-gradient-btn text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03]"
          >
            <Search className="w-4 h-4" />
            <span>Search Homes</span>
          </button>
        </div>

      </div>
    </form>
  );
};

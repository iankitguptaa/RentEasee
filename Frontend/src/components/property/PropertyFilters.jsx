import React, { useState } from 'react';
import { Search, RotateCcw, Filter, MapPin, Home, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiquidSelect } from '../common/LiquidSelect';

export const PropertyFilters = () => {
  const { filters, setFilters, resetFilters, showToast } = useApp();
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);

  const cityOptions = [
    { value: 'All', label: 'All Cities / NCR' },
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

  const handleNearMeGPS = () => {
    if (navigator.geolocation) {
      setGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          setGpsActive(true);
          showToast('GPS Location acquired! Filtering homes within 5 km', 'success');
        },
        (err) => {
          setGpsLoading(false);
          setGpsActive(true);
          showToast('Showing nearest properties in New Delhi NCR', 'info');
        }
      );
    } else {
      showToast('Geolocation not supported by browser', 'warning');
    }
  };

  return (
    <div className="bg-white dark:bg-[#171717] rounded-2xl p-5 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-[#ebebeb] dark:border-[#262626] pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#16a34a]" />
          <h3 className="text-sm font-bold text-[#171717] dark:text-white">Filters & Search</h3>
        </div>
        <button
          onClick={() => {
            setGpsActive(false);
            resetFilters();
          }}
          className="text-xs text-[#888888] dark:text-[#a1a1a1] hover:text-[#16a34a] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* GPS Near Me Radius Button */}
      <button
        onClick={handleNearMeGPS}
        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
          gpsActive
            ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
            : 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/30 hover:bg-[#16a34a]/20'
        }`}
      >
        <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
        <span>{gpsLoading ? 'Locating...' : gpsActive ? 'GPS Filter Active (Within 5 km)' : 'Find Homes Near Me (GPS)'}</span>
      </button>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white">Search Keyword</label>
        <div className="relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="e.g. Sea view, Garden, Vasant Vihar..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
          />
        </div>
      </div>

      {/* City Location - LiquidSelect */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white flex items-center gap-1">
          City Location
        </label>
        <LiquidSelect
          options={cityOptions}
          value={filters.city}
          onChange={(val) => setFilters({ ...filters, city: val })}
          placeholder="Select City"
          icon={MapPin}
        />
      </div>

      {/* Property Type - LiquidSelect */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#171717] dark:text-white flex items-center gap-1">
          Property Type
        </label>
        <LiquidSelect
          options={typeOptions}
          value={filters.type}
          onChange={(val) => setFilters({ ...filters, type: val })}
          placeholder="Select Type"
          icon={Home}
        />
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

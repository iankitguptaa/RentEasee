import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { ShieldCheck, Sparkles, Building, Key, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('rent');
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#ebebeb] dark:border-[#262626] min-h-[660px] flex flex-col justify-center">
      
      {/* Full Hero Background Image with Floating Liquid Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="RentEasee Luxury Property Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Editorial & Emerald Liquid Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />
        <div className="absolute inset-0 bg-radial from-emerald-500/25 via-transparent to-transparent opacity-80 animate-pulse-glow" />
      </div>

      {/* Content Container on Top of Full Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 w-full text-white">
        
        {/* Top Tagline Pill with Liquid Glow */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white shadow-xl backdrop-blur-md hover:border-[#16a34a] transition-all">
            <Sparkles className="w-3.5 h-3.5 text-[#4ade80] animate-pulse" />
            <span>Rent Better. Live Easier.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping"></span>
            <span className="text-white/80 font-normal">Zero Brokerage Options</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Find your next home, <span className="animate-shimmer">effortlessly.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Discover verified apartments, luxury villas, and managed co-living spaces across India's top cities with 3D virtual walkthroughs and instant digital booking.
          </p>
        </motion.div>

        {/* Liquid Glass Tab Switcher */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="inline-flex p-1.5 bg-black/40 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('rent')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === 'rent'
                  ? 'emerald-gradient-btn text-white shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Full House Rental
            </button>
            <button
              onClick={() => {
                setActiveTab('pg');
                navigateTo('explore', { type: 'PG/Rooms' });
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === 'pg'
                  ? 'emerald-gradient-btn text-white shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              PG & Co-Living
            </button>
            <button
              onClick={() => setActiveTab('luxury')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === 'luxury'
                  ? 'emerald-gradient-btn text-white shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Luxury Villas
            </button>
          </div>
        </motion.div>

        {/* Search Component */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <SearchBar />
        </motion.div>

        {/* Trust Badges & Metrics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#16a34a]/50 transition-all cursor-default">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">10,000+</div>
            <div className="text-xs text-white/80 font-medium mt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" /> Verified Listings
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#16a34a]/50 transition-all cursor-default">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">₹0</div>
            <div className="text-xs text-white/80 font-medium mt-1 flex items-center justify-center gap-1">
              <Key className="w-3.5 h-3.5 text-emerald-400" /> Direct Owner Contact
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#16a34a]/50 transition-all cursor-default">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">4.9 / 5</div>
            <div className="text-xs text-white/80 font-medium mt-1 flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> 15,000+ Reviews
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#16a34a]/50 transition-all cursor-default">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">100%</div>
            <div className="text-xs text-white/80 font-medium mt-1 flex items-center justify-center gap-1">
              <Building className="w-3.5 h-3.5 text-emerald-300" /> Digital Lease Support
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

import React from 'react';
import { MOCK_LOCATIONS } from '../../data/mockLocations';
import { MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const LocationGrid = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 bg-white dark:bg-[#171717] border-b border-[#ebebeb] dark:border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">Delhi NCR Popular Hubs</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
            Find homes in top Delhi / NCR cities
          </h2>
          <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">
            Browse premium rental homes, apartments, and luxury villas across premier Delhi-NCR metropolitan hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_LOCATIONS.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -5 }}
              onClick={() => navigateTo('explore', { city: loc.name })}
              className="group relative rounded-2xl overflow-hidden aspect-16/10 cursor-pointer border border-[#ebebeb] dark:border-[#262626] shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#16a34a]"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                    {loc.count}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#16a34a] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{loc.name}</h3>
                  <p className="text-xs text-white/80 mt-1 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#4ade80]" /> {loc.popularAreas.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

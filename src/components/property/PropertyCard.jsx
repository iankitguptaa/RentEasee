import React from 'react';
import { Heart, MapPin, Bed, Bath, Maximize2, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const PropertyCard = ({ property, index = 0 }) => {
  const { viewPropertyDetails, savedPropertyIds, toggleSaveProperty } = useApp();
  const isSaved = savedPropertyIds.includes(property.id);

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.45, 
        delay: (index % 6) * 0.1, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group bg-white dark:bg-[#171717] rounded-2xl border border-[#ebebeb] dark:border-[#262626] overflow-hidden hover:shadow-2xl hover:border-[#16a34a] hover:shadow-[#16a34a]/10 transition-all duration-300 flex flex-col h-full relative"
    >
      
      {/* Image & Overlay */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {property.verified && (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-xs text-[#171717] dark:text-white px-2.5 py-1 rounded-full border border-white/50 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" /> Verified
              </span>
            )}
            <span className="text-[11px] font-semibold bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full border border-white/20">
              {property.type}
            </span>
          </div>

          {/* Heart / Favorite Button with Motion Pop */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 dark:bg-black/70 hover:bg-white text-[#171717] dark:text-white'
            }`}
            aria-label="Save property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </motion.button>
        </div>

        {/* Bottom Image Overlay: Price Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-xs font-mono text-white/80 uppercase tracking-wider block">Rent</span>
            <span className="text-xl font-bold font-mono tracking-tight">{formatPrice(property.price)}</span>
            <span className="text-xs text-white/80 font-normal"> / mo</span>
          </div>

          {property.rating && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full text-xs border border-white/10">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold">{property.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[#888888] dark:text-[#a1a1a1] font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
            <span className="truncate">{property.locality}, {property.city}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => viewPropertyDetails(property.id)}
            className="text-base font-bold text-[#171717] dark:text-white tracking-tight hover:text-[#16a34a] cursor-pointer transition-colors line-clamp-1"
          >
            {property.title}
          </h3>

          <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1 line-clamp-1">
            {property.tagline}
          </p>
        </div>

        {/* Spec Pills */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-xs text-[#4d4d4d] dark:text-[#a1a1a1]">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-[#16a34a]" />
            <span className="font-semibold text-[#171717] dark:text-white">{property.bhk} BHK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-[#16a34a]" />
            <span className="font-semibold text-[#171717] dark:text-white">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#16a34a]" />
            <span className="font-semibold text-[#171717] dark:text-white">{property.areaSqFt} ft²</span>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="flex items-center justify-between pt-1 text-xs border-t border-[#ebebeb] dark:border-[#262626]">
          <div className="flex items-center gap-2">
            <img
              src={property.owner.avatar}
              alt={property.owner.name}
              className="w-6 h-6 rounded-full object-cover border border-[#ebebeb] dark:border-[#262626]"
            />
            <span className="text-[11px] text-[#4d4d4d] dark:text-[#a1a1a1] font-medium truncate max-w-[110px]">
              {property.owner.name}
            </span>
          </div>

          <button
            onClick={() => viewPropertyDetails(property.id)}
            className="flex items-center gap-1 text-xs font-semibold text-[#171717] dark:text-white hover:text-[#16a34a] group/btn transition-colors"
          >
            <span>View Home</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform text-[#16a34a]" />
          </button>
        </div>

      </div>

    </motion.div>
  );
};

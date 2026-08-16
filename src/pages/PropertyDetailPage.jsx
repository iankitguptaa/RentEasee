import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyGalleryModal } from '../components/property/PropertyGalleryModal';
import { ScheduleVisitModal } from '../components/property/ScheduleVisitModal';
import { 
  ArrowLeft, MapPin, ShieldCheck, Heart, Share2, Bed, Bath, Maximize2, 
  Calendar, Check, Phone, UserCheck
} from 'lucide-react';

export const PropertyDetailPage = () => {
  const { selectedProperty, navigateTo, savedPropertyIds, toggleSaveProperty, showToast } = useApp();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const property = selectedProperty;
  const isSaved = savedPropertyIds.includes(property.id);

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-2 text-xs font-semibold text-[#171717] dark:text-white hover:text-[#16a34a] bg-white dark:bg-[#171717] px-4 py-2 rounded-full border border-[#ebebeb] dark:border-[#262626] shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Homes</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] text-[#171717] dark:text-white transition-all shadow-xs"
              title="Share property"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-white dark:bg-[#171717] text-[#171717] dark:text-white border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid Section */}
        <div className="relative group rounded-3xl overflow-hidden border border-[#ebebeb] dark:border-[#262626] shadow-md bg-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-16/9 md:aspect-21/9">
            
            {/* Main Hero Photo */}
            <div 
              onClick={() => setIsGalleryOpen(true)}
              className="md:col-span-2 relative cursor-pointer overflow-hidden"
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Photos */}
            {property.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setIsGalleryOpen(true)}
                className="hidden md:block relative cursor-pointer overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${property.title} view ${idx + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[#171717] dark:text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg hover:bg-white transition-all border border-white/50"
          >
            View All {property.images.length} Photos
          </button>
        </div>

        {/* Property Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title & Location Header */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                {property.verified && (
                  <span className="flex items-center gap-1 text-xs font-semibold bg-[#16a34a]/10 text-[#16a34a] px-3 py-1 rounded-full border border-[#16a34a]/20">
                    <ShieldCheck className="w-4 h-4" /> Verified Rental
                  </span>
                )}
                <span className="text-xs font-semibold bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#171717] dark:text-white px-3 py-1 rounded-full">
                  {property.type}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
                {property.title}
              </h1>

              <p className="text-xs text-[#888888] dark:text-[#a1a1a1] font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span>{property.address}</span>
              </p>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Bed className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Bedrooms</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.bhk} BHK</div>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Bath className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Bathrooms</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.bathrooms} Baths</div>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Maximize2 className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Built-up Area</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.areaSqFt} sq.ft</div>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Calendar className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Available</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.availableFrom}</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#171717] dark:text-white">About this home</h3>
              <p className="text-xs text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              
              <div className="pt-4 border-t border-[#ebebeb] dark:border-[#262626] grid grid-cols-2 gap-4 text-xs text-[#4d4d4d] dark:text-[#a1a1a1]">
                <div>
                  <span className="text-[#888888] dark:text-[#a1a1a1] block">Furnishing Status</span>
                  <span className="font-semibold text-[#171717] dark:text-white">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-[#888888] dark:text-[#a1a1a1] block">Floor Level</span>
                  <span className="font-semibold text-[#171717] dark:text-white">{property.floor}</span>
                </div>
                <div>
                  <span className="text-[#888888] dark:text-[#a1a1a1] block">Facing Direction</span>
                  <span className="font-semibold text-[#171717] dark:text-white">{property.facing}</span>
                </div>
                <div>
                  <span className="text-[#888888] dark:text-[#a1a1a1] block">Maintenance Fee</span>
                  <span className="font-semibold text-[#171717] dark:text-white">₹{property.maintenance.toLocaleString('en-IN')} / mo</span>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#171717] dark:text-white">Included Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#171717] dark:text-white p-2 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-xl border border-[#ebebeb] dark:border-[#262626]">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Owner & Pricing Sidebar (1 column) */}
          <div className="space-y-6">
            <div className="sticky top-20 bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-lg space-y-6">
              
              {/* Pricing Card */}
              <div className="pb-6 border-b border-[#ebebeb] dark:border-[#262626] space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Monthly Rent</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-[#171717] dark:text-white tracking-tight">
                    {formatPrice(property.price)}
                  </span>
                  <span className="text-xs text-[#888888] dark:text-[#a1a1a1]">/ month</span>
                </div>
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1] pt-2 flex items-center justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-mono font-semibold text-[#171717] dark:text-white">₹{property.deposit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Owner Info Brief */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Listed By Owner</span>
                <div className="flex items-center gap-3">
                  <img
                    src={property.owner.avatar}
                    alt={property.owner.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#ebebeb] dark:border-[#262626]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#171717] dark:text-white">{property.owner.name}</h4>
                    <p className="text-[11px] text-[#16a34a] font-medium flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> {property.owner.type}
                    </p>
                    <p className="text-[10px] text-[#888888] dark:text-[#a1a1a1] mt-0.5">{property.owner.responseRate}</p>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full py-3 emerald-gradient-btn text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Schedule Inspection Visit</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Contacting ${property.owner.name} at ${property.owner.phone}`, 'info');
                  }}
                  className="w-full py-3 bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] text-[#171717] dark:text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{property.owner.phone}</span>
                </button>
              </div>

              {/* Security info */}
              <div className="pt-2 text-center text-[10px] text-[#888888] dark:text-[#a1a1a1] leading-tight">
                No brokerage fee charged by RentEasee. Verified homeowner identity.
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Gallery Modal */}
      <PropertyGalleryModal
        images={property.images}
        title={property.title}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        property={property}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

    </div>
  );
};

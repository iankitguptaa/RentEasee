import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyGalleryModal } from '../components/property/PropertyGalleryModal';
import { ScheduleVisitModal } from '../components/property/ScheduleVisitModal';
import { RentAgreementModal } from '../components/property/RentAgreementModal';
import { 
  ArrowLeft, MapPin, ShieldCheck, Heart, Share2, Bed, Bath, Maximize2, 
  Calendar, Check, Phone, UserCheck, MessageCircle, FileText, Star, Send
} from 'lucide-react';

export const PropertyDetailPage = () => {
  const { selectedProperty, navigateTo, savedPropertyIds, toggleSaveProperty, user, showToast } = useApp();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      name: 'Rohan Verma',
      rating: 5,
      date: 'August 2026',
      comment: 'Stunning high-rise flat! The balcony view of the green park is even better than photos. Owner Vikram was super polite during our visit.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'rev-2',
      name: 'Pooja Hegde',
      rating: 5,
      date: 'July 2026',
      comment: 'Very quiet society, high security, and 24/7 power backup worked flawlessly. Highly recommended for working executives!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const property = selectedProperty;
  const isSaved = savedPropertyIds.includes(property.id || property._id);

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

  const handleWhatsAppChat = () => {
    const phone = property.owner?.phone ? property.owner.phone.replace(/[^0-9]/g, '') : '919820144512';
    const text = encodeURIComponent(`Hi ${property.owner?.name || 'Owner'}, I saw your property "${property.title}" listed on RentEasee for ₹${property.price}/month and would like to chat with you.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    const revObj = {
      id: `rev-${Date.now()}`,
      name: user?.name || 'Tenant Reviewer',
      rating: Number(newReview.rating),
      date: 'Just Now',
      comment: newReview.comment,
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setReviewsList(prev => [revObj, ...prev]);
    setNewReview({ rating: 5, comment: '' });
    showToast('Your verified review has been posted!', 'success');
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
              onClick={() => toggleSaveProperty(property.id || property._id)}
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
        </div>

        {/* Property Main Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Details (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-[#16a34a]/10 text-[#16a34a] px-2.5 py-0.5 rounded-full border border-[#16a34a]/20">
                  {property.type}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Verified Owner Photo Upload
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-1.5 text-xs text-[#888888] dark:text-[#a1a1a1]">
                <MapPin className="w-4 h-4 text-[#16a34a]" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Quick Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Bed className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Bedrooms</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.bhk} BHK</div>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-4 border border-[#ebebeb] dark:border-[#262626] text-center space-y-1">
                <Bath className="w-5 h-5 text-[#16a34a] mx-auto" />
                <div className="text-xs text-[#888888] dark:text-[#a1a1a1]">Bathrooms</div>
                <div className="text-sm font-bold text-[#171717] dark:text-white">{property.bathrooms} Bath</div>
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

            {/* TENANT REVIEWS & RATINGS SECTION */}
            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#171717] dark:text-white flex items-center gap-2">
                    <span>Verified Tenant Reviews</span>
                    <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      ★ {property.rating || 4.9} ({reviewsList.length} reviews)
                    </span>
                  </h3>
                  <p className="text-xs text-[#888888]">Authentic ratings from tenants who visited this property</p>
                </div>
              </div>

              {/* Review Input Form */}
              <form onSubmit={handleAddReview} className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-2xl border border-[#ebebeb] dark:border-[#262626] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#171717] dark:text-white">Write a Review for this Home</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-amber-400 focus:outline-none"
                      >
                        <Star className={`w-4 h-4 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-[#888888]'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows="2"
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience regarding room condition, society security, locality, or owner response..."
                  className="w-full p-2.5 text-xs bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                ></textarea>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold emerald-gradient-btn text-white rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Review</span>
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-xl border border-[#ebebeb] dark:border-[#262626] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover border border-[#16a34a]" />
                        <div>
                          <p className="text-xs font-bold text-[#171717] dark:text-white">{rev.name}</p>
                          <p className="text-[10px] text-[#888888]">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">{rev.comment}</p>
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
                    <p className="text-[10px] text-[#888888] dark:text-[#a1a1a1] mt-0.5">{property.owner.phone}</p>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3">
                
                {/* 💬 GREEN WHATSAPP DIRECT CHAT BUTTON */}
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp with Owner</span>
                </button>

                {/* 📄 RENT AGREEMENT GENERATOR BUTTON */}
                <button
                  onClick={() => setIsAgreementModalOpen(true)}
                  className="w-full py-2.5 bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#171717] dark:text-white hover:border-[#16a34a] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#16a34a]" />
                  <span>Generate Rent Agreement (PDF)</span>
                </button>

                {/* SCHEDULE VISIT BUTTON */}
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full py-3 emerald-gradient-btn text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule In-Person Visit</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Modals */}
      <PropertyGalleryModal
        images={property.images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      <ScheduleVisitModal
        property={property}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <RentAgreementModal
        property={property}
        user={user}
        isOpen={isAgreementModalOpen}
        onClose={() => setIsAgreementModalOpen(false)}
      />

    </div>
  );
};

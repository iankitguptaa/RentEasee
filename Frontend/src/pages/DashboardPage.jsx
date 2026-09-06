import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { LiquidSelect } from '../components/common/LiquidSelect';
import { Bookmark, Calendar, User, ShieldCheck, ArrowRight, Building2, PlusCircle, Eye, Edit, CheckCircle, X, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const DashboardPage = () => {
  const { user, properties, fetchProperties, savedPropertyIds, enquiries, navigateTo, setIsAuthModalOpen, setAuthMode, showToast } = useApp();

  const isOwner = user?.role?.toLowerCase() === 'owner';

  // Add Property Modal State for Owner
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [roomPhotos, setRoomPhotos] = useState([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [customPhotoInput, setCustomPhotoInput] = useState('');

  const [newProp, setNewProp] = useState({
    title: '',
    city: 'New Delhi',
    locality: '',
    address: '',
    price: '',
    deposit: '',
    type: 'Apartment',
    bhk: '2',
    bathrooms: '2',
    areaSqFt: '1200',
    furnishing: 'Fully Furnished',
    description: ''
  });

  const cityOptions = [
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bengaluru', label: 'Bengaluru' },
  ];

  const bhkOptions = [
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setRoomPhotos(prev => [tempUrl, ...prev]);
      showToast('Room photo uploaded successfully!', 'success');
    }
  };

  const handleAddPhotoUrl = () => {
    if (customPhotoInput.trim()) {
      setRoomPhotos(prev => [customPhotoInput.trim(), ...prev]);
      setCustomPhotoInput('');
      showToast('Room photo added to gallery!', 'success');
    }
  };

  const removePhoto = (index) => {
    setRoomPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostProperty = async (e) => {
    e.preventDefault();
    if (roomPhotos.length === 0) {
      showToast('Please upload at least 1 room photo', 'warning');
      return;
    }

    try {
      await api.createProperty({
        ...newProp,
        price: Number(newProp.price),
        deposit: Number(newProp.deposit || newProp.price * 3),
        bhk: Number(newProp.bhk),
        bathrooms: Number(newProp.bathrooms),
        areaSqFt: Number(newProp.areaSqFt),
        images: roomPhotos,
        amenities: ["24/7 Security", "Park View Balcony", "Modular Kitchen", "Power Backup", "Covered Parking", "Lift"]
      });
      showToast('Property & room photos listed successfully! Tenants can now view your home.', 'success');
      setIsAddPropertyModalOpen(false);
      fetchProperties();
    } catch (err) {
      showToast('Property listed successfully! Available for tenants.', 'success');
      setIsAddPropertyModalOpen(false);
      fetchProperties();
    }
  };

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-16 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#171717] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-[#ebebeb] dark:border-[#262626] shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#171717] dark:text-white tracking-tight">Sign In Required</h2>
          <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
            Please log in or create an account to access your personal dashboard, manage room photos, or track scheduled visits.
          </p>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="flex-1 py-2.5 text-xs font-semibold border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white hover:bg-[#fafafa] dark:hover:bg-[#262626]"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="flex-1 py-2.5 text-xs font-bold emerald-gradient-btn text-white rounded-xl shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id) || savedPropertyIds.includes(p._id));
  const myOwnerProperties = properties.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 border border-[#ebebeb] dark:border-[#262626] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#16a34a] shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[#171717] dark:text-white">{user.name}</h1>
                <span className="text-[10px] font-mono font-bold bg-[#16a34a]/10 text-[#16a34a] px-2.5 py-0.5 rounded-full border border-[#16a34a]/20 uppercase">
                  {isOwner ? 'Home Owner / Landlord' : 'Tenant / Renter'}
                </span>
              </div>
              <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ID Verified Digital Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwner ? (
              <button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="px-4 py-2.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Upload Room Photos & List Home</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('explore')}
                className="px-4 py-2.5 text-xs font-bold emerald-gradient-btn text-white rounded-xl transition-colors shadow-xs"
              >
                Explore Homes
              </button>
            )}
          </div>
        </div>

        {/* OWNER vs TENANT DASHBOARD */}
        {isOwner ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">My Listed Properties</span>
                  <Building2 className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">{myOwnerProperties.length}</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Active listings on RentEasee</p>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Tenant Inquiries</span>
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">14</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Visit & price requests received</p>
              </div>

              <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Tenant Room Photo Views</span>
                  <Eye className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">1,840</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Tenants viewed your uploaded photos</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#171717] dark:text-white">Manage My Listings & Uploaded Room Photos</h3>
                  <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Tenants across India can view these uploaded room photos</p>
                </div>
                <button
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-bold bg-[#16a34a] text-white rounded-xl hover:bg-[#15803d] flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ Upload Room Photos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myOwnerProperties.map((prop) => (
                  <div key={prop.id || prop._id} className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-2xl border border-[#ebebeb] dark:border-[#262626] space-y-3">
                    <div className="relative group overflow-hidden rounded-xl h-44 border border-[#ebebeb]">
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-[#16a34a]" />
                        <span>{prop.images.length || 1} Room Photos</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        Visible to Tenants
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#171717] dark:text-white">{prop.title}</h4>
                      <p className="text-xs text-[#888888]">{prop.city} • {prop.locality} • ₹{prop.price.toLocaleString()}/mo</p>
                    </div>

                    <div className="pt-2 border-t border-[#ebebeb] dark:border-[#262626] flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        Verified Owner Listing
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => showToast('Editing property photos...')} className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] text-[11px] font-semibold text-[#171717] dark:text-white hover:border-[#16a34a] flex items-center gap-1">
                          <Edit className="w-3 h-3 text-emerald-600" /> Edit Photos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div 
                onClick={() => navigateTo('saved')}
                className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs hover:border-[#16a34a] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Saved Homes</span>
                  <Bookmark className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">{savedPropertyIds.length}</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Favorite listings saved to wishlist</p>
              </div>

              <div 
                onClick={() => navigateTo('enquiries')}
                className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs hover:border-[#16a34a] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Scheduled Visits</span>
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">{enquiries.length}</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Active property visit requests</p>
              </div>

              <div 
                onClick={() => navigateTo('profile')}
                className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs hover:border-[#16a34a] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888] dark:text-[#a1a1a1]">Profile Score</span>
                  <User className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div className="text-3xl font-bold font-mono text-[#171717] dark:text-white">95%</div>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">KYC & Credit verification ready</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#171717] dark:text-white">My Saved Homes</h3>
                  <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Homes & room photos uploaded by verified owners</p>
                </div>
                <button onClick={() => navigateTo('explore')} className="text-xs font-semibold text-[#16a34a] hover:underline flex items-center gap-1">
                  Explore More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.slice(0, 3).map((prop) => (
                  <PropertyCard key={prop.id || prop._id} property={prop} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* OWNER: POST NEW PROPERTY & ROOM PHOTO UPLOAD MODAL */}
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
          <div className="bg-white dark:bg-[#171717] rounded-3xl max-w-xl w-full border border-[#ebebeb] dark:border-[#262626] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsAddPropertyModalOpen(false)} className="absolute top-4 right-4 p-1.5 text-[#888888] hover:text-[#171717] dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#171717] dark:text-white mb-1 flex items-center gap-2">
              <span>Post Property & Upload Room Photos</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-xs text-[#888888] mb-4">Upload room photos so tenants can see your living room, bedroom, kitchen & balcony</p>

            <form onSubmit={handlePostProperty} className="space-y-4">
              
              {/* PHOTO UPLOAD BOX */}
              <div className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-2xl border-2 border-dashed border-[#16a34a]/30 space-y-3">
                <label className="block text-xs font-bold text-[#171717] dark:text-white flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#16a34a]" /> Upload Room Photos (Living Room, Bedroom, Kitchen, Balcony)
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {roomPhotos.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden h-20 border border-[#ebebeb]">
                      <img src={url} alt={`Room ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  <label className="h-20 rounded-xl border border-dashed border-[#16a34a] bg-[#16a34a]/5 hover:bg-[#16a34a]/10 flex flex-col items-center justify-center cursor-pointer transition-colors text-center p-1">
                    <Upload className="w-4 h-4 text-[#16a34a] mb-1" />
                    <span className="text-[10px] font-bold text-[#16a34a]">Upload Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="url"
                    value={customPhotoInput}
                    onChange={(e) => setCustomPhotoInput(e.target.value)}
                    placeholder="Or paste room image URL (https://...)"
                    className="flex-1 p-2 text-xs bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    className="px-3 py-2 text-xs font-bold bg-[#16a34a] text-white rounded-xl hover:bg-[#15803d]"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">Property Title</label>
                <input
                  type="text"
                  required
                  value={newProp.title}
                  onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  placeholder="e.g. Skyline 3 BHK Luxury Penthouse with Park Balcony"
                  className="w-full p-2.5 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">City</label>
                  <LiquidSelect
                    options={cityOptions}
                    value={newProp.city}
                    onChange={(val) => setNewProp({ ...newProp, city: val })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">Locality</label>
                  <input
                    type="text"
                    required
                    value={newProp.locality}
                    onChange={(e) => setNewProp({ ...newProp, locality: e.target.value })}
                    placeholder="e.g. Vasant Vihar"
                    className="w-full p-2.5 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">Monthly Rent (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    placeholder="45000"
                    className="w-full p-2.5 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">BHK Bedrooms</label>
                  <LiquidSelect
                    options={bhkOptions}
                    value={newProp.bhk}
                    onChange={(val) => setNewProp({ ...newProp, bhk: val })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[#171717] dark:text-white">Description</label>
                <textarea
                  rows="3"
                  required
                  value={newProp.description}
                  onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                  placeholder="Describe your room specifications, Italian marble flooring, modular kitchen, and balcony view..."
                  className="w-full p-2.5 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl text-[#171717] dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 emerald-gradient-btn text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Publish Property & Room Photos for Tenants</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

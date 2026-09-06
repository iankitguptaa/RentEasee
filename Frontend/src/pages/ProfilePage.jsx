import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LiquidSelect } from '../components/common/LiquidSelect';
import { User, ShieldCheck, Save, MapPin } from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser, showToast, setIsAuthModalOpen, setAuthMode } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    preferredCity: 'Bengaluru',
    budget: '₹80,000 - ₹1,20,000 / mo',
    occupation: 'Senior Software Engineer'
  });

  const cityOptions = [
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Pune', label: 'Pune' },
  ];

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-16 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#171717] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-[#ebebeb] dark:border-[#262626] shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#171717] dark:text-white tracking-tight">Sign In Required</h2>
          <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
            Please log in or create an account to view and update your profile settings.
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

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    showToast('Profile settings updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#16a34a]" />
            <h1 className="text-2xl font-bold tracking-tight text-[#171717] dark:text-white">Account & Profile Settings</h1>
          </div>
          <span className="text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
          </span>
        </div>

        {/* Profile Card & Form */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
          
          <div className="flex items-center gap-4 pb-6 border-b border-[#ebebeb] dark:border-[#262626]">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#16a34a] shadow-xs"
            />
            <div>
              <h2 className="text-xl font-bold text-[#171717] dark:text-white">{user.name}</h2>
              <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">{user.email}</p>
              <p className="text-[11px] text-[#16a34a] font-semibold mt-1 capitalize">Account Mode: {user?.role || 'Tenant'}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Occupation</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-xl focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Preferred City</label>
                <LiquidSelect
                  options={cityOptions}
                  value={formData.preferredCity}
                  onChange={(val) => setFormData({ ...formData, preferredCity: val })}
                  placeholder="Select City"
                  icon={MapPin}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#ebebeb] dark:border-[#262626]">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold emerald-gradient-btn text-white rounded-xl shadow-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

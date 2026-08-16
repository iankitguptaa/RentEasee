import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, Save } from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    preferredCity: 'Bengaluru',
    budget: '₹80,000 - ₹1,20,000 / mo',
    occupation: 'Senior Software Engineer'
  });

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
              <p className="text-[11px] text-[#16a34a] font-semibold mt-1">Tenant Profile (Active)</p>
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
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Occupation</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Preferred City</label>
                <select
                  value={formData.preferredCity}
                  onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Budget Preference</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
                />
              </div>
            </div>

            {/* Notification checkboxes */}
            <div className="pt-4 border-t border-[#ebebeb] dark:border-[#262626] space-y-3">
              <h3 className="text-xs font-bold text-[#171717] dark:text-white">Notification Preferences</h3>
              <div className="space-y-2 text-xs text-[#4d4d4d] dark:text-[#a1a1a1]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#ebebeb] accent-[#16a34a]" />
                  <span>Receive WhatsApp notifications for scheduled visit confirmations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#ebebeb] accent-[#16a34a]" />
                  <span>Email alerts when new homes are listed in my saved locations</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 emerald-gradient-btn text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

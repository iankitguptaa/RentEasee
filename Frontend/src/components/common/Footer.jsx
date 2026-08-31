import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';

export const Footer = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Thank you for subscribing to RentEasee newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-[#171717] border-t border-[#ebebeb] dark:border-[#262626] pt-16 pb-12 text-sm text-[#4d4d4d] dark:text-[#a1a1a1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#ebebeb] dark:border-[#262626]">
          
          {/* Brand Info (2 columns) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="large" showTagline={true} />
            </div>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed max-w-sm">
              India's premier digital rental ecosystem. Connecting verified homeowners and tenants directly with zero hassle, instant digital tours, and transparent contracts.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <p className="text-xs font-semibold text-[#171717] dark:text-white mb-2">Subscribe to modern rental insights</p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work or personal email"
                  required
                  className="flex-1 px-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] transition-colors text-[#171717] dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium emerald-gradient-btn text-white rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#16a34a] font-mono">Explore</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('explore', { type: 'Apartment' })} className="hover:text-[#16a34a] transition-colors">
                  Apartments in Mumbai
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { type: 'Villa' })} className="hover:text-[#16a34a] transition-colors">
                  Luxury Villas in Bengaluru
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { type: 'House' })} className="hover:text-[#16a34a] transition-colors">
                  Houses in Delhi NCR
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { type: 'PG/Rooms' })} className="hover:text-[#16a34a] transition-colors">
                  Co-Living & PGs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-[#16a34a] transition-colors">
                  All Rental Properties
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Cities */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#16a34a] font-mono">Top Cities (NCR)</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('explore', { city: 'New Delhi' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in New Delhi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { city: 'Gurugram' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in Gurugram
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { city: 'Noida' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in Noida
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { city: 'Greater Noida' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in Greater Noida
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { city: 'Ghaziabad' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in Ghaziabad
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore', { city: 'Faridabad' })} className="hover:text-[#16a34a] transition-colors">
                  Rent in Faridabad
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#16a34a] font-mono">Platform</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-[#16a34a] transition-colors">
                  User Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('saved')} className="hover:text-[#16a34a] transition-colors">
                  Saved Homes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('enquiries')} className="hover:text-[#16a34a] transition-colors">
                  Enquiry Status
                </button>
              </li>
              <li>
                <span className="text-[#888888] cursor-not-allowed">Rental Agreement Generator</span>
              </li>
              <li>
                <span className="text-[#888888] cursor-not-allowed">Owner Listing Portal</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#888888] dark:text-[#a1a1a1]">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} RentEasee Inc. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-[#16a34a] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#16a34a] cursor-pointer">Terms of Service</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] px-2.5 py-1 rounded-full text-[#16a34a] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Listings
            </span>
            <span className="flex items-center gap-1 text-[11px] bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] px-2.5 py-1 rounded-full text-emerald-600 font-medium">
              <Lock className="w-3.5 h-3.5" /> Bank-grade Security
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

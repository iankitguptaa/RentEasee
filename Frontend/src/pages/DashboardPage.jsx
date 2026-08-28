import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { Bookmark, Calendar, User, ShieldCheck, ArrowRight, Clock, MapPin } from 'lucide-react';

export const DashboardPage = () => {
  const { user, savedPropertyIds, enquiries, navigateTo, setIsAuthModalOpen, setAuthMode } = useApp();

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-16 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#171717] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-[#ebebeb] dark:border-[#262626] shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#171717] dark:text-white tracking-tight">Sign In Required</h2>
          <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
            Please log in or create an account to access your personal dashboard, track scheduled property visits, and view saved homes.
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

  const savedProperties = MOCK_PROPERTIES.filter(p => savedPropertyIds.includes(p.id));

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
                <span className="text-[10px] font-mono font-bold bg-[#16a34a]/10 text-[#16a34a] px-2.5 py-0.5 rounded-full border border-[#16a34a]/20">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ID Verified Tenant Account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('profile')}
              className="px-4 py-2 text-xs font-semibold bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#171717] dark:text-white rounded-xl hover:bg-white transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigateTo('explore')}
              className="px-4 py-2 text-xs font-bold emerald-gradient-btn text-white rounded-xl transition-colors shadow-xs"
            >
              Explore Homes
            </button>
          </div>
        </div>

        {/* Stats Metrics Strip */}
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

        {/* Recent Enquiries / Scheduled Visits */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#171717] dark:text-white">Recent Inspection Visits</h3>
              <p className="text-xs text-[#888888] dark:text-[#a1a1a1]">Your scheduled in-person and virtual walkthroughs</p>
            </div>
            <button
              onClick={() => navigateTo('enquiries')}
              className="text-xs font-semibold text-[#16a34a] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-xl border border-[#ebebeb] dark:border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#171717] dark:text-white">{enq.propertyTitle}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      enq.status === 'Confirmed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] dark:text-[#a1a1a1] flex items-center gap-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#16a34a]" /> {enq.propertyCity}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#888888]" /> {enq.date} at {enq.timeSlot}</span>
                    <span>• {enq.type}</span>
                  </p>
                </div>

                <div className="text-xs text-[#4d4d4d] dark:text-[#a1a1a1] font-medium">
                  Host: <span className="font-semibold text-[#171717] dark:text-white">{enq.ownerName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Saved Homes Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#171717] dark:text-white">Saved Properties Preview</h3>
            <button
              onClick={() => navigateTo('saved')}
              className="text-xs font-semibold text-[#16a34a] hover:underline"
            >
              Manage Saved Homes ({savedPropertyIds.length})
            </button>
          </div>

          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#171717] rounded-2xl p-8 text-center border border-[#ebebeb] dark:border-[#262626] text-xs text-[#888888] dark:text-[#a1a1a1]">
              No saved homes yet. Click the heart icon on any property card to save it!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

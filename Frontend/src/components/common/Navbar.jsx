import React, { useState } from 'react';
import { Home, Compass, Bookmark, MessageSquare, User, Menu, X, ArrowUpRight, Search, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';

export const Navbar = () => {
  const { activePage, navigateTo, savedPropertyIds, user, setIsAuthModalOpen, setAuthMode, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore Homes', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedPropertyIds.length },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 liquid-glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Adaptive Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer"
        >
          <Logo size="normal" showTagline={true} />
        </div>

        {/* Liquid Glass Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-black/40 p-1.5 rounded-full border border-white/60 dark:border-white/10 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                  isActive
                    ? 'emerald-gradient-btn text-white shadow-md scale-105'
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-[#064e3b] text-white' : 'bg-[#16a34a] text-white'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Liquid User Menu */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Light / Dark Mode Liquid Glass Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/60 dark:border-white/10 bg-white/50 dark:bg-black/50 text-[#171717] dark:text-white hover:border-[#16a34a] backdrop-blur-md transition-all shadow-xs hover:scale-110"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#171717]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('explore')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a] dark:hover:text-white px-3.5 py-2 rounded-full border border-transparent hover:border-[#16a34a]/30 hover:bg-white/40 dark:hover:bg-white/10 backdrop-blur-md transition-all"
          >
            <Search className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Search</span>
          </button>

          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3.5 rounded-full border border-white/60 dark:border-white/10 hover:border-[#16a34a] bg-white/60 dark:bg-black/60 backdrop-blur-md transition-all text-xs font-semibold shadow-xs"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#16a34a]"
                />
                <span className="text-[#171717] dark:text-white font-medium">{user.name.split(' ')[0]}</span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 liquid-glass-card rounded-2xl p-2 z-50 text-xs text-[#171717] dark:text-white animate-fade-in"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 rounded-xl bg-white/40 dark:bg-black/40 mb-1 border border-white/40 dark:border-white/10">
                    <p className="font-bold text-sm text-[#171717] dark:text-white">{user.name}</p>
                    <p className="text-[#888888] dark:text-[#a1a1a1] text-[11px] truncate">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('dashboard');
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-[#16a34a]/10 dark:hover:bg-[#16a34a]/20 flex items-center justify-between text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a] dark:hover:text-white transition-colors"
                  >
                    <span>User Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#16a34a]" />
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('profile');
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-[#16a34a]/10 dark:hover:bg-[#16a34a]/20 flex items-center justify-between text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a] dark:hover:text-white transition-colors"
                  >
                    <span>Profile Settings</span>
                    <User className="w-3.5 h-3.5 text-[#16a34a]" />
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('saved');
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-[#16a34a]/10 dark:hover:bg-[#16a34a]/20 flex items-center justify-between text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#16a34a] dark:hover:text-white transition-colors"
                  >
                    <span>Saved Homes</span>
                    <span className="text-[10px] bg-[#16a34a] text-white px-2 py-0.5 rounded-full font-mono font-bold">{savedPropertyIds.length}</span>
                  </button>

                  <div className="border-t border-white/40 dark:border-white/10 my-1"></div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('home');
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg text-rose-600 hover:bg-rose-500/10 font-semibold transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-bold emerald-gradient-btn text-white rounded-full transition-all shadow-md"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10 border border-white/60 dark:border-white/10"
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10 border border-white/60 dark:border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/40 dark:border-white/10 bg-white/90 dark:bg-[#171717]/90 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'emerald-gradient-btn text-white'
                      : 'bg-white/60 dark:bg-[#1a1a1a] text-[#4d4d4d] dark:text-[#a1a1a1] border border-white/60 dark:border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/40 dark:border-white/10 flex items-center justify-between">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-[#16a34a]" />
                  <div>
                    <p className="text-xs font-semibold text-[#171717] dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-[#888888]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="px-3 py-1.5 text-xs emerald-gradient-btn text-white rounded-lg font-bold"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2 text-xs font-medium border border-white/60 dark:border-white/10 rounded-lg text-[#171717] dark:text-white"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2 text-xs font-bold emerald-gradient-btn text-white rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, loginUser, signupUser, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: true
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      loginUser(formData);
    } else {
      signupUser(formData);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-[#171717] rounded-3xl max-w-md w-full border border-[#ebebeb] dark:border-[#262626] shadow-2xl overflow-hidden relative"
        >
          
          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#888888] hover:text-[#171717] dark:hover:text-white hover:bg-[#fafafa] dark:hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 border-b border-[#ebebeb] dark:border-[#262626] text-center bg-[#fafafa] dark:bg-[#0f0f0f]">
            <img
              src="/icon.jpg"
              alt="RentEasee Icon"
              className="w-12 h-12 rounded-xl object-contain mx-auto mb-3 shadow-sm border border-[#ebebeb]"
            />
            <h3 className="text-xl font-bold text-[#171717] dark:text-white tracking-tight">
              {authMode === 'login' ? 'Welcome Back to RentEasee' : 'Create Your RentEasee Account'}
            </h3>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1">
              {authMode === 'login'
                ? 'Access your saved homes, visit schedules, and owner messages'
                : 'Join thousands of verified renters and landlords across India'}
            </p>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#f5f5f5] dark:bg-[#1a1a1a] p-1 rounded-xl mt-4 border border-[#ebebeb] dark:border-[#262626]">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'emerald-gradient-btn text-white shadow-xs font-bold'
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'emerald-gradient-btn text-white shadow-xs font-bold'
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#888888] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a]"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#888888] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a]"
                />
              </div>
            </div>

            {authMode === 'login' ? (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-[#4d4d4d] dark:text-[#a1a1a1] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#ebebeb] accent-[#16a34a]" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to your email'); }} className="text-[#16a34a] hover:underline">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="text-xs text-[#4d4d4d] dark:text-[#a1a1a1]">
                <label className="flex items-start gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-0.5 rounded border-[#ebebeb] accent-[#16a34a]"
                  />
                  <span>I agree to RentEasee Terms of Service and Privacy Policy</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 emerald-gradient-btn text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{authMode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security badge */}
          <div className="bg-[#fafafa] dark:bg-[#0f0f0f] px-6 py-3 border-t border-[#ebebeb] dark:border-[#262626] flex items-center justify-center gap-1.5 text-[11px] text-[#888888]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Encrypted digital credentials verification</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

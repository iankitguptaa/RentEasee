import React from 'react';
import { ArrowRight, Key, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const CtaSection = () => {
  const { navigateTo, setIsAuthModalOpen, setAuthMode } = useApp();

  return (
    <section className="py-20 bg-[#171717] dark:bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Mesh gradient glow overlay updated with RentEasee Green */}
      <div className="absolute inset-0 bg-radial from-emerald-600/25 via-transparent to-transparent opacity-60 pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>Join the RentEasee Ecosystem</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight"
        >
          Ready to find your ideal home or list your property?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mt-4 leading-relaxed font-normal"
        >
          Whether you're looking for your next apartment in Mumbai or listing a luxury villa in Bengaluru, RentEasee makes the entire process effortless.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigateTo('explore')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#171717] hover:bg-neutral-100 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 group hover:scale-105"
          >
            <span>Browse All Rentals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#16a34a]" />
          </button>

          <button
            onClick={() => {
              setAuthMode('signup');
              setIsAuthModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full emerald-gradient-btn text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
          >
            <Key className="w-4 h-4 text-emerald-300" />
            <span>List Property as Owner</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

import React from 'react';
import { Search, Calendar, FileText, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Search & Filter Homes",
      description: "Explore 10,000+ verified apartments, houses & villas using smart city, BHK, and budget filters."
    },
    {
      step: "02",
      icon: Calendar,
      title: "Schedule Visit or Virtual Tour",
      description: "Pick your preferred date and time slot to inspect the home in-person or via live video walkthrough."
    },
    {
      step: "03",
      icon: FileText,
      title: "Digital Agreement & Deposit",
      description: "Complete owner verification, sign digital rental lease, and lock in your deposit with full encryption."
    },
    {
      step: "04",
      icon: KeyRound,
      title: "Move In & Enjoy",
      description: "Collect your keys on move-in day with our hassle-free inspection checklist and concierge support."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#171717] border-b border-[#ebebeb] dark:border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">Seamless Process</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
            How RentEasee works
          </h2>
          <p className="text-sm text-[#4d4d4d] dark:text-[#a1a1a1]">
            Your journey from searching for a property to unlocking your new front door in 4 easy steps.
          </p>
        </motion.div>

        {/* Steps Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6 }}
                className="relative bg-[#fafafa] dark:bg-[#0f0f0f] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] hover:shadow-xl transition-all space-y-4 cursor-default group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white flex items-center justify-center shadow-xs transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold font-mono text-[#a1a1a1] dark:text-[#404040] group-hover:text-[#16a34a] transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#171717] dark:text-white group-hover:text-[#16a34a] transition-colors">{s.title}</h3>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

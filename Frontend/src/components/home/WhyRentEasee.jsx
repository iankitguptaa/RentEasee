import React from 'react';
import { ShieldCheck, Zap, Video, FileCheck2, Headphones, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyRentEasee = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "100% Verified Listings",
      description: "Every property photograph, ownership document, and amenity list is manually verified by our team on-site."
    },
    {
      icon: Zap,
      title: "Zero Brokerage Options",
      description: "Connect directly with genuine homeowners. No hidden brokerage commissions or surprise agent fees."
    },
    {
      icon: Video,
      title: "Instant 3D Virtual Tours",
      description: "Inspect every room and corner remotely with immersive HD virtual walkthroughs before visiting in person."
    },
    {
      icon: FileCheck2,
      title: "Legally Binding Digital Leases",
      description: "Generate digitally signed rental agreements with stamp duty verification in under 10 minutes."
    },
    {
      icon: Lock,
      title: "Encrypted Security Deposit",
      description: "Keep deposit funds safely protected until check-in inspection is verified by both tenant and landlord."
    },
    {
      icon: Headphones,
      title: "24/7 Tenant Concierge",
      description: "Dedicated support team for maintenance requests, move-in assistance, and lock-in queries."
    }
  ];

  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#0f0f0f] border-b border-[#ebebeb] dark:border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">Platform Advantage</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
            Why modern renters choose RentEasee
          </h2>
          <p className="text-sm text-[#4d4d4d] dark:text-[#a1a1a1]">
            We replaced outdated classifieds with a sleek, transparent, and technology-driven rental experience.
          </p>
        </motion.div>

        {/* Benefits Grid with Staggered One-by-One Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] hover:shadow-xl transition-all space-y-4 cursor-default group"
              >
                <div className="w-12 h-12 rounded-xl emerald-gradient-btn text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#171717] dark:text-white group-hover:text-[#16a34a] transition-colors">{item.title}</h3>
                <p className="text-xs text-[#888888] dark:text-[#a1a1a1] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

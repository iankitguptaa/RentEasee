import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  const reviews = [
    {
      name: "Rohan Mehta",
      role: "Software Engineer at Google",
      city: "Bengaluru (Indiranagar)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "Found my dream 3 BHK villa in Indiranagar within 48 hours! The 3D virtual walkthrough was 100% identical to the actual house. Zero broker hassles.",
      rating: 5
    },
    {
      name: "Sanya Roy",
      role: "Product Designer",
      city: "Mumbai (Bandra)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "RentEasee's digital agreement generator made moving to Mumbai completely painless. Deposit lock security gave me total peace of mind.",
      rating: 5
    },
    {
      name: "Dr. Alok Verma",
      role: "Verified Property Owner",
      city: "Delhi NCR (Gurugram)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "As a landlord with 3 properties in Gurugram, RentEasee brings high-intent, background-verified tenants directly to me. Fantastic experience!",
      rating: 5
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
          <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">User Stories</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#171717] dark:text-white">
            Loved by tenants & landlords alike
          </h2>
          <p className="text-sm text-[#4d4d4d] dark:text-[#a1a1a1]">
            Read how RentEasee is transforming rental experiences across India's top metros.
          </p>
        </motion.div>

        {/* Reviews Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs hover:border-[#16a34a] hover:shadow-xl transition-all flex flex-col justify-between space-y-4 cursor-default group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed italic">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#ebebeb] dark:border-[#262626] flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#ebebeb] dark:border-[#262626] group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#171717] dark:text-white">{r.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                  </div>
                  <p className="text-[11px] text-[#888888] dark:text-[#a1a1a1]">{r.role}</p>
                  <p className="text-[10px] text-[#888888] dark:text-[#a1a1a1] font-mono">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

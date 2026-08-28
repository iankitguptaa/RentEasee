import React from 'react';
import { Building2, Home, Warehouse, Users, ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const CategoryGrid = () => {
  const { navigateTo } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Home': return Home;
      case 'Warehouse': return Warehouse;
      case 'Users': return Users;
      default: return Building2;
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-[#171717] border-b border-[#ebebeb] dark:border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#16a34a] font-bold">Property Categories</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] dark:text-white mt-1">
              Explore by property type
            </h2>
          </div>
          <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-2 sm:mt-0 max-w-md">
            Find the perfect living arrangement curated specifically for your lifestyle and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat, idx) => {
            const Icon = getIcon(cat.iconName);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigateTo('explore', { type: cat.slug })}
                className="group bg-[#fafafa] dark:bg-[#0f0f0f] hover:bg-white dark:hover:bg-[#1f1f1f] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-white dark:bg-[#171717] border border-[#ebebeb] dark:border-[#262626] text-[#16a34a]">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171717] dark:text-white group-hover:text-[#16a34a] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ebebeb] dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-[#171717] dark:text-white">
                  <span className="font-mono text-[#888888]">{cat.count}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-[#16a34a]">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

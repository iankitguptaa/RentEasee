import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiquidSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select option',
  icon: Icon,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      
      {/* Liquid Glass Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 px-3 text-xs font-bold rounded-2xl bg-white/70 dark:bg-black/70 border border-white/80 dark:border-white/20 backdrop-blur-xl text-[#171717] dark:text-white flex items-center justify-between shadow-xs hover:border-[#16a34a] hover:bg-white/90 dark:hover:bg-black/90 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-[#16a34a] shrink-0" />}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#16a34a]' : ''
          }`}
        />
      </button>

      {/* Floating Liquid Glass Dropdown Menu with High Z-Index Stacking */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.94 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="absolute left-0 right-0 z-[9999] mt-1.5 max-h-64 overflow-y-auto rounded-2xl p-2 liquid-glass-card shadow-2xl border border-white/80 dark:border-white/20 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-3xl"
          >
            <div className="space-y-1">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? 'emerald-gradient-btn text-white font-bold shadow-md'
                        : 'text-[#171717] dark:text-[#f5f5f5] hover:bg-[#16a34a]/15 dark:hover:bg-[#16a34a]/25 hover:text-[#16a34a] dark:hover:text-white'
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

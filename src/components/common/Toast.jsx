import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#171717] dark:bg-[#1a1a1a] text-white rounded-xl shadow-2xl border border-[#16a34a]/40 text-sm font-medium backdrop-blur-md max-w-sm"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type !== 'success' && toast.type !== 'error' && <Info className="w-5 h-5 text-[#16a34a] shrink-0" />}
          <span className="flex-1 text-xs">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

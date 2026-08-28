import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MOCK_PROPERTIES } from '../data/mockProperties';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home'); // 'home', 'explore', 'property-detail', 'dashboard', 'saved', 'enquiries', 'profile'
  const [selectedPropertyId, setSelectedPropertyId] = useState('prop-1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('renteasee_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('renteasee_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // User state
  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'Tenant',
    isLoggedIn: true
  });

  // Saved / Favorite properties
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      const stored = localStorage.getItem('renteasee_saved_props');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('renteasee_saved_props', JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  // Initial filter state
  const initialFilters = {
    city: 'All',
    type: 'All',
    bhk: 'All',
    priceRange: [0, 200000],
    furnishing: 'All',
    searchQuery: '',
    sortBy: 'recommended'
  };

  const [filters, setFilters] = useState(initialFilters);

  // Enquiries & Visit requests state
  const [enquiries, setEnquiries] = useState([
    {
      id: 'enq-101',
      propertyId: 'prop-1',
      propertyTitle: 'Skyline Residency & Penthouse',
      propertyCity: 'Mumbai',
      ownerName: 'Vikram Malhotra',
      date: '2026-08-18',
      timeSlot: '04:00 PM',
      type: 'In-Person Visit',
      status: 'Confirmed',
      createdAt: '2026-08-15'
    },
    {
      id: 'enq-102',
      propertyId: 'prop-3',
      propertyTitle: 'DLF Crest Executive Suite',
      propertyCity: 'Delhi NCR',
      ownerName: 'Rajesh Singhania',
      date: '2026-08-20',
      timeSlot: '11:30 AM',
      type: 'Virtual Tour',
      status: 'Pending Response',
      createdAt: '2026-08-16'
    }
  ]);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const toggleSaveProperty = useCallback((propertyId) => {
    setSavedPropertyIds(prev => {
      const isSaved = prev.includes(propertyId);
      if (isSaved) {
        showToast('Removed from saved properties', 'info');
        return prev.filter(id => id !== propertyId);
      } else {
        showToast('Property saved to your favorites!', 'success');
        return [...prev, propertyId];
      }
    });
  }, [showToast]);

  const viewPropertyDetails = useCallback((propertyId) => {
    setSelectedPropertyId(propertyId);
    setActivePage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateTo = useCallback((page, params = {}) => {
    setActivePage(page);
    if (params.city) {
      setFilters(prev => ({ ...prev, city: params.city }));
    }
    if (params.type) {
      setFilters(prev => ({ ...prev, type: params.type }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addEnquiry = useCallback((enquiryData) => {
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      ...enquiryData
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    showToast('Visit request sent successfully! Owner will contact you.', 'success');
  }, [showToast]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const selectedProperty = useMemo(() => {
    return MOCK_PROPERTIES.find(p => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];
  }, [selectedPropertyId]);

  const value = {
    activePage,
    setActivePage,
    navigateTo,
    selectedProperty,
    selectedPropertyId,
    setSelectedPropertyId,
    viewPropertyDetails,
    filters,
    setFilters,
    resetFilters,
    savedPropertyIds,
    toggleSaveProperty,
    enquiries,
    addEnquiry,
    user,
    setUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    toast,
    showToast,
    theme,
    toggleTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState('prop-1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  
  // Properties state from Backend API
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [loadingProperties, setLoadingProperties] = useState(false);

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

  // Toast notifications state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Fetch properties from backend
  const fetchProperties = useCallback(async (params = {}) => {
    try {
      setLoadingProperties(true);
      const data = await api.getProperties(params);
      if (Array.isArray(data) && data.length > 0) {
        setProperties(data);
      }
    } catch (error) {
      console.warn('Backend API offline or unreachable, using fallback mock data:', error.message);
    } finally {
      setLoadingProperties(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // User state
  const defaultUser = {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'tenant',
    isLoggedIn: false
  };

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('renteasee_user');
      if (stored && stored !== 'undefined') {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            name: parsed.name ?? defaultUser.name,
            email: parsed.email ?? defaultUser.email,
            phone: parsed.phone ?? defaultUser.phone,
            avatar: parsed.avatar ?? defaultUser.avatar,
            role: (parsed.role || 'tenant').toLowerCase(),
            isLoggedIn: typeof parsed.isLoggedIn === 'boolean' ? parsed.isLoggedIn : false
          };
        }
      }
      return defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('renteasee_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const loginUser = useCallback(async (formData) => {
    const targetRole = (formData.role || 'tenant').toLowerCase();
    try {
      const res = await api.login(formData);
      if (res.token) {
        localStorage.setItem('rentease_token', res.token);
      }
      const updatedUser = {
        name: res.name || formData.name || 'Property Owner',
        email: res.email || formData.email,
        phone: res.phone || '+91 98765 43210',
        avatar: res.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: (res.role || targetRole).toLowerCase(),
        isLoggedIn: true
      };
      setUser(updatedUser);
      setIsAuthModalOpen(false);
      showToast(`Logged in successfully as ${updatedUser.role === 'owner' ? 'Home Owner' : 'Tenant'}!`, 'success');
    } catch (err) {
      // Local fallback auth
      const updatedUser = {
        name: formData.name || (targetRole === 'owner' ? 'Vikram Malhotra (Owner)' : formData.email ? formData.email.split('@')[0] : 'User'),
        email: formData.email || 'owner@renteasee.com',
        phone: formData.phone || '+91 98201 44512',
        avatar: targetRole === 'owner' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: targetRole,
        isLoggedIn: true
      };
      setUser(updatedUser);
      setIsAuthModalOpen(false);
      showToast(`Welcome! Logged in as ${targetRole === 'owner' ? 'Home Owner' : 'Tenant'}.`, 'success');
    }
  }, [showToast]);

  const signupUser = useCallback(async (formData) => {
    const targetRole = (formData.role || 'tenant').toLowerCase();
    try {
      const res = await api.register(formData);
      if (res.token) {
        localStorage.setItem('rentease_token', res.token);
      }
      const updatedUser = {
        name: res.name || formData.name || 'New User',
        email: res.email || formData.email,
        phone: res.phone || '+91 98765 43210',
        avatar: res.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: (res.role || targetRole).toLowerCase(),
        isLoggedIn: true
      };
      setUser(updatedUser);
      setIsAuthModalOpen(false);
      showToast(`Account created as ${targetRole === 'owner' ? 'Property Owner' : 'Tenant'}!`, 'success');
    } catch (err) {
      const updatedUser = {
        name: formData.name || (targetRole === 'owner' ? 'New Property Owner' : 'New Tenant'),
        email: formData.email || 'user@renteasee.com',
        phone: formData.phone || '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: targetRole,
        isLoggedIn: true
      };
      setUser(updatedUser);
      setIsAuthModalOpen(false);
      showToast(`Account created successfully as ${targetRole === 'owner' ? 'Property Owner' : 'Tenant'}!`, 'success');
    }
  }, [showToast]);

  const switchRole = useCallback((newRole) => {
    const target = newRole.toLowerCase();
    setUser(prev => ({
      ...prev,
      role: target
    }));
    showToast(`Switched account panel to ${target === 'owner' ? 'Home Owner' : 'Tenant'} mode`, 'info');
  }, [showToast]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('rentease_token');
    setUser({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      role: 'guest',
      isLoggedIn: false
    });
    showToast('You have been logged out.', 'info');
    setActivePage('home');
  }, [showToast]);

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

  // Enquiries state
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
    }
  ]);

  const toggleSaveProperty = useCallback(async (propertyId) => {
    try {
      await api.toggleSaveProperty(propertyId);
    } catch (e) {
      // Local fallback
    }

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

  const addEnquiry = useCallback(async (enquiryData) => {
    try {
      await api.sendEnquiry(enquiryData);
    } catch (e) {
      // Local fallback
    }
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
    return properties.find(p => p.id === selectedPropertyId || p._id === selectedPropertyId) || properties[0];
  }, [properties, selectedPropertyId]);

  const value = {
    activePage,
    setActivePage,
    navigateTo,
    properties,
    loadingProperties,
    fetchProperties,
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
    loginUser,
    signupUser,
    switchRole,
    logoutUser,
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

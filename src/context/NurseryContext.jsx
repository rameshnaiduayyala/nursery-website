import { createContext, useContext, useMemo } from 'react';
import {
  companyDetails,
  heroSlides,
  plantCategories,
  projectMilestones,
  testimonialsData,
  horticulturalSteps,
  plantsCollection
} from '../data/nurseryData';

const NurseryContext = createContext(null);

const staticModeResult = {
  success: false,
  error: 'Static mode is enabled. Edit src/data/nurseryData.js to change site content.'
};

export function NurseryProvider({ children }) {
  const value = useMemo(() => ({
    companyDetails,
    heroSlides,
    plantCategories,
    projectMilestones,
    testimonialsData,
    horticulturalSteps,
    plantsCollection,
    isLoading: false,
    isDynamic: false,
    isSchemaUninitialized: false,
    refreshData: async () => ({ success: true }),
    seedDatabase: async () => staticModeResult,
    updateCompanyDetails: async () => staticModeResult,
    saveCategory: async () => staticModeResult,
    deleteCategory: async () => staticModeResult,
    savePlant: async () => staticModeResult,
    deletePlant: async () => staticModeResult
  }), []);

  return (
    <NurseryContext.Provider value={value}>
      {children}
    </NurseryContext.Provider>
  );
}

export function useNursery() {
  const context = useContext(NurseryContext);
  if (!context) {
    throw new Error('useNursery must be used within a NurseryProvider');
  }
  return context;
}

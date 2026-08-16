import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, checkSupabaseConnection } from '../utils/supabase';
import {
  companyDetails as staticCompanyDetails,
  heroSlides as staticHeroSlides,
  plantCategories as staticPlantCategories,
  projectMilestones as staticProjectMilestones,
  testimonialsData as staticTestimonialsData,
  horticulturalSteps as staticHorticulturalSteps,
  plantsCollection as staticPlantsCollection
} from '../data/nurseryData';

const NurseryContext = createContext(null);

export function NurseryProvider({ children }) {
  const [companyDetails, setCompanyDetails] = useState(staticCompanyDetails);
  const [heroSlides, setHeroSlides] = useState(staticHeroSlides);
  const [plantCategories, setPlantCategories] = useState(staticPlantCategories);
  const [projectMilestones, setProjectMilestones] = useState(staticProjectMilestones);
  const [testimonialsData, setTestimonialsData] = useState(staticTestimonialsData);
  const [plantsCollection, setPlantsCollection] = useState(staticPlantsCollection);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDynamic, setIsDynamic] = useState(false);
  const [isSchemaUninitialized, setIsSchemaUninitialized] = useState(false);
  const [supabaseError, setSupabaseError] = useState(null);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setSupabaseError(null);

    if (!supabase) {
      setCompanyDetails(staticCompanyDetails);
      setHeroSlides(staticHeroSlides);
      setPlantCategories(staticPlantCategories);
      setProjectMilestones(staticProjectMilestones);
      setTestimonialsData(staticTestimonialsData);
      setPlantsCollection(staticPlantsCollection);
      setIsDynamic(false);
      setIsSchemaUninitialized(false);
      setIsLoading(false);
      return;
    }

    try {
      const conn = await checkSupabaseConnection(supabase);
      if (!conn.success) {
        setIsSchemaUninitialized(false);
        throw new Error(conn.error || "Could not connect to Supabase");
      }

      if (conn.tablesMissing) {
        setIsSchemaUninitialized(true);
        setCompanyDetails(staticCompanyDetails);
        setHeroSlides(staticHeroSlides);
        setPlantCategories(staticPlantCategories);
        setProjectMilestones(staticProjectMilestones);
        setTestimonialsData(staticTestimonialsData);
        setPlantsCollection(staticPlantsCollection);
        setIsDynamic(false);
        setIsLoading(false);
        return;
      }

      setIsSchemaUninitialized(false);

      // Fetch all collections in parallel
      const [
        resCompany,
        resCategories,
        resPlants,
        resProjects,
        resTestimonials,
        resHero
      ] = await Promise.all([
        supabase.from('company_details').select('*').eq('id', 1).maybeSingle(),
        supabase.from('plant_categories').select('*').order('id', { ascending: true }),
        supabase.from('plants_collection').select('*').order('id', { ascending: true }),
        supabase.from('project_milestones').select('*').order('id', { ascending: true }),
        supabase.from('testimonials').select('*').order('id', { ascending: true }),
        supabase.from('hero_slides').select('*').order('id', { ascending: true })
      ]);

      let loadedAnyDynamic = false;

      // Process Company Details
      if (resCompany.data && !resCompany.error) {
        // Fallback logo handling
        setCompanyDetails({
          ...staticCompanyDetails,
          name: resCompany.data.name || staticCompanyDetails.name,
          subtitle: resCompany.data.subtitle || staticCompanyDetails.subtitle,
          address: resCompany.data.address || staticCompanyDetails.address,
          city: resCompany.data.city || staticCompanyDetails.city,
          phone: resCompany.data.phone || staticCompanyDetails.phone,
          phoneAlt: resCompany.data.phone_alt || resCompany.data.phonealt || resCompany.data.phoneAlt || staticCompanyDetails.phoneAlt,
          email: resCompany.data.email || staticCompanyDetails.email,
          gstin: resCompany.data.gstin || staticCompanyDetails.gstin,
          pan: resCompany.data.pan || staticCompanyDetails.pan,
          bankName: resCompany.data.bank_name || resCompany.data.bankname || resCompany.data.bankName || staticCompanyDetails.bankName,
          accountNo: resCompany.data.account_no || resCompany.data.accountno || resCompany.data.accountNo || staticCompanyDetails.accountNo,
          ifsc: resCompany.data.ifsc || staticCompanyDetails.ifsc,
          branch: resCompany.data.branch || staticCompanyDetails.branch,
          whatsappNumber: resCompany.data.whatsapp_number || resCompany.data.whatsappnumber || resCompany.data.whatsappNumber || staticCompanyDetails.whatsappNumber,
          billingPassword: resCompany.data.billing_password || resCompany.data.billingpassword || resCompany.data.billingPassword || staticCompanyDetails.billingPassword,
          logo: resCompany.data.logo || staticCompanyDetails.logo
        });
        loadedAnyDynamic = true;
      } else {
        setCompanyDetails(staticCompanyDetails);
      }

      // Process Categories
      if (resCategories.data && resCategories.data.length > 0 && !resCategories.error) {
        // Map db `group_name` to UI `group`
        const mappedCategories = resCategories.data.map(c => ({
          id: c.id,
          name: c.name,
          description: c.description,
          image: c.image,
          group: c.group_name || 'outdoor',
          count: c.count
        }));
        setPlantCategories(mappedCategories);
        loadedAnyDynamic = true;
      } else {
        setPlantCategories(staticPlantCategories);
      }

      // Process Plants Collection
      if (resPlants.data && resPlants.data.length > 0 && !resPlants.error) {
        setPlantsCollection(resPlants.data);
        loadedAnyDynamic = true;
      } else {
        setPlantsCollection(staticPlantsCollection);
      }

      // Process Milestones
      if (resProjects.data && resProjects.data.length > 0 && !resProjects.error) {
        const mappedProjects = resProjects.data.map(p => ({
          ...p,
          plantsCount: p.plants_count || p.plantsCount
        }));
        setProjectMilestones(mappedProjects);
        loadedAnyDynamic = true;
      } else {
        setProjectMilestones(staticProjectMilestones);
      }

      // Process Testimonials
      if (resTestimonials.data && resTestimonials.data.length > 0 && !resTestimonials.error) {
        setTestimonialsData(resTestimonials.data);
        loadedAnyDynamic = true;
      } else {
        setTestimonialsData(staticTestimonialsData);
      }

      // Process Hero slides
      if (resHero.data && resHero.data.length > 0 && !resHero.error) {
        // Make sure lines is an array
        const formattedHero = resHero.data.map(h => ({
          id: h.id,
          label: h.label,
          lines: Array.isArray(h.lines) ? h.lines : JSON.parse(h.lines || '[]'),
          subheadline: h.subheadline,
          image: h.image
        }));
        setHeroSlides(formattedHero);
        loadedAnyDynamic = true;
      } else {
        setHeroSlides(staticHeroSlides);
      }

      setIsDynamic(loadedAnyDynamic);
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to static nursery data.", err);
      setSupabaseError(err.message || "Failed to fetch from Supabase");
      
      // Strict fallback to static on failure
      setCompanyDetails(staticCompanyDetails);
      setHeroSlides(staticHeroSlides);
      setPlantCategories(staticPlantCategories);
      setProjectMilestones(staticProjectMilestones);
      setTestimonialsData(staticTestimonialsData);
      setPlantsCollection(staticPlantsCollection);
      setIsDynamic(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // CRUD actions - only work with Supabase, static mode shows read-only data
  const updateCompanyDetails = async (details) => {
    if (!supabase) {
      return { success: false, error: "Supabase not configured" };
    }
    const dbCompany = {
      id: 1,
      name: details.name,
      subtitle: details.subtitle,
      address: details.address,
      city: details.city,
      phone: details.phone,
      phone_alt: details.phoneAlt || null,
      email: details.email,
      gstin: details.gstin,
      pan: details.pan,
      bank_name: details.bankName || null,
      account_no: details.accountNo || null,
      ifsc: details.ifsc,
      branch: details.branch,
      whatsapp_number: details.whatsappNumber || null,
      billing_password: details.billingPassword || null,
      logo: details.logo
    };
    const { error } = await supabase.from('company_details').upsert(dbCompany);
    if (error) throw error;
    await refreshData();
    return { success: true };
  };

  const saveCategory = async (category, isNew) => {
    if (!supabase) {
      return { success: false, error: "Supabase not configured" };
    }
    const row = {
      name: category.name,
      description: category.description,
      image: category.image,
      group_name: category.group_name || category.group || 'outdoor',
      count: category.count
    };

    if (!isNew && category.id) {
      const { error } = await supabase
        .from('plant_categories')
        .update(row)
        .eq('id', category.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('plant_categories')
        .insert([row]);
      if (error) throw error;
    }
    await refreshData();
    return { success: true };
  };

  const deleteCategory = async (id) => {
    if (!supabase) {
      return { success: false, error: "Supabase not configured" };
    }
    const { error } = await supabase
      .from('plant_categories')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await refreshData();
    return { success: true };
  };

  const savePlant = async (plant, isNew) => {
    if (!supabase) {
      return { success: false, error: "Supabase not configured" };
    }
    const row = {
      name: plant.name,
      botanical: plant.botanical,
      category: plant.category,
      height: plant.height,
      container: plant.container,
      availability: plant.availability,
      description: plant.description,
      image: plant.image
    };

    if (!isNew && plant.id) {
      const { error } = await supabase
        .from('plants_collection')
        .update(row)
        .eq('id', plant.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('plants_collection')
        .insert([row]);
      if (error) throw error;
    }
    await refreshData();
    return { success: true };
  };

  const deletePlant = async (id) => {
    if (!supabase) {
      return { success: false, error: "Supabase not configured" };
    }
    const { error } = await supabase
      .from('plants_collection')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await refreshData();
    return { success: true };
  };

  // One-click seeding of database with static data
  const seedDatabase = async () => {
    if (!supabase) return { success: false, error: "Supabase client not configured." };
    
    try {
      // 1. Company details (upsert row id 1 with snake_case fields)
      const { logo } = staticCompanyDetails;
      const { error: companyErr } = await supabase.from('company_details').upsert({
        id: 1,
        name: staticCompanyDetails.name,
        subtitle: staticCompanyDetails.subtitle,
        address: staticCompanyDetails.address,
        city: staticCompanyDetails.city,
        phone: staticCompanyDetails.phone,
        phone_alt: staticCompanyDetails.phoneAlt,
        email: staticCompanyDetails.email,
        gstin: staticCompanyDetails.gstin,
        pan: staticCompanyDetails.pan,
        bank_name: staticCompanyDetails.bankName,
        account_no: staticCompanyDetails.accountNo,
        ifsc: staticCompanyDetails.ifsc,
        branch: staticCompanyDetails.branch,
        whatsapp_number: staticCompanyDetails.whatsappNumber,
        billing_password: staticCompanyDetails.billingPassword,
        logo: typeof logo === 'string' && logo.startsWith('data:') ? logo : null
      });
      if (companyErr) throw companyErr;

      // 2. Categories
      const dbCategories = staticPlantCategories.map(c => ({
        name: c.name,
        description: c.description,
        image: c.image,
        group_name: c.group,
        count: c.count
      }));
      const { error: catErr } = await supabase.from('plant_categories').upsert(dbCategories, { onConflict: 'name' });
      if (catErr) throw catErr;

      // 3. Plants
      const dbPlants = staticPlantsCollection.map(p => ({
        name: p.name,
        botanical: p.botanical,
        category: p.category,
        height: p.height,
        container: p.container,
        availability: p.availability,
        description: p.description,
        image: p.image
      }));
      const { error: plantErr } = await supabase.from('plants_collection').insert(dbPlants);
      if (plantErr) throw plantErr;

      // 4. Milestones
      const dbProjects = staticProjectMilestones.map(m => ({
        title: m.title,
        category: m.category,
        image: m.image,
        location: m.location,
        year: m.year,
        scope: m.scope,
        plants_count: m.plantsCount,
        description: m.description,
        size: m.size
      }));
      const { error: projErr } = await supabase.from('project_milestones').insert(dbProjects);
      if (projErr) throw projErr;

      // 5. Testimonials
      const { error: testErr } = await supabase.from('testimonials').insert(staticTestimonialsData.map(t => {
        const { id, ...rest } = t;
        return rest;
      }));
      if (testErr) throw testErr;

      // 6. Hero Slides
      const { error: heroErr } = await supabase.from('hero_slides').insert(staticHeroSlides.map(s => ({
        label: s.label,
        lines: s.lines,
        subheadline: s.subheadline,
        image: s.image
      })));
      if (heroErr) throw heroErr;

      await refreshData();
      return { success: true };
    } catch (err) {
      console.error("Database seeding failed:", err);
      return { success: false, error: err.message || "Failed to seed database" };
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <NurseryContext.Provider value={{
      companyDetails,
      heroSlides,
      plantCategories,
      projectMilestones,
      testimonialsData,
      plantsCollection,
      horticulturalSteps: staticHorticulturalSteps,
      isLoading,
      isDynamic,
      isSchemaUninitialized,
      supabaseError,
      refreshData,
      seedDatabase,
      updateCompanyDetails,
      saveCategory,
      deleteCategory,
      savePlant,
      deletePlant
    }}>
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

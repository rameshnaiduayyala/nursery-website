import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedCategories from './components/FeaturedCategories';
import PlantCatalog from './components/PlantCatalog';
import ProjectShowcase from './components/ProjectShowcase';
import NurseryExperience from './components/NurseryExperience';
import ExportSupply from './components/ExportSupply';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import BulkQuoteModal from './components/BulkQuoteModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initialize Lenis Smooth Scroll (Awwwards Style)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenQuote = () => {
    setModalOpen(true);
  };

  const handleSelectPlant = (plantName, categoryName) => {
    setSelectedPlant(plantName);
    setSelectedCategory(categoryName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-forest-black text-warm-ivory antialiased selection:bg-luxury-gold selection:text-forest-black">
      {/* Custom trailing interactive cursor */}
      <CustomCursor />

      {/* Floating Header */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Luxury Sections */}
      <main>
        {/* Carousel Hero with Stagger Reveal headlines */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* Showcase Panels Services */}
        <Services />

        {/* Editorial Story Section */}
        <About />

        {/* Interactive Standards timeline */}
        <WhyChooseUs />

        {/* Categorized Specimen Grids */}
        <FeaturedCategories />

        {/* Botanical Plant Directory Catalog */}
        <PlantCatalog onSelectPlant={handleSelectPlant} />

        {/* Before/After Landscape drag slider */}
        <ProjectShowcase />

        {/* Cinematic Operations parallax */}
        <NurseryExperience />

        {/* Vector cargo route interactive map */}
        <ExportSupply />

        {/* Endorsements review list */}
        <Testimonials />

        {/* Staggered text CTA banner */}
        <ContactCTA onOpenQuote={handleOpenQuote} onOpenVisit={handleOpenQuote} />
      </main>

      {/* Minimalist index & location Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Quote Inquiry Wizard Modal */}
      <BulkQuoteModal 
        isOpen={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setSelectedPlant(null);
          setSelectedCategory(null);
        }} 
        preselectedPlant={selectedPlant}
        preselectedCategory={selectedCategory}
      />
    </div>
  );
}

export default App;

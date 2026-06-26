import React, { useState, useEffect, lazy, Suspense } from 'react';
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
import ShowcaseDetailModal from './components/ShowcaseDetailModal';

const InvoiceApp = lazy(() => import('./billing/InvoiceGenerator'));
const LogisticsCalculator = lazy(() => import('./logistics/LogisticsCalculator'));
const BillingPasswordGate = lazy(() => import('./billing/BillingPasswordGate'));

function App() {
  const [isBillingAuthenticated, setIsBillingAuthenticated] = useState(() => {
    return sessionStorage.getItem("billing_auth") === "true";
  });

  // Direct subpath routing for billing portal
  const isBilling = window.location.pathname === '/billing' || window.location.pathname.startsWith('/billing');
  const isLogistics = window.location.pathname === '/logistics' || window.location.pathname.startsWith('/logistics');

  if (isBilling) {
    if (!isBillingAuthenticated) {
      return (
        <Suspense fallback={
          <div className="min-h-screen bg-forest-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-luxury-gold"></div>
          </div>
        }>
          <BillingPasswordGate onSuccess={() => setIsBillingAuthenticated(true)} />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={
        <div className="min-h-screen bg-forest-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-luxury-gold"></div>
        </div>
      }>
        <InvoiceApp onLock={() => {
          sessionStorage.removeItem("billing_auth");
          setIsBillingAuthenticated(false);
        }} />
      </Suspense>
    );
  }

  if (isLogistics) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-forest-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-luxury-gold"></div>
        </div>
      }>
        <LogisticsCalculator onOpenQuote={(logisticsData) => handleOpenQuoteWithLogistics(logisticsData)} />
      </Suspense>
    );
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedLogistics, setSelectedLogistics] = useState(null);

  // Showcase Detail Viewer state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailItem, setActiveDetailItem] = useState(null);
  const [activeDetailType, setActiveDetailType] = useState(null); // 'plant' or 'project'

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

  const handleOpenQuoteWithLogistics = (logisticsData) => {
    setSelectedLogistics(logisticsData);
    setModalOpen(true);
  };

  const handleSelectPlant = (plantName, categoryName) => {
    setSelectedPlant(plantName);
    setSelectedCategory(categoryName);
    setModalOpen(true);
  };

  const handleSelectProject = (projectName) => {
    setSelectedProject(projectName);
    setModalOpen(true);
  };

  const handleOpenDetail = (item, type) => {
    setActiveDetailItem(item);
    setActiveDetailType(type);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setActiveDetailItem(null);
    setActiveDetailType(null);
  };

  const handleInquireFromDetail = (item, type) => {
    setDetailModalOpen(false);
    if (type === 'plant') {
      handleSelectPlant(item.name, item.category);
    } else {
      handleSelectProject(item.title);
    }
  };

  return (
    <div className="min-h-screen bg-forest-black text-warm-ivory antialiased selection:bg-luxury-gold selection:text-forest-black">
      {/* Custom trailing interactive cursor */}
      <CustomCursor />

      {/* Floating Header */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Luxury Sections */}
      <main>
        {/* 1. Carousel Hero with Stagger Reveal headlines */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* 2. Editorial Story Section (About) */}
        <About />

        {/* 3. Botanical Plant Directory Catalog */}
        <PlantCatalog
          onSelectPlant={handleSelectPlant}
          onViewDetails={(plant) => handleOpenDetail(plant, 'plant')}
        />

        {/* 4. Showcase Panels Services */}
        <Services />

        {/* 5. Categorized Specimen Grids */}
        <FeaturedCategories />

        {/* 6. Before/After Landscape drag slider & Portfolios (ProjectShowcase) */}
        <ProjectShowcase
          onSelectProject={handleSelectProject}
          onViewDetails={(project) => handleOpenDetail(project, 'project')}
        />

        {/* 7. Cinematic Operations parallax (Nursery Experience) */}
        <NurseryExperience />

        {/* 8. Vector cargo route interactive map */}
        <ExportSupply />

        {/* 9. Interactive Standards timeline (Why Choose Us) */}
        <WhyChooseUs />

        {/* 10. Endorsements review list */}
        <Testimonials />

        {/* 11. Staggered text CTA banner */}
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
          setSelectedProject(null);
          setSelectedLogistics(null);
        }}
        preselectedPlant={selectedPlant}
        preselectedCategory={selectedCategory}
        preselectedProject={selectedProject}
        preselectedLogistics={selectedLogistics}
      />

      {/* Detailed Presentation Lightbox Modal */}
      <ShowcaseDetailModal
        isOpen={detailModalOpen}
        onClose={handleCloseDetail}
        item={activeDetailItem}
        type={activeDetailType}
        onInquire={handleInquireFromDetail}
      />
    </div>
  );
}

export default App;

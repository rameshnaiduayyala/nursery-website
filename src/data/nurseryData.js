// Gangadhara Nursery & Exports - Centralized Dynamic Content Config
// Update images and description text here daily to reflect on the website instantly.

import landscapeAfter from '../assets/landscape_after.png';
import nurseryAerial from '../assets/nursery_aerial.png';

// 1. Hero Slideshow Database
export const heroSlides = [
  {
    label: 'India’s Premium Landscaping Partner',
    lines: ['GROWING NATURE.', 'SHAPING LANDSCAPES.', 'EXPORTING EXCELLENCE.'],
    subheadline: 'Premium nursery plants for farmers, landscapers, resorts, developers, infrastructure projects, and export markets.',
    image: landscapeAfter,
  },
  {
    label: 'Propagation Fields & Automated Glasshouses',
    lines: ['MASSIVE CAPACITY.', 'UNCOMPROMISING CARE.', 'BOTANICAL SCALE.'],
    subheadline: 'Over 50 acres of dedicated botanical cultivation zones and automated greenhouse tunnels for infrastructure project supply.',
    image: nurseryAerial,
  },
  {
    label: 'Global Phytosanitary Certified Exports',
    lines: ['SIGNATURE FLORA.', 'EXCLUSIVE PALMS.', 'GLOBAL LOGISTICS.'],
    subheadline: 'Phytosanitary certified soil-less plants packaged professionally in double-net coco wraps and shipped worldwide.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
  },
];

// 2. Featured Plant Categories Database
export const plantCategories = [
  {
    id: 1,
    name: 'Avenue Trees',
    description: 'Stately roadside shade trees and boundary boundary species.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop',
    group: 'outdoor',
    count: '45 Varieties',
  },
  {
    id: 2,
    name: 'Flowering Plants',
    description: 'Vibrant perennial and seasonal blooms for landscape color.',
    image: 'https://images.unsplash.com/photo-1469251189132-cf14b8c567ed?q=80&w=600&auto=format&fit=crop',
    group: 'outdoor',
    count: '120 Varieties',
  },
  {
    id: 3,
    name: 'Fruit Plants',
    description: 'High-yielding commercial agricultural and hybrid fruit trees.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop',
    group: 'commercial',
    count: '80 Varieties',
  },
  {
    id: 4,
    name: 'Palm Trees',
    description: 'Luxury exotic palms for resorts, villas, and avenues.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    group: 'outdoor',
    count: '35 Varieties',
  },
  {
    id: 5,
    name: 'Ornamental Plants',
    description: 'Decorative foliage and structural plants for manicured designs.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop',
    group: 'indoor',
    count: '95 Varieties',
  },
  {
    id: 6,
    name: 'Indoor Plants',
    description: 'Air-purifying shade-loving greens for offices and residential lobbies.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop',
    group: 'indoor',
    count: '60 Varieties',
  },
  {
    id: 7,
    name: 'Landscape Shrubs',
    description: 'Hardy dwarf hedges and privacy screening borders.',
    image: 'https://images.unsplash.com/photo-1558905619-17154973372c?q=80&w=600&auto=format&fit=crop',
    group: 'outdoor',
    count: '70 Varieties',
  },
  {
    id: 8,
    name: 'Medicinal Plants',
    description: 'Traditional herbs and wellness species for botanical gardens.',
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=600&auto=format&fit=crop',
    group: 'commercial',
    count: '50 Varieties',
  },
];

// 3. Completed Landscaping Projects Database (Milestones)
export const projectMilestones = [
  {
    title: 'Grand Orchid Resort',
    category: 'Resorts & Hotels',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
    size: 'col-span-1 lg:col-span-2 h-[320px]',
  },
  {
    title: 'Vedic Farms & Orchards',
    category: 'Farmhouses',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    size: 'col-span-1 h-[320px]',
  },
  {
    title: 'Palm Boulevard Highway',
    category: 'Highways & Infrastructure',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop',
    size: 'col-span-1 h-[320px]',
  },
  {
    title: 'TechHub Green Plaza',
    category: 'Corporate Parks',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    size: 'col-span-1 lg:col-span-2 h-[320px]',
  },
];

// 4. Testimonials Database
export const testimonialsData = [
  {
    name: 'Ramesh Patel',
    role: 'Commercial Agro Farmer',
    location: 'Andhra Pradesh, India',
    quote: 'We ordered over 15,000 hybrid mango and guava tissue culture plants. The survival rate exceeded 98%, far better than our local nurseries. The soil advice from their horticultural team was invaluable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    name: 'Sarah Al-Mansoori',
    role: 'VP Development, Oasis Resorts',
    location: 'Dubai, UAE',
    quote: 'Importing palm trees and ornamental plants to the UAE requires complex quarantine filings and soil-less roots. Gangadhara Nursery managed the entire phytosanitary process and delivered pristine specimens.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Chief Landscape Architect',
    location: 'Horizon Greens, Bengaluru',
    quote: 'Their project supply capability is unmatched. They delivered uniform, healthy avenue trees and landscape hedges for our township projects exactly on our tight scheduling slots.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
  },
  {
    name: 'Priya Nair',
    role: 'Owner, Bloom Garden Retailers',
    location: 'Mumbai, India',
    quote: 'Direct nursery pricing and robust wooden crate packaging have made Gangadhara our sole wholesale supplier. Our retail garden center customers love the lush condition of the indoor and flowering plants.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  },
];

// 5. Horticultural Process Workflow Database
import { Leaf, Users, Truck, ShieldCheck } from 'lucide-react';
export const horticulturalSteps = [
  {
    num: '01',
    title: 'Precision Propagation',
    subtitle: 'Seedlings & Tissue Culture',
    desc: 'Expert care begins in our tissue culture labs and modern greenhouses, where optimal moisture and root train trays prepare healthy seedlings.',
    icon: Leaf,
  },
  {
    num: '02',
    title: 'Horticulture Training',
    subtitle: 'Nurturing & Quality Control',
    desc: 'Experienced horticultural workers supervise plant growth, executing systematic trimming, root training, and micro-nutrient enrichments.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Packaging & Loading',
    subtitle: 'Protected Transit Crates',
    desc: 'Root-balls are wrapped in organic coco-husks and secured inside shipping frames, maintaining moisture and preventing shift shocks.',
    icon: Truck,
  },
  {
    num: '04',
    title: 'Site Integration',
    subtitle: 'Landscaping Masterpieces',
    desc: 'Our logistics arrive synchronized with landscaping crews, who place and secure specimens to build immediate green canopies.',
    icon: ShieldCheck,
  },
];

// 6. Specific Botanical Plants Database (Your Actual Nursery Inventory)
export const plantsCollection = [
  {
    id: 1,
    name: 'Alphonso Mango',
    botanical: 'Mangifera indica',
    category: 'Fruit Plants',
    height: '3 - 5 Feet',
    container: '10 Liter Bag',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Royal Poinciana (Gulmohar)',
    botanical: 'Delonix regia',
    category: 'Avenue Trees',
    height: '8 - 12 Feet',
    container: 'Root-Balled Crate',
    availability: 'Bulk Only',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Foxtail Palm',
    botanical: 'Wodyetia bifurcata',
    category: 'Palm Trees',
    height: '10 - 15 Feet',
    container: 'Root-Balled Frame',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Bougainvillea (Spectabilis)',
    botanical: 'Bougainvillea spectabilis',
    category: 'Flowering Plants',
    height: '1.5 - 3 Feet',
    container: '3 Liter Bag',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1469251189132-cf14b8c567ed?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Bismarck Palm',
    botanical: 'Bismarckia nobilis',
    category: 'Palm Trees',
    height: '6 - 8 Feet',
    container: 'Large Root-Ball',
    availability: 'Bulk Only',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Areca Palm',
    botanical: 'Dypsis lutescens',
    category: 'Indoor Plants',
    height: '4 - 6 Feet',
    container: '7 Liter Pot',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Fiddle Leaf Fig',
    botanical: 'Ficus lyrata',
    category: 'Indoor Plants',
    height: '5 - 7 Feet',
    container: '15 Liter Pot',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Banganapalli Mango',
    botanical: 'Mangifera indica',
    category: 'Fruit Plants',
    height: '4 - 6 Feet',
    container: '15 Liter Bag',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&auto=format&fit=crop',
  },
];

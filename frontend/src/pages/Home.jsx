import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Lock, Building2, Users, LayoutGrid, Zap, Verified, 
  BookOpen, FileText, Smartphone, FlaskConical, PenTool, ChevronRight, 
  SlidersHorizontal, ChevronDown, Loader2, RefreshCw, PlusSquare, ArrowRight
} from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { CATEGORIES } from '../constants';
import api from '../services/api';
import { HBeam, VBeam } from '../components/common/Beams';

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';
  const [registeredCount, setRegisteredCount] = useState('1K+');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    condition: '',
    sort: 'newest',
    priceMin: '',
    priceMax: '',
    campus: '',
    freeOnly: false,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setRegisteredCount(data.registeredStudents + "+");
      } catch (err) {
        setRegisteredCount('1K+');
      }
    };
    fetchStats();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.priceMin !== '') params.min_price = filters.priceMin;
      if (filters.priceMax !== '') params.max_price = filters.priceMax;
      if (searchQuery) params.search = searchQuery;

      const { data } = await api.get('/products/', { params });
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters.category, filters.priceMin, filters.priceMax]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (filters.condition) result = result.filter((p) => p.description?.includes(`[Condition: ${filters.condition}]`));
    if (filters.campus) result = result.filter((p) => p.seller_college === filters.campus);
    if (filters.freeOnly) result = result.filter((p) => p.price === 0);

    switch (filters.sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'oldest': result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break;
      case 'newest':
      default: result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return result;
  }, [filters, products]);

  const clearFilters = () => setFilters({ category: '', condition: '', sort: 'newest', priceMin: '', priceMax: '', campus: '', freeOnly: false });

  return (
    <div className="font-body-base text-body-base flex flex-col relative overflow-hidden">
      
      {/* Hero Section */}
      <header className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-20 flex flex-col items-center justify-center text-center overflow-visible">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div 
          className="absolute inset-0 -z-10 opacity-70 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at center, #4f46e5 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
            backgroundPosition: 'center center',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
          }}
        ></div>
        
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-80" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}>
          <HBeam y={-128} x={-384} width={256} reverse={false} duration={3} delay={0} />
          <HBeam y={-64} x={0} width={320} reverse={true} duration={4} delay={1.5} />
          <HBeam y={32} x={-256} width={224} reverse={false} duration={2.5} delay={0.5} />
          <HBeam y={96} x={64} width={256} reverse={true} duration={3.5} delay={2} />
          <HBeam y={160} x={-128} width={384} reverse={false} duration={4.5} delay={1} />
          <HBeam y={-192} x={-192} width={256} reverse={true} duration={3} delay={2.5} />
          <HBeam y={128} x={-320} width={192} reverse={true} duration={2.5} delay={0.2} />

          <VBeam x={-160} y={-256} height={256} reverse={false} duration={3.5} delay={1} />
          <VBeam x={-32} y={-128} height={320} reverse={true} duration={4} delay={0} />
          <VBeam x={96} y={-320} height={192} reverse={false} duration={2.5} delay={2} />
          <VBeam x={224} y={-64} height={256} reverse={true} duration={3} delay={0.5} />
          <VBeam x={-288} y={-192} height={384} reverse={false} duration={4.5} delay={1.5} />
          <VBeam x={160} y={32} height={256} reverse={false} duration={2.8} delay={1.2} />
        </div>
        
        <div className="space-y-4 md:space-y-8 flex flex-col items-center max-w-3xl z-10 px-2 lg:px-0 mt-8 md:mt-0">
          <h1 className="text-[#6366f1] font-display-hero text-[3.5rem] leading-[1] sm:text-6xl md:text-8xl lg:text-[100px] tracking-tighter font-extrabold mb-1 md:mb-4 uppercase drop-shadow-sm">
            UNIMART
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-secondary animate-fade-in-up delay-100 max-w-2xl leading-[1.2] px-2 text-center">
            Buy & Sell with <br className="hidden sm:block" /> <span className="text-primary-container">Campus</span> Students
          </h2>
          
          <p className="text-sm sm:text-base md:font-body-large md:text-body-large text-text-secondary w-full max-w-[300px] sm:max-w-md lg:max-w-lg mx-auto animate-fade-in-up delay-200 px-4">
            The premium marketplace designed exclusively for university students. <br className="hidden md:block" />Trade textbooks, electronics, and essentials — safely and privately.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 pt-2 md:pt-4 animate-fade-in-up delay-300 w-full sm:w-auto px-6 sm:px-0">
            <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="w-full sm:w-auto bg-primary-container text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-button-text text-sm sm:text-base flex justify-center items-center gap-2 hover:bg-primary transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Browse Marketplace
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => navigate('/sell')}
              className="w-full sm:w-auto bg-surface-white/80 backdrop-blur-md border border-border-standard text-text-primary px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-button-text text-sm sm:text-base flex justify-center items-center gap-2 hover:bg-surface-soft transition-all shadow-sm bento-hover"
            >
              <PlusSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary-container" />
              Sell an Item
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-2 sm:pt-6 text-[11px] sm:text-sm text-text-secondary font-medium animate-fade-in-up delay-400">
            <div className="flex items-center gap-1 sm:gap-2">
              <ShieldCheck className="text-primary-container w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
              Verified Students
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Lock className="text-primary-container w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
              Secure Transactions
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Building2 className="text-primary-container w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
              Campus Only
            </div>
          </div>
        </div>
      </header>

      {/* Trust Stats Section */}
      <section className="w-full max-w-7xl mx-auto px-2 md:px-8 py-4 md:py-12">
        <div className="bg-surface-white rounded-xl md:rounded-[24px] border border-border-standard p-2 md:p-8 bento-shadow flex flex-nowrap w-full justify-between items-center gap-0.5 md:gap-8 divide-x divide-border-standard overflow-hidden shadow-sm">
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 px-1 md:px-4 animate-fade-in-up delay-100 flex-1 justify-center md:justify-start overflow-hidden">
            <div className="w-5 h-5 md:w-12 md:h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
              <Users className="w-2.5 h-2.5 md:w-6 md:h-6" />
            </div>
            <div className="text-center md:text-left max-w-full">
              <div className="font-bold text-[10px] md:font-headline-card md:text-lg text-text-primary leading-tight truncate">{registeredCount}</div>
              <div className="text-[7px] md:text-sm text-text-secondary leading-tight truncate">Students</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 px-1 md:px-4 animate-fade-in-up delay-200 flex-1 justify-center md:justify-start overflow-hidden">
            <div className="w-5 h-5 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <LayoutGrid className="w-2.5 h-2.5 md:w-6 md:h-6" />
            </div>
            <div className="text-center md:text-left max-w-full">
              <div className="font-bold text-[10px] md:font-headline-card md:text-lg text-text-primary leading-tight truncate">{CATEGORIES.length}</div>
              <div className="text-[7px] md:text-sm text-text-secondary leading-tight truncate">Categories</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 px-1 md:px-4 animate-fade-in-up delay-300 flex-1 justify-center md:justify-start overflow-hidden">
            <div className="w-5 h-5 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <Zap className="w-2.5 h-2.5 md:w-6 md:h-6" />
            </div>
            <div className="text-center md:text-left max-w-full">
              <div className="font-bold text-[10px] md:font-headline-card md:text-lg text-text-primary leading-tight truncate">24h</div>
              <div className="text-[7px] md:text-sm text-text-secondary leading-tight truncate">Quick Deals</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 px-1 md:px-4 animate-fade-in-up delay-400 flex-1 justify-center md:justify-start overflow-hidden">
            <div className="w-5 h-5 md:w-12 md:h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Verified className="w-2.5 h-2.5 md:w-6 md:h-6" />
            </div>
            <div className="text-center md:text-left max-w-full">
              <div className="font-bold text-[10px] md:font-headline-card md:text-lg text-text-primary leading-tight truncate">Verified</div>
              <div className="text-[7px] md:text-sm text-text-secondary leading-tight truncate">Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-2.5 md:gap-4 min-w-max pb-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.name.includes("Text") || cat.name.includes("Book") ? BookOpen :
                         cat.name.includes("Note") ? FileText :
                         cat.name.includes("Electro") ? Smartphone :
                         cat.name.includes("Lab") ? FlaskConical : PenTool;

            const isActive = filters.category === cat.id;

            return (
              <button 
                key={cat.id}
                onClick={() => setFilters({ ...filters, category: isActive ? '' : cat.id })}
                className={`border px-4 py-2 md:px-5 md:py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-sm hover:-translate-y-0.5 ${isActive ? 'bg-primary-container text-white border-transparent' : 'bg-surface-white border-border-standard text-text-secondary hover:bg-surface-soft'}`}
              >
                <Icon className={isActive ? "text-white w-3.5 h-3.5 md:w-4 md:h-4" : "text-text-secondary w-3.5 h-3.5 md:w-4 md:h-4"} />
                <span className="font-medium text-xs md:text-sm">{cat.name}</span>
                {isActive && <span className="ml-1 flex items-center justify-center w-4 h-4 rounded-full bg-white/25 text-white text-[10px] font-bold">✕</span>}
              </button>
            )
          })}
        </div>
      </section>

      {/* Latest Listings */}
      <section className="w-full max-w-7xl mx-auto px-2 md:px-8 py-4 md:py-12">
        <div className="flex justify-between items-center mb-4 md:mb-8 gap-2">
          <h2 className="font-headline-section text-lg md:text-[32px] text-text-primary tracking-tight">
             {searchQuery ? `Results for "${searchQuery}"` : 'Latest Listings'}
          </h2>
          <div className="flex gap-1.5 md:gap-4 shrink-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex justify-center items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 border border-border-standard rounded-md md:rounded-xl text-[10px] md:text-sm font-medium hover:bg-surface-soft transition-colors ${showFilters ? 'bg-surface-soft text-primary-container' : 'bg-surface-white'}`}
            >
              <SlidersHorizontal className="w-3 h-3 md:w-4 md:h-4" />
              Filters
            </button>
            <select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="flex justify-center items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 border border-border-standard rounded-md md:rounded-xl bg-surface-white text-[10px] md:text-sm font-medium cursor-pointer outline-none hover:bg-surface-soft"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 scale-in origin-top">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClear={clearFilters}
              totalResults={filteredProducts.length}
            />
          </div>
        )}

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 flex items-center gap-2 text-sm text-primary-container mx-auto"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>
    </div>
  );
}

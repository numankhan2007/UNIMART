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
    <div className="flex flex-col relative overflow-hidden">
      
      {/* ═══ HERO BENTO SECTION ═══ */}
      <header className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        {/* Hero Bento Grid */}
        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
          
          {/* Main Hero Cell */}
          <div className="bento-cell bento-cell-accent col-span-12 lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-10 sm:py-14 px-6 sm:px-10 hover:!transform-none bento-animate">
            <h1 className="text-indigo-600 dark:text-indigo-400 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-extrabold mb-3 uppercase" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              UNIMART
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 max-w-xl leading-[1.2]">
              Buy & Sell with <span className="gradient-text">Campus</span> Students
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 mt-3">
              The premium marketplace designed exclusively for university students. Trade textbooks, electronics, and essentials — safely and privately.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
              <button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})} className="btn-primary !rounded-xl text-sm sm:text-base !py-2.5 !px-6">
                Browse Marketplace
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={() => navigate('/sell')}
                className="btn-secondary !rounded-xl text-sm sm:text-base !py-2.5 !px-6"
              >
                <PlusSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                Sell an Item
              </button>
            </div>
          </div>

          {/* Trust stat mini bento cells */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: Users, value: registeredCount, label: 'Students', color: '#6366f1', bg: '#eef2ff' },
              { icon: LayoutGrid, value: CATEGORIES.length, label: 'Categories', color: '#3b82f6', bg: '#eff6ff' },
              { icon: Zap, value: '24h', label: 'Quick Deals', color: '#10b981', bg: '#ecfdf5' },
              { icon: Verified, value: 'Verified', label: 'Students', color: '#8b5cf6', bg: '#f5f3ff' },
            ].map((stat, i) => (
              <div key={stat.label + i} className="bento-cell flex flex-col items-center justify-center text-center py-5 bento-animate" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 bento-animate" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: ShieldCheck, label: 'Verified Students' },
            { icon: Lock, label: 'Secure Transactions' },
            { icon: Building2, label: 'Campus Only' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
              {badge.label}
            </div>
          ))}
        </div>
      </header>

      {/* ═══ CATEGORIES BENTO CHIPS ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-2.5 md:gap-3 min-w-max pb-2">
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
                className={`bento-chip ${isActive ? 'active' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-white' : ''}`} />
                <span>{cat.name}</span>
                {isActive && <span className="ml-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-white/25 text-white text-[10px] font-bold">✕</span>}
              </button>
            )
          })}
        </div>
      </section>

      {/* ═══ LISTINGS BENTO SECTION ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex justify-between items-center mb-6 md:mb-8 gap-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
             {searchQuery ? `Results for "${searchQuery}"` : 'Latest Listings'}
          </h2>
          <div className="flex gap-2 md:gap-3 shrink-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`bento-chip ${showFilters ? 'active' : ''} !rounded-xl`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="bento-chip !rounded-xl cursor-pointer appearance-none !pr-8 text-xs md:text-sm"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23999\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
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

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 flex items-center gap-2 text-sm text-indigo-500 mx-auto"
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

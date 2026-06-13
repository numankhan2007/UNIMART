import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap, BadgeCheck, Users, Loader2, RefreshCw } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { CATEGORIES } from '../constants';
import api from '../services/api';

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [registeredCount, setRegisteredCount] = useState('...');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FIXED: Declare filters state BEFORE using it in useEffect
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    condition: '',
    sort: 'newest',
    priceMin: '',
    priceMax: '',
    campus: '',
    freeOnly: false,
  });

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setRegisteredCount(data.registeredStudents + "+");
      } catch (err) {
        console.error("Failed to fetch stats", err);
        setRegisteredCount('1,250+');
      }
    };
    fetchStats();
  }, []);

  // Fetch products with filters from API
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

    // Condition (from description) — client-side only
    if (filters.condition) {
      result = result.filter((p) => p.description?.includes(`[Condition: ${filters.condition}]`));
    }

    // Campus — client-side only
    if (filters.campus) {
      result = result.filter((p) => p.seller_college === filters.campus);
    }

    // Free Only
    if (filters.freeOnly) {
      result = result.filter((p) => p.price === 0);
    }

    // Sort
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [filters, products]);

  const clearFilters = () => {
    setFilters({ category: '', condition: '', sort: 'newest', priceMin: '', priceMax: '', campus: '', freeOnly: false });
  };

  const stats = [
    { icon: Users, label: 'Registered Students', value: registeredCount, color: 'indigo' },
    { icon: TrendingUp, label: 'Categories', value: CATEGORIES.length, color: 'purple' },
    { icon: Zap, label: 'Quick Deals', value: '24h', color: 'pink' },
    { icon: BadgeCheck, label: 'Students', value: 'Verified', color: 'emerald' },
  ];

  return (
    <div>
      {/* Premium Minimalist Hero Section */}
      <section className="relative overflow-hidden bg-[#FAFBFC] dark:bg-[#0A0A0F] pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle blur orbs for depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="section-padding relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-primary-600 dark:text-primary-400 mb-8 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              Your Campus Marketplace
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.15] tracking-tight">
              Buy & Sell with{' '}
              <span className="gradient-text">
                Campus Students
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed">
              The premium marketplace designed exclusively for university students. Trade textbooks, electronics, and essentials — safely and privately.
            </p>
          </div>

          {/* Floating Glass Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="glass-card p-5 sm:p-6 text-center group"
                style={{ animation: `slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both` }}
              >
                <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 
                  bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                  <stat.icon size={22} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Quick Access */}
      <section className="section-padding py-8 -mt-6 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: filters.category === cat.id ? '' : cat.id })}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all border shadow-sm
                ${filters.category === cat.id
                  ? 'gradient-bg text-white border-transparent shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-md'
                }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
              {filters.category === cat.id && (
                <span className="ml-1 flex items-center justify-center w-4 h-4 rounded-full bg-white/25 text-white text-xs font-bold leading-none">✕</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery ? `Results for "${searchQuery}"` : 'Latest Listings'}
          </h2>
          {error && (
            <button
              onClick={fetchProducts}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          )}
        </div>

        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
          onClear={clearFilters}
          totalResults={filteredProducts.length}
        />

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">{error}</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>
    </div>
  );
}

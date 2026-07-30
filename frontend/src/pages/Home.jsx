import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Lock, Building2, Users, LayoutGrid, Zap, Verified, 
  BookOpen, FileText, Smartphone, FlaskConical, PenTool, ChevronRight, 
  SlidersHorizontal, ChevronDown, Loader2, RefreshCw, PlusSquare, ArrowRight,
  Search, X, CheckCircle2, KeyRound, Database, Sparkles
} from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import VerifiedSeal from '../components/common/VerifiedSeal';
import { CATEGORIES } from '../constants';
import api from '../services/api';

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';
  const [heroSearchInput, setHeroSearchInput] = useState(searchQuery);
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
    setHeroSearchInput(searchQuery);
  }, [searchQuery]);

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

  const handleHeroSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (heroSearchInput.trim()) {
      params.set('search', heroSearchInput.trim());
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() });
  };

  const handleSuggestionClick = (suggestion) => {
    setHeroSearchInput(suggestion);
    const params = new URLSearchParams(searchParams);
    params.set('search', suggestion);
    navigate({ search: params.toString() });
  };

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
    <div className="flex flex-col relative overflow-hidden bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-300">
      
      {/* ═══ 1. HERO SECTION (Search-Focused) ═══ */}
      <header className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>
          
          {/* Main Hero Cell */}
          <div className="card col-span-12 lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-10 sm:py-14 px-6 sm:px-10 bento-animate">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-border)]">
              <ShieldCheck size={14} />
              <span>Institutional Campus Trust</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] max-w-2xl leading-[1.15]">
              Buy & Sell with Verified <span className="text-[var(--color-primary)]">Campus Peers</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[var(--color-ink-soft)] max-w-lg mx-auto lg:mx-0 mt-4 leading-relaxed">
              The premier marketplace designed exclusively for university students. Trade textbooks, lab equipment, and tech — safely and directly on campus.
            </p>
            
            {/* Hero Interactive Search Bar */}
            <form onSubmit={handleHeroSearch} className="w-full max-w-lg mt-6 relative flex items-center">
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Search textbooks, iPads, lab coats, calculators..."
                className="input-field !pr-28 !py-3.5 !rounded-[var(--radius-lg)] text-sm shadow-soft-sm hover:shadow-soft-md transition-all w-full"
              />
              <button
                type="submit"
                className="btn-primary !absolute right-1.5 top-1.5 bottom-1.5 !px-5 !py-2 !rounded-[var(--radius-md)] text-xs font-semibold flex items-center gap-1"
              >
                <Search size={14} />
                <span>Search</span>
              </button>
            </form>

            {/* Popular Search Suggestions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-[var(--color-ink-soft)]">
              <span className="font-medium text-[var(--color-ink)]">Popular:</span>
              {['Textbook', 'Calculator', 'Lab Coat', 'iPad', 'Headphones'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSuggestionClick(term)}
                  className="px-2.5 py-1 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trust stat mini cells */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: Users, value: registeredCount, label: 'Verified Students', color: 'var(--color-primary)', bg: 'var(--color-primary-soft)' },
              { icon: LayoutGrid, value: CATEGORIES.length, label: 'Categories', color: 'var(--color-verified)', bg: 'var(--color-verified-soft)' },
              { icon: Zap, value: '24h', label: 'Quick Deals', color: 'var(--color-success)', bg: '#EAF0E7' },
              { icon: ShieldCheck, value: '100%', label: 'OTP Protected', color: 'var(--color-ink)', bg: 'var(--color-surface-soft)' },
            ].map((stat, i) => (
              <div key={stat.label + i} className="card flex flex-col items-center justify-center text-center p-5 bento-animate" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                <div className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center mb-2.5 shadow-soft-sm" style={{ backgroundColor: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="font-display font-bold text-lg text-[var(--color-ink)]">{stat.value}</div>
                <div className="text-xs text-[var(--color-ink-soft)] font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges banner */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 bento-animate" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: ShieldCheck, label: 'Verified University Students Only' },
            { icon: Lock, label: 'Physical OTP Handshake Security' },
            { icon: Building2, label: 'Campus-Restricted Trading' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft-sm text-xs sm:text-sm text-[var(--color-ink-soft)] font-semibold">
              <badge.icon className="w-4 h-4 text-[var(--color-primary)]" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ═══ 2. CATEGORIES SECTION ═══ */}
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
                className={`bento-chip !rounded-full ${isActive ? 'active' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-white' : ''}`} />
                <span>{cat.name}</span>
                {isActive && (
                  <span className="ml-1 flex items-center justify-center w-4 h-4 rounded-full bg-white/25 text-white">
                    <X size={11} strokeWidth={3} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* ═══ 3. FEATURED LISTINGS SECTION ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex justify-between items-center mb-6 md:mb-8 gap-2">
          <div>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-ink)] tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : 'Latest Campus Listings'}
            </h2>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1 hidden sm:block">
              All items are offered by verified students on your campus.
            </p>
          </div>
          <div className="flex gap-2 md:gap-3 shrink-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`bento-chip ${showFilters ? 'active' : ''} !rounded-[var(--radius-md)]`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="bento-chip !rounded-[var(--radius-md)] cursor-pointer appearance-none !pr-8 text-xs md:text-sm bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23957F7A\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
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
              <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-ink-soft)]">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] mx-auto hover:underline"
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

      {/* ═══ 4. DEDICATED TRUST & SAFETY SECTION (UX Guideline Requirement) ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 my-6">
        <div className="card !p-8 md:!p-12 !bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft-md rounded-[var(--radius-lg)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-[var(--color-border)]/60">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-verified-soft)] border border-[var(--color-verified)] text-[var(--color-verified)] text-xs font-semibold mb-3">
                <ShieldCheck size={14} />
                <span>Institutional Trust & Safety</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] tracking-tight">
                Why Students & Faculty Trust UNIMART
              </h2>
              <p className="text-sm md:text-base text-[var(--color-ink-soft)] mt-3 leading-relaxed">
                Unlike unverified public marketplaces, every single user on UNIMART is an authenticated campus peer. Our Soft UI Evolution architecture safeguards both your digital privacy and your physical meetups.
              </p>
            </div>
            <div className="flex items-center justify-center p-6 bg-[var(--color-surface-soft)]/50 border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-soft-sm gap-5 shrink-0">
              <VerifiedSeal size={56} />
              <div>
                <div className="font-display font-bold text-[var(--color-ink)] text-lg">The Verified Seal</div>
                <div className="text-xs text-[var(--color-ink-soft)] max-w-[220px] leading-relaxed">Reserved exclusively for fully cross-referenced student accounts and verified safe items.</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'University Registry Check',
                desc: 'No external actors or spam accounts. Student IDs and college emails are cross-checked against official campus databases before trading is enabled.',
                icon: Database,
                color: 'var(--color-primary)',
                bg: 'var(--color-primary-soft)',
              },
              {
                title: 'Physical OTP Handshake',
                desc: 'Zero risk of lost payments or miscommunication. Item handoffs settle only when buyer and seller mutually confirm a secure 4-digit OTP during physical delivery.',
                icon: KeyRound,
                color: 'var(--color-success)',
                bg: '#EAF0E7',
              },
              {
                title: 'Closed Campus Hub',
                desc: 'All trading stays within your trusted educational community. Schedule safe meetups at university libraries, dorm foyers, or student union centers.',
                icon: Building2,
                color: 'var(--color-verified)',
                bg: 'var(--color-verified-soft)',
              },
            ].map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={idx} className="p-6 rounded-[var(--radius-md)] bg-[var(--color-canvas)]/50 border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-primary)]/40 hover:shadow-soft-sm transition-all duration-200">
                  <div>
                    <div className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mb-4 shadow-soft-sm" style={{ backgroundColor: feature.bg, color: feature.color }}>
                      <FeatureIcon size={22} />
                    </div>
                    <h3 className="font-display font-bold text-[var(--color-ink)] text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]">
                    <CheckCircle2 size={15} style={{ color: 'var(--color-verified)', fill: 'var(--color-verified-soft)' }} />
                    <span>Standard on all orders</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA SECTION (Become a Seller) ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="card !p-8 md:!p-12 !bg-gradient-to-br !from-[var(--color-surface)] !to-[var(--color-surface-soft)] flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[var(--color-border)] shadow-soft-lg">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              <Sparkles size={15} className="text-[var(--color-verified)]" />
              <span>Turn extra items into cash</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
              Ready to list your textbook or dorm essentials?
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-ink-soft)] mt-3 leading-relaxed">
              It takes less than 60 seconds to snap a picture and list your item. Connect instantly with verified fellow students looking for your gear on campus.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto text-center">
            <button
              onClick={() => navigate('/sell')}
              className="btn-primary !text-base !px-8 !py-4 !rounded-[var(--radius-lg)] shadow-soft-md hover:shadow-soft-lg transition-all w-full sm:w-auto justify-center"
            >
              <span>List Your Item Now</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}


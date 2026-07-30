import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card overflow-hidden animate-pulse !p-0">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-[var(--radius-sm)] w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-[var(--radius-sm)] w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-[var(--radius-sm)] w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center text-[var(--color-ink-soft)]">
          <PackageOpen size={32} />
        </div>
        <h3 className="font-display text-xl font-bold text-[var(--color-ink)] mb-2">No products found</h3>
        <p className="text-sm text-[var(--color-ink-soft)]">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={{ hidden: { opacity: 0, scale: 0.92, y: 16 }, show: { opacity: 1, scale: 1, y: 0 } }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <ProductCard product={product} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}


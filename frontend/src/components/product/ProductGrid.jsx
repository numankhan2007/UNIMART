import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bento-cell overflow-hidden animate-pulse !p-0 hover:!transform-none">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bento-cell text-center py-16 hover:!transform-none">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
        <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-full" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ShieldCheck } from 'lucide-react';
import SoldRibbon from './SoldRibbon';
import { formatPrice } from '../../utils/helpers';

export default function ProductCard({ product, index = 0 }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isSold = product.product_status === 'SOLD_OUT' || product.product_status === 'sold' || product.status === 'sold';
  const isFree = product.price === 0;

  const imageUrl = product.image_urls?.[0] || product.image_url || product.images?.[0] || '/placeholder.svg';
  const sellerLocation = product.seller_college || product.seller?.campus || 'Campus';
  const isVerifiedSeller = product.seller?.verified || product.verified_seller || Math.random() > 0.7;

  return (
    <div className="relative group h-full" style={{ animation: `bentoIn 0.5s ease-out ${index * 0.05}s both` }}>
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-sm
          ${isFavorite 
            ? 'bg-rose-50 border border-rose-100 text-rose-500 opacity-100 transform scale-100' 
            : 'bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700/50 text-slate-400 favorite-btn'
          } hover:bg-white dark:hover:bg-slate-700`}
      >
        <Heart size={16} className={isFavorite ? "fill-current" : ""} />
      </button>

      <Link
        to={isSold ? '#' : `/product/${product.id}`}
        className={`block h-full bento-cell overflow-hidden !p-0 flex flex-col product-card-hover ${isSold ? 'opacity-70 pointer-events-auto cursor-not-allowed' : ''}`}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 aspect-square p-4 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
            className="w-full h-full object-contain product-image"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 via-white/20 to-transparent dark:from-slate-900/60 dark:via-slate-900/20 pointer-events-none" />

          {/* SOLD OUT overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] z-10 flex items-start justify-start p-3">
              <div className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase shadow-md">
                Sold Out
              </div>
            </div>
          )}

          {/* Verified Seller Badge */}
          {isVerifiedSeller && !isSold && (
            <div className="absolute top-3 left-3 z-10 bg-[var(--color-verified-soft)] border border-[var(--color-verified)] shadow-sm-token text-[var(--color-verified)] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={13} style={{ color: 'var(--color-verified)' }} strokeWidth={2.5} />
              <span className="text-[var(--color-ink)] font-semibold">Verified</span>
            </div>
          )}

          {isSold && <SoldRibbon />}

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className={`inline-flex items-center justify-center font-bold font-data text-sm px-3.5 py-1.5 rounded-full shadow-sm-token border
                ${isFree
                  ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20'
                  : 'bg-[var(--color-surface)]/95 text-[var(--color-ink)] border-[var(--color-border)]/50'
              }`}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-grow bg-[var(--color-surface)]">
          <h3 className="font-semibold text-[var(--color-ink)] text-sm line-clamp-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors mb-auto">
            {product.title}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <MapPin size={10} className="text-slate-400" />
            </div>
            <span className="font-medium truncate">{sellerLocation}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

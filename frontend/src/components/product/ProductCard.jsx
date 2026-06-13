import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, BadgeCheck } from 'lucide-react';
import SoldRibbon from './SoldRibbon';
import { formatPrice } from '../../utils/helpers';

export default function ProductCard({ product, index = 0 }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isSold = product.product_status === 'SOLD_OUT' || product.product_status === 'sold' || product.status === 'sold';
  const isFree = product.price === 0;

  // Handle both API format and mock format for images
  const imageUrl = product.image_urls?.[0] || product.image_url || product.images?.[0] || '/placeholder.svg';

  // Handle both API format and mock format for seller info
  const sellerLocation = product.seller_college || product.seller?.campus || 'Campus';
  const isVerifiedSeller = product.seller?.verified || product.verified_seller || Math.random() > 0.7; // Mock verified for UI demo

  return (
    <div className="relative group product-card-hover h-full" style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s both` }}>
      {/* Favorite Button - Absolute positioned outside the link to prevent navigation when clicked */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm
          ${isFavorite 
            ? 'bg-rose-50 border border-rose-100 text-rose-500 opacity-100 transform scale-100' 
            : 'bg-white/70 border border-white/50 text-gray-400 favorite-btn'
          } hover:bg-white`}
      >
        <Heart size={16} className={isFavorite ? "fill-current" : ""} />
      </button>

      <Link
        to={isSold ? '#' : `/product/${product.id}`}
        className={`block h-full card overflow-hidden flex flex-col ${isSold ? 'opacity-70 pointer-events-auto cursor-not-allowed' : ''}`}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-white aspect-square p-4 flex items-center justify-center border-b border-gray-50 dark:border-gray-800">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
            className="w-full h-full object-contain product-image"
          />

          {/* Frosted glass overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 via-white/20 to-transparent dark:from-gray-900/60 dark:via-gray-900/20 pointer-events-none" />

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
            <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-sm text-primary-600 dark:text-primary-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <BadgeCheck size={12} className="fill-primary-50 text-primary-600 dark:text-primary-400" />
              Verified
            </div>
          )}

          {/* Legacy Sold Ribbon fallback */}
          {isSold && <SoldRibbon />}

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className={`inline-flex items-center justify-center font-bold text-sm px-3.5 py-1.5 rounded-full shadow-sm border backdrop-blur-xl
                ${isFree
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border-gray-200/50 dark:border-gray-700/50'
              }`}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-grow bg-[#FAFBFC] dark:bg-[#0A0A0F]">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-auto">
            {product.title}
          </h3>

          {/* Campus Location */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <MapPin size={10} className="text-gray-400" />
            </div>
            <span className="font-medium truncate">{sellerLocation}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/product/ProductDetails';
import OrderModal from '../components/order/OrderModal';
import { Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product details', err);
        setError(err.response?.status === 404 ? "This product does not exist or has been removed." : "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="section-padding page-padding flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section-padding page-padding text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center text-[var(--color-ink-soft)]">
          <AlertCircle size={32} />
        </div>
        <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-2">Product Not Found</h2>
        <p className="text-sm text-[var(--color-ink-soft)] mb-6">{error || "This product may have been removed or doesn't exist."}</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="section-padding page-padding">
      <ProductDetails
        product={product}
        onOrder={() => setShowOrderModal(true)}
        onBack={() => navigate('/')}
      />
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        product={product}
      />
    </div>
  );
}

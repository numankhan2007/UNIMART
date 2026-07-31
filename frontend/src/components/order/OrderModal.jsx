import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertCircle, CheckCircle, MessageCircle, Shield, Hash } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { formatPrice } from '../../utils/helpers';
import { useOrders } from '../../context/OrderContext';
import { useNotifications } from '../../context/NotificationContext';

export default function OrderModal({ isOpen, onClose, product }) {
  const { createOrder } = useOrders();
  const { success, error } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!product) return null;

  const handleOrder = async () => {
    setLoading(true);
    try {
      const newOrder = await createOrder(product.id);
      setPlacedOrder(newOrder);
      setOrderPlaced(true);
      success(`Order placed for "${product.title}"!`);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to place order. Please try again.';
      error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = () => {
    if (placedOrder) {
      onClose();
      setOrderPlaced(false);
      setPlacedOrder(null);
      navigate(`/chat/${placedOrder.id}`);
    }
  };

  const handleClose = () => {
    setOrderPlaced(false);
    setPlacedOrder(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={orderPlaced ? '' : 'Confirm Order'} size="md">
      <div className="space-y-6">

        {/* ============================================================ */}
        {/* STATE 1: Confirm Order (before placing) */}
        {/* ============================================================ */}
        {!orderPlaced ? (
          <>
            {/* Product Summary */}
            <div className="flex gap-4">
              <img
                src={product.image_urls?.[0] || product.image_url || '/placeholder.svg'}
                alt={product.title}
                className="w-24 h-24 rounded-xl object-contain flex-shrink-0 bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{product.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.seller_college || 'Campus'}</p>
                <p className="text-xl font-bold gradient-text mt-2">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 rounded-xl p-4 space-y-2">
              <h5 className="text-sm font-semibold text-[var(--color-primary)] font-display">What happens next?</h5>
              <ul className="text-xs text-[var(--color-ink-soft)] space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold font-data flex-shrink-0 mt-0.5">1</span>
                  Your order request will be sent to the seller
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold font-data flex-shrink-0 mt-0.5">2</span>
                  A private chat will open to coordinate the meetup
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold font-data flex-shrink-0 mt-0.5">3</span>
                  The seller will initiate a secure OTP handshake at delivery
                </li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start gap-3 p-3 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl">
              <Shield size={16} className="text-[var(--color-success)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-success)]">
                <strong>Privacy Protected:</strong> Your email, phone number, and full name are never shared with the other party. All coordination happens within the app.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="secondary" size="md" fullWidth onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                loading={loading}
                onClick={handleOrder}
                icon={ShoppingCart}
              >
                Confirm Order
              </Button>
            </div>
          </>
        ) : (
          /* ============================================================ */
          /* STATE 2: Success Dashboard (after placing order) */
          /* ============================================================ */
          <div className="space-y-6">
            {/* Success Icon */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mb-4">
                <CheckCircle size={44} className="text-[var(--color-success)]" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Order Placed Successfully!</h3>
            </div>

            {/* Order Details Card */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Hash size={12} /> Order ID
                </span>
                <span className="text-sm font-data font-bold text-[var(--color-primary)]">
                  #ORD-{placedOrder?.id?.toString().slice(-6) || '000001'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Product</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{product.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Price</span>
                <span className="text-sm font-bold font-data gradient-text">{formatPrice(product.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/25 font-medium">
                  Pending Seller Confirmation
                </span>
              </div>
            </div>

            {/* Privacy Banner */}
            <div className="flex items-start gap-3 p-3 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl">
              <Shield size={16} className="text-[var(--color-success)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-success)]">
                <strong>Privacy Protected:</strong> The seller's email, phone, and full name remain hidden. All coordination happens through the in-app chat.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="md"
                fullWidth
                icon={MessageCircle}
                onClick={handleStartChat}
              >
                Start Chat with Seller
              </Button>
              <Button variant="secondary" size="md" fullWidth onClick={handleClose}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
}

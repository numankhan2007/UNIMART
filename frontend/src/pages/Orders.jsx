import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageCircle, KeyRound, Send, Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OrderStatusBadge from '../components/order/OrderStatusBadge';
import OTPModal from '../components/order/OTPModal';
import CancelOrderModal from '../components/order/CancelOrderModal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { formatPrice, formatDate } from '../utils/helpers';
import { ORDER_STATUS } from '../constants';
import orderService from '../services/orderService';
import otpService from '../services/otpService';

function getOrderImage(order) {
  if (order.product_image) {
    try {
      const images = JSON.parse(order.product_image);
      return images[0] || '/placeholder.svg';
    } catch {
      return order.product_image;
    }
  }
  return '/placeholder.svg';
}

export default function Orders() {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [otpModal, setOtpModal] = useState({ open: false, order: null, mode: 'generate' });
  const [cancelModal, setCancelModal] = useState({ open: false, order: null });
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const [buyRes, sellRes] = await Promise.all([
        orderService.getByBuyer(),
        orderService.getBySeller(),
      ]);
      const buyOrders = (buyRes.data || []).map((o) => ({ ...o, _role: 'buyer' }));
      const sellOrders = (sellRes.data || []).map((o) => ({ ...o, _role: 'seller' }));
      const merged = [...buyOrders];
      sellOrders.forEach((so) => {
        if (!merged.find((o) => o.id === so.id)) {
          merged.push(so);
        }
      });
      merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAllOrders(merged);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOtpModalClose = () => {
    setOtpModal({ open: false, order: null, mode: 'generate' });
    fetchOrders();
  };

  const handleCancelModalClose = () => {
    setCancelModal({ open: false, order: null });
  };

  const handleOrderCancelled = () => {
    fetchOrders();
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      setConfirmingOrderId(orderId);
      await orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
      await otpService.generate(orderId);
      await otpService.sendViaEmail(orderId);
      await fetchOrders();
    } catch (err) {
      console.error('Failed to confirm order:', err);
    } finally {
      setConfirmingOrderId(null);
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? allOrders
    : allOrders.filter((o) => o.order_status === statusFilter);

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: ORDER_STATUS.PENDING, label: 'Pending' },
    { value: ORDER_STATUS.CONFIRMED, label: 'Confirmed' },
    { value: ORDER_STATUS.COMPLETED, label: 'Delivered' },
    { value: ORDER_STATUS.CANCELLED, label: 'Cancelled' },
  ];

  return (
    <div className="section-padding page-padding">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>My Orders</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {loading ? '...' : `${allOrders.length} total orders`}
            </p>
          </div>
        </div>

        {/* Status Filter — Bento Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`bento-chip ${statusFilter === option.value ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bento-cell text-center py-16 hover:!transform-none">
            <Package size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">No orders found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              {statusFilter === 'all' ? "You haven't placed or received any orders yet." : "No orders with this status."}
            </p>
            <Link to="/home" className="text-sm text-[var(--color-primary)] hover:underline font-semibold">
              Browse products →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, i) => {
              const isBuyer = order._role === 'buyer';
              return (
                <div key={order.id} className="bento-cell hover:!transform-none bento-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={getOrderImage(order)}
                      alt={order.product_title}
                      className="w-full sm:w-28 h-28 rounded-xl object-contain bg-white dark:bg-slate-800 p-2 border border-[var(--bento-border-soft)] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {order.product_title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            {isBuyer
                              ? `Seller: ${order.seller_username}`
                              : `Buyer: ${order.buyer_username}`}
                            {' · '}{formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge color={isBuyer ? 'info' : 'primary'}>
                            {isBuyer ? 'Buying' : 'Selling'}
                          </Badge>
                          <OrderStatusBadge status={order.order_status} />
                        </div>
                      </div>
                      <p className="text-xl font-bold font-data gradient-text mt-2">
                        {formatPrice(order.product_price)}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {!isBuyer && order.order_status === ORDER_STATUS.PENDING && (
                          <Button variant="success" size="sm" icon={confirmingOrderId === order.id ? Loader2 : CheckCircle2} loading={confirmingOrderId === order.id} onClick={() => handleConfirmOrder(order.id)}>
                            Confirm Order
                          </Button>
                        )}

                        {order.order_status !== ORDER_STATUS.CANCELLED && order.order_status !== ORDER_STATUS.COMPLETED && (
                          <Link to={`/chat/${order.id}`}>
                            <Button variant="secondary" size="sm" icon={MessageCircle}>Chat</Button>
                          </Link>
                        )}

                        {(order.order_status === ORDER_STATUS.PENDING || order.order_status === ORDER_STATUS.CONFIRMED) && (
                          <Button variant="danger" size="sm" icon={XCircle} onClick={() => setCancelModal({ open: true, order })}>
                            Cancel Order
                          </Button>
                        )}

                        {!isBuyer && order.order_status === ORDER_STATUS.CONFIRMED && (
                          <Button variant="primary" size="sm" icon={Send} onClick={() => setOtpModal({ open: true, order, mode: 'generate' })}>
                            Initiate Delivery
                          </Button>
                        )}

                        {!isBuyer && order.order_status === ORDER_STATUS.CONFIRMED && (
                          <Button variant="secondary" size="sm" icon={KeyRound} onClick={() => setOtpModal({ open: true, order, mode: 'verify' })}>
                            Enter OTP
                          </Button>
                        )}

                        {isBuyer && order.order_status === ORDER_STATUS.PENDING && (
                          <span className="text-xs text-[var(--color-warning)] flex items-center gap-1 px-3 py-1.5 font-medium">
                            ⏳ Waiting for seller confirmation
                          </span>
                        )}

                        {isBuyer && order.order_status === ORDER_STATUS.CONFIRMED && (
                          <span className="text-xs text-[var(--color-primary)] flex items-center gap-1 px-3 py-1.5 font-medium">
                            📧 Waiting for seller to initiate delivery
                          </span>
                        )}

                        {order.order_status === ORDER_STATUS.COMPLETED && (
                          <span className="text-xs text-[var(--color-success)] flex items-center gap-1 px-3 py-1.5 font-medium">
                            ✅ Delivered on <span className="font-data">{formatDate(order.completed_at)}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <OTPModal
        isOpen={otpModal.open}
        onClose={handleOtpModalClose}
        order={otpModal.order}
        mode={otpModal.mode}
        onVerified={fetchOrders}
      />

      <CancelOrderModal
        isOpen={cancelModal.open}
        onClose={handleCancelModalClose}
        order={cancelModal.order}
        onCancelled={handleOrderCancelled}
      />
    </div>
  );
}

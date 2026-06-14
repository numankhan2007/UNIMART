import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, MapPin, ShoppingCart, Package, BadgeCheck, Pencil, Camera, Mail, Phone, GraduationCap, X, Check, Info, Lock, Save, Tag, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import HistoryTabs from '../components/dashboard/HistoryTabs';
import BuyHistory from '../components/dashboard/BuyHistory';
import SellHistory from '../components/dashboard/SellHistory';
import MyProducts from '../components/dashboard/MyProducts';
import OTPModal from '../components/order/OTPModal';
import Badge from '../components/common/Badge';
import { getInitials, formatDate } from '../utils/helpers';
import api from '../services/api';

const REFRESH_INTERVAL = 30000;

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const { getOrdersByBuyer, getOrdersBySeller } = useOrders();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'buy');
  const [otpModal, setOtpModal] = useState({ open: false, order: null, mode: 'generate' });

  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [myProductsCount, setMyProductsCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchCounts = useCallback(async (signal) => {
    try {
      const [buyData, sellData, prodRes] = await Promise.all([
        getOrdersByBuyer(signal),
        getOrdersBySeller(signal),
        api.get('/products/my', { signal }),
      ]);
      setBuyOrders(buyData || []);
      setSellOrders(sellData || []);
      setMyProductsCount(prodRes.data?.length || 0);
    } catch (error) {
      if (error?.name === 'CanceledError') return;
      console.error('Failed to fetch dashboard counts:', error);
    } finally {
      setLoadingOrders(false);
      setLoadingProducts(false);
    }
  }, [getOrdersByBuyer, getOrdersBySeller]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCounts(controller.signal);
    const interval = setInterval(() => {
      fetchCounts(controller.signal);
    }, REFRESH_INTERVAL);
    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [fetchCounts]);

  const handleProductDeleted = () => {
    setMyProductsCount((prev) => Math.max(0, prev - 1));
  };

  const fileInputRef = useRef(null);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const infoRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.personalMailId || '',
    phone: user?.phoneNumber || '',
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setShowInfoPopover(false);
      }
    };
    if (showInfoPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInfoPopover]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await updateProfile({ profile_picture_url: data.url });
    } catch (err) {
      console.error('Avatar upload failed:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const editAvatarRef = useRef(null);
  const handleEditAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await updateProfile({ profile_picture_url: data.url });
    } catch (err) {
      console.error('Avatar upload failed:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleEditSave = () => {
    updateProfile({
      username: editForm.username.trim() || user.username,
      personal_mail_id: editForm.email.trim() || user.personalMailId,
      phone_number: editForm.phone.trim() || user.phoneNumber,
    });
    setShowEditModal(false);
  };

  const openEditModal = () => {
    setEditForm({
      username: user?.username || '',
      email: user?.personalMailId || '',
      phone: user?.phoneNumber || '',
    });
    setShowEditModal(true);
  };

  const statCards = [
    { icon: ShoppingCart, label: 'Purchases', value: buyOrders.length, loading: loadingOrders, color: '#6366f1', bg: '#eef2ff' },
    { icon: Package, label: 'Sales', value: sellOrders.length, loading: loadingOrders, color: '#8b5cf6', bg: '#f5f3ff' },
    { icon: Tag, label: 'My Products', value: myProductsCount, loading: loadingProducts, color: '#10b981', bg: '#ecfdf5' },
  ];

  return (
    <div className="section-padding page-padding">
      <div className="max-w-5xl mx-auto">

        {/* ═══ PROFILE BENTO GRID ═══ */}
        <div className="bento-grid mb-8" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>

          {/* Profile Card — main cell */}
          <div className="bento-cell col-span-12 lg:col-span-8 relative hover:!transform-none bento-animate">
            {/* Info button */}
            <div ref={infoRef} className="absolute" style={{ top: '15px', right: '15px' }}>
              <button
                onClick={() => setShowInfoPopover(!showInfoPopover)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                title="Account Info"
              >
                <Info size={16} />
              </button>

              {showInfoPopover && (
                <div className="absolute right-0 top-10 w-64 bento-cell p-4 z-50 scale-in !rounded-xl">
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-slate-200 dark:border-slate-700 rotate-45" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Info size={14} className="text-indigo-500" />
                      Account Info
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400 w-28 shrink-0">Registration Date</span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">Joined: 28 Feb 2026</span>
                      </div>
                      <div className="h-px bg-slate-100 dark:bg-slate-700" />
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400 w-28 shrink-0">Username Changes</span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                          {user?.usernameChangeCount || 0}
                        </span>
                      </div>
                    </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-5 sm:gap-6">
              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-20 sm:h-20 gradient-bg rounded-2xl flex items-center justify-center text-white text-3xl sm:text-2xl font-bold shadow-lg shadow-indigo-500/20 overflow-hidden">
                  {user?.profilePictureUrl ? (
                    <img src={user.profilePictureUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    getInitials(user?.username || 'U')
                  )}
                </div>
                <button
                  onClick={() => !uploadingAvatar && fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
                >
                  {uploadingAvatar ? <Loader2 size={20} className="text-white animate-spin" /> : <Camera size={20} className="text-white" />}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </div>

              <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start">
                <div className="flex items-center justify-center sm:justify-start gap-2 w-full flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white truncate max-w-full">{user?.username}</h1>
                  {user?.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full shrink-0">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                  <button onClick={openEditModal} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-all shrink-0" title="Edit Profile">
                    <Pencil size={14} />
                  </button>
                </div>

                {user?.name && <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{user.name}</p>}

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 mt-3 sm:mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {user?.university && (
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="shrink-0 text-indigo-500" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{user.university}</span>
                    </span>
                  )}
                  {user?.college && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="shrink-0 text-purple-500" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{user.college}</span>
                    </span>
                  )}
                  {user?.department && (
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="shrink-0 text-pink-500" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{user.department}</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-3 sm:mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                  {user?.personalMailId && (
                    <span className="flex items-center gap-1.5 bento-cell !py-1.5 !px-2.5 !rounded-lg !shadow-none hover:!transform-none">
                      <Mail size={12} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px] sm:max-w-none">{user.personalMailId}</span>
                    </span>
                  )}
                  {user?.phoneNumber && (
                    <span className="flex items-center gap-1.5 bento-cell !py-1.5 !px-2.5 !rounded-lg !shadow-none hover:!transform-none shrink-0 whitespace-nowrap">
                      <Phone size={12} className="text-slate-400 shrink-0" />
                      +91 {user.phoneNumber}
                    </span>
                  )}
                  {user?.studentId && (
                    <span className="flex items-center gap-1.5 !py-1.5 !px-2.5 !rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 shrink-0" title="Register Number">
                      <GraduationCap size={12} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="font-semibold text-indigo-700 dark:text-indigo-400">{user.studentId}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats — 3 bento cells on the right */}
          {statCards.map((stat, i) => (
            <div key={stat.label} className="bento-cell col-span-4 lg:col-span-4 flex flex-col items-center justify-center text-center py-6 bento-animate" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: stat.bg }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {stat.loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : stat.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ═══ HISTORY BENTO SECTION ═══ */}
        <div className="bento-cell hover:!transform-none bento-animate" style={{ animationDelay: '0.2s' }}>
          <HistoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="mt-4">
            {loadingOrders ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              </div>
            ) : activeTab === 'buy' ? (
              <BuyHistory orders={buyOrders} />
            ) : activeTab === 'sell' ? (
              <SellHistory
                orders={sellOrders}
                onConfirmOrder={fetchCounts}
                onInitiateDelivery={(order) => setOtpModal({ open: true, order, mode: 'generate' })}
                onVerifyOTP={(order) => setOtpModal({ open: true, order, mode: 'verify' })}
              />
            ) : (
              <MyProducts onProductDeleted={handleProductDeleted} />
            )}
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={otpModal.open}
        onClose={() => setOtpModal({ open: false, order: null, mode: 'generate' })}
        order={otpModal.order}
        mode={otpModal.mode}
        onVerified={fetchCounts}
      />

      {/* ═══════════ EDIT PROFILE MODAL ═══════════ */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="w-full max-w-lg bento-cell overflow-hidden scale-in hover:!transform-none"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Profile</h2>
                <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Official Records */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock size={14} className="text-slate-400" />
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Official Records (Fixed)</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'University', value: user?.university || 'N/A', icon: GraduationCap },
                      { label: 'College', value: user?.college || 'N/A', icon: MapPin },
                      { label: 'Department', value: user?.department || 'N/A', icon: User },
                    ].map((field) => (
                      <div key={field.label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 opacity-60">
                        <field.icon size={14} className="text-slate-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{field.label}</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{field.value}</p>
                        </div>
                        <Lock size={12} className="text-slate-300 dark:text-slate-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editable Fields */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Pencil size={14} className="text-indigo-500" />
                    <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Editable Fields</h3>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative group">
                      <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                        {user?.profilePictureUrl ? (
                          <img src={user.profilePictureUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          getInitials(user?.username || 'U')
                        )}
                      </div>
                      <button
                        onClick={() => !uploadingAvatar && editAvatarRef.current?.click()}
                        className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
                      >
                        {uploadingAvatar ? <Loader2 size={16} className="text-white animate-spin" /> : <Camera size={16} className="text-white" />}
                      </button>
                      <input ref={editAvatarRef} type="file" accept="image/*" onChange={handleEditAvatarUpload} className="hidden" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Profile Picture</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Click photo to change</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Username</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} className="input-field !pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Mail ID</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="input-field !pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="input-field !pl-9" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  Cancel
                </button>
                <button onClick={handleEditSave} className="btn-primary !rounded-xl !text-sm">
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

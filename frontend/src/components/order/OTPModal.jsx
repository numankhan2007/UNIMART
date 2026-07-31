import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, KeyRound, Mail, Loader2 } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import VerifiedSeal from '../common/VerifiedSeal';
import { useNotifications } from '../../context/NotificationContext';
import otpService from '../../services/otpService';

export default function OTPModal({ isOpen, onClose, order, mode = 'generate', onVerified }) {
  const { success, error: showError } = useNotifications();
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // ============================================================
  // SELLER: Initiate Delivery → Backend generates OTP & emails buyer
  // ============================================================

  const handleInitiateDelivery = async () => {
    setLoading(true);
    try {
      // Step 1: Generate OTP on the backend
      await otpService.generate(order.id);

      // Step 2: Send the OTP to buyer's email via backend (backend looks up buyer's email)
      await otpService.sendViaEmail(order.id);

      setOtpSent(true);
      setResendTimer(30);
      success('✅ OTP generated and sent to buyer\'s email!');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Failed to send OTP. Please try again.';
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    try {
      // Generate a fresh OTP and send again
      await otpService.generate(order.id);
      await otpService.sendViaEmail(order.id);

      setResendTimer(30);
      success('🔄 OTP resent to buyer\'s email.');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Failed to resend OTP. Please try again.';
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SELLER: Enter OTP from Buyer → Verify via backend
  // ============================================================

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOTP = [...enteredOTP];
    newOTP[index] = value.slice(-1);
    setEnteredOTP(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !enteredOTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const code = enteredOTP.join('');
    if (code.length !== 6) {
      showError('Please enter the full 6-digit OTP.');
      setLoading(false);
      return;
    }
    try {
      await otpService.verify(order.id, code);
      setVerified(true);
      if (onVerified) {
        await onVerified(order.id);
      }
      success('🎉 Delivery confirmed! Product has been marked as sold.');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Invalid OTP. Please try again.';
      showError(msg);
      setEnteredOTP(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOtpSent(false);
    setVerified(false);
    setResendTimer(0);
    setEnteredOTP(['', '', '', '', '', '']);
    onClose();
  };

  if (!order) return null;

  const titleMap = {
    generate: 'Initiate Delivery',
    verify: 'Verify Delivery',
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={titleMap[mode] || 'Delivery'} size="sm">
      <div className="space-y-5">

        {/* ============================================================ */}
        {/* MODE: GENERATE — Seller initiates delivery, OTP sent to buyer */}
        {/* ============================================================ */}
        {mode === 'generate' && (
          <>
            {!otpSent ? (
              <div className="text-center space-y-4 px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[var(--color-primary-soft)] flex items-center justify-center">
                  <Send size={24} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg font-display">Initiate Delivery</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    A 6-digit verification code will be sent to the buyer's registered email.
                    The buyer will share this code with you after inspecting the product.
                  </p>
                </div>
                <div className="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 rounded-xl p-3">
                  <p className="text-xs text-[var(--color-warning)] font-medium">
                    ⚠️ Only initiate delivery when you are ready to meet the buyer in person.
                  </p>
                </div>
                <Button variant="primary" fullWidth loading={loading} onClick={handleInitiateDelivery} icon={Mail}>
                  Send OTP to Buyer's Email
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4 px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center">
                  <CheckCircle size={24} className="text-[var(--color-success)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg font-display">OTP Sent via Email!</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    The verification code has been sent to the buyer's registered email.
                    Meet the buyer, let them inspect the product, and ask them for the 6-digit code.
                  </p>
                </div>
                <div className="bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 rounded-xl p-3">
                  <p className="text-xs text-[var(--color-primary)]">
                    💡 Once you have the code, go to your Orders page and click <strong>"Enter OTP"</strong> to complete the transaction.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleResendOTP}
                    disabled={loading || resendTimer > 0}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </Button>
                  <Button variant="secondary" fullWidth onClick={handleClose}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* MODE: VERIFY — Seller enters OTP from buyer to confirm */}
        {/* ============================================================ */}
        {mode === 'verify' && (
          <>
            {!verified ? (
              <div className="text-center space-y-4 px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[var(--color-verified-soft)] border border-[var(--color-verified)]/40 flex items-center justify-center shadow-sm-token">
                  <KeyRound size={24} style={{ color: 'var(--color-verified)' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg font-trust">Enter Buyer's OTP</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    Enter the 6-digit verification code to complete order handoff.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
                  {enteredOTP.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center bg-gray-100 dark:bg-gray-800 rounded-xl text-2xl sm:text-3xl font-bold font-data text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-verified)]/60 focus:border-[var(--color-verified)] transition-all"
                    />
                  ))}
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  loading={loading}
                  onClick={handleVerifyOTP}
                  disabled={enteredOTP.some((d) => !d)}
                >
                  Verify & Confirm Delivery
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4 px-2">
                <div className="flex justify-center my-2">
                  <VerifiedSeal size={64} />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-trust" style={{ color: 'var(--color-verified)' }}>Delivery Confirmed!</h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  The product handoff is verified and marked as sold. A confirmation record has been saved.
                </p>
                <Button variant="primary" fullWidth onClick={handleClose}>
                  Done
                </Button>
              </div>
            )}
          </>
        )}

      </div>
    </Modal>
  );
}

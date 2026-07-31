import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, ArrowRight, User } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export default function Login() {
  const { login } = useAuth();
  const { error: showError } = useNotifications();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.identifier.trim()) errs.identifier = 'Register Number or Username is required';
    if (!formData.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await login(formData.identifier, formData.password);
      navigate('/home', { replace: true });
    } catch (err) {
      if (!err.response) {
        showError('❌ Server Error: Unable to connect to the backend.');
      } else {
        showError('Invalid Register Number / Username or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 lg:p-12 font-sans overflow-hidden">
      {/* Form Card */}
      <div className="w-full max-w-md card !bg-[var(--color-surface)] !border-[var(--color-border)] !shadow-[var(--shadow-soft-lg)] p-8 sm:p-10 relative z-10 scale-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap size={26} className="text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Sign in to your university marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Register Number or Username"
            name="identifier"
            placeholder="Enter your register number or username"
            value={formData.identifier}
            onChange={(e) => {
              setFormData({ ...formData, identifier: e.target.value });
              setErrors({ ...errors, identifier: '' });
            }}
            error={errors.identifier}
            icon={User}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            icon={Lock}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={ArrowRight} iconPosition="right">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

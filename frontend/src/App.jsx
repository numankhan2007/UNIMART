import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { OrderProvider } from './context/OrderContext';
import { ChatProvider } from './context/ChatContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import Toast from './components/common/Toast';
import AppRoutes from './routes/AppRoutes';
import { useBackNavigation } from './hooks/useBackNavigation';

function BackNavigationHandler() {
  useBackNavigation();
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't show main app layout (navbar/footer) on admin pages
  if (isAdminPage) {
    return (
      <>
        <BackNavigationHandler />
        <AppRoutes />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative" style={{ backgroundColor: 'var(--bento-bg)' }}>
      <BackNavigationHandler />

      {/* Subtle decorative gradient orbs — very minimal, no heavy animation */}
      {!isAuthPage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.03] dark:bg-purple-500/[0.02] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        </div>
      )}

      {!isAuthPage && <Navbar />}
      <main className={`flex-1 relative z-10 ${!isAuthPage ? 'pt-20 pb-16 md:pb-0' : ''}`}>
        <AppRoutes />
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileNav />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <OrderProvider>
              <ChatProvider>
                <NotificationProvider>
                  <AppLayout />
                </NotificationProvider>
              </ChatProvider>
            </OrderProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

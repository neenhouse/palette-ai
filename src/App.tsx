import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const Landing = lazy(() => import('./pages/Landing'));
const AppPage = lazy(() => import('./pages/AppPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--text-secondary)',
        fontSize: 14,
        gap: 8,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
      Loading...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

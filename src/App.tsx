import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AppPage from './pages/AppPage';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </>
  );
}

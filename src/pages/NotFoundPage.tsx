import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '40px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-primary)',
      }}
    >
      <p style={{ fontSize: '5rem', fontWeight: 800, margin: 0, color: 'var(--accent)' }}>404</p>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '12px', marginTop: '16px' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '360px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 24px',
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Back to home
      </button>
    </div>
  );
}

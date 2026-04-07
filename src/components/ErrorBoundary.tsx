import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', _error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '40px 24px',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px' }}>
            An unexpected error occurred. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
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
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

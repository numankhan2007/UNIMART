import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#fff",
            fontFamily: "sans-serif",
            gap: 16,
            padding: 24,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 22, margin: 0 }}>Something went wrong</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0 }}>
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "1px solid rgba(0,212,255,0.5)",
              background: "transparent",
              color: "#00d4ff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

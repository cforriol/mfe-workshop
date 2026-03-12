import React, { Suspense, lazy } from 'react';

const Cart = lazy(() => import('cart/Cart'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error loading Cart MFE:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px', margin: '20px' }}>
          <h3>⚠️ Error cargando el módulo del Carrito</h3>
          <p>Asegúrate de que el MFE de Cart esté corriendo en http://localhost:3003</p>
          <details>
            <summary>Detalles del error</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const CartPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <ErrorBoundary>
        <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <p>Cargando carrito...</p>
          </div>
        }>
          <Cart />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default CartPage;

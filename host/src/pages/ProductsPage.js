import React, { Suspense, lazy } from 'react';

const Products = lazy(() => import('products/Products'));

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
    console.error('Error loading Products MFE:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px', margin: '20px' }}>
          <h3>⚠️ Error cargando el módulo de Productos</h3>
          <p>Asegúrate de que el MFE de Products esté corriendo en http://localhost:3002</p>
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

const ProductsPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <ErrorBoundary>
        <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <p>Cargando productos...</p>
          </div>
        }>
          <Products />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ProductsPage;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

// Lazy load el Header
const Header = lazy(() => import('header/Header'));

// Error Boundary para el Header
class HeaderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
          <p>⚠️ Error cargando Header. Verifica que esté corriendo en puerto 3001</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <HeaderErrorBoundary>
          <Suspense fallback={
            <div style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
              Cargando Header...
            </div>
          }>
            <Header />
          </Suspense>
        </HeaderErrorBoundary>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </main>

        <footer style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#333', 
          color: 'white',
          marginTop: '40px'
        }}>
          <p>Workshop Module Federation - Host App 🚀</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

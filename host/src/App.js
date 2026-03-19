import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";

// Lazy load microfrontends
const Header = lazy(() => import("header/Header"));
const Home = lazy(() => import("home/Home"));
const DragoniteAndaluz = lazy(
    () => import("dragoniteAndaluz/DragoniteAndaluz"),
);
const Deals = lazy(() => import('deals/Deals'));

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
                <div
                    style={{
                        padding: "20px",
                        backgroundColor: "#333",
                        color: "white",
                    }}
                >
                    <p>
                        ⚠️ Error loading Header. Check it's running on port 3001
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

// Error Boundary para Dragonite Andaluz
class DragoniteAndaluzErrorBoundary extends React.Component {
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
                <div style={{ padding: "40px", textAlign: "center" }}>
                    <p>
                        ⚠️ Error loading Dragonite Andaluz MFE. Check it's
                        running on port 3999
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

// Error Boundary para Home
class HomeErrorBoundary extends React.Component {
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
                <div style={{ padding: "40px", textAlign: "center" }}>
                    <p>
                        ⚠️ Error loading Home MFE. Check it's running on port
                        3004
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

const App = () => {
    const [dragoniteOpen, setDragoniteOpen] = useState(false);

    return (
        <Router>
            <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
                <HeaderErrorBoundary>
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#333",
                                    color: "white",
                                }}
                            >
                                Loading Header...
                            </div>
                        }
                    >
                        <Header />
                    </Suspense>
                </HeaderErrorBoundary>

                <button
                    onClick={() => setDragoniteOpen(true)}
                    style={{
                        position: "fixed",
                        bottom: "24px",
                        left: "24px",
                        backgroundColor: "#f97316",
                        color: "white",
                        border: "none",
                        padding: "12px 28px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        zIndex: 999,
                    }}
                >
                    🐉
                </button>

                <DragoniteAndaluzErrorBoundary>
                    <Suspense fallback={null}>
                        <DragoniteAndaluz
                            open={dragoniteOpen}
                            onClose={() => setDragoniteOpen(false)}
                        />
                    </Suspense>
                </DragoniteAndaluzErrorBoundary>

        <main>
          <Routes>
            <Route path="/" element={
              <HomeErrorBoundary>
                <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Home...</div>}>
                  <Home />
                </Suspense>
              </HomeErrorBoundary>
            } />
            <Route path="/deals" element={<Deals />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;

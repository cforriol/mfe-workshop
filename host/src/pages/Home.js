import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '40px'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🚀 Bienvenido al Workshop de Module Federation
      </h1>
      
      <p style={{
        fontSize: '20px',
        color: '#666',
        marginBottom: '40px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Esta aplicación está construida con microfrontends independientes usando Webpack Module Federation
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px'
      }}>
        <Link to="/productos" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: '2px solid #4CAF50'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🛍️</div>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Productos</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Ver catálogo de productos
            </p>
          </div>
        </Link>

        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: '2px solid #FF9800'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🛒</div>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Carrito</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Ver tu carrito de compras
            </p>
          </div>
        </Link>
      </div>

      <div style={{
        marginTop: '60px',
        padding: '20px',
        backgroundColor: '#f0f7ff',
        borderRadius: '8px',
        border: '1px solid #2196F3'
      }}>
        <h3 style={{ color: '#2196F3', marginBottom: '10px' }}>
          💡 Sobre este proyecto
        </h3>
        <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
          Este proyecto está dividido en 4 microfrontends independientes:
        </p>
        <ul style={{ color: '#555', fontSize: '14px', marginTop: '10px', lineHeight: '1.8' }}>
          <li><strong>Host</strong> (Puerto 3000) - Aplicación principal</li>
          <li><strong>Header</strong> (Puerto 3001) - Navegación - EQUIPO 1</li>
          <li><strong>Products</strong> (Puerto 3002) - Catálogo - EQUIPO 2</li>
          <li><strong>Cart</strong> (Puerto 3003) - Carrito - EQUIPO 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

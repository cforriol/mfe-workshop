import React, { useState } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  // Productos de ejemplo en el carrito
  const [cartItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1, emoji: '💻' },
    { id: 2, name: 'Mouse', price: 29, quantity: 2, emoji: '🖱️' },
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ 
      marginTop: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '15px'
      }}>
        <h2 style={{ color: '#333' }}>🛒 Carrito de Compras</h2>
        <span style={{ 
          fontSize: '12px', 
          color: '#666',
          backgroundColor: '#e0e0e0',
          padding: '5px 10px',
          borderRadius: '4px'
        }}>
          [EQUIPO 3 - Cart MFE]
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
          Tu carrito está vacío
        </p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div style={{ 
            borderTop: '2px solid #f0f0f0',
            paddingTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ color: '#333' }}>Total:</h3>
            <h3 style={{ color: '#4CAF50', fontSize: '24px' }}>
              ${total.toFixed(2)}
            </h3>
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '15px'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#F57C00'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
          >
            Proceder al Pago
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

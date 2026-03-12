import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>
        {product.emoji}
      </div>
      <h3 style={{ color: '#333', marginBottom: '10px' }}>{product.name}</h3>
      <p style={{ 
        fontSize: '20px', 
        fontWeight: 'bold', 
        color: '#4CAF50',
        marginBottom: '15px'
      }}>
        ${product.price}
      </p>
      <button style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ProductCard;

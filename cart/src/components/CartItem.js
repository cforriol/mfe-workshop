import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '32px' }}>{item.emoji}</span>
        <div>
          <h4 style={{ margin: 0, color: '#333' }}>{item.name}</h4>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
            Cantidad: {item.quantity}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ 
          margin: 0, 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#4CAF50' 
        }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
          ${item.price} c/u
        </p>
      </div>
    </div>
  );
};

export default CartItem;

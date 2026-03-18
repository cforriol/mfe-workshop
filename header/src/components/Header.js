import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#282c34',
      padding: '20px',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>🛍️ My MFE Store</h1>
        <nav>
          <ul style={{ 
            listStyle: 'none', 
            display: 'flex', 
            gap: '20px',
            margin: 0,
            padding: 0
          }}>
            <li>
              <a 
                href="/" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                🏠 Home
              </a>
            </li>
            <li>
              <a 
                href="/productos" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                🛍️ Products
              </a>
            </li>
            <li>
              <a 
                href="/carrito" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                🛒 Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p style={{ 
        textAlign: 'center', 
        marginTop: '10px',
        marginBottom: 0,
        fontSize: '12px', 
        opacity: 0.7 
      }}>
        [EQUIPO 1 - Header MFE]
      </p>
    </header>
  );
};

export default Header;

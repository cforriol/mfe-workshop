import React, { useState, useEffect } from 'react';



const Home = () => {
  // --- Carousel: slide data ---
  const heroBanners = [
    {
      id: 1,
      title: '🎉 Spring Sale - Up to 50% Off!',
      subtitle: 'Discover amazing deals on thousands of products',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cta: 'Shop Now →',
    },
    {
      id: 2,
      title: '🔥 Flash Sale — Today Only!',
      subtitle: 'Electronics, fashion, home & more — grab it before it\'s gone',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      cta: 'View Deals →',
    },
    {
      id: 3,
      title: '🚚 Free Shipping on Orders Over $50',
      subtitle: 'Shop more, pay less — fast delivery to your door',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      cta: 'Start Shopping →',
    },
  ];
  
  // useState: track the active slide index
  const [activeSlide, setActiveSlide] = useState(0);
  
  // useEffect + setInterval: auto-advance every 4 seconds
  // The cleanup function (return) clears the interval to avoid memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroBanners.length]);
  
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % heroBanners.length);
  
  const currentBanner = heroBanners[activeSlide];
  const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧', discount: 20 },
    { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚', discount: 15 },
    { id: 3, name: 'Laptop Backpack', price: 49.99, emoji: '🎒', discount: 25 },
    { id: 4, name: 'USB-C Hub', price: 39.99, emoji: '🔌', discount: 10 },
  ];

  const categories = [
    { name: 'Electronics', emoji: '💻', color: '#2196F3' },
    { name: 'Fashion', emoji: '👔', color: '#E91E63' },
    { name: 'Home & Garden', emoji: '🏡', color: '#4CAF50' },
    { name: 'Sports', emoji: '⚽', color: '#FF9800' },
  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Hero Banner Carousel */}
      <div style={{
        position: 'relative',
        background: currentBanner.background,
        padding: '60px 20px',
        color: 'white',
        textAlign: 'center',
        transition: 'background 0.6s ease',
        overflow: 'hidden',
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
          {currentBanner.title}
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>
          {currentBanner.subtitle}
        </p>
        <button style={{
          backgroundColor: 'white',
          color: '#667eea',
          border: 'none',
          padding: '15px 40px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {currentBanner.cta}
        </button>

        {/* Prev / Next arrows */}
        <button onClick={prevSlide} style={{
          position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%',
          width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', color: 'white',
        }}>‹</button>
        <button onClick={nextSlide} style={{
          position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%',
          width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', color: 'white',
        }}>›</button>

        {/* Dot indicators */}
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {heroBanners.map((_, idx) => (
            <button key={idx} onClick={() => setActiveSlide(idx)} style={{
              width: idx === activeSlide ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: idx === activeSlide ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Categories Section */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '30px' }}>
            Shop by Category
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((category, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                border: `3px solid ${category.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>{category.emoji}</div>
                <h3 style={{ color: '#333', fontSize: '16px' }}>{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Offers */}
        <section style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', color: '#333' }}>🔥 Hot Deals</h2>
            <span style={{ color: '#667eea', cursor: 'pointer', fontSize: '16px' }}>
              View All →
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {featuredProducts.map(product => (
              <div key={product.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#FF5252',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  -{product.discount}%
                </div>
                
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9'
                }}>
                  <div style={{ fontSize: '64px' }}>{product.emoji}</div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#4CAF50'
                    }}>
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span style={{
                      fontSize: '16px',
                      color: '#999',
                      textDecoration: 'line-through'
                    }}>
                      ${product.price}
                    </span>
                  </div>
                  <button style={{
                    width: '100%',
                    marginTop: '15px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5568d3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promotional Banners */}
        <section style={{ marginBottom: '50px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '40px',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>💝 Gift Cards</h3>
              <p style={{ marginBottom: '20px', opacity: 0.9 }}>
                Perfect for any occasion
              </p>
              <span style={{
                backgroundColor: 'white',
                color: '#f5576c',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                Buy Now
              </span>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '40px',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>🚚 Free Shipping</h3>
              <p style={{ marginBottom: '20px', opacity: 0.9 }}>
                On orders over $50
              </p>
              <span style={{
                backgroundColor: 'white',
                color: '#4facfe',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                Learn More
              </span>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '15px' }}>
            📧 Subscribe to Our Newsletter
          </h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Get the latest updates on new products and upcoming sales
          </p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <button style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

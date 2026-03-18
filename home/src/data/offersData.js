// Mock offers and promotions data for Home
export const featuredOffers = [
  {
    id: 1,
    title: 'Flash Sale - Laptops',
    description: 'Up to 30% off on selected laptops',
    discount: 30,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    category: 'Electronics',
    validUntil: '2026-03-25',
    emoji: '💻'
  },
  {
    id: 2,
    title: 'Wireless Audio Week',
    description: 'Headphones and speakers with 25% OFF',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    category: 'Audio',
    validUntil: '2026-03-22',
    emoji: '🎧'
  },
  {
    id: 3,
    title: 'Smart Watches',
    description: 'Smart watches starting at $199',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'Wearables',
    validUntil: '2026-03-30',
    emoji: '⌚'
  },
  {
    id: 4,
    title: 'Gaming Peripherals',
    description: 'Gaming keyboards and mice 15% OFF',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    category: 'Gaming',
    validUntil: '2026-03-28',
    emoji: '🎮'
  }
];

export const topDeals = [
  {
    id: 1,
    productName: 'Laptop Pro 15"',
    originalPrice: 1299.99,
    salePrice: 909.99,
    discount: 30,
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    rating: 4.5,
    reviewsCount: 128
  },
  {
    id: 2,
    productName: 'Wireless Headphones Premium',
    originalPrice: 149.99,
    salePrice: 119.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.8,
    reviewsCount: 256
  },
  {
    id: 3,
    productName: 'Smart Watch Pro',
    originalPrice: 299.99,
    salePrice: 224.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.6,
    reviewsCount: 189
  },
  {
    id: 4,
    productName: 'Mechanical Keyboard RGB',
    originalPrice: 89.99,
    salePrice: 76.49,
    discount: 15,
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    rating: 4.7,
    reviewsCount: 342
  }
];

export const categories = [
  { id: 1, name: 'Electronics', icon: '💻', color: '#3B82F6', itemCount: 245 },
  { id: 2, name: 'Fashion', icon: '👔', color: '#EC4899', itemCount: 189 },
  { id: 3, name: 'Home & Garden', icon: '🏡', color: '#10B981', itemCount: 156 },
  { id: 4, name: 'Sports', icon: '⚽', color: '#F59E0B', itemCount: 98 },
  { id: 5, name: 'Books', icon: '📚', color: '#8B5CF6', itemCount: 432 },
  { id: 6, name: 'Gaming', icon: '🎮', color: '#EF4444', itemCount: 167 }
];

export const bannerPromo = {
  title: 'Spring Mega Sale 2026',
  subtitle: 'Up to 50% off on thousands of products',
  code: 'SPRING50',
  validUntil: '2026-04-01',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

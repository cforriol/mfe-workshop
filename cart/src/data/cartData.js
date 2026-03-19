// Mock cart data
export const cartItems = [
  {
    id: 1,
    productId: 1,
    name: 'Laptop Pro 15"',
    price: 1299.99,
    quantity: 1,
    image: '/LaptopPro15.jpeg',
    emoji: '💻'
  },
  {
    id: 2,
    productId: 2,
    name: 'J. Shirt',
    price: 29.99,
    quantity: 2,
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    emoji: '👕'
  },
  {
    id: 3,
    productId: 5,
    name: 'Wireless Headphones',
    price: 149.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    emoji: '🎧'
  }
];

export const cartSummary = {
  subtotal: 1509.96,
  shipping: 15.00,
  tax: 121.00,
  total: 1645.96,
  itemsCount: 4,
  discount: 0
};

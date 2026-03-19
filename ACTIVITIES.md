# MFE Workshop - Activities

## Project Description
This is a Micro Frontends (MFE) workshop using Module Federation with Webpack. The project is divided into multiple independent applications that integrate into a main Host.

## Project Structure

### Micro Frontends:
- **Host** (`/host`) - Main application that orchestrates all other MFEs
- **Header** (`/header`) - Navigation bar and user data
- **Home** (`/home`) - Main page with offers and promotions
- **Products** (`/products`) - Product catalog
- **Cart** (`/cart`) - Shopping cart

### Host Responsibilities:
The Host application is responsible for:
1. **Routing** - Managing navigation between pages (React Router)
2. **Layout** - Providing global components (Header, Footer)
3. **Integration** - Importing and displaying MFE components
4. **Error Handling** - 404 page and error boundaries
5. **Optional**: Global state management (Context API)

---

## Workshop 1: Styling with Tailwind CSS

### Objective
Use Tailwind CSS components and utilities to make all micro frontends look professional and cohesive.
https://tailwindcss.com/plus/ui-blocks/ecommerce 
### Tasks

#### 1. Header Component
- [ ] Implement a modern navigation bar with Tailwind
- [ ] Display user information with avatar
- [ ] Add badges for cart counter
- [ ] Implement responsive menu (mobile menu)
- [ ] Use data from `/header/src/data/userData.js`

**Suggested Tailwind components:**
- Navigation bars
- Avatar with badge
- Dropdown menu
- Mobile menu (hamburger)

#### 2. Home Component
- [ ] Create an attractive hero banner with main offers
- [ ] Grid of categories with icons
- [ ] Product cards on sale with discount badges
- [ ] Featured "Top Deals" section
- [ ] Use data from `/home/src/data/offersData.js`

**Suggested Tailwind components:**
- Hero sections
- Feature grids
- Product cards
- Badge components
- Gradient backgrounds

#### 3. Products Component
- [ ] Responsive product grid (1-2-3-4 columns depending on viewport)
- [ ] Product cards with hover effects
- [ ] Badges for discounts and stock
- [ ] Filters and search bar
- [ ] Loading states during fetch

**Suggested Tailwind components:**
- Product grids
- Cards with hover effects
- Badges
- Search bars
- Skeleton loaders

#### 4. Cart Component
- [ ] Clean cart items list
- [ ] Purchase summary (subtotal, shipping, taxes)
- [ ] Action buttons (remove, update quantity)
- [ ] Empty state when no products
- [ ] Use data from `/cart/src/data/cartData.js`

**Suggested Tailwind components:**
- Shopping cart layouts
- Price summary cards
- Quantity selectors
- Empty states
- Action buttons

#### 5. Host - Footer & 404 Page
- [ ] Create a global Footer component (`/host/src/components/Footer.js`)
- [ ] Footer with links, social media icons, copyright
- [ ] Create 404 Not Found page (`/host/src/pages/NotFound.js`)
- [ ] 404 page with creative design and navigation back to home
- [ ] Ensure Footer appears on all pages

**Suggested Tailwind components:**
- Footer layouts with multi-column
- Social media icons
- 404 error pages
- Call-to-action buttons

**Footer ideas:**
```javascript
// Footer.js example structure
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Company Info */}
        {/* Quick Links */}
        {/* Social Media */}
        {/* Newsletter Signup */}
        {/* Copyright */}
      </div>
    </footer>
  );
}
```

**404 Page ideas:**
- Animated illustrations
- Search functionality
- "Return Home" button
- Popular product suggestions
- Funny or creative error messages

### Tailwind CSS Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/components)
- [Tailwind Footer Examples](https://tailwindcss.com/plus/ui-blocks/ecommerce#footers)
- [Tailwind 404 Pages](https://tailwindcss.com/plus/ui-blocks/marketing#error-pages)
- [Heroicons](https://heroicons.com/)
- [Headlessui](https://headlessui.com/)

---

## Workshop 2: Implementing Data Fetching

### Objective
Implement data fetching using React Hooks (useState, useEffect) and handle loading and error states.

### Tasks

#### 1. Products - Real Fetch
- [ ] Implement `useState` to store products
- [ ] Implement `useEffect` for initial fetch

**Example code:**
```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadProducts();
}, []);
```

#### 2. Cart - Local State
- [ ] Load initial data from `/cart/src/data/cartData.js`
- [ ] Implement function to add products
- [ ] Implement function to remove products
- [ ] Implement function to update quantity
- [ ] Calculate totals dynamically
- [ ] Persist in localStorage (bonus)

#### 3. Header - User Context
- [ ] Load user data from `/header/src/data/userData.js`
- [ ] Update cart counter dynamically
- [ ] Implement profile dropdown
- [ ] Show notifications

#### 4. Home - Dynamic Offers
- [ ] Load offers from `/home/src/data/offersData.js`
- [ ] Implement countdown timer for offers


#### 5. Host - Pages & Routing 🎯

**Creating New Pages in Host:**

The Host application uses React Router for navigation. Here's how to create a new page:

**Step 1: Create the Page Component**
```javascript
// /host/src/pages/AboutPage.js
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your content here...
        </p>
      </div>
    </div>
  );
}
```

**Step 2: Add Route in App.js**
```javascript
// /host/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<ProductsPage />} />
  <Route path="/carrito" element={<CartPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Step 3: Add Link in Navigation**
```javascript
<Link to="/about">About</Link>
```

**Tasks for Host:**
- [ ] Create Footer component in `/host/src/components/Footer.js`
- [ ] Add Footer to App.js layout
- [ ] Create 404 NotFound page in `/host/src/pages/NotFound.js`
- [ ] Add catch-all route (`path="*"`) for 404 page
- [ ] (Bonus) Create additional pages: About, Contact, Profile

**Example Footer Structure:**
```javascript
// /host/src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          {/* Quick Links */}
          {/* Customer Service */}
          {/* Social Media */}
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © 2026 MFE Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Example 404 Page:**
```javascript
// /host/src/pages/NotFound.js
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
```

### React Hooks
- [React Hooks Documentation](https://react.dev/reference/react)
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Module Federation
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [Clean Code React](https://github.com/ryanmcdermott/clean-code-javascript)

---

## 💡 Bonus Ideas for Additional Pages

Want to practice more? Here are page ideas you can implement in the Host:

### 1. **About Page** (`/about`)
- Company story and mission
- Team members with photos
- Values and achievements
- Timeline of company history

### 2. **Contact Page** (`/contact`)
- Contact form (name, email, message)
- Office location with map
- Phone, email, social media links
- Business hours

### 3. **User Profile Page** (`/profile`)
- User information display
- Edit profile form
- Avatar upload
- Account settings

### 4. **Wishlist Page** (`/wishlist`)
- List of saved/favorite products
- Add to cart from wishlist
- Remove from wishlist
- Share wishlist functionality

### 5. **Order History Page** (`/orders`)
- List of past orders
- Order details and status
- Tracking information
- Reorder functionality

### 6. **Help/FAQ Page** (`/help`)
- Accordion with frequently asked questions
- Search functionality
- Categories (Shipping, Returns, Payment, etc.)
- Contact support button

### 7. **Product Detail Page** (`/producto/:id`)
- Single product view
- Image gallery
- Product description and specs
- Reviews and ratings
- Add to cart button

### 8. **Checkout Page** (`/checkout`)
- Multi-step checkout process
- Shipping information
- Payment method selection
- Order review
- Confirmation page

### 9. **Search Results Page** (`/search`)
- Product search functionality
- Filters and sorting
- Grid/list view toggle
- Pagination

### 10. **Blog Page** (`/blog`)
- List of blog posts
- Categories and tags
- Featured posts
- Individual post pages

**Implementation Tips:**
- Use the same Tailwind styling as other pages
- Follow the existing routing pattern
- Add navigation links in Header
- Keep Footer on all pages
- Use the 404 page for invalid routes

---

## Deliverables
1. Functional code in all MFEs
2. Updated README with installation instructions
3. Screenshots or video demo of working project
4. (Optional) Deploy on Vercel/Netlify

Good luck with the workshop! 🚀

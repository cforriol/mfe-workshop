# 🚀 Module Federation Workshop with React



## Prerequisites

Before starting, make sure you have the following installed:

### ⚡ Quick Start

**New to this project?** Check these resources first:
- 📘 [Node.js Setup Guide](./NODEJS_SETUP.md) - Detailed Node.js installation
- 🎯 [Activities Guide](./ACTIVITIES.md) - Workshop activities and exercises

### Required Software

#### Node.js (v22.21.1)

This project requires **Node.js version 22.21.1**. We recommend using a version manager:


## 📁 Project Structure

```
mfe-workshop/
├── host/           # Main application (Host) - Orchestrates all MFEs
│   └── src/
│       ├── App.js          # Main routing and layout
│       ├── hooks/          # Custom hooks (optional/advanced)
│       ├── pages/          # Pages that integrate MFEs
│       │   ├── Home.js     # Home page (imports home/Home MFE)
│       │   ├── ProductsPage.js  # Products page (imports products/Products MFE)
│       │   ├── CartPage.js      # Cart page (imports cart/Cart MFE)
│       │   └── NotFound.js      # 404 error page
│       └── components/
│           └── Footer.js   # Global footer component
├── header/         # MFE: Header (TEAM 1)
│   └── src/
│       ├── components/
│       │   └── Header.js   # Navigation component
│       └── data/           # ✨ User and navigation data
├── products/       # MFE: Products (TEAM 2)
│   └── src/
│       ├── components/
│       │   └── Products.js # Product catalog component
│       └── data/           # ✨ Products data + simulated fetch
├── cart/           # MFE: Cart (TEAM 3)
│   └── src/
│       ├── components/
│       │   └── Cart.js     # Shopping cart component
│       └── data/           # ✨ Cart data
└── home/           # MFE: Home (TEAM 4)
    └── src/
        ├── components/
        │   └── Home.js     # Landing page component
        └── data/           # ✨ Offers and promotions data
```

## 🎯 Workshop Objective

Demonstrate how different teams can work **independently** on different parts of a web application using Module Federation.

**The application has 4 main pages:**
- **Home** (`/`): Landing page with offers, banners, and recommendations
- **Products** (`/productos`): Product catalog with data fetching
- **Cart** (`/carrito`): Shopping cart and checkout
- **404 Page**: Custom error page for non-existent routes


### Detailed Team Responsibilities

### **TEAM 1: Header** 
- **Port**: 3001
- **Folder**: `/header`
- **Responsibility**: Navigation and application header
- **Data**: `/header/src/data/userData.js` - User info and navigation links

### **TEAM 2: Products**
- **Port**: 3002
- **Folder**: `/products`
- **Responsibility**: Product catalog and product cards
- **Data**: `/products/src/data/products.js` - Products data with fake fetch API

### **TEAM 3: Cart**
- **Port**: 3003
- **Folder**: `/cart`
- **Responsibility**: Shopping cart and checkout
- **Data**: `/cart/src/data/cartData.js` - Cart items and summary

### **TEAM 4: Home** ⭐ NEW!
- **Port**: 3004
- **Folder**: `/home`
- **Responsibility**: Landing page with hero banners, featured products, categories, and promotions
- **Data**: `/home/src/data/offersData.js` - Offers, deals, and categories

### **Host Application** 🎯
- **Port**: 3000
- **Folder**: `/host`
- **Responsibility**: 
  - Orchestrate and integrate all MFEs
  - Manage routing (React Router)
  - Provide global components (Footer)
  - Handle 404 errors
  - Optional: Shared state management

**Host Structure:**
```
/host/src/
├── App.js              # Main app with routing
├── index.js            # Entry point
├── pages/              # Pages that integrate MFEs
│   ├── Home.js         # Imports home/Home
│   ├── ProductsPage.js # Imports products/Products
│   ├── CartPage.js     # Imports cart/Cart
│   └── NotFound.js     # 404 error page
├── components/
│   └── Footer.js       # Global footer
└── hooks/              # (Optional) Custom hooks
    ├── useCart.js
    ├── useUser.js
    └── useUtils.js
```

**How to create a new page in Host:**
1. Create a new file in `/host/src/pages/` (e.g., `AboutPage.js`)
2. Import the MFE component if needed
3. Add the route in `App.js`:
   ```javascript
   <Route path="/about" element={<AboutPage />} />
   ```

## 🔧 Installation

### Step 1: Verify Node.js Version

```bash
node --version
# Should output: v22.21.1
```
### Step 2: Install Dependencies

Each team must install the dependencies for their application. You have two options:

From the root directory, run:

```bash
# Install dependencies for all microfrontends and host
cd header && npm install 
cd products && npm install 
cd cart && npm install 
cd home && npm install
cd host && npm install 
```





## ▶️ Running the Application

### ⚠️ IMPORTANT: Start Order

**You MUST start the remotes BEFORE the host**

The host app depends on the remote microfrontends being available. If you start the host first, you'll see errors or a blank page.

### Option 1: Manual Start (RECOMMENDED for workshop)

Open 5 separate terminal windows/tabs:

**Terminal 1 - Header (TEAM 1):**
```bash
cd header
npm start
```
Wait until you see: ✅ `webpack compiled successfully`

**Terminal 2 - Products (TEAM 2):**
```bash
cd products
npm start
```
Wait until you see: ✅ `webpack compiled successfully`

**Terminal 3 - Cart (TEAM 3):**
```bash
cd cart
npm start
```
Wait until you see: ✅ `webpack compiled successfully`

**Terminal 4 - Home (TEAM 4):** ⭐ NEW!
```bash
cd home
npm start
```
Wait until you see: ✅ `webpack compiled successfully`

**Terminal 5 - Host (Start LAST):**
```bash
cd host
npm start
```
Wait until you see: ✅ `webpack compiled successfully`

Once you see `webpack compiled successfully` in **ALL** terminals, open:
**http://localhost:3000** 🎉




## 🌐 Dev URLs

- **Host App**: http://localhost:3000 (main application)
  - **Home**: http://localhost:3000/
  - **Products**: http://localhost:3000/productos
  - **Cart**: http://localhost:3000/carrito
  - **404 Page**: http://localhost:3000/any-invalid-route
- **Header MFE**: http://localhost:3001
- **Products MFE**: http://localhost:3002
- **Cart MFE**: http://localhost:3003
- **Home MFE**: http://localhost:3004 

## 🏗️ Module Federation Architecture

### Host (webpack.config.js)
```javascript
remotes: {
  header: 'header@http://localhost:3001/remoteEntry.js',
  products: 'products@http://localhost:3002/remoteEntry.js',
  cart: 'cart@http://localhost:3003/remoteEntry.js',
  home: 'home@http://localhost:3004/remoteEntry.js', 
}
```

### Remotes (webpack.config.js)
```javascript
exposes: {
  './ComponentName': './src/components/ComponentName'
}
```

---

## 📄 Creating New Pages in Host

The Host application uses **React Router** for routing. Here's how to add new pages:

### Step 1: Create Page Component
Create a new file in `/host/src/pages/`:

```javascript
// Example: /host/src/pages/AboutPage.js
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-4">Your content here...</p>
    </div>
  );
}
```

### Step 2: Add Route in App.js
```javascript
// /host/src/App.js
import AboutPage from './pages/AboutPage';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<ProductsPage />} />
  <Route path="/carrito" element={<CartPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="*" element={<NotFound />} /> {/* Always last! */}
</Routes>
```

### Step 3: Add Navigation Link
Update the Header component to include your new route.

### 💡 Page Ideas for Practice:
- **About Page** - Company information, team, mission
- **Contact Page** - Contact form, location map
- **Profile Page** - User profile settings
- **Wishlist Page** - Saved/favorite products
- **Order History** - Past orders and tracking
- **Help/FAQ Page** - Frequently asked questions
- **Terms & Conditions** - Legal information
- **Blog/News Page** - Company blog or news

---

**Ready for the workshop! 🎉**

Each team can develop independently and see changes in real-time in the main application.

Happy coding! 🚀

# 🚀 Module Federation Workshop with React



##  Prerequisites

Before starting, make sure you have the following installed:

### ⚡ Quick Start

**New to this project?** Check these resources first:
- 📘 [Node.js Setup Guide](./NODEJS_SETUP.md) - Detailed Node.js installation

### Required Software

#### Node.js (v22.21.1)

This project requires **Node.js version 22.21.1**. We recommend using a version manager:


## 📁 Project Structure

```
mfe-workshop/
├── host/           # Aplicación principal (Host)
├── header/         # MFE: Header (TEAM 1)
├── products/       # MFE: Products (TEAM 2)
├── cart/           # MFE: Cart (TEAM 3)
└── home/           # MFE: Home (TEAM 4)
```

## 🎯 Workshop Objective

Demonstrate how different teams can work **independently** on different parts of a web application using Module Federation.

**The application has 3 pages:**
- **Home** (`/`): Landing page with offers, banners, and recommendations (Independent MFE)
- **Products** (`/productos`): Product catalog (Independent MFE)
- **Cart** (`/carrito`): Shopping cart (Independent MFE)


### Detailed Team Responsibilities

### **TEAM 1: Header** 
- **Port**: 3001
- **Folder**: `/header`
- **Responsibility**: Navigation and application header

### **TEAM 2: Products**
- **Port**: 3002
- **Folder**: `/products`
- **Responsibility**: Product catalog and product cards

### **TEAM 3: Cart**
- **Port**: 3003
- **Folder**: `/cart`
- **Responsibility**: Shopping cart and checkout

### **TEAM 4: Home** ⭐ NEW!
- **Port**: 3004
- **Folder**: `/home`
- **Responsibility**: Landing page with hero banners, featured products, categories, and promotions

### **Host Application**
- **Port**: 3000
- **Folder**: `/host`
- **Responsibility**: Orchestration and assembly of all MFEs

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




## 🌐 Devs Urls

- **Host App**: http://localhost:3000 (main application)
  - **Home**: http://localhost:3000/
  - **Products**: http://localhost:3000/productos
  - **Cart**: http://localhost:3000/carrito
- **Header MFE**: http://localhost:3001
- **Products MFE**: http://localhost:3002
- **Cart MFE**: http://localhost:3003
- **Home MFE**: http://localhost:3004 

## 🏗️ Arquitectura Module Federation

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




**Ready for the workshop! 🎉**

Each team can develop independently and see changes in real-time in the main application.



Happy coding! 🚀

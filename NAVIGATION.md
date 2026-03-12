# 🗺️ Guía de Navegación

## Estructura de Páginas

```
┌─────────────────────────────────────────┐
│         Header (Puerto 3001)            │
│  🏠 Inicio | 🛍️ Productos | 🛒 Carrito  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│                                         │
│  📍 PÁGINA ACTUAL (rutas React Router)  │
│                                         │
│  • / (Inicio)                          │
│    └─ Página de bienvenida            │
│                                         │
│  • /productos                          │
│    └─ Products MFE (Puerto 3002)      │
│                                         │
│  • /carrito                            │
│    └─ Cart MFE (Puerto 3003)          │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│              Footer                     │
│   Workshop Module Federation 🚀        │
└─────────────────────────────────────────┘
```

## Flujo de Usuario

1. **Usuario abre** → http://localhost:3000
2. **Ve la página de inicio** con tarjetas para navegar
3. **Click en "Productos"** → http://localhost:3000/productos
   - Carga el MFE de Products (puerto 3002)
4. **Click en "Carrito"** → http://localhost:3000/carrito
   - Carga el MFE de Cart (puerto 3003)

## Arquitectura de Microfrontends

```
┌──────────────────────────────────────────────────────┐
│           HOST APPLICATION (Puerto 3000)             │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ React Router                               │    │
│  │  • Route "/"          → Home Page          │    │
│  │  • Route "/productos" → Products MFE       │    │
│  │  • Route "/carrito"   → Cart MFE          │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Consume 3 Microfrontends:                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Header  │ │ Products │ │   Cart   │           │
│  │  :3001   │ │  :3002   │ │  :3003   │           │
│  └──────────┘ └──────────┘ └──────────┘           │
└──────────────────────────────────────────────────────┘
```

## Trabajo por Equipos

### EQUIPO 1 - Header
- **Puerto**: 3001
- **Responsabilidad**: Navegación y menú
- **Se ve en**: Todas las páginas (siempre visible)
- **Archivo principal**: `header/src/components/Header.js`

### EQUIPO 2 - Products  
- **Puerto**: 3002
- **Responsabilidad**: Catálogo de productos
- **Se ve en**: Página `/productos` únicamente
- **Archivos principales**: 
  - `products/src/components/Products.js`
  - `products/src/components/ProductCard.js`

### EQUIPO 3 - Cart
- **Puerto**: 3003
- **Responsabilidad**: Carrito de compras
- **Se ve en**: Página `/carrito` únicamente
- **Archivos principales**:
  - `cart/src/components/Cart.js`
  - `cart/src/components/CartItem.js`

## Ventajas de esta Arquitectura

✅ **Aislamiento**: Cada equipo trabaja en su propio servidor
✅ **Independencia**: Los cambios en un MFE no afectan a otros
✅ **Hot Reload**: Cada MFE se actualiza sin reiniciar los demás
✅ **Escalabilidad**: Fácil agregar más MFEs (ej: Profile, Checkout)
✅ **Deployment independiente**: Cada MFE puede desplegarse por separado

## Ejercicios Sugeridos

### Nivel 1: Básico
1. Cambiar colores del Header
2. Agregar más productos al catálogo
3. Modificar estilos del carrito

### Nivel 2: Intermedio
4. Agregar una nueva ruta `/perfil` con un nuevo MFE
5. Compartir estado entre Products y Cart (número de items)
6. Agregar filtros a los productos

### Nivel 3: Avanzado
7. Implementar un sistema de autenticación compartido
8. Agregar un carrito persistente (localStorage)
9. Crear un MFE de checkout completo

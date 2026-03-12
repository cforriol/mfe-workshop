# 🎯 EQUIPO 2 - Products MFE

## 📋 Tu Responsabilidad

Eres responsable del **Catálogo de Productos** de la aplicación. Este componente muestra todos los productos disponibles para comprar.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Tu aplicación estará disponible en: **http://localhost:3002**

## 📁 Archivos Principales

- `src/components/Products.js` - Lista de productos
- `src/components/ProductCard.js` - Tarjeta individual de producto
- `webpack.config.js` - Configuración de Module Federation

## 💡 Ideas para Mejorar

1. Agregar más productos al catálogo
2. Implementar categorías de productos
3. Agregar filtros (por precio, nombre, etc.)
4. Crear una vista de cuadrícula y lista
5. Agregar imágenes reales en lugar de emojis
6. Implementar búsqueda de productos
7. Agregar animaciones más llamativas

## 🔧 Modificar los Componentes

### Agregar nuevos productos

Edita `src/components/Products.js`:

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻' },
  { id: 5, name: 'Tablet', price: 499, emoji: '📱' }, // Nuevo
  // Agrega más...
];
```

### Personalizar las tarjetas

Edita `src/components/ProductCard.js` para cambiar el diseño de cada producto.

## ✅ Verificación

Una vez que tu servidor esté corriendo:
1. Abre http://localhost:3002 para ver tus componentes
2. Los cambios se verán automáticamente en el Host (http://localhost:3000)

## 🤝 Integración

Este MFE se expone como:
```javascript
exposes: {
  './Products': './src/components/Products'
}
```

Y es consumido por el Host como:
```javascript
import Products from 'products/Products';
```

---

¡Buena suerte! 🎉

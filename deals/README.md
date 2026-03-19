# 🎯 EQUIPO 3 - Cart MFE

## 📋 Tu Responsabilidad

Eres responsable del **Carrito de Compras** de la aplicación. Este componente muestra los productos que el usuario ha agregado y el total.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Tu aplicación estará disponible en: **http://localhost:3003**

## 📁 Archivos Principales

- `src/components/Cart.js` - Componente principal del carrito
- `src/components/CartItem.js` - Item individual en el carrito
- `webpack.config.js` - Configuración de Module Federation

## 💡 Ideas para Mejorar

1. Agregar botón para eliminar items del carrito
2. Implementar botones para aumentar/disminuir cantidad
3. Agregar un botón para vaciar el carrito completo
4. Mostrar descuentos o cupones
5. Agregar cálculo de impuestos
6. Implementar costos de envío
7. Agregar animaciones al agregar/eliminar items
8. Mostrar un resumen detallado del pedido

## 🔧 Modificar los Componentes

### Cambiar productos de ejemplo

Edita `src/components/Cart.js`:

```javascript
const [cartItems] = useState([
  { id: 1, name: 'Laptop', price: 999, quantity: 1, emoji: '💻' },
  // Agrega o modifica items...
]);
```

### Personalizar items del carrito

Edita `src/components/CartItem.js` para cambiar cómo se muestra cada producto en el carrito.

## 📝 Ejercicios Sugeridos

### Nivel Básico
- Cambiar colores y estilos
- Agregar más items al carrito

### Nivel Intermedio
- Implementar funcionalidad de eliminar items
- Agregar controles para cambiar cantidad (+/-)

### Nivel Avanzado
- Calcular y mostrar impuestos
- Agregar código de descuento
- Persistir carrito en localStorage

## ✅ Verificación

Una vez que tu servidor esté corriendo:
1. Abre http://localhost:3003 para ver tu componente
2. Los cambios se verán automáticamente en el Host (http://localhost:3000)

## 🤝 Integración

Este MFE se expone como:
```javascript
exposes: {
  './Cart': './src/components/Cart'
}
```

Y es consumido por el Host como:
```javascript
import Cart from 'cart/Cart';
```

---

¡Buena suerte! 🎉

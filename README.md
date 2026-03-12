# 🚀 Workshop de Module Federation con React

Workshop práctico de Microfrontends utilizando **Module Federation** de Webpack 5.

## 📁 Estructura del Proyecto

```
mfe-workshop/
├── host/           # Aplicación principal (Host)
├── header/         # MFE: Header (EQUIPO 1)
├── products/       # MFE: Productos (EQUIPO 2)
└── cart/           # MFE: Carrito (EQUIPO 3)
```

## 🎯 Objetivo del Workshop

Demostrar cómo diferentes equipos pueden trabajar de forma **independiente** en diferentes partes de una aplicación web usando Module Federation.

**La aplicación tiene 3 páginas:**
- **Inicio** (`/`): Página de bienvenida con tarjetas de navegación
- **Productos** (`/productos`): Catálogo de productos (MFE independiente)
- **Carrito** (`/carrito`): Carrito de compras (MFE independiente)

## 👥 División de Equipos

### **EQUIPO 1: Header** 
- **Puerto**: 3001
- **Carpeta**: `/header`
- **Responsabilidad**: Navegación y cabecera de la aplicación

### **EQUIPO 2: Products**
- **Puerto**: 3002
- **Carpeta**: `/products`
- **Responsabilidad**: Catálogo de productos y tarjetas de producto

### **EQUIPO 3: Cart**
- **Puerto**: 3003
- **Carpeta**: `/cart`
- **Responsabilidad**: Carrito de compras y checkout

### **Host Application**
- **Puerto**: 3000
- **Carpeta**: `/host`
- **Responsabilidad**: Orquestación y ensamblaje de todos los MFEs

## 🔧 Instalación

Cada equipo debe instalar las dependencias de su aplicación:

```bash
# EQUIPO 1
cd header
npm install

# EQUIPO 2
cd products
npm install

# EQUIPO 3
cd cart
npm install

# Host (coordinador del workshop)
cd host
npm install
```

## ▶️ Ejecución

### ⚠️ IMPORTANTE: Orden de inicio

**Debes iniciar los remotes ANTES que el host**

### Opción 1: Ejecución manual (RECOMENDADO para el workshop)

Abre 4 terminales separadas:

**Terminal 1 - Header:**
```bash
cd header
npm start
```
Espera a ver: `webpack compiled successfully`

**Terminal 2 - Products:**
```bash
cd products
npm start
```
Espera a ver: `webpack compiled successfully`

**Terminal 3 - Cart:**
```bash
cd cart
npm start
```
Espera a ver: `webpack compiled successfully`

**Terminal 4 - Host:**
```bash
cd host
npm start
```

Una vez que veas `webpack compiled successfully` en todas las terminales, abre:
**http://localhost:3000**

### Opción 2: Script automatizado

```bash
./start-all.sh
```

**Nota:** Este script inicia todo a la vez. Si ves pantalla en blanco, es mejor usar la Opción 1.

## 🌐 URLs de Desarrollo

- **Host App**: http://localhost:3000 (aplicación principal)
  - **Inicio**: http://localhost:3000/
  - **Productos**: http://localhost:3000/productos
  - **Carrito**: http://localhost:3000/carrito
- **Header MFE**: http://localhost:3001
- **Products MFE**: http://localhost:3002
- **Cart MFE**: http://localhost:3003

## 🏗️ Arquitectura Module Federation

### Host (webpack.config.js)
```javascript
remotes: {
  header: 'header@http://localhost:3001/remoteEntry.js',
  products: 'products@http://localhost:3002/remoteEntry.js',
  cart: 'cart@http://localhost:3003/remoteEntry.js',
}
```

### Remotes (webpack.config.js)
```javascript
exposes: {
  './ComponentName': './src/components/ComponentName'
}
```

## 💡 Conceptos Clave

1. **Host**: Aplicación que consume los microfrontends
2. **Remote**: Aplicación que expone componentes
3. **Shared Dependencies**: React y React-DOM compartidos entre todas las apps
4. **remoteEntry.js**: Archivo de entrada generado por Module Federation

## 🎨 Personalización para Equipos

Cada equipo puede modificar:

### EQUIPO 1 (Header)
- Archivo: `/header/src/components/Header.js`
- Ideas: Agregar logo, búsqueda, menú desplegable

### EQUIPO 2 (Products)
- Archivos: 
  - `/products/src/components/Products.js`
  - `/products/src/components/ProductCard.js`
- Ideas: Agregar más productos, filtros, categorías

### EQUIPO 3 (Cart)
- Archivos:
  - `/cart/src/components/Cart.js`
  - `/cart/src/components/CartItem.js`
- Ideas: Agregar funcionalidad eliminar, actualizar cantidad

## 🔄 Flujo de Trabajo

1. Cada equipo trabaja en su carpeta de forma **independiente**
2. Los cambios se reflejan en **tiempo real** (hot reload)
3. El host consume los componentes de forma **dinámica**
4. No hay necesidad de recompilar todas las aplicaciones

## 🐛 Troubleshooting

### Pantalla en blanco

1. **Verifica el orden de inicio**: Los remotes deben estar corriendo ANTES del host
2. **Abre la consola del navegador** (F12) y busca errores
3. **Verifica que todos compilen exitosamente**: Debes ver "webpack compiled successfully" en cada terminal
4. **Prueba cada MFE individualmente**: Abre cada URL por separado para verificar que funciona

### Error: "Cannot find module 'header/Header'"
- Verifica que el MFE de header esté corriendo en el puerto 3001
- Abre http://localhost:3001/remoteEntry.js - debes ver código JavaScript
- Asegúrate de que todos los MFEs estén ejecutándose **antes** del host

### Error de CORS
- Asegúrate de que todos los puertos coincidan con la configuración
- Verifica que webpack-dev-server esté configurado correctamente

### Hot Reload no funciona
- Reinicia el servidor de desarrollo
- Limpia la caché del navegador (Cmd+Shift+R / Ctrl+Shift+R)

### Más ayuda
Consulta el archivo [DEBUGGING.md](./DEBUGGING.md) para más detalles.

## 📚 Recursos

- [Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [React Docs](https://react.dev/)
- [Webpack 5 Docs](https://webpack.js.org/)

## 🎓 Ejercicios Propuestos

1. **EQUIPO 1**: Agregar un contador de items en el carrito en el header
2. **EQUIPO 2**: Implementar filtrado por categorías
3. **EQUIPO 3**: Agregar botones de eliminar y actualizar cantidad
4. **TODOS**: Compartir un estado global entre MFEs

---

**¡Listo para el workshop! 🎉**

Cada equipo puede desarrollar de forma independiente y ver los cambios en tiempo real en la aplicación principal.

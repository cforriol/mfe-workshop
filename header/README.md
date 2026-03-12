# 🎯 EQUIPO 1 - Header MFE

## 📋 Tu Responsabilidad

Eres responsable del **Header** (cabecera) de la aplicación. Este componente se mostrará en la parte superior de todas las páginas.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Tu aplicación estará disponible en: **http://localhost:3001**

## 📁 Archivos Principales

- `src/components/Header.js` - Componente principal del header
- `webpack.config.js` - Configuración de Module Federation

## 💡 Ideas para Mejorar

1. Agregar un logo de la empresa
2. Implementar un menú desplegable
3. Agregar una barra de búsqueda
4. Mostrar contador de items en el carrito (avanzado)
5. Agregar enlaces funcionales
6. Cambiar colores y estilos

## 🔧 Modificar el Componente

Edita el archivo `src/components/Header.js` para personalizar tu header.

## ✅ Verificación

Una vez que tu servidor esté corriendo:
1. Abre http://localhost:3001 para ver tu componente
2. Los cambios se verán automáticamente en el Host (http://localhost:3000)

## 🤝 Integración

Este MFE se expone como:
```javascript
exposes: {
  './Header': './src/components/Header'
}
```

Y es consumido por el Host como:
```javascript
import Header from 'header/Header';
```

---

¡Buena suerte! 🎉

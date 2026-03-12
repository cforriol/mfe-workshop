#!/bin/bash

echo "🚀 Iniciando Workshop de Module Federation..."
echo ""
echo "📦 EQUIPO 1 - Header MFE (Puerto 3001)"
echo "📦 EQUIPO 2 - Products MFE (Puerto 3002)"
echo "📦 EQUIPO 3 - Cart MFE (Puerto 3003)"
echo "🏠 Host Application (Puerto 3000)"
echo ""
echo "⏳ Iniciando todas las aplicaciones..."
echo ""

# Función para verificar si npm está instalado
check_npm() {
    if ! command -v npm &> /dev/null; then
        echo "❌ Error: npm no está instalado"
        exit 1
    fi
}

# Función para instalar dependencias si no existen
install_if_needed() {
    if [ ! -d "$1/node_modules" ]; then
        echo "📥 Instalando dependencias en $1..."
        (cd $1 && npm install)
    fi
}

# Obtener directorio base del script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

check_npm

# Instalar dependencias si es necesario
install_if_needed "$SCRIPT_DIR/header"
install_if_needed "$SCRIPT_DIR/products"
install_if_needed "$SCRIPT_DIR/cart"
install_if_needed "$SCRIPT_DIR/host"

echo ""
echo "✅ Dependencias verificadas"
echo ""

# Iniciar todos los servidores en segundo plano
(cd "$SCRIPT_DIR/header" && npm start) &
PID1=$!

(cd "$SCRIPT_DIR/products" && npm start) &
PID2=$!

(cd "$SCRIPT_DIR/cart" && npm start) &
PID3=$!

(cd "$SCRIPT_DIR/host" && npm start) &
PID4=$!

echo ""
echo "✅ Todas las aplicaciones están iniciando..."
echo ""
echo "🌐 URLs disponibles:"
echo "   - Host: http://localhost:3000"
echo "   - Header MFE: http://localhost:3001"
echo "   - Products MFE: http://localhost:3002"
echo "   - Cart MFE: http://localhost:3003"
echo ""
echo "⚠️  Espera unos segundos a que todas las apps compilen..."
echo ""
echo "Para detener todas las aplicaciones, presiona Ctrl+C"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo todas las aplicaciones..."
    kill $PID1 $PID2 $PID3 $PID4 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Mantener el script corriendo
wait

#!/bin/bash

echo "🔍 Verificando estado de los servidores MFE..."
echo ""

check_port() {
    local port=$1
    local name=$2
    if nc -z localhost $port 2>/dev/null; then
        echo "✅ $name está corriendo en puerto $port"
        return 0
    else
        echo "❌ $name NO está corriendo en puerto $port"
        return 1
    fi
}

echo "Verificando puertos..."
check_port 3001 "Header"
check_port 3002 "Products"
check_port 3003 "Cart"
check_port 3000 "Host"

echo ""
echo "Verificando remoteEntry.js..."

check_remote() {
    local port=$1
    local name=$2
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/remoteEntry.js | grep -q "200"; then
        echo "✅ $name remoteEntry.js está disponible"
    else
        echo "❌ $name remoteEntry.js NO está disponible"
    fi
}

if nc -z localhost 3001 2>/dev/null; then
    check_remote 3001 "Header"
fi

if nc -z localhost 3002 2>/dev/null; then
    check_remote 3002 "Products"
fi

if nc -z localhost 3003 2>/dev/null; then
    check_remote 3003 "Cart"
fi

echo ""
echo "💡 Para iniciar correctamente:"
echo "1. cd header && npm start"
echo "2. cd products && npm start"
echo "3. cd cart && npm start"
echo "4. cd host && npm start"

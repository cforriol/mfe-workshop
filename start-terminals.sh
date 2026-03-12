#!/bin/bash

echo "🚀 Script de Inicio Manual - Workshop MFE"
echo "==========================================="
echo ""
echo "Este script te guiará paso a paso"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo -e "${YELLOW}PASO 1: Iniciando Header MFE (Puerto 3001)${NC}"
echo "Abriendo nueva terminal para Header..."
osascript -e 'tell app "Terminal" to do script "cd '"$SCRIPT_DIR"'/header && npm start"'
echo "✅ Terminal abierta para Header"
echo ""
sleep 2

echo -e "${YELLOW}PASO 2: Iniciando Products MFE (Puerto 3002)${NC}"
echo "Abriendo nueva terminal para Products..."
osascript -e 'tell app "Terminal" to do script "cd '"$SCRIPT_DIR"'/products && npm start"'
echo "✅ Terminal abierta para Products"
echo ""
sleep 2

echo -e "${YELLOW}PASO 3: Iniciando Cart MFE (Puerto 3003)${NC}"
echo "Abriendo nueva terminal para Cart..."
osascript -e 'tell app "Terminal" to do script "cd '"$SCRIPT_DIR"'/cart && npm start"'
echo "✅ Terminal abierta para Cart"
echo ""
sleep 2

echo -e "${YELLOW}PASO 4: Esperando 10 segundos a que compilen...${NC}"
for i in {10..1}; do
    echo -n "$i..."
    sleep 1
done
echo ""
echo ""

echo -e "${YELLOW}PASO 5: Iniciando Host Application (Puerto 3000)${NC}"
echo "Abriendo nueva terminal para Host..."
osascript -e 'tell app "Terminal" to do script "cd '"$SCRIPT_DIR"'/host && npm start"'
echo "✅ Terminal abierta para Host"
echo ""

echo -e "${GREEN}==========================================="
echo "✅ TODOS LOS SERVIDORES INICIADOS"
echo "==========================================="
echo ""
echo "URLs disponibles:"
echo "  🏠 Host:     http://localhost:3000"
echo "  📋 Header:   http://localhost:3001"
echo "  📦 Products: http://localhost:3002"
echo "  🛒 Cart:     http://localhost:3003"
echo ""
echo "Espera a que todos muestren 'webpack compiled successfully'"
echo "Luego abre: http://localhost:3000"
echo -e "${NC}"

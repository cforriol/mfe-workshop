import React, { useState, useMemo, useEffect } from 'react';
import CartItem from './CartItem';
import { cartItems as initialCartItems } from '../data/cartData';

const SHIPPING_COST = 15.0;
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100.0;

// Cupones disponibles
const COUPONS = {
  'WELCOME10': { discount: 0.10, name: 'Descuento 10% - Bienvenida' },
  'SUMMER20': { discount: 0.20, name: 'Descuento 20% - Verano' },
  'SAVE5': { discount: 0.05, name: 'Descuento 5% - Promo' },
  'JISLAND' : { discount: 0.90, name: 'Descuento 90% - POR AMISTAD CON EL SEÑOR J' }
};

const mergeCartWithLatestData = (savedItems, latestItems) => {
  if (!Array.isArray(latestItems)) return [];
  if (!Array.isArray(savedItems)) return latestItems;

  const savedById = new Map(savedItems.map((item) => [item.id, item]));

  // Keeps latest product data while preserving user's quantity from cache when available.
  return latestItems.map((product) => {
    const saved = savedById.get(product.id);
    if (!saved) return product;

    return {
      ...product,
      quantity: typeof saved.quantity === 'number' && saved.quantity > 0
        ? saved.quantity
        : product.quantity,
    };
  });
};

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    if (!saved) return initialCartItems;

    try {
      const parsed = JSON.parse(saved);
      return mergeCartWithLatestData(parsed, initialCartItems);
    } catch {
      return initialCartItems;
    }
  });
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [recentlyRemoved, setRecentlyRemoved] = useState(() => {
    const saved = localStorage.getItem('recentlyRemoved');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('recentlyRemoved', JSON.stringify(recentlyRemoved));
  }, [recentlyRemoved]);

  const handleRemove = (id) => {
    const removedItem = cartItems.find((item) => item.id === id);
    if (!removedItem) return;

    setRecentlyRemoved((prev) => [
      { ...removedItem, removedAt: Date.now() },
      ...prev.filter((item) => item.id !== id)
    ]);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRestore = (itemToRestore) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemToRestore.id);
      if (existing) {
        return prev.map((item) =>
          item.id === itemToRestore.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...itemToRestore, quantity: 1 }];
    });

    setRecentlyRemoved((prev) => prev.filter((item) => item.id !== itemToRestore.id));
  };

  const handleRestoreAll = () => {
    setCartItems((prev) => {
      const byId = new Map(prev.map((item) => [item.id, item]));

      recentlyRemoved.forEach((removedItem) => {
        const existing = byId.get(removedItem.id);
        if (existing) {
          byId.set(removedItem.id, {
            ...existing,
            quantity: existing.quantity + 1,
          });
        } else {
          byId.set(removedItem.id, { ...removedItem, quantity: 1 });
        }
      });

      return Array.from(byId.values());
    });

    setRecentlyRemoved([]);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Ingresa un código');
      return;
    }

    if (COUPONS[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Código no válido. Prueba: WELCOME10, SUMMER20, SAVE5');
    }
  };

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // Descuento por cupón
    const couponDiscount = appliedCoupon 
      ? subtotal * COUPONS[appliedCoupon].discount 
      : 0;
    
    const subtotalAfterCoupon = subtotal - couponDiscount;
    
    // Envío gratuito si subtotal >= $100
    const shipping = subtotalAfterCoupon >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    
    const tax = subtotalAfterCoupon * TAX_RATE;
    const total = subtotalAfterCoupon + shipping + tax;
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return { 
      subtotal, 
      couponDiscount, 
      subtotalAfterCoupon,
      shipping, 
      tax, 
      total, 
      itemsCount,
      savings: couponDiscount + (shipping === 0 ? SHIPPING_COST : 0)
    };
  }, [cartItems, appliedCoupon]);

  const recentlyRemovedPanel = recentlyRemoved.length > 0 ? (
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-blue-900">
          ↩️ Productos removidos (puedes restaurarlos en cualquier momento):
        </p>
        <button
          onClick={handleRestoreAll}
          className="rounded bg-blue-700 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-blue-800 cursor-pointer"
        >
          Restaurar todo
        </button>
      </div>
      <div className="space-y-2">
        {recentlyRemoved.map((item) => (
          <button
            key={`${item.id}-${item.removedAt}`}
            onClick={() => handleRestore(item)}
            className="block w-full cursor-pointer rounded bg-white px-3 py-2 text-left text-sm text-blue-700 transition-colors hover:bg-blue-100"
          >
            {item.emoji} {item.name} - Restaurar
          </button>
        ))}
      </div>
    </div>
  ) : null;

  // Estado vacío
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-6xl">🛒</span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Tu carrito está vacío
          </h2>
          <p className="mt-2 text-gray-500">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          {recentlyRemovedPanel}
          <button className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer">
            Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          🛒 Carrito de Compras
        </h1>
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
          {summary.itemsCount} {summary.itemsCount === 1 ? 'artículo' : 'artículos'}
        </span>
      </div>

      {/* Alerta de ahorro */}
      {summary.savings > 0 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <p className="text-sm font-medium text-green-800">
            ¡Estás ahorrando ${summary.savings.toFixed(2)}!
          </p>
        </div>
      )}

      {recentlyRemovedPanel}

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Lista de productos */}
        <section className="lg:col-span-7">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </ul>
        </section>

        {/* Resumen de compra */}
        <section className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="rounded-xl bg-gray-50 px-6 py-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resumen del pedido
            </h2>
            <p className="-mt-3 mb-5 text-xs text-gray-600">
              Envio gratis a partir de ${FREE_SHIPPING_THRESHOLD.toFixed(0)}.
            </p>

            {/* Cupón */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de cupón
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError('');
                  }}
                  placeholder="Ej: WELCOME10"
                  disabled={appliedCoupon !== null}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={appliedCoupon !== null}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors disabled:bg-gray-400 cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
              {couponError && (
                <p className="mt-2 text-xs text-red-600">{couponError}</p>
              )}
              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                  <span className="text-xs font-medium text-green-700">
                    ✓ {COUPONS[appliedCoupon].name}
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>

            {/* Desglose de costos */}
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${summary.subtotal.toFixed(2)}
                </dd>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-green-50 -mx-3 px-3 py-2 rounded">
                  <dt className="text-sm font-medium text-green-700">
                    Descuento ({(COUPONS[appliedCoupon].discount * 100).toFixed(0)}%)
                  </dt>
                  <dd className="text-sm font-medium text-green-700">
                    -${summary.couponDiscount.toFixed(2)}
                  </dd>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">
                  Envío
                  {summary.shipping === 0 && (
                    <span className="ml-1 text-xs font-semibold text-green-600">
                      (¡GRATIS!)
                    </span>
                  )}
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {summary.shipping === 0 ? (
                    <span className="text-green-600">$0.00</span>
                  ) : (
                    `$${summary.shipping.toFixed(2)}`
                  )}
                </dd>
              </div>

              {summary.shipping > 0 && (
                <p className="text-xs text-gray-500 text-center">
                  Compra ${(FREE_SHIPPING_THRESHOLD - summary.subtotalAfterCoupon).toFixed(2)} más para envío gratis
                </p>
              )}

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Impuestos (8%)</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${summary.tax.toFixed(2)}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-indigo-600">
                  ${summary.total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button className="mt-6 w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer">
              Proceder al pago
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              📦 Envio gratis a partir de $100. Entrega en 2-3 dias habiles.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;

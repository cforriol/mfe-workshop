import React, { useState, useMemo, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
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

const ROULETTE_OUTCOMES = [
  { id: 'FREE_TOTAL', label: 'Carrito gratis', weight: 1, kind: 'discount' },
  { id: 'DOUBLE_TOTAL', label: 'Precio x2', weight: 5, kind: 'penalty' },
  { id: 'SURCHARGE_25', label: 'Recargo +$25', weight: 50, kind: 'penalty' },
  { id: 'DISCOUNT_30', label: '30% extra de descuento', weight: 8, kind: 'discount' },
  { id: 'DISCOUNT_15', label: '15% extra de descuento', weight: 14, kind: 'discount' },
  { id: 'DISCOUNT_10', label: '10% extra de descuento', weight: 18, kind: 'discount' },
  { id: 'FREE_SHIPPING', label: 'Envio gratis', weight: 15, kind: 'perk' },
  { id: 'TAX_FREE', label: 'Sin impuestos', weight: 10, kind: 'perk' },
  { id: 'GIFT_WRAP', label: 'Empaquetado premium gratis', weight: 8, kind: 'perk' },
  { id: 'LOYALTY', label: '+200 puntos de fidelidad', weight: 9, kind: 'perk' },
  { id: 'NO_PRIZE', label: 'Sin premio', weight: 6, kind: 'neutral' },
  { id: 'NO_CHANGE', label: 'Sin cambios', weight: 12, kind: 'neutral' },
];

const ROULETTE_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'
];

const ROULETTE_DATA = ROULETTE_OUTCOMES.map((outcome) => ({ option: outcome.label }));

const pickRouletteOutcome = () => {
  const totalWeight = ROULETTE_OUTCOMES.reduce((sum, outcome) => sum + outcome.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const outcome of ROULETTE_OUTCOMES) {
    roll -= outcome.weight;
    if (roll <= 0) return outcome;
  }

  return ROULETTE_OUTCOMES[ROULETTE_OUTCOMES.length - 1];
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [pendingSpinResult, setPendingSpinResult] = useState(null);
  const [spinFeeTotal, setSpinFeeTotal] = useState(() => {
    const saved = localStorage.getItem('spinFeeTotal');
    return saved ? JSON.parse(saved) : 0;
  });
  const [permanentSurchargeTotal, setPermanentSurchargeTotal] = useState(() => {
    const saved = localStorage.getItem('permanentSurchargeTotal');
    return saved ? JSON.parse(saved) : 0;
  });
  const [spinResult, setSpinResult] = useState(() => {
    const saved = localStorage.getItem('spinResult');
    return saved ? JSON.parse(saved) : null;
  });
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

  useEffect(() => {
    localStorage.setItem('spinResult', JSON.stringify(spinResult));
  }, [spinResult]);

  useEffect(() => {
    localStorage.setItem('spinFeeTotal', JSON.stringify(spinFeeTotal));
  }, [spinFeeTotal]);

  useEffect(() => {
    localStorage.setItem('permanentSurchargeTotal', JSON.stringify(permanentSurchargeTotal));
  }, [permanentSurchargeTotal]);

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

  const handleSpin = () => {
    if (isSpinning || mustSpin) return;

    const result = pickRouletteOutcome();
    const resultIndex = ROULETTE_OUTCOMES.findIndex((outcome) => outcome.id === result.id);

    setIsSpinning(true);
    setSpinFeeTotal((prev) => prev + 1);
    setPendingSpinResult(result);
    setPrizeNumber(resultIndex);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    setIsSpinning(false);
    if (pendingSpinResult) {
      if (pendingSpinResult.id === 'SURCHARGE_25') {
        setPermanentSurchargeTotal((prev) => prev + 25);
      }
      setSpinResult({ ...pendingSpinResult, timestamp: Date.now() });
      setPendingSpinResult(null);
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
    const baseShipping = subtotalAfterCoupon >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    let shipping = baseShipping;
    let tax = subtotalAfterCoupon * TAX_RATE;

    if (spinResult?.id === 'FREE_SHIPPING') {
      shipping = 0;
    }

    if (spinResult?.id === 'TAX_FREE') {
      tax = 0;
    }

    const preSpinTotal = subtotalAfterCoupon + shipping + tax;
    let total = preSpinTotal;

    if (spinResult?.id === 'FREE_TOTAL') {
      total = 0;
    }

    if (spinResult?.id === 'DOUBLE_TOTAL') {
      total = preSpinTotal * 2;
    }

    if (spinResult?.id === 'DISCOUNT_30') {
      total = preSpinTotal * 0.7;
    }

    if (spinResult?.id === 'DISCOUNT_15') {
      total = preSpinTotal * 0.85;
    }

    if (spinResult?.id === 'DISCOUNT_10') {
      total = preSpinTotal * 0.9;
    }

    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const spinDelta = preSpinTotal - total;
    const couponAndShippingSavings = couponDiscount + (baseShipping === 0 ? SHIPPING_COST : 0);
    const spinSavings = Math.max(0, spinDelta);
    const totalWithCharges = total + spinFeeTotal + permanentSurchargeTotal;
    
    return { 
      subtotal, 
      couponDiscount, 
      subtotalAfterCoupon,
      shipping, 
      tax, 
      total: totalWithCharges,
      itemsCount,
      spinDelta,
      spinFeeTotal,
      permanentSurchargeTotal,
      spinLabel: spinResult?.label || null,
      savings: couponAndShippingSavings + spinSavings
    };
  }, [cartItems, appliedCoupon, spinResult, spinFeeTotal, permanentSurchargeTotal]);

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

            {/* Ruleta */}
            <div className="mb-6 rounded-xl border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-amber-50 to-cyan-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-fuchsia-900">
                    🎰 Ruleta de perks
                  </p>
                  <p className="mt-1 text-xs text-fuchsia-800">
                    Premio top: 1% carrito gratis. También hay negativas y opciones sin premio.
                  </p>
                </div>
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="rounded bg-fuchsia-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSpinning ? 'Girando...' : spinResult ? 'Volver a girar' : 'Girar ruleta'}
                </button>
              </div>

              <div className="relative mx-auto mt-4 w-fit">
                {/* Luces */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-72 w-72 -translate-x-1/2 -translate-y-1/2">
                  {[...Array(20)].map((_, index) => (
                    <span
                      key={`light-${index}`}
                      className={`absolute left-1/2 top-1/2 block h-2.5 w-2.5 rounded-full ${isSpinning ? 'animate-pulse' : ''} ${index % 2 === 0 ? 'bg-yellow-300' : 'bg-pink-300'}`}
                      style={{
                        transform: `rotate(${index * 18}deg) translate(0, -142px)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 overflow-hidden rounded-full border-8 border-white shadow-[0_12px_45px_rgba(236,72,153,0.35)]">
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={ROULETTE_DATA}
                    onStopSpinning={handleSpinEnd}
                    spinDuration={0.35}
                    radiusLineColor="#ffffff"
                    radiusLineWidth={2}
                    fontSize={12}
                    textColors={["#ffffff"]}
                    backgroundColors={ROULETTE_COLORS}
                    outerBorderColor="#ffffff"
                    outerBorderWidth={6}
                    innerBorderColor="#ffffff"
                    innerBorderWidth={1}
                    innerRadius={12}
                    perpendicularText={false}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className={`text-lg ${isSpinning ? 'animate-bounce' : ''}`}>🎯</span>
                <p className="text-sm text-fuchsia-900">
                  {spinResult ? (
                    <>
                      Premio actual: <span className="font-semibold">{spinResult.label}</span>
                    </>
                  ) : (
                    'Aun no has girado la ruleta.'
                  )}
                </p>
              </div>
              <p className="mt-2 text-xs text-fuchsia-800">
                Cada giro cuesta <span className="font-semibold">$1</span>. Acumulado: <span className="font-semibold">${spinFeeTotal.toFixed(2)}</span>
              </p>
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

              {summary.spinLabel && (
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Ruleta ({summary.spinLabel})</dt>
                  <dd className={`text-sm font-medium ${summary.spinDelta >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {summary.spinDelta === 0
                      ? '$0.00'
                      : summary.spinDelta > 0
                        ? `-$${summary.spinDelta.toFixed(2)}`
                        : `+$${Math.abs(summary.spinDelta).toFixed(2)}`}
                  </dd>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Costo de giros acumulado</dt>
                <dd className="text-sm font-medium text-red-700">
                  +${summary.spinFeeTotal.toFixed(2)}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Recargo permanente (+$25)</dt>
                <dd className="text-sm font-medium text-red-700">
                  +${summary.permanentSurchargeTotal.toFixed(2)}
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

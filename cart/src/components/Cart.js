import React, { useState, useMemo } from 'react';
import CartItem from './CartItem';
import { cartItems as initialCartItems } from '../data/cartData';

const SHIPPING_COST = 15.0;
const TAX_RATE = 0.08;

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, shipping, tax, total, itemsCount };
  }, [cartItems]);

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
            <h2 className="text-lg font-semibold text-gray-900">
              Resumen del pedido
            </h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${summary.subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Envío</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${summary.shipping.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Impuestos (8%)</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${summary.tax.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-gray-900">
                  ${summary.total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button className="mt-6 w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer">
              Proceder al pago
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Envío gratuito en compras mayores a $100 🚚
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;

import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <li className="flex py-6 sm:py-8">
      <div className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="size-24 rounded-lg object-cover sm:size-32"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {item.emoji} {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              ${item.price.toFixed(2)} c/u
            </p>
          </div>
          <p className="text-base font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg cursor-pointer"
            >
              −
            </button>
            <span className="px-4 py-1 text-sm font-medium text-gray-900 border-x border-gray-300">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

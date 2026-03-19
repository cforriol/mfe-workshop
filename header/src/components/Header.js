import React, { useState } from 'react';
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { userData } from '../data/userData'

const navigation = [
  { name: '🏠 Inicio', href: '/' },
  { name: '🛍️ Productos', href: '/productos' },
  { name: '🛒 Carrito', href: '/carrito' },
  { name: '🎁 Ofertas', href: '/ofertas' },
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [avatarExpanded, setAvatarExpanded] = useState(false)

  return (
    <header className="bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-white">🛍️ Mi Tienda MFE</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="relative text-sm/6 font-semibold text-white">
              {item.name}
              {item.href === '/carrito' && userData.cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-4 flex size-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                  {userData.cartItemsCount}
                </span>
              )}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-3">
          <button type="button" onClick={() => setAvatarExpanded(true)} className="cursor-pointer">
            <img
              alt={userData.name}
              src={userData.avatar}
              className="size-8 rounded-full"
            />
          </button>
          <span className="text-sm font-semibold text-white">{userData.name}</span>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-white">🛍️ Mi Tienda MFE</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    {item.name}
                    {item.href === '/carrito' && userData.cartItemsCount > 0 && (
                      <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                        {userData.cartItemsCount}
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <div className="flex items-center gap-x-3 -mx-3 px-3">
                  <button type="button" onClick={() => { setMobileMenuOpen(false); setAvatarExpanded(true); }} className="cursor-pointer">
                    <img
                      alt={userData.name}
                      src={userData.avatar}
                      className="size-8 rounded-full"
                    />
                  </button>
                  <span className="text-base/7 font-semibold text-white">{userData.name}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {avatarExpanded && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          onClick={() => setAvatarExpanded(false)}
        >
          <img
            alt={userData.name}
            src={userData.avatar}
            className="size-64 rounded-full object-cover shadow-2xl"
          />
        </div>
      )}
    </header>
  );
};

export default Header;

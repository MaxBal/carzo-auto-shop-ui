import { useState, useEffect } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from './CartDrawer';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="fixed inset-x-0 top-0 h-16 z-50 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-full">
          {/* Mobile burger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <a 
            href="/" 
            className="text-xl md:text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            Carzo
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/80">
            <a href="#" className="hover:text-white transition-colors">Головна сторінка</a>
            <a href="#" className="hover:text-white transition-colors">Автокейси</a>
            <a href="#" className="hover:text-white transition-colors">Накидки в салон</a>
            <a href="#" className="hover:text-white transition-colors">Автокилимки</a>
            <a href="#" className="hover:text-white transition-colors">Контакти</a>
          </nav>

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-white hover:opacity-80 transition-opacity"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
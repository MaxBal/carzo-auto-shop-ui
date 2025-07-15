import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from './CartDrawer';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 h-14 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-body/90 backdrop-blur-sm' : 'bg-body'
      }`}>
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
          {/* Mobile burger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-1 text-center">
            <h1 className="text-white font-bold text-lg leading-[56px] hover:text-brand transition-colors cursor-pointer">
              Carzo
            </h1>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex gap-6 text-white text-sm absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="hover:text-brand transition-colors">Головна сторінка</a>
            <a href="#" className="hover:text-brand transition-colors">Автокейси</a>
            <a href="#" className="hover:text-brand transition-colors">Накидки в салон</a>
            <a href="#" className="hover:text-brand transition-colors">Автокилимки</a>
            <a href="#" className="hover:text-brand transition-colors">Контакти</a>
          </nav>

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-white ml-auto lg:ml-0"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-[10px] flex items-center justify-center rounded-full text-white font-medium">
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
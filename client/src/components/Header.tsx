import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from './CartDrawer';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isCatalogOpen) {
        setIsCatalogOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCatalogOpen]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="fixed inset-x-0 top-0 h-14 z-50 bg-black" style={{ position: 'fixed' }}>
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
          {/* Mobile burger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white flex flex-col gap-1"
          >
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>

          {/* Logo */}
          <div className="lg:flex-none lg:mr-8">
            <Link href="/">
              <h1 className="text-white font-bold text-lg leading-[56px] hover:text-white/80 transition-colors cursor-pointer">
                Carzo
              </h1>
            </Link>
          </div>

          {/* Desktop navigation - centered */}
          <nav className="hidden lg:flex gap-10 text-white text-base flex-1 justify-center relative">
            <Link href="/" className="hover:text-[#00d5b5] transition-colors">Головна</Link>
            
            {/* Catalog with dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCatalogOpen(!isCatalogOpen);
                }}
                className="hover:text-[#00d5b5] transition-colors flex items-center gap-1"
              >
                Каталог
                <ChevronDown size={16} className={`transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCatalogOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black rounded-md shadow-lg py-2 min-w-[200px] z-50 border border-white/20">
                  <Link href="/" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-[#00d5b5] transition-colors">
                    Автокейси
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-[#00d5b5] transition-colors">
                    Автокилимки
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-[#00d5b5] transition-colors">
                    Накидки в салон
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-[#00d5b5] transition-colors">
                    Захист спинки сидіння
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="#" className="hover:text-[#00d5b5] transition-colors">B2B</Link>
            <Link href="#" className="hover:text-[#00d5b5] transition-colors">Контакти</Link>
          </nav>

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-white"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d5b5] text-white text-[10px] flex items-center justify-center rounded-full font-medium">
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
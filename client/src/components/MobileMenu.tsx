import { X, ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Link } from 'wouter';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);
  
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top bar */}
      <div className="h-14 flex items-center justify-start px-4">
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      {/* Navigation links - left aligned on mobile */}
      <div className="flex-1 flex flex-col justify-start items-start px-4 pt-8 text-white text-xl">
        <Link href="/" className="hover:text-[#00d5b5] transition-colors py-4 border-b border-white/10 w-full" onClick={onClose}>
          Головна
        </Link>
        
        {/* Catalog with collapsible dropdown */}
        <div className="w-full border-b border-white/10">
          <button 
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            className="font-medium py-4 flex items-center gap-2 hover:text-[#00d5b5] transition-colors w-full"
          >
            Каталог
            <ChevronDown size={20} className={`transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isCatalogOpen && (
            <div className="flex flex-col pb-4">
              <Link href="/" className="hover:text-[#00d5b5] transition-colors py-3 pl-4 text-lg border-b border-white/5" onClick={onClose}>
                Автокейси
              </Link>
              <Link href="/" className="hover:text-[#00d5b5] transition-colors py-3 pl-4 text-lg border-b border-white/5" onClick={onClose}>
                Автокилимки
              </Link>
              <Link href="/" className="hover:text-[#00d5b5] transition-colors py-3 pl-4 text-lg border-b border-white/5" onClick={onClose}>
                Накидки в салон
              </Link>
              <Link href="/" className="hover:text-[#00d5b5] transition-colors py-3 pl-4 text-lg" onClick={onClose}>
                Захист спинки сидіння
              </Link>
            </div>
          )}
        </div>
        
        <Link href="#" className="hover:text-[#00d5b5] transition-colors py-4 border-b border-white/10 w-full" onClick={onClose}>
          B2B
        </Link>
        <Link href="#" className="hover:text-[#00d5b5] transition-colors py-4 w-full" onClick={onClose}>
          Контакти
        </Link>
      </div>

      {/* Footer */}
      <div className="text-sm mb-4 text-center">
        <span className="ukraine-text font-medium">
          Designed and manufactured in Ukraine
        </span>
      </div>
    </div>,
    document.body
  );
};
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-body/90 backdrop-blur-sm z-50 flex flex-col">
      {/* Top bar */}
      <div className="h-14 flex items-center justify-start px-4">
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      {/* Navigation links */}
      <div className="flex-1 flex flex-col gap-6 justify-center items-center text-white text-xl">
        <a href="#" className="hover:text-brand transition-colors" onClick={onClose}>
          Головна сторінка
        </a>
        <a href="#" className="hover:text-brand transition-colors" onClick={onClose}>
          Автокейси
        </a>
        <a href="#" className="hover:text-brand transition-colors" onClick={onClose}>
          Накидки в салон
        </a>
        <a href="#" className="hover:text-brand transition-colors" onClick={onClose}>
          Автокилимки
        </a>
        <a href="#" className="hover:text-brand transition-colors" onClick={onClose}>
          Контакти
        </a>
      </div>

      {/* Footer */}
      <div className="text-xs text-white/70 mb-4 text-center">
        Designed and manufactured in Ukraine
      </div>
    </div>,
    document.body
  );
};
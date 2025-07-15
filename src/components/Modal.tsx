
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal = ({ isOpen, onClose, title, children, width = "400px" }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex lg:items-center lg:justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="lg:bg-white lg:rounded-xl lg:shadow-xl lg:min-h-0 lg:max-h-[90vh] w-full h-full lg:w-auto lg:h-auto bg-white lg:static fixed bottom-0 left-0 right-0 lg:max-w-[90vw] rounded-t-3xl lg:rounded-3xl max-h-[80vh] lg:max-h-[90vh] animate-slide-in-right lg:animate-scale-in flex flex-col"
           style={{ width: window.innerWidth > 1024 ? width : "100vw", maxWidth: "100vw" }}>
        <div className="p-4 lg:p-6 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

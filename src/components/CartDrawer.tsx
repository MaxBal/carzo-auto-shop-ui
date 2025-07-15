import { X, ShoppingBag, Minus, Plus } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCart } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose}></div>
      <div className="fixed lg:top-0 lg:right-0 lg:h-full lg:w-[360px] bg-white shadow-xl z-50 flex flex-col w-full h-[80vh] bottom-0 top-auto rounded-t-3xl lg:rounded-none animate-slide-in-right">
        {/* Header */}
        <div className="p-4 text-lg font-semibold flex justify-between items-center border-b">
          <span>Ваш кошик</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-dim">
            <ShoppingBag size={40} />
            <p>Ваш кошик порожній</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="mx-4 my-2 p-4 border rounded-lg flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-xs text-dim mt-1">
                      {Object.entries(item.options)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(' | ')}
                    </p>
                    
                    {/* Quantity controller */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="font-semibold">
                    {item.price * item.quantity} ₴
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t">
              <div className="flex justify-between items-center">
                <span>Всього</span>
                <span className="text-lg font-bold">{getTotalPrice()} ₴</span>
              </div>
              <button 
                onClick={() => window.location.href = '/checkout'}
                className="w-full h-11 mt-4 bg-[#00d1b3] text-white rounded-full font-medium hover:bg-[#00d1b3]/90 transition-colors"
              >
                Перейти до оформлення
              </button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
};
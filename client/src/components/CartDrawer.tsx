import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCart } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose}></div>
      <div className="fixed lg:top-0 lg:right-0 lg:h-full lg:w-[480px] bg-white shadow-xl z-50 flex flex-col w-full h-[80vh] bottom-0 top-auto rounded-t-3xl lg:rounded-none animate-slide-in-right">
        {/* Header */}
        <div className="p-6 text-xl font-semibold flex justify-between items-center border-b">
          <span>Кошик</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-500">
            <ShoppingBag size={48} />
            <p className="text-lg">Ваш кошик порожній</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="mx-6 my-4 p-5 flex items-start gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-lg mb-3 leading-tight">{item.name}</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      {Object.entries(item.options)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => {
                          const labelMap: { [key: string]: string } = {
                            design: 'Design',
                            size: 'Size',
                            logo: 'Logo',
                            color: 'Color',
                            fixation: 'Fixation'
                          };
                          return (
                            <div key={key} className="flex items-start">
                              <span className="font-normal min-w-[80px] flex-shrink-0">{labelMap[key] || key}:</span>
                              <span className="text-gray-800 ml-3 leading-tight break-words">{value}</span>
                            </div>
                          );
                        })}
                    </div>
                    
                    {/* Quantity controller and remove button */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Видалити товар"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="font-semibold text-xl flex-shrink-0 ml-3">
                    {item.price * item.quantity} ₴
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg">Всього</span>
                <span className="text-xl font-bold">{getTotalPrice()} ₴</span>
              </div>
              <button 
                onClick={() => window.location.href = '/checkout'}
                className="w-full h-12 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg"
              >
                Оформити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
};
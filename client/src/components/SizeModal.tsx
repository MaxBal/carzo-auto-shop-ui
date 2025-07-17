import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import compartmentsImg from '@assets/Розмір1_1752763072260.jpg';
import pocketsImg from '@assets/Розмір2_1752763072260.jpg';
import waterproofImg from '@assets/buildgifcom-1584679_1752763072260.gif';

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: string;
}

export const SizeModal = ({ isOpen, onClose, size }: SizeModalProps) => {
  const [activeTab, setActiveTab] = useState<'inside' | 'faq'>('inside');

  // Блокування прокручування фону при відкритті модалки
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="lg:bg-black lg:rounded-2xl lg:shadow-2xl w-full h-auto lg:w-auto lg:h-auto bg-black lg:static fixed bottom-0 left-0 right-0 lg:max-w-[700px] rounded-t-xl lg:rounded-2xl max-h-[90vh] lg:max-h-[95vh] animate-slide-in-right lg:animate-scale-in flex flex-col lg:mx-4 overflow-hidden"
        style={{ width: window.innerWidth > 1024 ? "700px" : "100vw", maxWidth: "100vw", minHeight: window.innerWidth > 1024 ? "600px" : "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 pb-2 lg:p-6 lg:pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Розмір {size}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-300 transition-colors p-1">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 px-4 lg:px-6 flex-shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('inside');
            }}
            className={`py-3 px-1 mr-8 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'inside'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Що в середині в розмірі {size}?
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('faq');
            }}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'faq'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Часті питання
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-8 lg:pb-10">
          {activeTab === 'inside' && (
            <div className="space-y-8">
              {/* Перегородки */}
              <div>
                <div className="mb-4">
                  <img 
                    src={compartmentsImg} 
                    alt="Перегородки в кейсі" 
                    className="w-full h-48 lg:h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Перегородки</h3>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  На перегородках присутні кармани для дрібних аксесуарів, перегородки можливо переміщувати 
                  по всій ширині кейсу, тим самим регулюючі 3 відділення так як вам потрібно.
                </p>
              </div>

              {/* Резинки на бокових дверцятах */}
              <div>
                <div className="mb-4">
                  <img 
                    src={pocketsImg} 
                    alt="Резинки на бокових дверцятах" 
                    className="w-full h-48 lg:h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Резинки на бокових дверцятах</h3>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  Для фіксації аксесуарів в вертикальному положені.
                </p>
              </div>

              {/* Захист багажнику */}
              <div>
                <div className="mb-4">
                  <img 
                    src={waterproofImg} 
                    alt="Захист багажнику" 
                    className="w-full h-48 lg:h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Захист багажнику</h3>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  Всередині непромокаюча підкладка, яка у разі розливу буде захищати багажник авто від рідини.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              {/* Info Block */}
              <div className="bg-[#00d5b5]/10 border border-[#00d5b5]/30 rounded-lg p-4 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00d5b5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Розміри між собою відрізняються шириною та кількістю перегородок. 
                  Висота та глибина у всіх розмірах складає 30 та 30 см.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи можливо змінити ширину на нестандартну?
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  Так, будь-який розмір від мінімум 35 см до 100 см. Кінцеву вартість Вам повідомить менеджер.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи можливо змінити висоту чи глибину?
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  Ні, зазначені сторони являються незмінними.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Який розмір мені підійде?
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  Це все залежить від ваших потреб, розмір М та L являються лідерами продажів.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
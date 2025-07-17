import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface FixationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FixationModal = ({ isOpen, onClose }: FixationModalProps) => {
  const [activeTab, setActiveTab] = useState<'types' | 'faq'>('types');

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
        className="lg:bg-white lg:rounded-2xl lg:shadow-2xl w-full h-auto lg:w-auto lg:h-auto bg-white lg:static fixed bottom-0 left-0 right-0 lg:max-w-[80vw] rounded-t-xl lg:rounded-2xl max-h-[90vh] lg:max-h-[95vh] animate-slide-in-right lg:animate-scale-in flex flex-col lg:mx-4 overflow-hidden"
        style={{ width: window.innerWidth > 1024 ? "80vw" : "100vw", maxWidth: "100vw", minHeight: window.innerWidth > 1024 ? "600px" : "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 pb-2 lg:p-6 lg:pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Фіксація з багажником</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors p-1">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#3d3d3d] px-4 lg:px-6 flex-shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('types');
            }}
            className={`py-3 px-1 mr-8 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'types'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Види фіксації
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('faq');
            }}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'faq'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Часті питання
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-12 lg:pb-16">
          {activeTab === 'types' && (
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
              {/* Фіксація на дні */}
              <div>
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Фіксація на дні багажника</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Фіксація на дні</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Спеціальні липучки кріпляться до дна багажника, забезпечуючи надійну фіксацію кейсу. 
                  Підходить для більшості автомобілів з рівним дном багажника.
                </p>
              </div>

              {/* Фіксація на стінці */}
              <div>
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Фіксація на стінці</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Фіксація на стінці</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Кріплення до бокової стінки багажника за допомогою регульованих ременів. 
                  Ідеальний варіант для хетчбеків та універсалів.
                </p>
              </div>

              {/* Універсальна фіксація */}
              <div className="lg:col-span-1 lg:col-start-1 lg:mt-12">
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Універсальна система</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Універсальна система</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Комбінована система фіксації, що поєднує кріплення на дні та стінці. 
                  Максимальна надійність для будь-яких умов експлуатації.
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
                <p className="text-gray-700 text-sm leading-relaxed">
                  Система фіксації входить у комплект та встановлюється безкоштовно. 
                  Вибір типу фіксації залежить від моделі вашого автомобіля.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи пошкоджує фіксація оббивку багажника?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Ні, всі елементи фіксації мають м'які накладки та не залишають слідів на оббивці. 
                  Після зняття кейсу багажник залишається в первинному стані.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Як швидко встановлюється система?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Встановлення займає 2-3 хвилини. У комплекті є детальна інструкція та всі 
                  необхідні кріпильні елементи. Не потрібні додаткові інструменти.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи можна використовувати без фіксації?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Так, кейс можна використовувати і без фіксації. Однак для безпеки рекомендуємо 
                  використовувати систему кріплення, особливо при активній їзді.
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
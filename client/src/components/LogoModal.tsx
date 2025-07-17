import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoModal = ({ isOpen, onClose }: LogoModalProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'faq'>('details');

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
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Про логотип</h2>
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
              setActiveTab('details');
            }}
            className={`py-3 px-1 mr-8 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'details'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Детальна інформація
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
          {activeTab === 'details' && (
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
              {/* Якість гравірування */}
              <div>
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Зображення якості гравірування</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Висока якість гравірування</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Лазерне гравірування забезпечує точне та стійке нанесення логотипу вашої марки автомобіля. 
                  Зображення не стирається та залишається чітким протягом усього терміну експлуатації.
                </p>
              </div>

              {/* Розміщення логотипу */}
              <div>
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Схема розміщення логотипу</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Оптимальне розміщення</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Логотип розміщується на верхній кришці кейсу по центру. Розмір логотипу підбирається 
                  індивідуально залежно від розміру кейсу для найкращого візуального ефекту.
                </p>
              </div>

              {/* Підтримка марок */}
              <div className="lg:col-span-1 lg:col-start-1 lg:mt-12">
                <div className="mb-4 lg:mx-2">
                  <div className="w-full h-48 lg:h-60 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Логотипи різних марок</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Підтримка всіх марок</h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Ми можемо нанести логотип будь-якої марки автомобіля. Маємо в базі логотипи всіх 
                  популярних виробників та можемо підготувати індивідуальне зображення на замовлення.
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
                  Логотип наноситься безкоштовно для всіх замовлень. Ви можете обрати будь-яку марку 
                  автомобіля або замовити без логотипу.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи можна нанести кастомний логотип?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Так, ми можемо нанести ваш власний логотип або зображення. Потрібно надіслати 
                  векторний файл (AI, EPS, SVG) або растрове зображення високої якості.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Скільки часу займає нанесення логотипу?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Нанесення логотипу не впливає на час виготовлення. Стандартний термін виробництва 
                  залишається 3-5 робочих днів незалежно від наявності логотипу.
                </p>
              </div>

              <div className="border border-[#3d3d3d] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Чи можна змінити розмір або позицію логотипу?
                </h3>
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                  Стандартно логотип розміщується по центру верхньої кришки. За бажанням можемо 
                  змінити розмір або розміщення за додатковою домовленістю з менеджером.
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
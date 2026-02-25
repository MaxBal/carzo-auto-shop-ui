import { useState, useEffect } from 'react';
import { ShoppingCart, Camera, ChevronRight, Check, Ruler, Wrench, Award, RefreshCcw, Truck, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { useCartDrawer } from '@/contexts/CartContext';
import { SizeModal } from './SizeModal';
import { LogoModal } from './LogoModal';
import { FixationModal } from './FixationModal';
import { Modal } from './Modal';

interface ProductOptionsProps {
  product: {
    name: string;
    article: string;
    price: number;
    oldPrice?: number;
    image: string;
  };
}

export const ProductOptions = ({ product }: ProductOptionsProps) => {
  const [selectedDesign, setSelectedDesign] = useState('Carzo 2.0');
  const [selectedSize, setSelectedSize] = useState('M 50×30×30 см');
  const [selectedLogo, setSelectedLogo] = useState('без лого');
  const [selectedFixationType, setSelectedFixationType] = useState('без фіксації');
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const [selectedLogoValue, setSelectedLogoValue] = useState('без лого');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFixationModalOpen, setIsFixationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'options'>('design');

  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  const designs = [
    { name: 'Carzo 2.0', colors: '1 колір' },
    { name: 'Carzo 3.0', colors: '1 колір' },
    { name: 'Carzo 4.0', colors: '1 колір' }
  ];

  // Generate dynamic article based on selections
  const generateArticle = () => {
    const sizeCode = selectedSize.split(' ')[0];
    const designCode = selectedDesign;
    let logoText = 'без лого';
    if (selectedLogo !== 'без лого' && selectedCarBrand) {
      logoText = `${selectedLogo} ${selectedCarBrand}`;
    } else if (selectedLogo !== 'без лого') {
      logoText = selectedLogo;
    }
    const fixationText = selectedFixationType;

    return `арт. ${sizeCode} ${designCode} | ${logoText} | ${fixationText}`;
  };

  // Generate dynamic product title
  const generateTitle = () => {
    if (selectedLogo === 'без лого') {
      return 'Автокейс без лого';
    } else if (selectedCarBrand) {
      return `Автокейс з лого ${selectedCarBrand}`;
    } else {
      return 'Автокейс з лого';
    }
  };


  const sizes = [
    { name: 'S 40×30×30 см', price: 1690, oldPrice: 2090 },
    { name: 'M 50×30×30 см', price: 2090, oldPrice: 2300 },
    { name: 'L 60×30×30 см', price: 2290, oldPrice: 2690 },
    { name: 'XL 80×30×30 см', price: 2790, oldPrice: 3100 }
  ];

  const logoOptionsWithBrands = [
    { value: 'без лого', label: 'без лого 0 грн', brand: '', logoType: 'без лого', price: 0 },
    { value: 'bmw-brass', label: 'BMW (латунь) +200 ₴', brand: 'BMW', logoType: 'лого (латунь)', price: 200 },
    { value: 'bmw-steel', label: 'BMW (нерж. сталь) +250 ₴', brand: 'BMW', logoType: 'лого (нерж. сталь)', price: 250 },
    { value: 'audi-brass', label: 'Audi (латунь) +200 ₴', brand: 'Audi', logoType: 'лого (латунь)', price: 200 },
    { value: 'audi-steel', label: 'Audi (нерж. сталь) +250 ₴', brand: 'Audi', logoType: 'лого (нерж. сталь)', price: 250 },
    { value: 'toyota-brass', label: 'Toyota (латунь) +200 ₴', brand: 'Toyota', logoType: 'лого (латунь)', price: 200 },
    { value: 'toyota-steel', label: 'Toyota (нерж. сталь) +250 ₴', brand: 'Toyota', logoType: 'лого (нерж. сталь)', price: 250 },
    { value: 'tesla-brass', label: 'Tesla (латунь) +200 ₴', brand: 'Tesla', logoType: 'лого (латунь)', price: 200 },
    { value: 'tesla-steel', label: 'Tesla (нерж. сталь) +250 ₴', brand: 'Tesla', logoType: 'лого (нерж. сталь)', price: 250 }
  ];

  const fixationOptions = [
    { name: 'без фіксації', price: 0 },
    { name: 'фікс.на дні', price: 0 },
    { name: 'фікс.на стінці', price: 0 },
    { name: 'фікс.дно+стінка', price: 80 }
  ];

  const calculatePrice = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const basePrice = selectedSizeData?.price || product.price;
    const logoPrice = logoOptionsWithBrands.find(l => l.value === selectedLogoValue)?.price || 0;
    const fixationPrice = fixationOptions.find(f => f.name === selectedFixationType)?.price || 0;
    return basePrice + logoPrice + fixationPrice;
  };

  const handleAddToCart = () => {
    const logoDisplayText = selectedLogo === 'без лого'
      ? 'без лого'
      : selectedCarBrand
        ? `${selectedLogo} ${selectedCarBrand}`
        : selectedLogo;

    const itemToAdd = {
      name: generateTitle(),
      article: generateArticle(),
      image: product.image,
      price: calculatePrice(),
      oldPrice: product.oldPrice,
      options: {
        design: selectedDesign,
        size: selectedSize,
        logo: logoDisplayText,
        fixation: selectedFixationType
      }
    };

    addItem(itemToAdd);
    openCart();
  };

  return (
    <div className="col-span-12 md:col-span-5 px-1 md:px-0 mt-2 md:mt-0">


      {/* Product title and details */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-6">{generateTitle()}</h1>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <span className="text-3xl font-bold text-gray-900">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-lg text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
              activeTab === 'design'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Дизайни та розміри
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
              activeTab === 'options'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Лого та фіксація
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'design' && (
        <>
          {/* Design Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Оберіть дизайн:</span>
          <button
            onClick={() => setIsDesignModalOpen(true)}
            className="text-sm font-medium text-gray-700 underline hover:text-gray-900 transition-colors"
          >
            В чому різниця?
          </button>
        </div>
        <div className="flex gap-4 items-center justify-start">
          {designs.map((design) => (
            <button
              key={design.name}
              onClick={() => setSelectedDesign(design.name)}
              className={`py-2 px-3 rounded-md text-center transition-all duration-300 ease-in-out transform whitespace-nowrap flex-shrink-0 ${
                selectedDesign === design.name
                  ? 'bg-black text-white scale-105'
                  : 'border border-gray-200 hover:border-gray-300 hover:scale-102'
              }`}
            >
              <span className={`text-sm font-medium ${
                selectedDesign === design.name ? 'text-white' : 'text-gray-500'
              }`}>
                {selectedDesign === design.name ? design.name : design.name.replace('Carzo ', '')}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Sizes Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Розміри:</span>
          <button
            onClick={() => setIsSizeModalOpen(true)}
            className="text-sm font-medium text-gray-700 underline hover:text-gray-900 transition-colors"
          >
            Що в середині?
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(size.name)}
              className={`h-16 p-4 rounded-md border text-left transition-colors flex flex-col justify-center ${
                selectedSize === size.name
                  ? 'border-2 border-[#00d5b5] bg-white'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`font-medium text-sm ${
                selectedSize === size.name ? 'text-gray-900' : 'text-gray-500'
              }`}>{size.name}</div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-medium ${
                  selectedSize === size.name ? 'text-gray-900' : 'text-gray-500'
                }`}>{size.price} ₴</span>
                <span className="text-base text-gray-400 line-through">{size.oldPrice} ₴</span>
              </div>
            </button>
          ))}
        </div>
      </div>
        </>
      )}

      {activeTab === 'options' && (
        <>
          {/* Logo Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Лого:</span>
          <button
            onClick={() => setIsLogoModalOpen(true)}
            className="text-sm font-medium text-gray-700 underline hover:text-gray-900 transition-colors"
          >
            Детальніше
          </button>
        </div>
        <select
          value={selectedLogoValue}
          onChange={(e) => {
            const selectedOption = logoOptionsWithBrands.find(l => l.value === e.target.value);
            if (selectedOption) {
              setSelectedLogoValue(selectedOption.value);
              setSelectedLogo(selectedOption.logoType);
              setSelectedCarBrand(selectedOption.brand);
            }
          }}
          className="w-full h-12 px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-900 hover:border-gray-400 transition-colors"
        >
          {logoOptionsWithBrands.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Fixation Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Фіксація:</span>
          <button
            onClick={() => setIsFixationModalOpen(true)}
            className="text-sm font-medium text-gray-700 underline hover:text-gray-900 transition-colors"
          >
            Детальніше
          </button>
        </div>
        <select
          value={selectedFixationType}
          onChange={(e) => setSelectedFixationType(e.target.value)}
          className="w-full h-12 px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-900 hover:border-gray-400 transition-colors"
        >
          {fixationOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name} {option.price > 0 ? `+${option.price} ₴` : '0 ₴'}
            </option>
          ))}
        </select>
      </div>
        </>
      )}

      {/* Info blocks */}
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <RefreshCcw className="w-4 h-4 text-[#00d5b5] flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">
            <span className="font-medium">Обмін та повернення 14 дн.</span>{' '}
            <button className="text-gray-500 underline hover:text-gray-700 transition-colors">
              детальніше
            </button>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Truck className="w-4 h-4 text-[#00d5b5] flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 font-medium">Відправлення 5 березня</span>
        </div>
        <div className="flex items-start gap-2">
          <CreditCard className="w-4 h-4 text-[#00d5b5] flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">
            <span className="font-medium">Оплата та доставка</span>{' '}
            <button className="text-gray-500 underline hover:text-gray-700 transition-colors">
              детальніше
            </button>
          </span>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center group"
      >
        <ShoppingCart className="w-5 h-5 mr-2 transition-colors group-hover:text-[#00d5b5]" />
        Купити {calculatePrice()} ₴
      </button>

      {/* Design Modal */}
      <Modal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        title="Чим відрізняються дизайни?"
      >
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            Дизайни Сarzo 2.0, 3.0, 4.0 нічим окрім візерунку між собою не відрізняються. В усіх дизайнах використовується автомобільна німецька максимально зносостійка еко-шкіра, зазначений матеріал ми використовуємо також при виготовленні авто килимків. Всі дизайни представлені в чорному кольорі з чорною строчкою.
          </p>
        </div>
      </Modal>

      {/* Size Modal */}
      <SizeModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        size={selectedSize.split(' ')[0]}
      />

      {/* Logo Modal */}
      <LogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />

      {/* Fixation Modal */}
      <FixationModal
        isOpen={isFixationModalOpen}
        onClose={() => setIsFixationModalOpen(false)}
      />
    </div>
  );
};
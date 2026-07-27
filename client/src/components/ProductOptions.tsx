import { useState, useEffect } from 'react';
import { ShoppingCart, RefreshCcw, Truck, CreditCard, Magnet, Package, Users, Info, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { useCartDrawer } from '@/contexts/CartContext';
import { SizeModal } from './SizeModal';
import { LogoModal } from './LogoModal';
import { FixationModal } from './FixationModal';

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
  const [selectedSize, setSelectedSize] = useState('M 50×30×30 см');
  const [selectedLogo, setSelectedLogo] = useState('без лого');
  const [selectedFixationType, setSelectedFixationType] = useState('без фіксації');
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const [selectedLogoValue, setSelectedLogoValue] = useState('без лого');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFixationModalOpen, setIsFixationModalOpen] = useState(false);

  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  // Generate dynamic article based on selections
  const generateArticle = () => {
    const sizeCode = selectedSize.split(' ')[0];
    let logoText = 'без лого';
    if (selectedLogo !== 'без лого' && selectedCarBrand) {
      logoText = `${selectedLogo} ${selectedCarBrand}`;
    } else if (selectedLogo !== 'без лого') {
      logoText = selectedLogo;
    }
    const fixationText = selectedFixationType;

    return `арт. ${sizeCode} | ${logoText} | ${fixationText}`;
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
      <h1 className="text-2xl font-bold text-black mb-2">{generateTitle()}</h1>

      {/* Features */}
      <div className="flex items-center gap-2.5 mb-4 text-sm flex-wrap">
        <div className="flex items-center gap-1.5 text-black">
          <Magnet className="w-4 h-4" />
          <span>Магнітна система</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5 text-black">
          <span className="text-lg">🇩🇪</span>
          <span>Німецька авто еко-шкіра</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <span className="text-2xl font-bold text-black">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-base text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

      {/* Sizes Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Розміри:</span>
          <button
            onClick={() => setIsSizeModalOpen(true)}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-full px-3 py-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">що в середині?</span>
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

      {/* Logo Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Лого:</span>
          <button
            onClick={() => setIsLogoModalOpen(true)}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-full px-3 py-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">варіантів</span>
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
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-full px-3 py-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
            <span className="text-xs font-medium text-gray-700">варіантів</span>
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

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center group mb-4"
      >
        <ShoppingCart className="w-5 h-5 mr-2 transition-colors group-hover:text-[#00d5b5]" />
        Купити {calculatePrice()} ₴
      </button>

      {/* Benefit cards */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {([
          { icon: CreditCard, title: 'Варіанти оплати', sub: '' },
          { icon: Truck, title: 'Доставка', sub: '1-2 дні' },
          { icon: RefreshCcw, title: 'Обмін та повернення', sub: '' },
          { icon: Package, title: 'Разом дешевше', sub: '' },
          { icon: Users, title: 'Клієнтська програма', sub: '' },
        ] as const).map(({ icon: Icon, title, sub }) => (
          <button
            key={title}
            className="relative flex-shrink-0 group"
            style={{ scrollSnapAlign: 'start', width: 'calc(27vw)', maxWidth: '104px', minWidth: '82px' }}
          >
            <div className="aspect-square w-full rounded-2xl border border-gray-200 bg-white group-hover:border-gray-400 group-hover:shadow-md group-active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2 p-2 overflow-hidden">
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00d5b5]/10 flex items-center justify-center">
                <Info className="w-3 h-3 text-[#00d5b5]" strokeWidth={2.5} />
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-center gap-0.5 w-full px-1">
                <span className="text-[11px] font-semibold text-gray-800 text-center leading-tight w-full">{title}</span>
                {sub && <span className="text-[11px] font-semibold text-gray-800 text-center leading-tight w-full">{sub}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

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
import { useState, useEffect } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap, Ship, Info, Eye, CircleHelp as HelpCircle, ChevronRight, Check, Ruler, Wrench, Award } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCartDrawer } from '@/contexts/CartContext';
import { Modal } from './Modal';
import { SizeModal } from './SizeModal';
import { LogoModal } from './LogoModal';
import { FixationModal } from './FixationModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
  const [activeTab, setActiveTab] = useState('sizes');
  const [selectedDesign, setSelectedDesign] = useState('Carzo 2.0');
  const [selectedSize, setSelectedSize] = useState('M 50×30×30 см');
  const [selectedLogo, setSelectedLogo] = useState('без лого');
  const [selectedFixation, setSelectedFixation] = useState(false);
  const [selectedFixationType, setSelectedFixationType] = useState('фікс.на дні');
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFixationModalOpen, setIsFixationModalOpen] = useState(false);
  const [isBrandLogoModalOpen, setIsBrandLogoModalOpen] = useState(false);

  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  // Generate dynamic article based on selections
  const generateArticle = () => {
    const sizeCode = selectedSize.split(' ')[0]; // Extract S, M, L, XL
    const designCode = selectedDesign; // Carzo 1.0, 2.0, etc.
    const logoText = selectedLogo === 'без лого' ? 'без лого' : `логотип ${selectedCarBrand || 'марка невідома'}`;
    const fixationText = selectedFixation ? selectedFixationType : 'Без фіксації';
    
    return `арт. ${sizeCode} ${designCode} | ${logoText} | ${fixationText}`;
  };

  // Generate dynamic product title
  const generateTitle = () => {
    if (selectedLogo === 'без лого') {
      return 'Автокейс без лого';
    } else if (selectedCarBrand && selectedCarBrand !== 'Toyota') {
      return `Автокейс з лого ${selectedCarBrand}`;
    } else if (selectedCarModel) {
      const modelName = carModels.find(m => m.value === selectedCarModel)?.name;
      return `Автокейс з лого ${modelName}`;
    } else {
      return 'Автокейс з лого';
    }
  };

  const designs = [
    { name: 'Carzo 2.0', colors: '1 колір' },
    { name: 'Carzo 3.0', colors: '1 колір' },
    { name: 'Carzo 4.0', colors: '1 колір' }
  ];

  const sizes = [
    { name: 'S 40×30×30 см', price: 1690, oldPrice: 2090 },
    { name: 'M 50×30×30 см', price: 2090, oldPrice: 2300 },
    { name: 'L 60×30×30 см', price: 2290, oldPrice: 2690 },
    { name: 'XL 80×30×30 см', price: 2790, oldPrice: 3100 }
  ];

  const logoOptions = [
    { name: 'без лого', price: 0 },
    { name: 'з лого (латунь)', price: 200 }
  ];

  const carModels = [
    { name: 'BMW', value: 'bmw' },
    { name: 'Audi', value: 'audi' },
    { name: 'Toyota', value: 'toyota' },
    { name: 'Tesla', value: 'tesla' }
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
    const logoPrice = logoOptions.find(l => l.name === selectedLogo)?.price || 0;
    const fixationPrice = selectedFixation ? (fixationOptions.find(f => f.name === selectedFixationType)?.price || 0) : 0;
    return basePrice + logoPrice + fixationPrice;
  };

  const handleAddToCart = () => {
    // Generate the logo text with brand info for cart display
    const logoDisplayText = selectedLogo === 'без лого' 
      ? 'без лого' 
      : selectedCarBrand 
        ? `${selectedLogo} ${selectedCarBrand}` 
        : selectedLogo;

    const itemToAdd = {
      name: product.name,
      article: generateArticle(),
      image: product.image,
      price: calculatePrice(),
      oldPrice: product.oldPrice,
      options: {
        design: selectedDesign,
        size: selectedSize,
        logo: logoDisplayText,
        fixation: selectedFixation ? selectedFixationType : 'без фіксації'
      }
    };
    
    console.log('Adding item to cart:', itemToAdd);
    console.log('selectedLogo:', selectedLogo);
    console.log('selectedCarBrand:', selectedCarBrand);
    console.log('logoDisplayText:', logoDisplayText);
    addItem(itemToAdd);

    // Open cart drawer immediately
    openCart();
  };

  return (
    <div className="col-span-12 md:col-span-5 px-1 md:px-0 mt-2 md:mt-0">


      {/* Product title and details */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1 md:mb-2">{generateTitle()}</h1>
      
      {/* Article Info Block */}
      <div className="bg-[#00d5b5]/10 border border-[#00d5b5]/30 rounded-lg p-4 flex items-start gap-3 mb-4">
        <div className="w-5 h-5 rounded-full bg-[#00d5b5] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check size={12} className="text-white" />
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {generateArticle()}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <span className="text-3xl font-bold text-gray-900">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-lg text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

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

      {/* Tabs */}
      <div className="w-full mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sizes')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sizes'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Розміри
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'logo'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Лого
          </button>
          <button
            onClick={() => setActiveTab('fixation')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'fixation'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Фіксація
          </button>
        </div>



        {/* Sizes Tab */}
        {activeTab === 'sizes' && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
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
            
            {/* Size Info Button */}
            <button 
              onClick={() => setIsSizeModalOpen(true)}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between group border border-black"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  Що в середині в розмірі {selectedSize.split(' ')[0]}?
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {logoOptions.map((logo) => (
                <button
                  key={logo.name}
                  onClick={() => {
                    setSelectedLogo(logo.name);
                    if (logo.name === 'без лого') {
                      setSelectedCarModel('');
                      setSelectedCarBrand('');
                    }
                  }}
                  className={`h-16 p-4 rounded-md border text-left transition-colors flex flex-col justify-center ${
                    selectedLogo === logo.name
                      ? 'border-2 border-[#00d5b5] bg-white'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`font-medium text-sm ${
                    selectedLogo === logo.name ? 'text-gray-900' : 'text-gray-500'
                  }`}>{logo.name}</div>
                  {logo.price > 0 ? (
                    <span className={`text-base font-medium ${
                      selectedLogo === logo.name ? 'text-gray-900' : 'text-gray-500'
                    }`}>{logo.price} ₴</span>
                  ) : (
                    <span className={`text-base font-medium ${
                      selectedLogo === logo.name ? 'text-gray-900' : 'text-gray-500'
                    }`}>0 ₴</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Car Model Select */}
            <div className="mb-4">
              <select
                value={selectedCarModel}
                onChange={(e) => {
                  setSelectedCarModel(e.target.value);
                  const selectedModel = carModels.find(m => m.value === e.target.value);
                  if (selectedModel) {
                    setSelectedCarBrand(selectedModel.name);
                  }
                }}
                disabled={selectedLogo === 'без лого'}
                className={`w-full px-3 py-3 pr-12 border rounded-md text-sm h-12 md:h-auto ${
                  selectedLogo === 'без лого' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300' 
                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                }`}
              >
                <option value="">Оберіть марку</option>
                {carModels.map((model) => (
                  <option key={model.value} value={model.value}>{model.name}</option>
                ))}
              </select>
            </div>
            
            {/* Logo Info Button */}
            <button 
              onClick={() => {
                if (selectedCarModel && selectedLogo !== 'без лого') {
                  setIsBrandLogoModalOpen(true);
                } else {
                  setIsLogoModalOpen(true);
                }
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between group border border-black"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  {selectedCarModel && selectedLogo !== 'без лого' 
                    ? `Лого ${carModels.find(m => m.value === selectedCarModel)?.name || ''}`
                    : 'Детальніше про лого'
                  }
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>
        )}

        {/* Fixation Tab */}
        {activeTab === 'fixation' && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {fixationOptions.map((fixation) => (
                <button
                  key={fixation.name}
                  onClick={() => {
                    setSelectedFixationType(fixation.name);
                    setSelectedFixation(fixation.name !== 'без фіксації');
                  }}
                  className={`h-16 p-4 rounded-md border text-left transition-colors flex flex-col justify-center ${
                    selectedFixationType === fixation.name
                      ? 'border-2 border-[#00d5b5] bg-white'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`font-medium text-sm ${
                    selectedFixationType === fixation.name ? 'text-gray-900' : 'text-gray-500'
                  }`}>{fixation.name}</div>
                  <span className={`text-base font-medium ${
                    selectedFixationType === fixation.name ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {fixation.price > 0 ? `+${fixation.price} ₴` : '0 ₴'}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Fixation Info Button */}
            <button 
              onClick={() => setIsFixationModalOpen(true)}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between group border border-black"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  Про фіксацію з багажником
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>
        )}
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

      {/* Brand Logo Modal */}
      <Modal
        isOpen={isBrandLogoModalOpen}
        onClose={() => setIsBrandLogoModalOpen(false)}
        title={`Лого ${carModels.find(m => m.value === selectedCarModel)?.name || ''}`}
      >
        <div className="space-y-6">
          {/* Logo Image - Full Width */}
          <div className="w-full">
            <div className="w-full h-48 lg:h-80 bg-gray-200 rounded-2xl flex items-center justify-center border">
              <span className="text-4xl lg:text-6xl font-bold text-gray-600">
                {carModels.find(m => m.value === selectedCarModel)?.name || ''}
              </span>
            </div>
          </div>
          
          {/* Logo Details - Left Aligned with Icons */}
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3 text-sm">
              <Ruler className="w-5 h-5 text-black flex-shrink-0" />
              <span><span className="font-medium">Розміри:</span> 82 на 18 мм</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Wrench className="w-5 h-5 text-black flex-shrink-0" />
              <span><span className="font-medium">Матеріал:</span> латунь</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Award className="w-5 h-5 text-black flex-shrink-0" />
              <span className="font-medium">Власне виробництво</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
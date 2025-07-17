import { useState, useEffect } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap, Ship, Info, Eye, HelpCircle, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { Modal } from './Modal';
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
  const [selectedDesign, setSelectedDesign] = useState('Carzo 1.0');
  const [selectedSize, setSelectedSize] = useState('M 50×30×30 см');
  const [selectedLogo, setSelectedLogo] = useState('без лого');
  const [selectedColor, setSelectedColor] = useState('чорний');
  const [selectedFixation, setSelectedFixation] = useState(false);
  const [selectedFixationType, setSelectedFixationType] = useState('фікс.на дні');
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  const { toast } = useToast();
  const { addItem } = useCart();

  const designs = [
    { name: 'Carzo 1.0', colors: '6 кольорів' },
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

  const colors = [
    { name: 'чорний', value: '#000000' },
    { name: 'сірий', value: '#6B7280' },
    { name: 'синій', value: '#2563EB' },
    { name: 'червоний', value: '#DC2626' },
    { name: 'коричневий', value: '#92400E' },
    { name: 'бежевий', value: '#D4A574' }
  ];

  // Generate dynamic SKU
  const generateSKU = () => {
    const designCode = selectedDesign.replace('Carzo ', '').replace('.0', '');
    const sizeCode = selectedSize.charAt(0); // S, M, L, XL
    const logoCode = selectedLogo === 'без лого' ? 'N' : 'Y';
    const fixCode = selectedFixation ? 'Y' : 'N';
    return `M Carzo 1.0`;
  };

  const calculatePrice = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const basePrice = selectedSizeData?.price || product.price;
    const logoPrice = logoOptions.find(l => l.name === selectedLogo)?.price || 0;
    const fixationPrice = selectedFixation ? (fixationOptions.find(f => f.name === selectedFixationType)?.price || 0) : 0;
    return basePrice + logoPrice + fixationPrice;
  };

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      image: product.image,
      price: calculatePrice(),
      options: {
        design: selectedDesign,
        size: selectedSize,
        logo: selectedLogo,
        color: selectedColor,
        fixation: selectedFixation ? selectedFixationType : 'без фіксації'
      }
    });

    toast({
      title: "Додано до кошика",
      description: `${product.name} успішно додано до вашого кошика`,
    });
  };

  return (
    <div className="col-span-12 md:col-span-5 px-1 md:px-0 mt-2 md:mt-0">


      {/* Product title and details */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1 md:mb-2">{product.name}</h1>
      <div className="text-sm text-gray-600 mb-4">
        арт. {generateSKU()} | водостійкий | логотип без фіксації
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
        
        {/* Color selection for Carzo 1.0 */}
        {selectedDesign === 'Carzo 1.0' && (
          <div className="mt-4">
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-gray-800 ring-2 ring-offset-2 ring-[#00d5b5]'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
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
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between group border border-black">
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  Розмір {selectedSize.split(' ')[0]} в середині
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
                onChange={(e) => setSelectedCarModel(e.target.value)}
                disabled={selectedLogo === 'без лого'}
                className={`w-full px-3 py-3 pr-12 border rounded-md text-sm h-12 md:h-auto ${
                  selectedLogo === 'без лого' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300' 
                    : 'bg-white text-gray-900 border-[#00d5b5] hover:border-[#00d5b5]'
                }`}
              >
                <option value="">Оберіть модель</option>
                {carModels.map((model) => (
                  <option key={model.value} value={model.value}>{model.name}</option>
                ))}
              </select>
            </div>
            
            {/* Logo Info Button */}
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-between group border border-black">
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="font-medium">
                  {selectedCarModel && selectedLogo !== 'без лого' 
                    ? `Лого ${carModels.find(m => m.value === selectedCarModel)?.name || ''}`
                    : 'Дельніше про лого'
                  }
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>
        )}

        {/* Fixation Tab */}
        {activeTab === 'fixation' && (
          <div className="mt-4 space-y-3">
            {fixationOptions.map((fixation) => (
              <button
                key={fixation.name}
                onClick={() => {
                  setSelectedFixationType(fixation.name);
                  setSelectedFixation(fixation.name !== 'без фіксації');
                }}
                className={`w-full h-12 p-4 rounded-md border text-left transition-colors flex items-center justify-between ${
                  selectedFixationType === fixation.name
                    ? 'border-2 border-[#00d5b5] bg-white'
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`font-medium text-sm ${
                  selectedFixationType === fixation.name ? 'text-gray-900' : 'text-gray-500'
                }`}>{fixation.name}</div>
                {fixation.price > 0 && (
                  <span className={`text-base font-medium ${
                    selectedFixationType === fixation.name ? 'text-gray-900' : 'text-gray-500'
                  }`}>+{fixation.price} ₴</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Купити {calculatePrice()} ₴
      </button>

      {/* Design Modal */}
      <Modal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        title="Дизайни автокейсів"
      >
        <div className="space-y-4">
          <p>Інформація про різні дизайни автокейсів Carzo:</p>
          <ul className="space-y-2">
            <li><strong>Carzo 1.0:</strong> Класичний дизайн з 6 варіантами кольорів</li>
            <li><strong>Carzo 2.0:</strong> Модернізований дизайн</li>
            <li><strong>Carzo 3.0:</strong> Спортивний дизайн</li>
            <li><strong>Carzo 4.0:</strong> Преміум дизайн</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
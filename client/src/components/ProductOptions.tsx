import { useState, useEffect } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap, Ship, Info, Eye, HelpCircle } from 'lucide-react';
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
    { name: 'з лого (нержавіюча сталь)', price: 280 },
    { name: 'з лого (латунь)', price: 200 }
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
    <div className="col-span-12 md:col-span-5 px-1 md:px-0 mt-8 md:mt-0">
      {/* Shipping banner */}
      <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-2 mb-6 flex items-center">
        <Shield className="w-4 h-4 text-green-600 mr-2" />
        <span className="text-sm text-green-800">✓ Відправимо сьогодні після 18:00</span>
      </div>

      {/* Product title and details */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
      <div className="text-sm text-gray-600 mb-4">
        арт. {generateSKU()} | водостійкий | логотип без фіксації
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-gray-900">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-lg text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

      {/* Design Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm font-medium text-gray-700">Дизайн:</label>
          <button
            onClick={() => setIsDesignModalOpen(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HelpCircle size={16} />
          </button>
        </div>
        <Select value={selectedDesign} onValueChange={setSelectedDesign}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Оберіть дизайн" />
          </SelectTrigger>
          <SelectContent>
            {designs.map((design) => (
              <SelectItem key={design.name} value={design.name}>
                {design.name} - {design.colors}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Color selection for Carzo 1.0 */}
        {selectedDesign === 'Carzo 1.0' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Колір:</label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-gray-800 ring-2 ring-offset-2 ring-blue-500'
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
          <div className="mt-4 space-y-3">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={`w-full p-4 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  selectedSize === size.name
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm text-gray-900">{size.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{size.price} ₴</span>
                  <span className="text-sm text-gray-500 line-through">{size.oldPrice} ₴</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="mt-4 space-y-3">
            {logoOptions.map((logo) => (
              <button
                key={logo.name}
                onClick={() => setSelectedLogo(logo.name)}
                className={`w-full p-4 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  selectedLogo === logo.name
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm text-gray-900">{logo.name}</div>
                <div className="flex items-center gap-3">
                  {logo.price > 0 && (
                    <span className="text-sm font-medium text-gray-900">+{logo.price} ₴</span>
                  )}
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </button>
            ))}
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
                className={`w-full p-4 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  selectedFixationType === fixation.name
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm text-gray-900">{fixation.name}</div>
                <div className="flex items-center gap-3">
                  {fixation.price > 0 && (
                    <span className="text-sm font-medium text-gray-900">+{fixation.price} ₴</span>
                  )}
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
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
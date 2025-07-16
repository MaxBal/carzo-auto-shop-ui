import { useState, useEffect } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap, Ship, Info, Eye } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('designs');
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
    <div className="col-span-12 md:col-span-5 px-4 md:px-0 mt-8 md:mt-0">
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg">
          <TabsTrigger value="designs" className="text-xs">Дизайни</TabsTrigger>
          <TabsTrigger value="sizes" className="text-xs">Розміри</TabsTrigger>
          <TabsTrigger value="logo" className="text-xs">Лого</TabsTrigger>
          <TabsTrigger value="fixation" className="text-xs">Фіксація</TabsTrigger>
        </TabsList>

        {/* Designs Tab */}
        <TabsContent value="designs" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {designs.map((design) => (
              <button
                key={design.name}
                onClick={() => setSelectedDesign(design.name)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedDesign === design.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{design.name}</div>
                <div className="text-xs text-gray-500">{design.colors}</div>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsDesignModalOpen(true)}
            className="text-blue-600 text-sm flex items-center gap-1 underline"
          >
            Детальніше про дизайни
          </button>

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
        </TabsContent>

        {/* Sizes Tab */}
        <TabsContent value="sizes" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedSize === size.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{size.name}</div>
                <div className="text-xs text-gray-500">{size.price} ₴</div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* Logo Tab */}
        <TabsContent value="logo" className="mt-4">
          <div className="space-y-2">
            {logoOptions.map((logo) => (
              <button
                key={logo.name}
                onClick={() => setSelectedLogo(logo.name)}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  selectedLogo === logo.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="font-medium text-sm">{logo.name}</div>
                  {logo.price > 0 && (
                    <div className="text-xs text-gray-500">+{logo.price} ₴</div>
                  )}
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* Fixation Tab */}
        <TabsContent value="fixation" className="mt-4">
          <div className="space-y-2">
            {fixationOptions.map((fixation) => (
              <button
                key={fixation.name}
                onClick={() => {
                  setSelectedFixationType(fixation.name);
                  setSelectedFixation(fixation.name !== 'без фіксації');
                }}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  selectedFixationType === fixation.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{fixation.name}</div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                </div>
                {fixation.price > 0 && (
                  <div className="text-xs text-gray-500">+{fixation.price} ₴</div>
                )}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
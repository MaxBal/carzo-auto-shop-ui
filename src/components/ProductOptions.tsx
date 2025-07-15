import { useState } from 'react';
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
  const [selectedDesign, setSelectedDesign] = useState('Carzo 2.0');
  const [selectedSize, setSelectedSize] = useState('M 50×30×30 см');
  const [selectedLogo, setSelectedLogo] = useState('без лого');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedFixation, setSelectedFixation] = useState(false);
  const [selectedFixationType, setSelectedFixationType] = useState('фікс.на дні');
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFixationModalOpen, setIsFixationModalOpen] = useState(false);
  const [isLogoImageModalOpen, setIsLogoImageModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

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
    { name: 'Чорний', value: '#000000' },
    { name: 'Сірий', value: '#6B7280' },
    { name: 'Синій', value: '#2563EB' },
    { name: 'Червоний', value: '#DC2626' },
    { name: 'Коричневий', value: '#92400E' },
    { name: 'Бежевий', value: '#D4A574' }
  ];

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
    <div className="col-span-12 lg:col-span-5">
      <div className="lg:hidden mb-6">
        <div className="bg-black/80 text-white px-3 py-2 rounded-full inline-flex items-center gap-2 text-sm">
          <Ship size={16} />
          Відправимо сьогодні після 18:00
        </div>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 text-sm lg:text-base mb-4">
        арт. {product.article} | {selectedDesign} | {selectedLogo} | {selectedFixation ? 'фіксація=на дні' : 'фіксація=без фіксації'}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl lg:text-3xl font-bold">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-lg text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="designs" className="text-sm">Дизайни</TabsTrigger>
          <TabsTrigger value="sizes" className="text-sm">Розміри</TabsTrigger>
          <TabsTrigger value="logo" className="text-sm">Лого</TabsTrigger>
          <TabsTrigger value="fixation" className="text-sm">Фіксація</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {designs.map((design) => (
              <button
                key={design.name}
                onClick={() => setSelectedDesign(design.name)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedDesign === design.name ? 'border-[#00d1b3]' : 'border-gray-200'
                }`}
              >
                <div className="font-medium text-base">{design.name}</div>
                <div className="text-sm text-gray-500">{design.colors}</div>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsDesignModalOpen(true)}
            className="text-brand text-sm flex items-center gap-1 underline"
          >
            <Info size={16} />
            Детальніше про дизайни
          </button>

          {selectedDesign === 'Carzo 1.0' && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm font-medium">Колір:</span>
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sizes" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedSize === size.name ? 'border-[#00d1b3]' : 'border-gray-200'
                }`}
              >
                <div className="font-medium text-base">{size.name}</div>
                <div className="text-sm">
                  <span className="font-semibold">{size.price} ₴</span>
                  {size.oldPrice && (
                    <span className="text-gray-500 line-through ml-2">{size.oldPrice} ₴</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsSizeModalOpen(true)}
            className="text-brand text-sm flex items-center gap-1 underline"
          >
            <Info size={16} />
            Детально про розміри
          </button>
        </TabsContent>

        <TabsContent value="logo" className="space-y-4">
          <RadioGroup value={selectedLogo} onValueChange={setSelectedLogo} className="space-y-3">
            {logoOptions.map((option) => (
              <div key={option.name} className="flex items-center justify-between">
                <label htmlFor={option.name} className="text-sm flex-1 cursor-pointer">
                  <div className="font-medium">
                    {option.name}
                    {option.price > 0 && <span className="text-gray-500"> +{option.price} ₴</span>}
                  </div>
                </label>
                <RadioGroupItem value={option.name} id={option.name} />
              </div>
            ))}
          </RadioGroup>
          
          {selectedLogo !== 'без лого' && (
            <div className="space-y-3">
              <Select value={selectedCarBrand} onValueChange={setSelectedCarBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть марку авто" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                  <SelectItem value="Honda">Honda</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedCarBrand && (
                <div 
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#00d1b3]"
                  onClick={() => setIsLogoImageModalOpen(true)}
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Camera size={16} />
                  </div>
                  <span className="text-sm">Лого {selectedCarBrand} ({selectedLogo.includes('нержавіюча') ? 'нержавіюча сталь' : 'латунь'})</span>
                </div>
              )}
            </div>
          )}
          
          {selectedLogo === 'без лого' && (
            <button 
              onClick={() => setIsLogoModalOpen(true)}
              className="text-[#00d1b3] text-sm flex items-center gap-1 underline"
            >
              <Info size={16} />
              Детальніше про лого
            </button>
          )}
        </TabsContent>

        <TabsContent value="fixation" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Фіксація в багажнику</span>
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                  selectedFixation ? 'bg-[#00d1b3]' : 'bg-gray-300'
                }`}
                onClick={() => setSelectedFixation(!selectedFixation)}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  selectedFixation ? 'transform translate-x-6' : ''
                }`}></div>
              </div>
            </div>
            
            {selectedFixation && (
              <RadioGroup value={selectedFixationType} onValueChange={setSelectedFixationType} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="fixation-bottom" className="text-sm flex-1 cursor-pointer">
                    <div className="font-medium">фікс.на дні 0 ₴</div>
                  </label>
                  <RadioGroupItem value="фікс.на дні" id="fixation-bottom" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="fixation-wall" className="text-sm flex-1 cursor-pointer">
                    <div className="font-medium">фікс.на стінці 0 ₴</div>
                  </label>
                  <RadioGroupItem value="фікс.на стінці" id="fixation-wall" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="fixation-both" className="text-sm flex-1 cursor-pointer">
                    <div className="font-medium">фікс.дно+стінка 80 ₴</div>
                  </label>
                  <RadioGroupItem value="фікс.дно+стінка" id="fixation-both" />
                </div>
              </RadioGroup>
            )}
          </div>
          
          <button 
            onClick={() => setIsFixationModalOpen(true)}
            className="text-[#00d1b3] text-sm flex items-center gap-1 underline"
          >
            <Info size={16} />
            Детальніше про фіксацію в багажнику
          </button>
        </TabsContent>
      </Tabs>

      <button 
        onClick={handleAddToCart}
        className="w-full h-12 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-6"
      >
        <ShoppingCart size={20} />
        Купити {calculatePrice()} ₴ {product.oldPrice && <span className="line-through text-white/70">{product.oldPrice} ₴</span>}
      </button>

      {/* Circular Nav */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { icon: Shield, label: 'Доставка', onClick: () => setIsDeliveryModalOpen(true) },
          { icon: Heart, label: 'Оплата', onClick: () => setIsPaymentModalOpen(true) },
          { icon: Star, label: 'Обмін', onClick: () => setIsExchangeModalOpen(true) },
          { icon: Zap, label: 'Акції', onClick: () => setIsPromoModalOpen(true) },
          { icon: Camera, label: 'Відгуки', onClick: () => setIsReviewsModalOpen(true) }
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] cursor-pointer"
            onClick={item.onClick}
          >
            <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#00d1b3] transition-colors">
              <item.icon size={20} />
            </div>
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* All Modals */}
      <Modal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        title="Детальніше про дизайни"
        width="480px"
      >
        <div className="space-y-4">
          {designs.map((design) => (
            <div key={design.name} className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div>
                <h4 className="font-medium">{design.name}</h4>
                <p className="text-sm text-gray-500">{design.colors}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        title="Детально про розміри"
        width="480px"
      >
        <div className="space-y-4">
          {sizes.map((size) => (
            <div key={size.name} className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div>
                <h4 className="font-medium">{size.name}</h4>
                <p className="text-sm text-gray-500">{size.price} ₴</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        title="Детальніше про лого"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про лого опції</p>
        </div>
      </Modal>

      <Modal
        isOpen={isLogoImageModalOpen}
        onClose={() => setIsLogoImageModalOpen(false)}
        title={`Лого ${selectedCarBrand} ${selectedLogo.includes('нержавіюча') ? '(нержавіюча сталь)' : '(латунь)'}`}
        width="640px"
      >
        <div className="aspect-video bg-gray-200 rounded-lg"></div>
        <p className="mt-2 text-center text-sm">Превʼю лого {selectedCarBrand}</p>
      </Modal>

      <Modal
        isOpen={isFixationModalOpen}
        onClose={() => setIsFixationModalOpen(false)}
        title="Детальніше про фіксацію в багажнику"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про фіксацію в багажнику</p>
        </div>
      </Modal>

      <Modal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        title="Доставка"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про доставку</p>
        </div>
      </Modal>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Оплата"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про оплату</p>
        </div>
      </Modal>

      <Modal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        title="Обмін"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про обмін</p>
        </div>
      </Modal>

      <Modal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        title="Акції"
        width="480px"
      >
        <div className="space-y-4">
          <p>Інформація про акції</p>
        </div>
      </Modal>

      <Modal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        title="Відгуки"
        width="640px"
      >
        <div className="space-y-4">
          <p>Відгуки покупців</p>
        </div>
      </Modal>
    </div>
  );
};
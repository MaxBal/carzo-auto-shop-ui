import { useState } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap, Ship, Info, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { Modal } from './Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

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
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

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
    { name: 'з лого', price: 200 }
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
    return basePrice + logoPrice;
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
        color: selectedColor
      }
    });

    toast({
      title: "Додано до кошика",
      description: `${product.name} успішно додано до вашого кошика`,
    });
  };

  return (
    <div className="col-span-12 lg:col-span-7">
      <div className="lg:hidden mb-6">
        <div className="bg-black/80 text-white px-3 py-2 rounded-full inline-flex items-center gap-2 text-sm">
          <Ship size={16} />
          Відправимо сьогодні після 18:00
        </div>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 text-sm lg:text-base mb-4">
        арт. {product.article} | {selectedDesign} | {selectedLogo}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl lg:text-3xl font-bold">{calculatePrice()} ₴</span>
        {product.oldPrice && (
          <span className="text-lg text-gray-500 line-through">{product.oldPrice} ₴</span>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="designs" className="text-sm">Дизайни</TabsTrigger>
          <TabsTrigger value="sizes" className="text-sm">Розміри</TabsTrigger>
          <TabsTrigger value="logo" className="text-sm">Лого</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {designs.map((design) => (
              <button
                key={design.name}
                onClick={() => setSelectedDesign(design.name)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedDesign === design.name ? 'border-brand' : 'border-gray-200'
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
                  selectedSize === size.name ? 'border-brand' : 'border-gray-200'
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
            onClick={() => setIsDesignModalOpen(true)}
            className="text-brand text-sm flex items-center gap-1 underline"
          >
            <Info size={16} />
            Детально про розміри
          </button>
        </TabsContent>

        <TabsContent value="logo" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {logoOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => setSelectedLogo(option.name)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedLogo === option.name ? 'border-brand' : 'border-gray-200'
                }`}
              >
                <div className="font-medium text-base">{option.name}</div>
                <div className="text-sm text-gray-500">+{option.price} ₴</div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsLogoModalOpen(true)}
            className="text-brand text-sm flex items-center gap-1 underline"
          >
            <Eye size={16} />
            Переглянути лого
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
          { icon: Shield, label: 'Доставка' },
          { icon: Heart, label: 'Оплата' },
          { icon: Star, label: 'Обмін' },
          { icon: Zap, label: 'Акції' },
          { icon: Camera, label: 'Відгуки' }
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] cursor-pointer"
          >
            <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:border-brand transition-colors">
              <item.icon size={20} />
            </div>
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Modals */}
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
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        title="Переглянути лого"
        width="640px"
      >
        <div className="aspect-video bg-gray-200 rounded-lg"></div>
        <p className="mt-2 text-center text-sm">Превʼю лого</p>
      </Modal>
    </div>
  );
};
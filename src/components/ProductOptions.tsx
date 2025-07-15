import { useState } from 'react';
import { ShoppingCart, Camera, Heart, Star, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
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
  const [activeTab, setActiveTab] = useState('designs');
  const [selectedDesign, setSelectedDesign] = useState('carzo-1.0');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedLogo, setSelectedLogo] = useState('none');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFixation, setSelectedFixation] = useState('bottom');
  const [selectedColor, setSelectedColor] = useState('black');
  const [isFixationEnabled, setIsFixationEnabled] = useState(true);
  const [showModal, setShowModal] = useState<string | null>(null);

  const { toast } = useToast();
  const { addItem } = useCart();

  const designs = [
    { id: 'carzo-1.0', name: 'Carzo 1.0', description: '6 кольорів' },
    { id: 'carzo-2.0', name: 'Carzo 2.0', description: '4 кольори' },
    { id: 'premium', name: 'Premium', description: '8 кольорів' },
    { id: 'sport', name: 'Sport', description: '5 кольорів' }
  ];

  const sizes = [
    { id: 'S', name: 'S', dimensions: '35×25×12' },
    { id: 'M', name: 'M', dimensions: '40×30×15' },
    { id: 'L', name: 'L', dimensions: '45×35×18' },
    { id: 'XL', name: 'XL', dimensions: '50×40×20' }
  ];

  const colors = ['black', 'gray', 'brown', 'blue', 'red', 'green'];

  const brands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Honda', 'Hyundai'];

  const calculatePrice = () => {
    let price = product.price;
    if (selectedLogo === 'steel') price += 280;
    if (selectedLogo === 'brass') price += 200;
    if (selectedFixation === 'bottom-wall') price += 80;
    return price;
  };

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      image: product.image,
      price: calculatePrice(),
      options: {
        design: selectedDesign,
        size: selectedSize,
        logo: selectedLogo === 'none' ? 'Без лого' : `${selectedLogo} ${selectedBrand}`,
        fixation: selectedFixation,
        color: selectedColor
      }
    });

    toast({
      title: "Додано до кошика",
      description: `${product.name} успішно додано до вашого кошика`,
    });
  };

  const handleFixationToggle = () => {
    if (isFixationEnabled) {
      toast({
        title: "Фіксація обов'язкова для безпеки",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-24">
      {/* Product Header */}
      <div>
        <h3 className="font-semibold text-2xl">{product.name}</h3>
        <p className="text-sm text-dim mt-1">
          арт. {product.article} | колір={selectedColor} | лого={selectedLogo === 'none' ? 'без лого' : selectedLogo} | фіксація={selectedFixation}
        </p>
        <div className="text-3xl font-bold mt-2">
          {calculatePrice()} ₴
          {product.oldPrice && (
            <del className="ml-3 text-dim line-through">{product.oldPrice} ₴</del>
          )}
        </div>
      </div>

      {/* Tab Container */}
      <div className="bg-gray-100 p-1 rounded-lg flex gap-1 w-fit mt-6 overflow-x-auto snap-x">
        {[
          { id: 'designs', label: 'Дизайни' },
          { id: 'sizes', label: 'Розміри' },
          { id: 'logo', label: 'Лого' },
          { id: 'fixation', label: 'Фіксація' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition snap-start ${
              activeTab === tab.id
                ? 'bg-white border border-gray-300 text-body'
                : 'text-dim hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* Designs Tab */}
        {activeTab === 'designs' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {designs.map((design) => (
                <div
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                    selectedDesign === design.id
                      ? 'border-brand shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <h4 className="font-medium">{design.name}</h4>
                  <p className="text-xs text-dim">{design.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal('designs')}
              className="text-brand text-sm underline mt-2 cursor-pointer"
            >
              Детальніше про дизайни
            </button>
          </div>
        )}

        {/* Sizes Tab */}
        {activeTab === 'sizes' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`py-2 rounded-lg border text-sm flex flex-col items-center transition ${
                  selectedSize === size.id
                    ? 'border-brand'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{size.name}</span>
                <span className="text-xs text-dim">{size.dimensions}</span>
              </button>
            ))}
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="logo"
                  value="none"
                  checked={selectedLogo === 'none'}
                  onChange={(e) => setSelectedLogo(e.target.value)}
                  className="text-brand"
                />
                <span>Без лого</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="logo"
                  value="steel"
                  checked={selectedLogo === 'steel'}
                  onChange={(e) => setSelectedLogo(e.target.value)}
                  className="text-brand"
                />
                <span>Сталь +280 ₴</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="logo"
                  value="brass"
                  checked={selectedLogo === 'brass'}
                  onChange={(e) => setSelectedLogo(e.target.value)}
                  className="text-brand"
                />
                <span>Латунь +200 ₴</span>
              </label>
            </div>

            {(selectedLogo === 'steel' || selectedLogo === 'brass') && (
              <div className="mt-3">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Оберіть марку авто</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                {selectedBrand && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mt-3">
                    <div className="w-10 h-10 bg-gray-300 rounded"></div>
                    <span className="font-medium">{selectedBrand}</span>
                    <button 
                      onClick={() => setShowModal('logo-preview')}
                      className="ml-auto text-brand hover:text-brand/80"
                    >
                      <Camera size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {selectedLogo === 'none' && (
              <button
                onClick={() => setShowModal('logo-info')}
                className="text-brand underline mt-2 block"
              >
                Детально про лого
              </button>
            )}
          </div>
        )}

        {/* Fixation Tab */}
        {activeTab === 'fixation' && (
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFixationToggle}
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                  isFixationEnabled ? 'bg-brand/20' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isFixationEnabled ? 'left-6' : 'left-0.5'
                  }`}
                />
              </button>
              <span>Фіксація</span>
            </div>

            {isFixationEnabled && (
              <div className="flex flex-col gap-2 mt-4 pl-4 border-l-2 border-gray-100">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fixation"
                    value="bottom"
                    checked={selectedFixation === 'bottom'}
                    onChange={(e) => setSelectedFixation(e.target.value)}
                    className="text-brand"
                  />
                  <span>Дно — 0 ₴</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fixation"
                    value="wall"
                    checked={selectedFixation === 'wall'}
                    onChange={(e) => setSelectedFixation(e.target.value)}
                    className="text-brand"
                  />
                  <span>Стіна — 0 ₴</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fixation"
                    value="bottom-wall"
                    checked={selectedFixation === 'bottom-wall'}
                    onChange={(e) => setSelectedFixation(e.target.value)}
                    className="text-brand"
                  />
                  <span>Дно+стіна — 80 ₴</span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Color Swatches for Carzo 1.0 */}
      {selectedDesign === 'carzo-1.0' && (
        <div className="flex items-center gap-2 mt-6">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border-2 ${
                selectedColor === color ? 'border-brand' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        className="mt-8 w-full h-12 rounded-full bg-body text-white font-semibold flex items-center justify-center gap-2 transition hover:bg-gray-900 fixed lg:static bottom-4 left-4 right-4 lg:left-auto lg:right-auto z-40"
      >
        <ShoppingCart size={20} />
        <span>Купити {calculatePrice()} ₴</span>
      </button>

      {/* Circular Nav */}
      <div className="flex gap-4 overflow-x-auto mt-6 pb-2">
        {[
          { icon: Shield, label: 'Доставка' },
          { icon: Heart, label: 'Оплата' },
          { icon: Star, label: 'Обмін' },
          { icon: Zap, label: 'Акції' },
          { icon: Camera, label: 'Відгуки' }
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => setShowModal(item.label.toLowerCase())}
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
        isOpen={showModal === 'designs'}
        onClose={() => setShowModal(null)}
        title="Детальніше про дизайни"
        width="480px"
      >
        <div className="space-y-4">
          {designs.map((design) => (
            <div key={design.id} className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div>
                <h4 className="font-medium">{design.name}</h4>
                <p className="text-sm text-dim">{design.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showModal === 'logo-preview'}
        onClose={() => setShowModal(null)}
        title={`Лого ${selectedBrand}`}
        width="640px"
      >
        <div className="aspect-video bg-gray-200 rounded-lg"></div>
        <p className="mt-2 text-center text-sm">Превʼю лого {selectedBrand}</p>
      </Modal>

      <Modal
        isOpen={showModal === 'logo-info'}
        onClose={() => setShowModal(null)}
        title="Детально про лого"
        width="400px"
      >
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Сталь</span>
            <span>дзеркальний блиск</span>
          </div>
          <div className="flex justify-between">
            <span>Латунь</span>
            <span>теплий відтінок</span>
          </div>
        </div>
      </Modal>

      {['доставка', 'оплата', 'обмін', 'акції', 'відгуки'].map((modalName) => (
        <Modal
          key={modalName}
          isOpen={showModal === modalName}
          onClose={() => setShowModal(null)}
          title={modalName.charAt(0).toUpperCase() + modalName.slice(1)}
          width="400px"
        >
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Інформація про {modalName}</li>
            <li>Детальний опис</li>
            <li>Умови та правила</li>
          </ul>
        </Modal>
      ))}
    </div>
  );
};
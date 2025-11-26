import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    city: '',
    warehouse: '',
    paymentMethod: 'prepay'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    alert(`Замовлення оформлено! Сума: ${getTotalPrice()} ₴`);
    clearCart();
    
    // Reset form
    setFormData({
      lastName: '',
      firstName: '',
      phone: '',
      city: '',
      warehouse: '',
      paymentMethod: 'prepay'
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Кошик порожній</h2>
          <p className="text-dim">Додайте товари до кошика для оформлення замовлення</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-lg mx-auto py-8 px-4">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Повернутись до покупок</span>
        </button>
        <h1 className="text-2xl font-bold mb-6">Оформлення замовлення</h1>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Ваше замовлення</h3>
          {items.map((item) => (
            <div key={item.id} className="py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-3">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    {Object.entries(item.options)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="capitalize min-w-[50px]">{key}:</span>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Кількість: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item.price * item.quantity} ₴</div>
                  {item.oldPrice && (
                    <div className="text-xs text-gray-500 line-through">{item.oldPrice * item.quantity} ₴</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 text-lg font-bold border-t">
            <span>Всього:</span>
            <span>{getTotalPrice()} ₴</span>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Прізвище *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ім'я *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+380"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Місто</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Київ"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Відділення Нової пошти</label>
            <input
              type="text"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
              placeholder="№1"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Спосіб оплати</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="prepay"
                  checked={formData.paymentMethod === 'prepay'}
                  onChange={handleInputChange}
                  className="text-brand"
                />
                <span>Передплата</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="postpay"
                  checked={formData.paymentMethod === 'postpay'}
                  onChange={handleInputChange}
                  className="text-brand"
                />
                <span>Післяплата</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-black text-white rounded-md font-semibold mt-4 hover:bg-gray-800 transition-colors"
          >
            Підтвердити замовлення
          </button>
        </form>
      </div>
    </div>
  );
};
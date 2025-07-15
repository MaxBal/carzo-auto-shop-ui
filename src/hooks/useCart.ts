import { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  options: {
    design?: string;
    size?: string;
    logo?: string;
    fixation?: string;
    color?: string;
  };
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const existingItemIndex = items.findIndex(
      (cartItem) => 
        cartItem.name === item.name &&
        JSON.stringify(cartItem.options) === JSON.stringify(item.options)
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      setItems([...items, { ...item, id, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    getTotalPrice,
    clearCart
  };
};
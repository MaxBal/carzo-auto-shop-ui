import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  article: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  options: {
    design?: string;
    size?: string;
    logo?: string;
    fixation?: string;
    color?: string;
  };
}

const CART_STORAGE_KEY = 'carzo-cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    console.log('useCart.addItem called with:', item);

    setItems(currentItems => {
      console.log('Current items before add:', currentItems);

      const id = Math.random().toString(36).substr(2, 9);
      const existingItemIndex = currentItems.findIndex(
        (cartItem) =>
          cartItem.name === item.name &&
          JSON.stringify(cartItem.options) === JSON.stringify(item.options)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        console.log('Updated existing item, new items:', updatedItems);
        return updatedItems;
      } else {
        const newItems = [...currentItems, { ...item, id, quantity: 1 }];
        console.log('Added new item, new items:', newItems);
        return newItems;
      }
    });
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

  const getTotalItems = () => {
    const total = items.reduce((total, item) => total + item.quantity, 0);
    console.log('getTotalItems - items:', items, 'total:', total);
    return total;
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
    getTotalItems,
    clearCart
  };
};
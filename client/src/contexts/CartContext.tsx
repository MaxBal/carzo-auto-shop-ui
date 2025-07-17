import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartDrawer = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartDrawer must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};
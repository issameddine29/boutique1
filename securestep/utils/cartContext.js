import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.uniqueId === action.item.uniqueId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.uniqueId === action.item.uniqueId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.uniqueId !== action.uniqueId) };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.uniqueId === action.uniqueId
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        )
      };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_CART':
      return { ...state, items: action.cart || [] };

    default:
      return state;
  }
};

const initialState = { items: [], isOpen: false };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('secureStepCart');
      if (saved) dispatch({ type: 'SET_CART', cart: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('secureStepCart', JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeFromCart = (uniqueId) => dispatch({ type: 'REMOVE_ITEM', uniqueId });
  const updateQuantity = (uniqueId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', uniqueId, quantity });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getCartTotal = () => state.items.reduce((t, it) => t + (it.price * it.quantity), 0);
  const getCartItemsCount = () => state.items.reduce((t, it) => t + it.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      isCartOpen: state.isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

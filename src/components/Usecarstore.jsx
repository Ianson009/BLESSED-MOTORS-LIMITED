import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      
      // 1. Add item to cart (increments quantity if already exists)
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // 2. Decrease item quantity by 1 (removes if it reaches 0)
      decreaseQuantity: (productId) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === productId);

        if (!existingItem) return {};

        if (existingItem.quantity === 1) {
          return { cart: state.cart.filter((item) => item.id !== productId) };
        }

        return {
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      }),

      // 3. Remove item completely from cart
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),

      // 4. Clear the entire cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart-storage', // Saves data under this key in localStorage
    }
  )
);

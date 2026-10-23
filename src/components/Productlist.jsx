import React from 'react';
import { useCartStore } from './useCartStore';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99 },
  { id: 3, name: 'Ergonomic Mouse', price: 59.99 },
];

export default function ProductList() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Products</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
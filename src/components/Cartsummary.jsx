import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from './Usecarstore'; 

export default function CartSummary() {
  const navigate = useNavigate();
  
  // FIX: Separated selectors into primitive values to completely stop the "Maximum Update Depth" error loop
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Compute metrics dynamically
  const totalPrice = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const imgurl = "https://alwaysdata.net";

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-dark text-start">
        <h2 className="mb-4 text-center">Your Shopping Cart ({totalItems} items)</h2>
        
        {cart.length === 0 ? (
          <div className="alert alert-warning text-center py-4" role="alert">
            <h5 className="mb-3">Your cart is currently empty.</h5>
            <button className="btn btn-warning" onClick={() => navigate("/")}>Go Back to Store</button>
          </div>
        ) : (
          <div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Name</th>
                    <th style={{ width: '140px' }}>Quantity</th>
                    <th>Subtotal</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img 
                          src={imgurl + item.photo} 
                          alt={item.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                      </td>
                      <td className="fw-semibold">{item.name}</td>
                      <td>
                        {/* Plus and Minus Quantity Controllers */}
                        <div className="btn-group btn-group-sm" role="group">
                          <button className="btn btn-outline-secondary fw-bold" onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span className="btn border-secondary-subtle px-3 disabled text-dark fw-semibold">{item.quantity}</span>
                          <button className="btn btn-outline-secondary fw-bold" onClick={() => addToCart(item)}>+</button>
                        </div>
                      </td>
                      <td className="text-warning fw-bold">
                        KSH {Number(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="text-end">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-4">
              <button onClick={clearCart} className="btn btn-outline-secondary btn-sm">
                Empty Entire Cart
              </button>
              <div className="text-end">
                <h3 className="text-warning fw-bold mb-3">
                  Total Amount: KSH {totalPrice.toLocaleString()}
                </h3>
                
                <button 
                  className="btn btn-success btn-lg px-5 shadow-sm fw-bold"
                  onClick={() => navigate("/Mpesa", { 
                    state: { 
                      checkoutType: "cart", 
                      totalAmount: totalPrice,
                      items: cart
                    } 
                  })}
                >
                  Pay via Mpesa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

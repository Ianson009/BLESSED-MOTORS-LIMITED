import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from './Usecarstore'; 

const Navbar = () => {
  const navigate = useNavigate();

  // Clean, single-line selector to prevent rendering infinite loops
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 justify-content-between w-100">
      <div>
        <Link to="/" className="btn btn-outline-warning m-2">Get Product</Link>
        <Link to="/signup" className="btn btn-outline-warning m-2">Signup</Link>
        <Link to="/signin" className="btn btn-outline-warning m-2">Signin</Link>
        <Link to="/Addproduct" className="btn btn-outline-warning m-2">Add product</Link>
      </div>

      <div>
        {/* Dynamic Cart Link with Notification Badge */}
        <Link to="/cart" className="btn btn-warning m-2 position-relative me-4">
          🛒 Cart
          {totalItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
            </span>
          )}
        </Link>
        
        <button onClick={Logout} className="btn btn-outline-warning m-2">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

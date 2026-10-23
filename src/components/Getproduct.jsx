import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from './Usecarstore'; 

const Getproduct = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [products, setProduct] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const Getproducts = async () => {
    setLoading("Please wait as we are retrieving your products...");
    try {
      const response = await axios.get("https://ianson.alwaysdata.net/api/get_product_details");
      setProduct(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("There was an error retrieving products.");
    }
  };

  useEffect(() => {
    Getproducts();
  }, []);

  const imgurl = "https://ianson.alwaysdata.net/static/images/";
  const term = searchterm.toLowerCase();

  const filterCars = products.filter((product) =>
    (product.product_name || '').toLowerCase().includes(term.trim())
  );

  return (
    <div className='container mt-4'>
      <div className='row'>
        <h3 className='mb-3'>Available Products</h3>

        {loading && <div className="alert alert-info w-100">{loading}</div>}
        {error && <div className="alert alert-danger w-100">{error}</div>}

        <div className="col-12 mb-4">
          <input 
            type="search" 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder='Search products...' 
            className='form-control shadow-sm'
          />
        </div>

        {filterCars.map((product) => (
          <div key={product.product_id} className='col-md-3 justify-content-center mb-4'>
            <div className='card shadow h-100'>
              <img 
                src={imgurl + product.product_photo} 
                className="card-img-top" 
                alt={product.product_name} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className='card-body d-flex flex-column justify-content-between'>
                <div>
                  <h5 className='card-title mt-2'>{product.product_name}</h5>
                  <p className='card-text text-muted small'>{product.product_description}</p>
                  <h6 className='text-warning fw-bold mb-3'>
                    KSH {Number(product.product_cost).toLocaleString()}
                  </h6>
                </div>
                
                <div>
                  <button 
                    className="btn btn-warning w-100 mb-2 fw-semibold" 
                    onClick={() => addToCart({
                      id: product.product_id,
                      name: product.product_name,
                      price: product.product_cost,
                      photo: product.product_photo
                    })}
                  >
                    🛒 Add to Cart
                  </button>

                  <button 
                    className="btn btn-outline-warning w-100 btn-sm" 
                    onClick={() => navigate("/Mpesa", { state: { product } })}
                  >
                    Buy Instantly
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproduct;

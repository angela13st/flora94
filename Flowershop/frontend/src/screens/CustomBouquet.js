import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { addToCart } from '../actions/cartActions'; // Import your cart actions

function CustomBouquetScreen() {
  const [customBouquets, setCustomBouquets] = useState([]);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    async function fetchCustomBouquets() {
      try {
        const response = await fetch('/api/products'); // Adjust the API endpoint as needed
        const data = await response.json();

        // Filter products to get only custom bouquets
        const customBouquetProducts = data.filter(product => product.customBouquet === true);
        setCustomBouquets(customBouquetProducts);
      } catch (error) {
        console.error('Error fetching custom bouquets:', error);
      }
    }

    fetchCustomBouquets();
  }, []);

  const addToCartHandler = (product) => {
    console.log(product._id)
    // Dispatch the addToCart action with the selected product
    dispatch(addToCart(product._id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Bouquets</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {customBouquets.map(product => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: €{product.price}</p>
            <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomBouquetScreen;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);

        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleCategoryFilter = (category) => {
    setFilteredCategory(category);
  };

  const filteredProducts = filteredCategory
    ? products.filter(product => product.category === filteredCategory)
    : products;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista proizvoda</h1>
      <div>
        <div>
          <button onClick={() => handleCategoryFilter(null)} style={{border: "none"}}>All</button>
          {categories.map(category => (
            <button key={category} onClick={() => handleCategoryFilter(category) } style={{border: "none"}}>
              {category}
            </button>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredProducts.map(product => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
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
                <p>Price: € {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;

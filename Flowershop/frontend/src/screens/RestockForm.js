import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRestock } from '../actions/restockActions';

const RestockForm = ({ history }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = () => {
    if (selectedProduct && quantity && quantity > 0) {
      const newProduct = {
        product: selectedProduct._id,
        quantity: Number(quantity),
        name: selectedProduct.name,
      };
      setProducts([...products, newProduct]);
      setSelectedProduct(null);
      setQuantity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restockData = {
      products,
    };

    console.log('Restock Data:', restockData); 

    const response = await dispatch(createRestock(restockData));

    console.log('Create Restock Response:', response); 

    if (response && response.data) {
      console.log('Restock created successfully');
      // history.push('/restocks'); 
    } else {
      console.log('Restock creation failed');
    }
  };

  return (
    <div>
      <h1>Dodaj novu narudžbenicu</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-products">
              {selectedProduct ? selectedProduct.name : 'Select a Product'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableProducts.map((product) => (
                <Dropdown.Item
                  key={product._id}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {selectedProduct && (
          <Form.Group controlId="quantity">
            <Form.Label>Količina</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <div className="mb-3">
          <Button onClick={addProduct} variant="secondary" type="button">
           Dodaj proizvod
          </Button>
        </div>

        <div className="mb-3">
          <Button variant="primary" type="submit">
            Kreiraj narudžbenicu
          </Button>
        </div>
      </Form>
      <div>
        <h2>Odabrani proizvodi</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              Proizvod: {product.name}, Količina: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestockForm;

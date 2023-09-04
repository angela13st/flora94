import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestocks } from '../actions/restockActions';

const ProductDetails = ({ productId }) => {
  const [productName, setProductName] = useState(null);

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProductName(data.name);
      } catch (error) {
        console.error('Error fetching product name:', error);
      }
    };

    fetchProductName();
  }, [productId]);

  if (!productName) {
    return <p>Loading...</p>;
  }

  return (
    
      <ul>Naziv proizvoda: {productName}</ul>
    
  );
};

const RestockListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestocks());
  }, [dispatch]);

  const { loading, error, restocks } = useSelector((state) => state.getAllRestocks);

  return (
    <div>
      <h1>RLista narudbenica</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
  {restocks && restocks.length > 0 ? (
    restocks.map((restock) => (
      <li key={restock._id}>
        <div>Broj narudžbenice: {restock._id}</div>
        {restock.products && restock.products.length > 0
          ? restock.products.map((product) => (
              <div key={product._id}>
                <ProductDetails productId={product.product} />
                <ul>Količina: {product.quantity}</ul>
                <br /> {/* Add an empty row using <br /> */}
              </div>
            ))
          : null}
      </li>
    ))
  ) : (
    <p>Nema narudžbenica.</p>
  )}
</ul>

      )}
    </div>
  );
};

export default RestockListScreen;

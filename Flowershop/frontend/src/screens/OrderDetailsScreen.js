import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetailsScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        // Handle error (e.g., show an error message)
      }
    };

    fetchOrder();
  }, [id]);
  

  if (!order) {
    return <div>Loading...</div>;
  }


  const columnStyle = {
    flex: 1,
    padding: '16px',
    border: '1px solid #ccc',
    margin: '8px',
    backgroundColor: '#f5f5f5',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={columnStyle}>
        <h2>Lista proizvoda</h2>
        <ul>
          {order.orderItems.map((item) => (
            <li key={item.product}>
              <p>Ime: {item.name}</p>
              <p>Količina: {item.qty}</p>
              <p>Cijena: €{item.price}</p>

            </li>
          ))}
        </ul>
        <ul>
        <h2>Napomena</h2>
        <p>{order.napomena}</p> {/* Display the 'note' field */}
        </ul>
      </div>
      <div style={columnStyle}>
        <h2>Adresa za dostavu</h2>
        <p>Adresa: {order.shippingAddress.address}</p>
        <p>Grad: {order.shippingAddress.city}</p>
        <p>Poštanski broj: {order.shippingAddress.postalCode}</p>
        <p>Država: {order.shippingAddress.country}</p>

        <h2>Način plačanja</h2>
        <p>{order.paymentMethod}</p>
        <h2>Ukupna cijena</h2>
        <p>€{order.totalPrice}</p>
        
        
      </div>
    </div>
  );
};

export default OrderDetailsScreen;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const accessToken = '<insert access token here>';
    const url = 'https://api.allegro.pl/order-management/orders?seller.id=<insert seller id here>';
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.allegro.public.v1+json',
      }
    };
    axios.get(url, config)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-md p-4 mb-4">
          <h2 className="text-2xl font-medium mb-4">Order {order.id}</h2>
          <p className="mb-2">Status: {order.status}</p>
          <p className="mb-2">Buyer name: {order.buyer.name}</p>
          <p className="mb-2">Buyer email: {order.buyer.email}</p>
          <p className="mb-2">Buyer phone: {order.buyer.phone}</p>
          <ul className="list-disc pl-4 mb-4">
            {order.lineItems.map((item) => (
              <li key={item.id}>
                <p>Item name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.amount} {item.price.currency}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
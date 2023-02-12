import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = { name, quantity };

    axios.post('http://localhost:5000/orders', newOrder)
      .then((res) => {
        console.log(res.data);
        setOrders([...orders, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });

    setName('');
    setQuantity('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 rounded-md bg-white shadow-md mb-4">
        <h2 className="text-lg font-medium mb-4">Add New Order</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Order
          </button>
        </div>
      </form>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="bg-gray-200 p-2 rounded-md shadow-md mb-4">
            <h3 className="font-medium">{order.name}</h3>
            <p className="text-sm">Quantity: {order.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
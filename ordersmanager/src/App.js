import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    email: '',
    quantity: '',
    model: '',
    color: '',
    status: 'Nowe',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e, id) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === id) {
        order.status = e.target.value;
        axios.put(`http://localhost:5000/orders/${id}`, order);
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/orders', newOrder)
      .then((res) => {
        setOrders([...orders, res.data]);
        setNewOrder({
          email: '',
          quantity: '',
          model: '',
          color: '',
          status: 'Nowe',
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateOrder = (id) => {
    axios.put(`http://localhost:5000/orders/${id}`, newOrder)
      .then(() => {
        const updatedOrders = orders.map((order) => {
          if (order._id === id) {
            order.email = newOrder.email;
            order.quantity = newOrder.quantity;
            order.model = newOrder.model;
            order.color = newOrder.color;
            order.status = newOrder.status;
          }
          return order;
        });

        setOrders(updatedOrders);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditClick = (order) => {
    setNewOrder(order);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:5000/orders/${id}`)
      .then(() => {
        const updatedOrders = orders.filter((order) => order._id !== id);
        setOrders(updatedOrders);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFieldChange = (e, id, field) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === id) {
        return { ...order, [field]: e.target.value };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={newOrder._id ? () => handleUpdateOrder(newOrder._id) : handleAddOrder} className="max-w-sm mx-auto p-4 rounded-md bg-white shadow-md mb-4">
        <h2 className="text-lg font-medium mb-4">{newOrder._id ? 'Edit Order' : 'Add New Order'}</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={newOrder.email}
            onChange={handleInputChange}
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
         name="quantity"
         value={newOrder.quantity}
         onChange={handleInputChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
</div>
<div className="mb-4">
<label htmlFor="model" className="block text-gray-700 font-bold mb-2">
Model:
</label>
<input
         type="text"
         id="model"
         name="model"
         value={newOrder.model}
         onChange={handleInputChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
</div>
<div className="mb-4">
<label htmlFor="color" className="block text-gray-700 font-bold mb-2">
Color:
</label>
<input
         type="text"
         id="color"
         name="color"
         value={newOrder.color}
         onChange={handleInputChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
</div>
<div className="mb-4">
<label htmlFor="status" className="block text-gray-700 font-bold mb-2">
Status:
</label>
<select
id="status"
name="status"
value={newOrder.status}
onChange={(e) => handleStatusChange(e, newOrder._id)}
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
<option value="Nowe">Nowe</option>
<option value="W realizacji">W realizacji</option>
<option value="Zrealizowane">Zrealizowane</option>
<option value="Oczekuje na płatność">Oczekuje na płatność</option>
<option value="Anulowane">Anulowane</option>
</select>
</div>
<div className="text-center">
<button
         type="submit"
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       >
{newOrder._id ? 'Update Order' : 'Add Order'}
</button>
</div>
</form>
<table className="table-auto w-full">
<thead>
<tr>
<th className="px-4 py-2">#</th>
<th className="px-4 py-2">Email</th>
<th className="px-4 py-2">Quantity</th>
<th className="px-4 py-2">Model</th>
<th className="px-4 py-2">Color</th>
<th className="px-4 py-2">Status</th>
<th className="px-4 py-2">Actions</th>
</tr>
</thead>
<tbody>
{orders.map((order, index) => (
<tr key={order._id}>
<td className="border px-4 py-2">{index + 1}</td>
<td className="border px-4 py-2">{order.email}</td>
<td className="border px-4 py-2">
            <input
              type="number"
              defaultValue={order.quantity}
              onChange={(e) => handleFieldChange(e, order._id, 'quantity')}
              className="w-full"
            />
          </td>
          <td className="border px-4 py-2">
            <input
              type="text"
              defaultValue={order.model}
              onChange={(e) => handleFieldChange(e, order._id, 'model')}
              className="w-full"
            />
          </td>
          <td className="border px-4 py-2">
            <input
              type="text"
              defaultValue={order.color}
              onChange={(e) => handleFieldChange(e, order._id, 'color')}
              className="w-full"
            />
          </td>
          <td className="border px-4 py-2">
            <select
              defaultValue={order.status}
              onChange={(e) => handleStatusChange(e, order._id)}
              className="w-full"
            >
              <option value="Nowe">Nowe</option>
              <option value="W realizacji">W realizacji</option>
              <option value="Zrealizowane">Zrealizowane</option>
              <option value="Oczekuje na płatność">Oczekuje na płatność</option>
              <option value="Anulowane">Anulowane</option>
            </select>
          </td>
          <td className="border px-4 py-2">
            <button
              onClick={() => handleDeleteClick(order._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleEditClick(order._id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}

export default App;
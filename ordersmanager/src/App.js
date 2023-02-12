import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formFields = [  { id: 'email', name: 'email', label: 'Email', type: 'email' },  { id: 'quantity', name: 'quantity', label: 'Quantity', type: 'number' },  { id: 'model', name: 'model', label: 'Model', type: 'text' },  { id: 'color', name: 'color', label: 'Color', type: 'text' },];

const statusOptions = [  { label: 'Nowe', value: 'Nowe' },  { label: 'W trakcie realizacji', value: 'W trakcie realizacji' },  { label: 'Zrealizowane', value: 'Zrealizowane' },];

const tableHeaders = [  { name: 'email', label: 'Email' },  { name: 'quantity', label: 'Quantity' },  { name: 'model', label: 'Model' },  { name: 'color', label: 'Color' },  { name: 'status', label: 'Status' },];


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
    axios
      .get('http://localhost:5000/orders')
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

    axios
      .post('http://localhost:5000/orders', newOrder)
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
    axios
      .put(`http://localhost:5000/orders/${id}`, newOrder)
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
    axios
      .delete(`http://localhost:5000/orders/${id}`)
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
      <form
        onSubmit={newOrder._id ? () => handleUpdateOrder(newOrder._id) : handleAddOrder}
        className="max-w-sm mx-auto p-4 rounded-md bg-white shadow-md mb-4"
      >
        <h2 className="text-lg font-medium mb-4">{newOrder._id ? 'Edit Order' : 'Add New Order'}</h2>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
              {field.label}:
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={newOrder[field.name]}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
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
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            {tableHeaders.map((header) => (
              <th key={header.name} className="px-4 py-2">
                {header.label}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              {tableHeaders.map((header) => (
                <td key={header.name} className="border px-4 py-2">
                  {order[header.name]}
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteClick(order._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Delete
                </button>
                <button
                onClick={() => handleEditClick(order)}
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
);}
export default App;
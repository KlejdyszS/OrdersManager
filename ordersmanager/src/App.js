import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formFields = [  { id: 'email', name: 'email', label: 'Email', type: 'email' },  { id: 'quantity', name: 'quantity', label: 'Quantity', type: 'number' },  { id: 'model', name: 'model', label: 'Model', type: 'text' },  { id: 'color', name: 'color', label: 'Color', type: 'text' },];

const statusOptions = [  { label: 'Nowe', value: 'Nowe' },  { label: 'W trakcie realizacji', value: 'W trakcie realizacji' },  { label: 'Zrealizowane', value: 'Zrealizowane' },{ label: 'Oczekuje na płatność', value: 'Oczekuje na płatność' },];

const tableHeaders = [
  { name: '_id', label: 'ID', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'email', label: 'Email', type: 'email', className: 'px-4 py-2 w-1/10' },
  { name: 'quantity', label: 'Quantity', type: 'number', className: 'px-4 py-2 w-1/10' },
  { name: 'model', label: 'Model', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'color', label: 'Color', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'status', label: 'Status', type: 'select', className: 'px-4 py-2 w-1/10' },
];

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
    <div className="max-w-6/1 mx-auto p-4">
     <form
  onSubmit={newOrder._id ? () => handleUpdateOrder(newOrder._id) : handleAddOrder}
  className="max-w-md mx-auto rounded-md bg-white shadow-md my-4 p-4"
>
  <h2 className="text-2xl font-medium mb-4 text-center">
    {newOrder._id ? 'Edit Order' : 'Add New Order'}
  </h2>
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
        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
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
      className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
  <div className="flex justify-center">
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
      <th className="px-4 py-2 w-1/10">#</th>
      {tableHeaders.map((header) => (
        <th key={header.name} className={header.className}>
          {header.label}
        </th>
      ))}
      <th className="px-4 py-2 w-1/24">Actions</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <tr key={order._id}>
        <td className="border px-4 py-2 w-1/12">{index + 1}</td>
        {tableHeaders.map((header) => (
  <td key={header.name} className="border px-4 py-2 w-1/8">
    {header.type === 'select' ? (
      <select
        value={order[header.name]}
        onChange={(e) => handleFieldChange(e, order._id, header.name)}
        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <span>{order[header.name]}</span>

    )}
  </td>
))}
        <td className="border px-4 py-2 w-1/6">
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
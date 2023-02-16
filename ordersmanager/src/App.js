import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderPreview from './components/OrderPreview';
import OrderTable from './components/OrderTable';
import OrderForm from './components/OrderForm';
import { formFields, statusOptions } from './constants';

const opcjeDaty = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const tableHeaders = [
  { name: '_id', label: 'ID', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'email', label: 'Email', type: 'email', className: 'px-4 py-2 w-1/10' },
  { name: 'quantity', label: 'Quantity', type: 'number', className: 'px-4 py-2 w-1/10' },
  { name: 'model', label: 'Model', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'color', label: 'Color', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'date', label: 'Date', type: 'text', className: 'px-4 py-2 w-1/10' },
  { name: 'status', label: 'Status', type: 'select', className: 'px-4 py-2 w-1/10' },
];

function App() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

    const currentDate = new Date(); // get the current date and time
    const formattedDate = currentDate.toLocaleString(); // format the date as a string

    const newOrderWithDate = { // add the formatted date to the new order object
      ...newOrder,
      date: formattedDate,
    };

    axios
      .post('http://localhost:5000/orders', newOrderWithDate)
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
    setShowForm(true);
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
    <div className="flex">
      <div className="w-1/25 bg-gray-100">
        {statusOptions.map((option) => (
          <div key={option.value} className="px-4 py-2 border-b">
            {option.label}
          </div>
        ))}
      </div>
      <div className="w-1/8 bg-gray-200">
        <button
          className="bg-blue-500 text-white py-2 px-4 m-4 rounded focus:outline-none focus:shadow-outline w-32"
          onClick={() => setShowForm(!showForm)}
        >
          Toggle Form
        </button>
      </div>
      <div className="flex-1">
        <div className="max-w-6/1 mx-auto p-4 ">
          {showForm && (
            <OrderForm
              newOrder={newOrder}
              formFields={formFields}
              statusOptions={statusOptions}
              handleInputChange={handleInputChange}
              handleStatusChange={(e) => handleStatusChange(e, newOrder._id)}
              handleAddOrder={handleAddOrder}
              handleUpdateOrder={() => handleUpdateOrder(newOrder._id)}
            />
          )}
          <OrderTable
            orders={orders}
            tableHeaders={tableHeaders}
            statusOptions={statusOptions}
            handleFieldChange={handleFieldChange}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            opcjeDaty={opcjeDaty}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
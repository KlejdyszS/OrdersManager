import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderTable from './components/OrderTable';
import OrderForm from './components/OrderForm';
import { tableHeaders, statusOptions, opcjeDaty } from './constants';

function App() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    email: '',
    quantity: '',
    model: [{ word: '', number: '' }],
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
        order.status = e.target.value.toString(); // Convert the value to a string
        axios.put(`http://localhost:5000/orders/${id}`, order);
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
  
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
  
    const newOrderWithDate = {
      ...newOrder,
      date: formattedDate,
      model: newOrder.model,
    };
  
    axios
      .post('http://localhost:5000/orders', newOrderWithDate)
      .then((res) => {
        setOrders([...orders, res.data]);
        setNewOrder({
          email: '',
          quantity: '',
          model: [{ word: '', number: '' }],
          color: '',
          status: 'Nowe',
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateOrder = (id) => {
    const orderToUpdate = orders.find((order) => order._id === id);
  
    const updatedOrder = {
      ...orderToUpdate,
      email: newOrder.email,
      quantity: newOrder.quantity,
      model: newOrder.model.map((pair) => ({ word: pair.word, number: pair.number })),
      color: newOrder.color,
      status: newOrder.status,
    };
  
    axios
      .put(`http://localhost:5000/orders/${id}`, updatedOrder)
      .then(() => {
        const updatedOrders = orders.map((order) => {
          if (order._id === id) {
            return updatedOrder;
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
  const newModel = Array.isArray(order.model)
  ? order.model.map((item) => ({ word: item.word, number: item.number }))
  : [{ word: '', number: '' }];

  setNewOrder({ ...order, model: newModel });
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

  const handleAddPair = () => {
    setNewOrder({ ...newOrder, model: [...newOrder.model, { word: '', number: '' }] });
  };

    const handlePairInputChange = (index, event) => {
    const { name, value } = event.target;
    const newPairs = [...newOrder.model];
    newPairs[index][name] = value;
    setNewOrder({ ...newOrder, model: newPairs });
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
    handleInputChange={handleInputChange}
    handleStatusChange={(e) => handleStatusChange(e, newOrder._id)}
    handleAddOrder={handleAddOrder}
    handleUpdateOrder={() => handleUpdateOrder(newOrder._id)}
    handleAddPair={handleAddPair}
    handlePairInputChange={handlePairInputChange}
    statusOptions={statusOptions}
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
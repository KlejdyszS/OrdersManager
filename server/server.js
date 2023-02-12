require('dotenv').config(); // load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());


// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

// Parse JSON in request body
app.use(express.json());

// Add a new order to the database
app.post('/orders', async (req, res) => {
  const { name, quantity } = req.body;

  const newOrder = new Order({ name, quantity });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding order');
  }
});

// Get a list of orders from the database
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting orders');
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
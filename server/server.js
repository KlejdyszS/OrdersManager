require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  email: String,
  quantity: String,
  model: [
    {
      word: String,
      number: Number
    }
  ],
  color: String,
  status: {
    type: String,
    enum: ['Nowe', 'W realizacji', 'Zrealizowane', 'Oczekuje na płatność', 'Anulowane'],
    default: 'Nowe',
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().select('_id email quantity model color status created_at');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting orders');
  }
});

app.post('/orders', async (req, res) => {
  const { email, quantity, model, color, status } = req.body;
  const newOrder = new Order({ email, quantity, model, color, status });
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding order');
  }
});

app.put('/orders/:id', async (req, res) => {
  const { email, quantity, model, color, status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { email, quantity, model, color, status }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order');
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send('Order deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
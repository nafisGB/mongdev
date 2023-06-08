// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Create Express app
const app = express();

// Set up Mongoose connection
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  createdAt: Date,
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Task 2: Express.js Route
app.get('/products', (req, res) => {
  // Retrieve all products from the database
  Product.find({}, 'name price', (error, products) => {
    if (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(products);
    }
  });
});

// Task 3: JSON Web Tokens (JWT)
function generateToken(userId, secretKey) {
  return jwt.sign({ userId }, secretKey);
}

// Task 4: Express.js Middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

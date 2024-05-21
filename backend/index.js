const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
// Create Express app
const app = express();
//config dotenv
dotenv.config();
//Les cors
app.use(cors());
//BodyParser Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then((db) => {
    console.log(`Connected to database "${db.connections[0].name}"`);
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
    process.exit();
  });


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.get("/", (req, res) => {
  res.send("bonjour rgerde");
});


app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);

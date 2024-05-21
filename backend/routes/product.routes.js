const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Create a product
router.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).send("Produit créé avec succès");
    } catch (error) {
      res.status(400).send("Erreur lors de la création du produit");
    }
  });

  // Read all products
  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      console.log(products);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Route for ordering products by price or times bought
router.get('/products/order', async (req, res) => {
  try {
    const { orderby } = req.query;
    let sortOrder = 1; // Default to ascending order
    if (orderby && orderby.startsWith('-')) {
      sortOrder = -1; // Set to -1 for descending order
    }
    const sortByField = orderby ? orderby.slice(1) : 'price'; // Remove '-' if present
    const validSortFields = ['price', 'timesBought']; // Define valid sort fields
    if (!validSortFields.includes(sortByField)) {
      return res.status(400).json({ error: 'Invalid orderby parameter' });
    }
    const sortOptions = {};
    sortOptions[sortByField] = sortOrder;

    const products = await Product.find().sort(sortOptions);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read a product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération du produit: " + error.message);
  }
});



// Read products by category
router.get('/products/category/:categoryId', async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.categoryId }).populate('category');
      res.send(products);
    } catch (error) {
      res.status(500).send("Erreur lors de la récupération des produits par catégorie");
    }
  });
  
  // Update a product by ID
  router.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(product);
    } catch (error) {
      res.status(400).send("Erreur lors de la mise à jour du produit");
    }
  });
  
  // Delete a product by ID
  router.delete('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.send(product);
    } catch (error) {
      res.status(400).send("Erreur lors de la suppression du produit");
    }
  });

  

module.exports = router;
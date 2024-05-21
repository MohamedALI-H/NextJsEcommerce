const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const auth = require("../middleware/auth.js");

  // Read all categories
  router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find().sort({'name':1});
      res.send(categories);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Create a category
router.post('/categories', async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).send("Catégorie créée avec succès");
    } catch (error) {
      res.status(400).send("Erreur lors de la création de la catégorie");
    }
  });
  


  // Get all categories ordered by name or by the number of products
router.get('/categories/order', async (req, res) => {
  try {
      let categories;
      if (req.query.sortBy === 'numProducts') {
          categories = await Category.aggregate([
              {
                  $lookup: {
                      from: 'products',
                      localField: '_id',
                      foreignField: 'category',
                      as: 'products'
                  }
              },
              {
                  $addFields: {
                      numProducts: { $size: "$products" }
                  }
              },
              { $sort: { numProducts: 1 } }
          ]);
      } else {
          categories = await Category.find().sort({ name: 1 });
      }
      res.send(categories);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

  //Read Category by ID
  router.get('/categories/:id', async (req, res) => {
    id=req.params.id;
    try {
      const categorie = await Category.findById(id);
      res.send(categorie);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Update a category by ID
  router.put('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(category);
    } catch (error) {
      res.status(400).send("Erreur lors de la mise à jour de la catégorie");
    }
  });
  
  // Delete a category by ID
  router.delete('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      res.send(category);
    } catch (error) {
      res.status(400).send("Erreur lors de la suppression de la catégorie");
    }
  });

  
module.exports = router;
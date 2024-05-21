const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Create a user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("Utilisateur créé avec succès");
  } catch (error) {
    res.status(400).send("Erreur lors de la création de l'utilisateur");
  }
});

// Read all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send("Erreur lors de la mise à jour de l'utilisateur");
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send("Erreur lors de la suppression de l'utilisateur");
  }
});

// Search users by name or role
router.get("/users/search", async (req, res) => {
  try {
    let query = {};

    
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

   
    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query);
    res.send(users);
  } catch (error) {
    res.status(500).send("Erreur lors de la recherche des utilisateurs");
  }
});


router.post("/users/register", async (req, res) => {
  const { name, email, password, role, avatar } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(404)
      .send({ success: false, message: "Account already exists" });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = new User({
    name: name,
    email: email,
    password: hash,
    role: role,
    avatar: avatar,
  });
  try {
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.TOKEN, { expiresIn: "200s" });
};
//login
router.post("/users/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Account doesn't exists" });
    } else {
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res
          .status(400)
          .json({ success: false, message: "Please verify your credentials" });
        return;
      }
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      console.log(`Token: ${token}`);
      console.log(`Refresh token: ${refreshToken}`);
      res.status(200).json({
        success: true,
        token,
        refreshToken,
        user,
      });
    }
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Refresh
function generateRefreshToken(user) {
  return jwt.sign({user}, process.env.REFRESH_TOKEN, { expiresIn: '1y' });
  }
    //Refresh Route
  router.post('/users/refreshToken', async (req, res, )=> { const refreshtoken = req.body.refreshToken;
  if (!refreshtoken) {
  return res.status(404).json({ success: false,message: 'Token Not Found'
  });
  }
  else {
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (err, user) => {
  if (err) {
  return res.status(406).json({success: false, message:
  'Unauthorized Access' }); }
            else {
             const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
            res.status(200).json({
             token,
             refreshToken
  })
  }
  }); }});

module.exports = router;

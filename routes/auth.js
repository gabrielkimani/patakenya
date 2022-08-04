const express = require("express");
const User = require("../models/userModel");
const { registerValidation } = require("../utils/validation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { getToken } = require("../utils/jwtAuth");

//get user
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  //check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");
  //check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid email or password");
  //return token
  const token = getToken(user);
  res.send({
    _id: user._id,
    name: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
    logo: user.logo,
    location: user.location,
  });
});

//register new user
router.post("/register", async (req, res) => {
  const body = await req.body;
  const emailExist = await User.findOne({ email: body.email });

  if (emailExist)
    return res.status(401).send({ message: "Email already exist!" });
  const businessExists = await User.findOne({
    businessName: body.businessName,
  });
  if (businessExists) {
    return res.status(401).send({ message: "Business name already exist!" });
  }
  // const { error } = registerValidation(body);
  // if (error) return res.status(401).send({ message: error.details[0].message });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  const user = new User({
    username: body.fullname,
    email: body.email,
    phoneNumber: body.phoneNumber,
    businessName: body.businessName,
    location: body.locationUser,
    logo: body.logo,
    isAdmin: false,
    password: hashedPassword,
  });
  try {
    const newUser = await user.save();
    if (newUser) {
      return res.send({
        _id: newUser.id,
        name: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        logo: newUser.logo,
        location: newUser.location,
        token: getToken(newUser),
      });
    }
  } catch (error) {
    res.send(error);
  }
});

//get all users
router.get("/all-customers", async (req, res) => {
  try {
    const customers = await User.find({});
    if (customers) {
      res.send(customers);
    } else {
      res.send("No customers found!");
    }
  } catch (error) {
    res.send({ message: error });
  }
});

//update user
// router.put("/update/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, location, businessName, logo } = req.body;
//   const user = await User.findById(id);
//   if (!user) return res.status(400).send("Invalid user");
//   user.name = name || user.name;
//   user.email = email || user.email;
//   user.password = password || user.password;
//   user.location = location || user.location;
//   user.businessName = businessName || user.businessName;
//   user.logo = logo || user.logo;
//   await user.save();
//   res.send(user);
// });

module.exports = router;

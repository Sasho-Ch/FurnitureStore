const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const  userModel  = require('../models/User');


exports.register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    tel: userData.tel, 
  });

  return generateAccessToken(user);
};

exports.login = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error("No such user.");
  }

  const isValid = await bcrypt.compare(userData.password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials.");
  }

  return generateAccessToken(user);
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId); 
  if (!user) {
    throw new Error('User not found.');
  }
  
  return user;
};

exports.getOneUser = (userId) => User.findById(userId);

exports.editProfile = async (userId, updatedData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    user.username = updatedData.username || user.username;
    user.email = updatedData.email || user.email;
    user.tel = updatedData.tel || user.tel;

    if (updatedData.password) {
      user.password = await bcrypt.hash(updatedData.password, 12);
    }

    await user.save();
    return user;

  } catch (error) {
    throw new Error('Error updating profile: ' + error.message);
  }
};



function generateAccessToken(user) {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET, 
    { expiresIn: "3h" } 
  );

  return {
    _id: user._id,
    email: user.email,
    username: user.username,
    tel: user.tel,
    accessToken,
  };
}
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

// Create User (Signup)
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ msg: "User already exists" });
        }

        const newUser = await User.create({ name, email, password });
        const token = jwt.sign({ id: newUser._id, email: newUser.email },process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(403).json({ msg: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email },process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Get All Users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

module.exports = { createUser, getAllUser, loginUser, updateUser, deleteUser };

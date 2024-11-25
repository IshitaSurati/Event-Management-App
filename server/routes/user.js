const express = require('express');
const {
    createUser,
    loginUser,
    getAllUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/user.middleware.js');

const userRoute = express.Router();

userRoute.get("/", authenticateToken, getAllUser); 
userRoute.post("/signup", createUser); 
userRoute.post("/login", loginUser); 
userRoute.patch("/update/:id", authenticateToken, updateUser); 
userRoute.delete("/delete/:id", authenticateToken, deleteUser); 

module.exports = userRoute;

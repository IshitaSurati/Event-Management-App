const express = require('express');
const cors = require("cors");
const userRoute = require('./routes/user');
const connectDB = require('./config/db');
const eventRoute = require("./routes/event");
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 8090

const app = express();
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("Welcome to Event Management API");
  });
  
app.use("/api",userRoute)
app.use("/api/events", eventRoute);

app.listen(PORT, () => {
    console.log("Server Running On Port http://localhost:8000");
    connectDB();
})
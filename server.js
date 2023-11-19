const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./database/connection.js");
const logRoutes = require("./routes/logRoutes");
const Queue = require("bull");
const Redis = require("ioredis");



// Load environment variables
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to the database
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

// Use the log routes
app.use("/", logRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

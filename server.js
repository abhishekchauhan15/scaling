const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
const connectDB = require("./database/connection.js");

// Load environment variables
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to the database
connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const connectDB = require("./database/connection.js");
const logRoutes = require("./routes/logRoutes");


require("dotenv").config();

// Middleware
app.use(bodyParser.json());

// Connect to the database
const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI);

// Use the log routes
app.use("/", logRoutes);


app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

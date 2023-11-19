const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));




app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

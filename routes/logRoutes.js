// routes/logRoutes.js
const express = require("express");
const router = express.Router();

const { getAllLogs } = require("../controllers/getAllLogs");

router.get("/getlogs", getAllLogs);

module.exports = router;

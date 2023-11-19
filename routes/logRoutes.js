const express = require("express");
const router = express.Router();

const { getAllLogs } = require("../controllers/getAllLogs")
const { ingestLogs } = require("../controllers/ingestLogs")
const { searchLogs } = require("../controllers/searchLogs");

router.get("/getlogs", getAllLogs);
router.post("/", ingestLogs);
router.get("/search", searchLogs);

module.exports = router;

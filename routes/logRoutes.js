const express = require("express");
const router = express.Router();

const { getAllLogs } = require("../controllers/getAllLogs")
const { ingestLogs } = require("../controllers/ingestLogs")

router.get("/getlogs", getAllLogs);
router.post("/logs", ingestLogs);

module.exports = router;

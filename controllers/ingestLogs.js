const Log = require("../models/logModel");
const {isValidLog} = require("../utils/isValidLog");
const Queue = require("bull");

// Bull Queue for log processing
const logQueue = new Queue("logQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

// Worker to process logs asynchronously
logQueue.process("processLogs", async (job) => {
  const validLogs = job.data;

  // Batch insert valid logs using bulk operations
  await Log.insertMany(validLogs);
});

// Controller to ingest logs
exports.ingestLogs = async (req, res) => {
  try {
    const logData = req.body;

    // Ensure logData is an object
    if (typeof logData !== 'object' || Array.isArray(logData)) {
      return res.status(400).json({ error: "Invalid log format. Expected an object." });
    }

    // Validate the single log
    if (isValidLog(logData)) {
      // Enqueue log for asynchronous processing
      await logQueue.add("processLogs", [logData]); // Wrap the log in an array for consistency

      res.status(201).json({ message: "Log ingested successfully" });
    } else {
      res.status(400).json({ error: "Invalid log data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


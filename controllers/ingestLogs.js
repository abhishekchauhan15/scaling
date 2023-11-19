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
    const logsData = req.body;

    if (!Array.isArray(logsData)) {
      return res
        .status(400)
        .json({ error: "Invalid log format. Expected an array of logs." });
    }

    // Validate and filter logs
    const validLogs = logsData.filter((logData) => isValidLog(logData));

    // Enqueue logs for asynchronous processing
    await logQueue.add("processLogs", validLogs);

    res.status(201).json({ message: "Logs ingested successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

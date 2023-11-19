const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

// Add index on the timestamp field
logSchema.index({ timestamp: 1 });

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

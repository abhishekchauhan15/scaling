const Log = require("../models/logModel");

exports.searchLogs = async (req, res) => {
  try {
    const allowedParams = Object.keys(req.query);
    const validQueryParameters = allowedParams.filter((param) =>
      [
        "level",
        "message",
        "resourceId",
        "timestamp",
        "traceId",
        "spanId",
        "commit",
        "parentResourceId",
      ].includes(param)
    );

    const isValidParameters = validQueryParameters.every((param) =>
      allowedParams.includes(param)
    );
    if (!isValidParameters) {
      return res
        .status(400)
        .json({ error: "Invalid parameter(s) in the query" });
    }

    const query = {};
    validQueryParameters.forEach((param) => {
      if (param === "message" || param === "level") {
        query[param] = new RegExp(req.query[param], "i");
      } else if (param === "timestamp") {
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
          query[param] = {
            $gte: new Date(Date.parse(startDate)),
            $lte: new Date(Date.parse(endDate)),
          };
        }
      } else {
        query[param] = req.query[param];
      }
    });

    const logs = await Log.find(query).exec();
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

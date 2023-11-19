exports.isValidLog = (logData)=> {
  return (
    logData &&
    typeof logData.level === "string" &&
    typeof logData.message === "string" &&
    typeof logData.resourceId === "string" &&
    typeof logData.timestamp === "string" &&
    typeof logData.traceId === "string" &&
    typeof logData.spanId === "string" &&
    typeof logData.commit === "string" &&
    typeof logData.metadata === "obje`ct" &&
    typeof logData.metadata.parentResourceId === "string"
  );
}

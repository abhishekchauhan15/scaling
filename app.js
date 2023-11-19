const cluster = require("cluster");
const os = require("os");
const { dirname, join } = require("path");
const { fileURLToPath } = require("url");

const cpucount = os.cpus().length;
console.log(`This machine has ${cpucount} CPUs.`);
console.log(`Starting primary process ${process.pid}`);

cluster.setupPrimary({
  exec: join(__dirname, "./server.js"), // Specify the path to server.js
});

for (let i = 0; i < cpucount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log("Starting a new worker");
  cluster.fork();
});

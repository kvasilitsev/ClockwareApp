//* this a logger
const log4js = require("log4js");

log4js.configure({
    appenders: { clockwiseLog: { type: "file", filename: "logs/clockwise.log" } },
    categories: { default: { appenders: ["clockwiseLog"], level: "all" } }
  });

module.exports = log4js;

const express = require("express");
const log4js = require("./logger");
const masterRouter = require('./routes/master.routes');
const cityRouter = require('./routes/city.routes');

const logger = log4js.getLogger("clockwiseLog");
logger.info("test");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use('/api', masterRouter);
app.use('/api', cityRouter)

  
app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});


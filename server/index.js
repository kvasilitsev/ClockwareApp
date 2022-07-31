const express = require("express");
const log4js = require("./logger");
const masterRouter = require('./routes/master.routes');
const cityRouter = require('./routes/city.routes');
const clockRouter = require('./routes/clock.routes');

const logger = log4js.getLogger("clockwiseLog");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use('/api', masterRouter);
app.use('/api', cityRouter);
app.use('/api', clockRouter);

  
app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});


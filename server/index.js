require('dotenv').config({path: './.env'});
const express = require("express");
const cookieParser = require('cookie-parser');
const log4js = require("./logger");
const masterRouter = require('./routes/master.routes');
const cityRouter = require('./routes/city.routes');
const clockRouter = require('./routes/clock.routes');
const userRouter = require('./routes/user.routes');
const orderRouter = require('./routes/order.routes');
const errorMiddleware = require('./middlewares/error.middleware')

const logger = log4js.getLogger("clockwiseLog");
const PORT = process.env.API_PORT || 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', masterRouter);
app.use('/api', cityRouter);
app.use('/api', clockRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use(errorMiddleware);

  
app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);  
});


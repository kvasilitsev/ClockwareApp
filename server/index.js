require('dotenv').config({path: './.env'});
const express = require("express");
const cors = require('cors')
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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', cors(corsOptions), masterRouter);
app.use('/api', cors(corsOptions), cityRouter);
app.use('/api', cors(corsOptions), clockRouter);
app.use('/api', cors(corsOptions), userRouter);
app.use('/api', cors(corsOptions), orderRouter);
app.use(errorMiddleware);

  
app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);  
});


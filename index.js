// require('dotenv').config({path: './.env'});
// const express = require("express");
// const cors = require('cors')
// const cookieParser = require('cookie-parser');
// const log4js = require("./server/logger");
// const masterRouter = require('./server/routes/master.routes');
// const cityRouter = require('./server/routes/city.routes');
// const clockRouter = require('./server/routes/clock.routes');
// const userRouter = require('./server/routes/user.routes');
// const orderRouter = require('./server/routes/order.routes');
// const emailRouter = require('./server/routes/email.routes');
// const errorMiddleware = require('./server/middlewares/error.middleware');
// const path = require('path');
// const app = express();


// const logger = log4js.getLogger("./server/logs/clockwiseLog");
// const PORT = process.env.PORT || 3001;


// app.use(express.static(path.join(__dirname, 'client/build'))); //run static build
// // app.get('/*', function(req,res) {
// //   res.sendFile(path.join(__dirname, 'client/build', 'index.html')); //route with static build
// // });

// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }


// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// }


// app.use(express.json());
// app.use(cookieParser());

// app.use('/api', cors(corsOptions), masterRouter);
// app.use('/api', cityRouter);
// app.use('/api', clockRouter);
// app.use('/api', cors(corsOptions), userRouter);
// app.use('/api', cors(corsOptions), orderRouter);
// app.use('/api', cors(corsOptions), emailRouter);
// app.use(errorMiddleware);

  
// app.listen(PORT, () => {  
//   logger.info(`Server listening on ${PORT}`);  
// });

require('dotenv').config({path: './.env'});
const express = require("express");
const log4js = require("./server/logger");
const clockRouter = require('./server/routes/clock.routes');
const path = require('path');
const app = express();
const logger = log4js.getLogger("./server/logs/clockwiseLog");
const PORT = process.env.PORT || 3001;



if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use(express.json());
app.use('/api', clockRouter);

  
app.listen(PORT, () => {  
  logger.info(`Server listening on ${PORT}`);  
});


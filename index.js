require('dotenv').config({path: './.env'});
const express = require("express");
//const cors = require('cors')
const cookieParser = require('cookie-parser');
const log4js = require("./server/logger");
const masterRouterAdmin = require('./server/routes/admin/admin.master.routes');
const cityRouterAdmin = require('./server/routes/admin/admin.city.routes');
const clockRouterAdmin = require('./server/routes/admin/admin.clock.routes');
const userRouterAdmin = require('./server/routes/admin/admin.user.routes');
const orderRouterAdmin = require('./server/routes/admin/admin.order.routes');
const masterRouter = require('./server/routes/user/master.routes');
const cityRouter = require('./server/routes/user/city.routes');
const clockRouter = require('./server/routes/user/clock.routes');
const userRouter = require('./server/routes/user/user.routes');
const orderRouter = require('./server/routes/user/order.routes');
const emailRouter = require('./server/routes/user/email.routes');
const errorMiddleware = require('./server/middlewares/error.middleware');
const path = require('path');
const app = express();

const logger = log4js.getLogger("./server/logs/clockwiseLog");
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build'))); //run static build dev
app.all("*",function(req,res,next){ //routes for static build dev
  if (req.originalUrl.startsWith('/api')) {      
      next();
  } else {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));      
  }
});


if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.all("*",function(req,res,next){
    if (req.originalUrl.startsWith('/api')) {      
        next();
    } else {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));      
    }
  });
}


// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// }


app.use(express.json());
app.use(cookieParser());

app.use('/api', masterRouter);
app.use('/api', cityRouter);
app.use('/api', clockRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api', emailRouter);
app.use('/api', masterRouterAdmin);
app.use('/api', cityRouterAdmin);
app.use('/api', clockRouterAdmin);
app.use('/api', userRouterAdmin);
app.use('/api', orderRouterAdmin);

app.use(errorMiddleware);
  
app.listen(PORT, () => {  
  logger.info(`Server listening on ${PORT}`);  
});

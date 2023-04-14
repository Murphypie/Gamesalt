const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const tableRouter = require('./routes/table.js')
const userRouter = require('./routes/user.js')

// Handle Cookies
app.use(cookieParser())


// Handle Parsing request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static
app.use(express.static(path.join(__dirname, '../build')));

// Routes
app.use('/table', tableRouter);
app.use('/user', userRouter);

// route handler to respond with main app
// You don't need this but If I want to create or do something with cookies, it is convinent to do it here.
app.get('/', (req, res)=>{
    return res.sendFile(path.join(__dirname, '../client/index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('/*', (req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

  // Starting Server
app.listen(PORT, () =>{
    console.log(`Server listening on port: ${PORT}`)
})

module.exports = app;
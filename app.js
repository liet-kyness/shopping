const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const itemRoutes = require('./itemRoutes');
const middleware = require('./middleware');

app.use(express.json());

app.use(middleware.logger);
app.use('/items', itemRoutes);


//404 error handler
app.use(function(req, res) {
    return new Error('Not Found', 404);
});

//error handler
app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

app.listen(5555, function() {
    console.log('SlingShot.. Engaged.  (listening on port: 5555)');
});

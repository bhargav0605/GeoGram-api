const express = require('express');
const bodyParser = require('body-parser');

const placeRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// parsing body
app.use(bodyParser.json());
app.use('/api/places',placeRoutes);
app.use('/api/users', userRoutes);
app.use((req, res, next)=>{
    const error = new HttpError('Count not find this route.', 404);
    throw error;
});

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message  || 'An unknown error occured.'});
});

app.listen(5000);
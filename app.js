const express = require('express');

const app = express();

const connectDB = require('./config/db');

const bookRoutes = require('./routes/bookRoutes');


connectDB();


app.use(express.urlencoded({

    extended: true
}));

app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));


app.set(

    'view engine',

    'ejs'
);


app.use(

    '/',

    bookRoutes
);


app.listen(8000, () => {

    console.log('Server Running On Port 8000');
});

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const morgan = require('morgan');

//settings
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));

//Routes
app.use(require('./routes/index'));

//start the server
app.listen(app.get('port'),() => {
    console.log("server running on port 3000");
});

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUnitialized: false
}));
//flash debe ir antes de passport y despues de session :D
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//creo un middleware para que los mensajes de flash sean variables locales
//y para que esten accequible de todos lados
app.use((req,res,next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    //si no se añade el next, el navegador quedara cargando infinitamente
    next();
})

//Routes
app.use(require('./routes/index'));

//start the server
app.listen(app.get('port'),() => {
    console.log("server running on port 3000");
});


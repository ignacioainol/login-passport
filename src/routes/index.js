const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/signup',(req,res,next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin',(req,res,next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout',(req,res,next) => {
    req.logout();
    res.redirect('/');
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

//esto protege varias rutas. Es un middleware
//las rutas debajo de ella estaran protegidas o se checkeara el logeo
router.use((req,res,next) => {
    isAuthenticated(req,res,next);
    next();
});

router.get('/profile',(req,res,next) => {
    res.render('profile');
});

module.exports = router;
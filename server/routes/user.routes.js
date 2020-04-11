const express = require('express');
const passport = require('passport');
const passportConf = require('../passport');

const UserController = require('../controllers/users.controller');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });

const router = express.Router()

router.post('/signup', UserController.signUp)
router.post('/signin', passportSignIn, UserController.signIn)
router.get('/secret', passportJWT, UserController.secret);
router.post('/oauth/google', passportGoogle, UserController.googleOAuth);
router.get('/test', UserController.test)

module.exports = router;

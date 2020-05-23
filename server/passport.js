const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// const passportGoogle = require('passport-google-oauth');
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configs');
const User = require('./models/user');

// JWB Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET,
};


passport.use(new JWTStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        // find the user given the email
        const user = await User.findOne({ "local.email": email })
        // if not, handle it 
        if (!user) {
            return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return done(null, false);
        }
        done(null, user);   
    } catch (error) {
        done(error, false);
    }
}))
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy  = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./configs');
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

// Google oath strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
        // Check whether this current user exists in out DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        console.log('existing user', existingUser);
        if (existingUser)  {
            console.log('user arleady exists');
            return done(null, existingUser);
        }
    
        // if new account
        console.log('user doenst exists, create a new one ');
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
            }
        });
        await newUser.save();
        done(null, newUser);   
    } catch (error) {
        done(error, false, error.message);
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
const JWT  = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs');

const signToken = user => {
    return JWT.sign({
        iss: 'RitchieNotes',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1), // one day 
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({
                error: 'email arleady in use',
            })
        }
        const newUser = new User({
            email,
            password,
        });
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({ token })
    },
    signIn: (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret:(req, res) => {
        console.log(`I'm here is main`);
    },
    test: (req, res) => {
        res.json('VAlue');
    },
    getNotes: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);

    }
}
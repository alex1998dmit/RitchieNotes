
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session');

const db = require('./db');
const userRoutes = require('./routes/user.routes');
const notesTreeRoutes = require('./routes/note.tree.router');
// const notesTreeRouter = require('./routes/note.tree.router');
const { COOKIE_KEY } = require('./configs');

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json())
app.use(
  cookieSession({
      maxAge:30 * 24 * 60 * 60 *1000,
      keys:[COOKIE_KEY]
  })
);

// database
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/auth', userRoutes);
app.use('/api/notestree', notesTreeRoutes);

// production
const path = require('path');
app.use(express.static('build'));
app.get('*', (req,res)=>{
  // res.sendFile(path.join(__dirname +'../build/index.html'));
  res.sendFile(path.resolve(__dirname, '..', 'build','index.html'))
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

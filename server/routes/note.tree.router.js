const express = require('express');
const passport = require('passport');
// const passportConf = require('../passport');

const NotesTreeContoller = require('../controllers/note.tree.controller');

// const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

const router = express.Router()

router.get('/', passportJWT, NotesTreeContoller.getUserItems);
router.get('/:id', passportJWT, NotesTreeContoller.getItem);

router.post('/', passportJWT, NotesTreeContoller.addNoteTreeItem);

module.exports = router;

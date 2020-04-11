const express = require('express');

const NotesController = require('../controllers/note.tree.controller');

const router = express.Router()

router.get('/:id', NotesController.getNote);
router.get('/:id/update', NotesController.update)
// router.
router.post('/signup', UserController.signUp);

module.exports = router;

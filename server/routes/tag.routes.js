const express = require('express');
const passport = require('passport');

const TagsController = require('../controllers/tags.controller');

const passportJWT = passport.authenticate('jwt', { session: false });

const router = express.Router()

router.get('/', passportJWT, TagsController.getList);
router.post('/', passportJWT, TagsController.create);
router.put('/:tagId', passportJWT, TagsController.update);
router.delete('/:tagId', passportJWT, TagsController.delete);
router.get('/:tagId/notes', passportJWT, TagsController.getNotes);
router.put('/:tagId/notes/:noteId', passportJWT, TagsController.addNode);
router.delete('/:tagId/notes/:noteId', passportJWT, TagsController.removeNode);

module.exports = router;

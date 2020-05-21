const to = require('await-to-js').default;

const NoteTree = require('../models/note.tree');
const Tag = require('../models/tag');

module.exports = {
    getList: async (req, res) => {
        const { user } = req;
        const tags = await Tag.find({ user: user._id });
        return res.status(200).json({ items: tags });
    },
    // work wtih note tree
    create: async (req, res) => {
        const { title } = req.body;
        const { user } = req;
        const tag = await Tag.findOne({
            title,
        });
        if (tag) {
            res.status(409).json({ msg: 'tag arleady exists' });
        }
        const newTag = new Tag({
            title,
            user: user.id,
            nodes: [],
        });
        await newTag.save();
        res.status(200).json({ item: newTag });
    },
    delete: async (req, res) => {
        const { user } = req;
        const { tagId } = req.params;
        const tag = await Tag.findOne({ _id: tagId });
        if (String(user._id) !== String(tag.user)) {
            return res.status(401).json({ msg: 'Not your tag' });
        }
        const [err] =  await to(Tag.deleteOne({ _id: tagId }));
        if (err) {
            return res.status(500).json({ msg: 'Mongoose problem' });
        }
        return res.status(204).json({ status: 'success' });
    },
    update: async (req, res) => {
        const { tagId } = req.params;
        const data = req.body;
        const { user } = req;
        const tag = await Tag.findById(tagId);        

        if (String(user._id) !== String(tag.user)) {
            return res.status(401).json({ msg: 'Not your tag' });
        }
        tag.title = data.title ? data.title : tag.title;
        tag.desc = data.desc ? data.desc : tag.desc;
        await tag.save();
        return res.status(201).json({ item: tag });
    },
    addNode: async (req, res) => {
        const { noteId, tagId } = req.params;
        const { user } = req;
        const note = await NoteTree.findOne({ _id: noteId });
        const tag = await Tag.findOne({ _id: tagId });
        
        if (String(tag.user) !== String(user._id)) {
            res.status(401).json({ msg: 'Not your tag' });
            return;
        }
        if (String(note.user) !== String(user._id)) {
            res.status(401).json({ msg: 'Not your note' });
            return;
        }
        if (note.tags.includes(tagId)) {
            return res.status(419).json({ msg: 'Your note arleady taged like this '});
        }

        note.tags.push(tagId);
        await note.save();

        tag.notes.push(noteId);
        await tag.save();
        res.status(201).json({ tag, note });
    },
    removeNode: async (req, res) => {
        const { noteId, tagId } = req.params;
        const { user } = req;
        const note = await NoteTree.findOne({ _id: noteId });
        const tag = await Tag.findOne({ _id: tagId });
        
        if (String(tag.user) !== String(user._id)) {
            return res.status(401).json({ msg: 'Not your tag' });
        }
        if (String(note.user) !== String(user._id)) {
            return res.status(401).json({ msg: 'Not your note' });
        }
        const newTag = await Tag.update({ _id: tagId }, { $pullAll: { notes: [ noteId ] }});
        const newNote = await NoteTree.update({ _id: noteId }, { $pullAll: { tags: [ tagId ] }});
        res.status(201).json({ tag: newTag, note: newNote });
    },
    getNotes: async (req, res) => {
        const { tagId }  = req.params;
        const { user } = req;

        const tag = await Tag.findOne({ _id: tagId });
        if (String(tag.user) !== String(user.id)) {
            res.status(401).json({ msg: 'Not your tag' });
        }
        const notesId = tag.notes;
        const notes = await NoteTree.find({
            '_id': {
                $in: notesId,
            },
        });
        return res.status(200).json({ items: notes });
    },
};

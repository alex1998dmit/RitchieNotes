const to = require('await-to-js').default;
const NoteTree = require('../models/note.tree');
const User = require('../models/user');
const Tag = require('../models/tag');

const {
    removeNodeFromTree,
    findNodeById,
    addNode,
    updateNode,
} = require('../services/note.tree/handles');

module.exports = {
    // work wtih note tree
    addNoteTreeItem: async (req, res) => {
        const { tree, questions } = req.body;
        const { user } = req;
        const newNote = new NoteTree({
            tree,
            questions,
            user: user._id,
        });
        await newNote.save();
        user.notes = [...user.notes, newNote._id];
        await user.save();
        res.status(200).json({ msg: 'success' });
    },
    getUserItems: async (req, res) => {
        const { user } = req;
        const noteTreeIds = user.notes;
        // const noteTreeIds = user.notes.map(id => mongoose.Types.ObjectId(id));

        const notes = await NoteTree.find({
            '_id': {
                $in : noteTreeIds,
            },
        });
        return res.status(200).json({ items: notes });
    },
    getItem: async (req, res) => {
        const { id } = req.params;

        const [err, note] = await to(NoteTree.findById(id));
        if (err) {
            return res.status(500).json({ msg: 'Error with finding note' });
        }
        return res.status(200).json({ item: note });
    },
    getItemTags: async (req, res) => {
        const { id } = req.params;
        const [err, note] = await to(NoteTree.findById(id));
        if (err) {
            return res.status(500).json({ msg: 'Error with getting note tags' });
        }
        const tagIds = note.tags;
        const [tagErr, tags] = await to(Tag.find({
            '_id': {
                $in: tagIds,
            },
        }));
        if (tagErr) {
            return res.status(500).json({ msg: 'Error with getting note tags' });
        }
        return res.status(200).json({ items: tags });
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const [err, note] = await to(NoteTree.findByIdAndUpdate(id, body, { new: true }));
        if (err) {
            return res.status(500).json({ msg: 'Can not update note' });
        }
        return res.status(200).json({ item: note });
    },
    // ------ below is trash
    getNoteTree: async (req, res) => {
        const { id } = req.params;
        const item = NoteTree.findById(id);
        return res.status(200).json({ success: true, item });
    },
    updateNoteTree: async (req, res) => {
        const { id } = req.params;
        const { item } = req.body;
        const noteTreeItem = await NoteTree.findByIdAndUpdate(id, item);
        noteTreeItem.save();
        res.status(200).json({ status: 'note tree udpated'});
    },
    removeNoteTree: async () => {},
    createNoteTree: async(req, res) => {
        const { tree, userId  } = req.body;

        if (!tree) {
            return res.status(400).json({
                success: false,
                msg: 'Needed tree body',
            });
        }

        const noteTree = new NoteTree();
        const user = await User.findById(userId);

        noteTree.tree = tree;
        noteTree.user = user;
        await noteTree.save();
        
        user.notes.push(noteTree);
        await user.save();
        res.status(201).json(noteTree);
    },
};

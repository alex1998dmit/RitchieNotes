const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteTree = new Schema(
    {
        tree: { type: Object, require: true },
        questions: { type: Object },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'tag',
        }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('noteTree', NoteTree);

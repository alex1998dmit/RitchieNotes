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
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('noteTree', NoteTree);

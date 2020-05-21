const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema(
    {
        title: { type: String, required: true },
        notes: [{
          type: Schema.Types.ObjectId,
          ref: 'noteTree',
        }],
        desc: {
            type: Schema.Types.String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Tag', Tag);

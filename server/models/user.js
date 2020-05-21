const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true,
    },
    local: {
        email: {
            type: String,
            lowercase: true,
        },
        password: { 
            type: String,
        },
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,            
        }
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,            
        }
    },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'noteTree',
    }], 
});

userSchema.pre('save', async function(next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        // generate salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        next();
    } catch(err) {
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('das918das918', salt);
        console.log(passwordHash);
        console.log(await bcrypt.compare('das918das918', passwordHash));
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;

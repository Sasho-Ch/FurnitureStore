const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    tel: String,
    password: String,
    furnitures: [{
        type: ObjectId,
        ref: 'Furniture',
    }]
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
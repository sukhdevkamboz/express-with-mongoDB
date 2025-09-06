const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String},
    address: { type: String},
    dob: { type: String},
});

module.exports = mongoose.model('UserDetail', userSchema);
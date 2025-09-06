const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true , unique: true},
    gender: { type: String, required: true},
    role: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
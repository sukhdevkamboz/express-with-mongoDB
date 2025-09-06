const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true , unique: true},
    gender: { type: String, required: true},
    role: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const userDetailSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String},
    address: { type: String},
    dob: { type: String},
    created_at: { type: Date, default: Date.now }
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);

// Salary Schema
const salarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    basic: { type: Number, required: true },
    hra: { type: Number },
    bonus: { type: Number },
    total: { type: Number },
    month: { type: String },
    year: { type: Number },
    created_at: { type: Date, default: Date.now }
});

const Salary = mongoose.model('Salary', salarySchema);

// Export all models
module.exports = {
    User,
    UserDetail,
    Salary
}
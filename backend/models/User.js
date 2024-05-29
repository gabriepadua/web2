const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);

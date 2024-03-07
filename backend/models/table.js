const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types


const tableSchema = new mongoose.Schema({
    userId: {
        type:ObjectId,
        ref: 'Form'
    },
    select: {
        type: Boolean
    },
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    hobbies: {
        type: String
    }
});


const Table = mongoose.model('Table', tableSchema);

module.exports = Table;

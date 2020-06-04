const mongoose = require('mongoose');


// Define Schema for Contact
const ContactSchema = mongoose.Schema({
    // Creating a relations 
    // Set type with mongoose
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // refering to a specific collection
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('contact', ContactSchema);
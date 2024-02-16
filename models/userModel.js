const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String, // Change to String as phone numbers can contain characters like '+'
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose")



const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    }
}, { timestamp: true })

const User = mongoose.model("User", UserSchema);

module.exports = User;
const mongoose = require("mongoose");

const PasswordStoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    username: String,
    product: String,
    password: String
})

module.exports = mongoose.model("Password", PasswordStoreSchema);


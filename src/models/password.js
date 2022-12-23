const mongoose = require("mongoose");
// const schema = mongoose.Schema;

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

// more methods for excrypted database not needed write know
// PasswordStoreSchema
// .virtual("password")
// .get(function(){

// })

// PasswordStoreSchema.methods = {
//     setBase: () => {
//         this.passwordBase = 
//     }
// }

module.exports = mongoose.model("Password", PasswordStoreSchema);


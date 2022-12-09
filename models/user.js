const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        // no need to make it required this condition is allready acomodated in api controller
    },
    salt: String,
    role: {
        type: String,
        default: 0,
    },
});

/* [Explanation of how virtuals works] refrence https://www.geeksforgeeks.org/mongoose-virtuals/
 * In this case a virtual named 'password' is being created
 * whenever we will save any value in 'password' parameter the 
 * 'setter funtion' will be triggred ,which will create an hased password and save it to schema
 *  similarly whenever we use the value 'password' 'getter funtion' will return value for it
 */

userSchema
    .virtual("password")        // here we set the alies name ex. password is virtual here
    .set(function (password) { // whenever password is passed in post reques passord is set to provided password
        const _password = password;
        this.salt = uuidv1();     // sets a unique salt for every user
        this.hashed_password = this.generateSecurePassword(password);
    })
    .get(function () {
        // cannot unhash the password
        return "password is incurupted";
    });

// [Methods for user schema]

userSchema.methods = {
    // Method 1:
    authanticatWithPassword: function (plainPassword) {
        return this.generateSecurePassword(plainPassword) === this.hashed_password; //returns a bool
    },

    // Method 2:
    generateSecurePassword: function (plainPassword) {
        if (!plainPassword) {
            // if password is empty
            return ""
        };
        try {
            const hash = crypto
                .createHmac("sha256", this.salt) // hashing alogo and salt
                .update(plainPassword)   // variable to be hashed
                .digest("hex");
            return hash             // returning hashed password
        } catch (error) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema); 

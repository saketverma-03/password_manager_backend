const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { v1: uuidv1 } = require("uuid");

const crypto = require("crypto");

// SCHEMA
const userSchema = new schema({
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
  },
  userInfo: String,
  salt: String,
});

// Virtuals
userSchema
// here we set the alies name ex. password is virtual here
    .virtual("password")
    // whenever password is passed in post request passord is set to provided password
    // using "this." we can acces all the values and methods of the user schema
    .set(function (password) { 
        const _password = password;
        //  sets a unique salt for every user
        this.salt = uuidv1();
        this.hashed_password = this.securePassword(password);
    });
//   .get(function () {
//     return _password;
//   });

/* USER SCHEMA METHODS
* user schema methods can be accessed 
* directly from schema and its objects
*/
userSchema.methods = {
  // Module to generate sequred Password for New User
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return ""
    };
    try {
      const hash = crypto
        // Hasing Algorith used sha256, Get Salt From DataBase
        .createHmac("sha256", this.salt)
        // variable to be hashed
        .update(plainPassword)   
        .digest("hex");
      return hash
    } catch (error) {
      return "";      //if error send empty password so that it can not be saved and genertos error
    }
  },
  /* AUTHANTICATION METHOD
  * this takes the plain password from plain text ,
  * then puts it into "securePassword()" fintion
  * which returns the hash password with salt in DB which 
  * is then comared to the original hased password for verification
  */
  authanticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.hashed_password; //returns a bool
  },
};

module.exports = mongoose.model("User", userSchema); 

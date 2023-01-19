const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

let a = uuidv1()
const hash = crypto
        // Hasing Algorith used sha256, Get Salt From DataBase
        .createHmac("sha256", "masterkey")
        // variable to be hashed
        .update(a)   
        .digest("hex");

console.log(hash);

let dbUrl =
  "mongodb://mongo:crvZe16PaJNI0AcdAp4Y@containers-us-west-127.railway.app:6966";
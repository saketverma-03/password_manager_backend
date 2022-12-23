const express = require("express");
const { isSignedIn } = require("../controllers/auth");
const { savePasword,getAllPassword,deleteOne,updateOne } = require("../controllers/password");


const route = express.Router()

route.post("/addPasswordToDb", isSignedIn, savePasword)
route.get("/getAllPassword", isSignedIn, getAllPassword)
route.delete("/deletOnePassword",isSignedIn,deleteOne)
route.put("/updateOnePassword",isSignedIn,updateOne)

module.exports = route;
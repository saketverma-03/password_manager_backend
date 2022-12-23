const User = require("../models/users")
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
// const ejwt = require("express-jwt"); 

// Create New User
exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0] });
    }

    const user = new User(req.body);

    /*   Trying to save user to the database
     *   it gives error and new CreatedUser
     */
    user.save((e, createdUser) => {
        if (e) {
            return res.status(400).json({
                errorMessage: "Unable to carry request User not created",
                error: e
            })
        }
        res.json(createdUser);
    })
}

// Signin route
exports.signin = (req, res) => {
    //  destructuring the request body
    const { email, password } = req.body;

    // #TODO ADD validation
    //  For validation of that email entered by a user is an email type
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0] });
    }

    // findin user By Matching Given parameter
    User.findOne({ email }, (error, user) => {
        if (error) {
            return res.status(400).json({ errorMessage: "Email is Not registerd", error })
        }
        if (!user) {
            return res.status(400).json({ errorMessage: "user with the email or Username does not exist" })
        }
        // authanticate funtion is declred in user schema methods
        if (!user.authanticate(password)) {
            return res.status(401).json({ error: "Email and Password do not match" })
        }

        // Create Token
        const token = jwt.sign({ _id: user._id }, process.env.SECREAT || "saket", { expiresIn: '1h' })
        // set cookie
        res.cookie("token", token, { expire: new Date() + 9999 })


        const { _id, email, name } = user;

        return res.json({ token, user: { _id, name, email } });
    });
}

exports.isSignedIn = (req, res, next) => {
    // extracting token from request header
    const token = req.headers.authorization;

    
    try {
        const decoded = jwt.verify(token, "saket");
        req.userId = decoded._id;
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            // The JWT has expired
            return res.status(401).json({ message: 'Token has expired' ,error:err});
        } else {
            // There was an error verifying the JWT
            return res.status(401).json({ message: 'Invalid token',error:err });
        }
    }
    
    next()
}
exports.signout = () => { }

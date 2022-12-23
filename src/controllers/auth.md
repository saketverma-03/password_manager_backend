# Overview
## Controllers
- signup()
- signin()
- signout()

## MiddleWare
- isSignedIn()

# Usage
## 1. `signup(req,res)`
parameters `req,res` from express

```js
exports.signup = (req, res) => {

    const user = new User(req.body);    

    /*   Trying to save user to the database
     *   it gives error and new CreatedUser
     */
    user.save((e,createdUser) => {
        if(e){
            return res.status(400).json({
                errorMessage: "Unable to carry request User not created",
                error : e
            })
        }
        res.json(createdUser);
    })
}
```
here `req.body` shoud be according to userSchema in `src/model/user.js`

```js
req.body = {
    name: ""
    email: ""
    password:""
}
```
## 2. `signin(req,res)`
parameters `req,res` from express
### funtion

```js
exports.signin = (req ,res) => {
    //  destructuring the request body
    const {email ,password} = req.body;

    // findin user By Matching Given parameter
    User.findOne({email} , (error , user) => {
        if(error){
            return res.status(400).json({ errorMessage : "Email is Not registerd",error})
        }
        if(!user){
            return res.status(400).json({ errorMessage : "user with the email or Username does not exist"})
        }
        // authanticate funtion is declred in user schema methods
        if(!user.authanticate(password)){
           return res.status(401).json({ error : "Email and Password do not match"})
        }

        // Create Token
        const token = jwt.sign({_id : user._id} , process.env.SECREAT || "saket",{ expiresIn: '1h' })
        // set cookie
        res.cookie("token" ,token ,{ expire: new Date() + 9999 })


        const {_id ,email ,name} = user;
       
        return res.status(200).json({ token, user : { _id , name ,email}});
    } );    
}

```
possible responses \
#TODO exapmles

# MiddleWares

```js
exports.isSignedIn = (req,res,next) => {
    // extracting token from request header
    const token = req.headers.authorization;

    // Decoding token
    const jwtVerification = jwt.verify(token,"saket");
    if(!jwtVerification){
        return res.json({message: "authantication failed please login again"})
    }
    req.userId = jwtVerification;
    next()
}
```
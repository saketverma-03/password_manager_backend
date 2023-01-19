const Password = require("../models/password")

exports.savePasword = (req, res) => {
    const passwordItem = new Password({
        ...req.body,
        user: req.userId
    });

    passwordItem.save((e, savedItem) => {
        if (e) {
            return res.status(400).json({
                message: "Password Not Saved",
                error: e
            })
        }
        else {
            return res.status(200).json({message:"Pssword saved Successfully"})
        }
    })
}

exports.getAllPassword = (req, res) => {

    Password.find({ userId: req.params['id'] }, (err, items) => {
        if (err) {
            // Handle the error
            return res.status(500).json({
                error: err,
                message: "Can not fetch password pleas try loging in again"
            });
        }
        return res.status(200).json({items,message:"Synced to Database"})
    })
}

exports.deleteOne = (req,res) =>  {
  
    Password.findByIdAndDelete(req.body._id, (err) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: "Password Deletion Failed! , Pleas Try again later"
        })
        } else {
          res.status(200).json({
            message: "Password Deleted Successfully"
          })
        }
      });
}

exports.updateOne = (req,res) => {
    const id = req.body._id
    Password.findById(id,(error,item) => {
        if(error){
            return res.status(400).json({message:"Password Updation Password",error})
        }
        if(!item){
            return res.status(400).json({message:"item not found",error})
        }
        item.username = req.body.username;
        item.product = req.body.product;
        
        item.password = req.body.password;
        item.save((error) => {      
            res.status(200).json({message:"Succesfully Updated"})
        })
    });
   
    
}

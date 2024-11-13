const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")


module.exports.signup = async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails)
  try {
    const hash = await bcrypt.hash(userDetails.password, 10);
    userDetails["password"] = hash;

    const checking = await User.findOne({where :{email :userDetails.email}});
    if (checking === null) {
      await User.create(userDetails);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } else {
      res.status(409).json({ success: true, message: "Email already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};



module.exports.login = async (req,res) => {
  const userDetails = req.body;
  try{
    const user = await User.findOne({where :{email :userDetails.email}})
      if(user ===  null){
        res.status(404).json({success:true , message : "User not found create an account"})
      }else{

        const passwordChecking = await bcrypt.compare(userDetails.password,user.password)
          if(passwordChecking){
            const key = "private"
            const token = jwt.sign({ID:user.ID , userName :user.userName},key)
            
            res.status(201).json({success :true , message : "Login Successful" , token : token})
          }else{
            res.status(401).json({success: true, message: 'Incorrect password'})
          }
      }

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error'});
  }
}
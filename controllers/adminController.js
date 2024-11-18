const bcrypt = require("bcrypt");
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken")


module.exports.signUp = async (req, res) => {
  const userDetails = req.body;
  
  try {
    const hash = await bcrypt.hash(userDetails.password, 10);
    userDetails["password"] = hash;

    const checking = await Admin.findOne({where :{email :userDetails.email}});
    if (checking === null) {
      await Admin.create(userDetails);
      res
        .status(201)
        .json({ success: true, message: "Admin created successfully" });
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
    const user = await Admin.findOne({where :{email :userDetails.email}})
      if(user ===  null){
        res.status(404).json({success:true , message : "employee not found create an account"})
      }else{

        const passwordChecking = await bcrypt.compare(userDetails.password,user.password)
          if(passwordChecking){
            const key = "private"
            const token = jwt.sign({ID:user.ID , userName :user.name},key)
            
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


module.exports.getEmployees = async(req,res)=>{
    try {
        // console.log("fetching")
        const result =  await Admin.findAll()

        
        res.status(200).json({success: true, message:"successfully retrieved employees",content : result});
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error: getEmployees'});
    }
}


module.exports.updateEmployee = async (req,res) => {

    try {
        const id  = req.params.id
        const data = req.body

        if (data.password === "") {
            delete data.password; 
        }else{
            const hash = await bcrypt.hash(data.password, 10);
            data["password"] = hash;
        }
        

        const result = await Admin.update(data,{where :{ID: id}})

        res.json({success : true,message : "Employee updated successfully",content:result})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false,message : "Internal Server Error : updateEmployee  "})
    }
}


module.exports.GetEmployeeByID = async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from the request parameters
        const response = await Admin.findByPk(id); // Use the correct method

        if (!response) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        res.status(200).json({ success: true, message: "user get Successfully", content: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error: GetEmployeeByID" });
    }
};


module.exports.deleteEmployee = async(req, res) => {
    try {
        const id = req.params.id
        
        const result = await Admin.destroy({where :{ID: id}})

        res.json({success : true,message : "user deleted successfully",content:result})
        
    } catch (error) {
        sole.log(error);
        res.status(500).json({success : false,message : "Internal Server Error : deleteEmployee  "})
    }
}





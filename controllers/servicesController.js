const Service = require("../models/servicesCatagories")



module.exports.createService =  async (req,res) => {


    console.log("Creating service")
    try {
        const data = req.body
        const result =  await Service.create(data)
        
        res.json({success:true,message : "Service created successfully",content:result})

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false,message : "Internal Server Error : createService "})
    }
}

module.exports.updateService = async (req,res) => {

    try {
        const id  = req.params.id
        const data = req.body
        const result = await Service.update(data,{where :{ID: id}})

        res.json({success : true,message : "Service updated successfully",content:result})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false,message : "Internal Server Error : updateService  "})
    }
}

module.exports.deleteService = async(req, res) => {
    try {
        const id = req.params.id
        
        const result = await Service.destroy({where :{ID: id}})

        res.json({success : true,message : "Service deleted successfully",content:result})
        
    } catch (error) {
        sole.log(error);
        res.status(500).json({success : false,message : "Internal Server Error : deleteService  "})
    }
}

module.exports.readService =async (req,res) => {
    try {
        
        const  response = await Service.findAll()

        res.status(201).json({success : true,message : "Read Service Successfully", content:response})


    } catch (error) {
    console.log(error)
    res.status(500).json({success : false,message : "Internal Server Error : readService  "})
    }
}

module.exports.readServiceByID = async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from the request parameters
        const response = await Service.findByPk(id); // Use the correct method

        if (!response) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, message: "Read Service Successfully", content: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error: readServiceByID" });
    }
};

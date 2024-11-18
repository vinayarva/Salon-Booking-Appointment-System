const DayAvailability = require('../models/dayAvailability') 
const Admin = require("../models/admin")


module.exports.fetchAvailability = async (req, res) => {
    try {
     const { date, service } = req.query;
 
     const employeeData = await Admin.findAll({where:{speciality: service}})
 
    //  console.log(employeeData[0].employeeName)
 
     const search = employeeData[0].ID
 
     const result = await DayAvailability.findOne({where:{adminID:search , date:date}})
 
     if(result){
         res.json(result)
     }else{
         const create = await DayAvailability.create({date:date, adminID:search})
         res.json(create)
     }
 
    } catch (error) {
     console.log(error)
    }
 }


module.exports.fetchAvailabilityALL = async (req, res) => {
    try {
        const { date } = req.query;

        // Fetch all employees
        const employeeData = await Admin.findAll({where : { role : 'staff'}});

        // Initialize an empty array to hold availability results
        const availabilityResults = [];

        // Loop through each employee and check their availability
        for (const employee of employeeData) {
            const result = await DayAvailability.findOne({ where: { adminID: employee.ID, date: date } });

            // Prepare the response with employee name and availability
            if (result) {
                availabilityResults.push({
                    ID: result.ID,
                    employeeName: employee.name,  // Add employee name
                    availability: result.availability
                });
            } else {
                const create = await DayAvailability.create({ date: date, adminID: employee.ID });
                availabilityResults.push({
                    ID: create.ID,
                    employeeName: employee.name,
                    availability: create.availability
                });
            }
        }

        // Send the availability results with employee names
        res.json({success:true , message : "fetching availabilty successful",availabilityResults});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred : fetchAvailabilityAll"   });
    }
};


module.exports.updateAvailability = async (req, res) => {
    try {
        const updates = req.body; // Array of objects containing ID and availability
        
        let array = []
        // Loop through each item in the array and perform an update
        for (let i = 0; i < updates.length; i++) {
            const { ID, availability } = updates[i];

            // Update query (Sequelize example)
      const result  =  await DayAvailability.update(
                { availability }, // Fields to update
                { where: { id: ID } } // Condition for the update
            );

            array.push(result)
        }

        res.status(200).send({success :true , message: 'Availability updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Something went wrong' });
    }
};

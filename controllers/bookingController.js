const DayAvailability = require('../models/dayAvailability') 
const EmployeeRole = require('../models/employeeRole')
const BookAppointment = require('../models/bookingAppointment')


module.exports.fetchAvailability = async (req, res) => {
   try {
    const { date, service } = req.query;

    const employeeData = await EmployeeRole.findAll({where:{specialist: service}})

    console.log(employeeData[0].employeeName)

    const search = employeeData[0].ID

    const result = await DayAvailability.findOne({where:{employeeRoleID:search , date:date}})

    if(result){
        res.json(result)
    }else{
        const create = await DayAvailability.create({date:date, employeeRoleID:search})
        res.json(create)
    }

   } catch (error) {
    console.log(error)
   }
}
module.exports.bookingAppointment = async(req, res)=>{



const { date, time, services, employeeRoleID } = req.body; // Extracting necessary data from the request body

const  user = req.user
console.log(user)

try {
    // Step 1: Create the booking in the BookAppointment table
    const bookingData = {
        date,
        services,
        time,
        employeeRoleID,
        userID:user.ID
        // status: "Booked"  // You can set this based on your system's requirements
    };

    const result = await BookAppointment.create(bookingData);
    console.log("Booking Created:", result);

    // Step 2: Update the DayAvailability for the selected employee and date
    const availability = await DayAvailability.findOne({ where: { employeeRoleID, date: date } });

    if (availability) {
        // Step 3: If availability found, we proceed to update the time slot

        // Parse the availability JSON object
        const updatedAvailability = availability.availability; // Assuming availability is a JSON column

        // Step 4: Set the selected time slot to false (indicating booked)
        if (updatedAvailability[time] !== undefined) {
            updatedAvailability[time] = false;  // Mark the time slot as unavailable
        }

        // Step 5: Save the updated availability back to the database
        await DayAvailability.update(
            { availability: updatedAvailability }, // Update only the availability field
            { where: { employeeRoleID, date: date } }
        );

        console.log("Availability Updated:", updatedAvailability);
    } else {
        console.log("No availability found for this employee and date");
    }

    // Return success response
    res.status(201).json({ message: "Booking created and availability updated successfully", booking: result });
} catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
}


}

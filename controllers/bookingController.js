const DayAvailability = require("../models/dayAvailability");
const BookAppointment = require("../models/bookingAppointment");
const Admin =  require("../models/admin")
const User =  require("../models/userModel")
const { Op, DATE } = require("sequelize");
const { compareSync } = require("bcrypt");
const SendEmail = require("../services/email")

module.exports.bookingAppointment = async (req, res) => {

  const { date, time, services, adminID } = req.body;

  const user = req.user;

  try {
    const bookingData = {
      date,
      services,
      time,
      adminID,
      userID: user.ID,
    };

    const result = await BookAppointment.create(bookingData);

    const availability = await DayAvailability.findOne({
      where: { adminID, date: date },
    });

    if (availability) {
      const updatedAvailability = availability.availability;

      if (updatedAvailability[time] !== undefined) {
        updatedAvailability[time] = false;
      }

      await DayAvailability.update(
        { availability: updatedAvailability }, // Update only the availability field
        { where: { adminID, date: date } }
      );

      // console.log("Availability Updated:", updatedAvailability);
    } else {
      // console.log("No availability found for this employee and date");
    }

    // Return success response

    SendEmail("test@example.com",result.time,result.date)
    res
      .status(201)
      .json({
        message: "Appointment confirmed,Confirmation Email is send to Email",
        booking: result,
      });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.readBookings = async (req, res) => {
  try {
    const user = req.user.ID;

    const result = await BookAppointment.findAll({ where: { userID: user } });

    res
      .status(200)
      .json({
        success: true,
        message: "Fetching Bookings Successfully",
        message: result,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error : readBookings",
      });
  }
};

module.exports.UpdateBookings = async (req, res) => {
  try {
    const user = req.user.ID;
    const data = req.body;
    const BookingID = req.query.ID; //ID update

    const result = await BookAppointment.update(data, {
      where: { ID: data.ID },
    });

    //once update or reschedule , the change should be in  availability

    res
      .status(200)
      .json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating BookAppointment" });
  }
};

module.exports.FetchAllBookings = async (req, res) => {
  try {
    const data = req.params.status;
    const result = await BookAppointment.findAll({ where: { status: data } });

    res
      .status(200)
      .json({
        success: true,
        message: "Fetching all Bookings",
        content: result,
      });
  } catch (error) {
    console.log(error);
    json
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error: FetchAllBookings",
      });
  }
};

module.exports.FetchUserBooking = async (req, res) => {
  try {
    const ID = req.user.ID;

    const Todaydate = req.query.date;

    const current = await BookAppointment.findAll({
      where: {
        date: {
          [Op.gt]: Todaydate, // This ensures dates greater than or equal to Todaydate
        },
        userID: ID, // Replace `ID` with the appropriate user ID variable
      },
    });

    console.log(current);

    const past = await BookAppointment.findAll({
      where: {
        date: {
          [Op.lte]: Todaydate, // This ensures dates greater than or equal to Todaydate
        },
        userID: ID, // Replace `ID` with the appropriate user ID variable
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "fetched successfully",
        past: past,
        current: current,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error: FetchUserBooking",
      });
  }
};


module.exports.DateAppointments = async(req,res)=>{
    try{
      const data = req.query.date
      // console.log(typeof(data.date))
      const result = await BookAppointment.findAll({
        where: {
          date: data
        },
        include: [
          {
            model: Admin,
            attributes: ['name']
          },
          {
            model: User,
            attributes: ['userName']
          }
        ]
      });
      // console.log(result)
        res.status(200).json({success: true, message:"appointment successfully fetched",content : result})
    }catch(err){
        console.log(err);
        res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error: DateAppointments",
      });
    }
}





module.exports.statusUpdater = async (req,res)=>{

  try {
    
    const status = req.body.params.status;
    const ID = req.params.id;
    
    const result = await BookAppointment.update({status : status},{where:{ID:ID}})

    res.status(201).json({success : true,message : "successfully updated",data : result})
    
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error: statusUpdater",
      });
  }



}
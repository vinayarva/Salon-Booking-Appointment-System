const cron = require('node-cron');
const SendEmail = require('../services/email');
const BookAppointment = require('../models/bookingAppointment');



const moment = require('moment');

// Get today's date
const today = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

const startCronJobs = () => {
  cron.schedule('0 7 * * *', async() => {
    try {

        const result = await BookAppointment.findAll({where:{date:today}});

        result.forEach(element => {
            SendEmail("test@example.com", element.time,element.date)
        });

        console.log("sending emails...")
        
    } catch (error) {
        console.log(error)
    }
  });
};



const startCronJobs2 = () => {
    cron.schedule('0 10 * * *', async() => {
      try {
  
          const result = await BookAppointment.findAll({where:{date:tomorrow}});
  
          result.forEach(element => {
              SendEmail("test@example.com", element.time,element.date)
          });
  
          console.log("sending emails...")
          
      } catch (error) {
          console.log(error)
      }
    });
  };
  

module.exports = {startCronJobs,startCronJobs2};